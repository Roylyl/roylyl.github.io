(() => {
  'use strict';

  const canvas = document.querySelector('[data-particle-canvas], #ssParticleCanvas');
  const viewportMode = canvas?.dataset.particleMode === 'viewport';
  const surface = canvas?.closest('[data-particle-surface]') || document.querySelector('.ss-hero');

  if (!canvas || (!surface && !viewportMode) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const gl = canvas.getContext('webgl2', {
    alpha: true,
    antialias: true,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: true,
    powerPreference: 'high-performance'
  });

  if (!gl || !gl.getExtension('EXT_color_buffer_float')) {
    canvas.classList.add('is-fallback');
    return;
  }

  const STATE_SIZE = 256;
  const HERO_DENSITY = 230;
  const HERO_PARTICLE_SCALE = 0.95;
  const RING_WIDTH = 0.006;
  const RING_WIDTH_2 = 0.107;
  const RING_DISPLACEMENT = 0.62;
  const followsFinePointer = (
    navigator.maxTouchPoints === 0 &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  let randomState = 0x4d595df4;
  const random = () => {
    randomState = (Math.imul(randomState, 1664525) + 1013904223) | 0;
    return (randomState >>> 0) / 4294967296;
  };

  const remap = (value, inMin, inMax, outMin, outMax) => (
    (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
  );

  function createPoissonPoints() {
    const shape = 500;
    const minDistance = remap(HERO_DENSITY, 0, 300, 10, 2);
    const maxDistance = remap(HERO_DENSITY, 0, 300, 11, 3);
    const cellSize = minDistance / Math.SQRT2;
    const gridWidth = Math.ceil(shape / cellSize);
    const grid = new Int32Array(gridWidth * gridWidth);
    grid.fill(-1);

    const points = [];
    const active = [];

    const addPoint = (x, y) => {
      const pointIndex = points.length;
      points.push([x, y]);
      active.push(pointIndex);
      grid[Math.floor(y / cellSize) * gridWidth + Math.floor(x / cellSize)] = pointIndex;
    };

    addPoint(shape * 0.5, shape * 0.5);

    while (active.length > 0 && points.length < STATE_SIZE * STATE_SIZE) {
      const activeSlot = Math.floor(random() * active.length);
      const point = points[active[activeSlot]];
      let accepted = false;

      for (let attempt = 0; attempt < 20; attempt += 1) {
        const angle = random() * Math.PI * 2;
        const distance = minDistance + random() * (maxDistance - minDistance);
        const candidateX = point[0] + Math.cos(angle) * distance;
        const candidateY = point[1] + Math.sin(angle) * distance;

        if (candidateX < 0 || candidateX >= shape || candidateY < 0 || candidateY >= shape) continue;

        const cellX = Math.floor(candidateX / cellSize);
        const cellY = Math.floor(candidateY / cellSize);
        let valid = true;

        for (let offsetY = -2; offsetY <= 2 && valid; offsetY += 1) {
          for (let offsetX = -2; offsetX <= 2; offsetX += 1) {
            const neighborX = cellX + offsetX;
            const neighborY = cellY + offsetY;
            if (neighborX < 0 || neighborX >= gridWidth || neighborY < 0 || neighborY >= gridWidth) continue;

            const neighborIndex = grid[neighborY * gridWidth + neighborX];
            if (neighborIndex < 0) continue;

            const neighbor = points[neighborIndex];
            if (Math.hypot(candidateX - neighbor[0], candidateY - neighbor[1]) < minDistance) {
              valid = false;
              break;
            }
          }
        }

        if (!valid) continue;

        addPoint(candidateX, candidateY);
        accepted = true;
        break;
      }

      if (!accepted) active.splice(activeSlot, 1);
    }

    return points.map(([x, y]) => [
      (x - shape * 0.5) / (shape * 0.5),
      (y - shape * 0.5) / (shape * 0.5)
    ]);
  }

  const NOISE_GLSL = `
    float hash13(vec3 point) {
      point = fract(point * 0.1031);
      point += dot(point, point.yzx + 33.33);
      return fract((point.x + point.y) * point.z);
    }

    float noise3(vec3 point) {
      vec3 cell = floor(point);
      vec3 local = fract(point);
      local = local * local * (3.0 - 2.0 * local);

      float c000 = hash13(cell + vec3(0.0, 0.0, 0.0));
      float c100 = hash13(cell + vec3(1.0, 0.0, 0.0));
      float c010 = hash13(cell + vec3(0.0, 1.0, 0.0));
      float c110 = hash13(cell + vec3(1.0, 1.0, 0.0));
      float c001 = hash13(cell + vec3(0.0, 0.0, 1.0));
      float c101 = hash13(cell + vec3(1.0, 0.0, 1.0));
      float c011 = hash13(cell + vec3(0.0, 1.0, 1.0));
      float c111 = hash13(cell + vec3(1.0, 1.0, 1.0));

      float low = mix(mix(c000, c100, local.x), mix(c010, c110, local.x), local.y);
      float high = mix(mix(c001, c101, local.x), mix(c011, c111, local.x), local.y);
      return (mix(low, high, local.z) - 0.5) * 2.0;
    }
  `;

  const SIM_VERTEX_SHADER = `#version 300 es
    const vec2 positions[3] = vec2[3](
      vec2(-1.0, -1.0),
      vec2( 3.0, -1.0),
      vec2(-1.0,  3.0)
    );

    void main() {
      gl_Position = vec4(positions[gl_VertexID], 0.0, 1.0);
    }
  `;

  const SIM_FRAGMENT_SHADER = `#version 300 es
    precision highp float;

    uniform sampler2D uPosition;
    uniform sampler2D uPositionReferences;
    uniform vec2 uRingPosition;
    uniform float uRingRadius;
    uniform float uDeltaTime;
    uniform float uRingWidth;
    uniform float uRingWidth2;
    uniform float uRingDisplacement;
    uniform float uTime;

    out vec4 outColor;

    ${NOISE_GLSL}

    void main() {
      vec2 simUv = gl_FragCoord.xy / vec2(${STATE_SIZE}.0);
      vec4 previousFrame = texture(uPosition, simUv);
      vec2 referencePosition = texture(uPositionReferences, simUv).xy;

      float scale = previousFrame.z;
      float velocity = previousFrame.w;
      float time = uTime * 0.5;
      vec2 currentPosition = referencePosition;
      vec2 position = previousFrame.xy * 0.8;

      float distanceToRing = distance(currentPosition, uRingPosition);
      float ringNoise = noise3(vec3(currentPosition * 0.2 + vec2(18.4924, 72.9744), time * 0.5));
      float noisyDistance = distance(currentPosition + ringNoise * 0.005, uRingPosition);

      float ringBand = smoothstep(uRingRadius - (uRingWidth * 2.0), uRingRadius, distanceToRing)
        - smoothstep(uRingRadius, uRingRadius + uRingWidth, noisyDistance);
      float wideRingBand = smoothstep(uRingRadius - (uRingWidth2 * 2.0), uRingRadius, distanceToRing)
        - smoothstep(uRingRadius, uRingRadius + uRingWidth2, noisyDistance);
      float innerBand = 1.0 - smoothstep(uRingRadius, uRingRadius + uRingWidth2, distanceToRing);

      ringBand = pow(max(ringBand, 0.0), 2.0);
      wideRingBand = pow(max(wideRingBand, 0.0), 3.0);
      ringBand += wideRingBand * 3.0;
      ringBand += innerBand * 0.4;
      ringBand += noise3(vec3(currentPosition * 30.0 + vec2(11.4924, 12.9744), time * 0.5)) * innerBand * 0.5;

      float midNoise = noise3(vec3(currentPosition * 2.0 + vec2(18.4924, 72.9744), time * 0.5));
      ringBand += pow((midNoise + 1.5) * 0.5, 2.0) * 0.6;

      float noiseX = noise3(vec3(currentPosition * 4.0 + vec2(88.494, 32.4397), time * 0.35));
      float noiseY = noise3(vec3(currentPosition * 4.0 + vec2(50.904, 120.947), time * 0.35));
      float closeNoiseX = noise3(vec3(currentPosition * 20.0 + vec2(18.4924, 72.9744), time * 0.5));
      float closeNoiseY = noise3(vec3(currentPosition * 20.0 + vec2(50.904, 120.947), time * 0.5));

      vec2 displacement = vec2(noiseX, noiseY) * 0.03;
      displacement += vec2(closeNoiseX, closeNoiseY) * 0.005;
      displacement.x += sin((referencePosition.x * 20.0) + (time * 4.0)) * 0.02 * clamp(distanceToRing, 0.0, 1.0);
      displacement.y += cos((referencePosition.y * 20.0) + (time * 3.0)) * 0.02 * clamp(distanceToRing, 0.0, 1.0);

      position -= (uRingPosition - (currentPosition + displacement))
        * pow(max(wideRingBand, 0.0), 0.75)
        * uRingDisplacement;

      ringBand = clamp(ringBand, 0.0, 0.92);
      scale += (ringBand - scale) * 0.20;
      scale = clamp(scale, 0.0, 0.92);
      velocity = velocity * 0.5 + scale * 0.25;

      outColor = vec4(currentPosition + displacement + (position * 0.25), scale, velocity);
    }
  `;

  const PARTICLE_VERTEX_SHADER = `#version 300 es
    precision highp float;

    in vec2 aLookup;
    in float aSeed;

    uniform sampler2D uPosition;
    uniform float uParticleScale;
    uniform float uPixelRatio;

    out float vVelocity;
    out float vScale;
    out float vSeed;
    out vec2 vLocalPosition;

    void main() {
      vec4 particle = texture(uPosition, aLookup);
      vVelocity = particle.w;
      vScale = particle.z;
      vSeed = aSeed;
      vLocalPosition = particle.xy;

      gl_Position = vec4(particle.xy, 0.0, 1.0);
      gl_PointSize = min(6.5, (0.75 + vScale * 7.0) * uPixelRatio * uParticleScale);
    }
  `;

  const PARTICLE_FRAGMENT_SHADER = `#version 300 es
    precision highp float;

    uniform float uTime;
    uniform vec2 uRingPosition;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uAlpha;

    in float vVelocity;
    in float vScale;
    in float vSeed;
    in vec2 vLocalPosition;

    out vec4 outColor;

    ${NOISE_GLSL}

    vec2 rotate(vec2 point, float angle) {
      float sine = sin(angle);
      float cosine = cos(angle);
      return mat2(cosine, sine, -sine, cosine) * point;
    }

    float roundedBox(vec2 point, vec2 bounds, vec4 radius) {
      radius.xy = (point.x > 0.0) ? radius.xy : radius.zw;
      radius.x = (point.y > 0.0) ? radius.x : radius.y;
      vec2 q = abs(point) - bounds + radius.x;
      return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - radius.x;
    }

    void main() {
      float noiseAngle = noise3(vec3(vLocalPosition * 10.0 + vec2(18.4924, 72.9744), uTime * 0.85));
      float noiseColor = noise3(vec3(vLocalPosition * 2.0 + vec2(74.664, 91.556), uTime * 0.5));
      noiseColor = (noiseColor + 1.0) * 0.5;

      vec2 point = gl_PointCoord.xy - vec2(0.5);
      point.y *= -1.0;
      float angle = atan(vLocalPosition.y - uRingPosition.y, vLocalPosition.x - uRingPosition.x);
      point = rotate(point, -angle + (noiseAngle * 0.5));

      float progress = smoothstep(0.0, 0.75, pow(noiseColor, 2.0));
      vec3 color = mix(
        mix(uColor1, uColor2, progress / 0.8),
        mix(uColor2, uColor3, (progress - 0.8) / 0.2),
        step(0.8, progress)
      );

      float rounded = roundedBox(point, vec2(0.5, 0.2), vec4(0.25));
      rounded = smoothstep(0.1, 0.0, rounded);
      float alpha = uAlpha * rounded * smoothstep(0.1, 0.2, vScale);

      if (alpha < 0.01) discard;
      outColor = vec4(clamp(color, 0.0, 1.0), clamp(alpha, 0.0, 1.0));
    }
  `;

  function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader) || 'Particle shader compilation failed.';
      gl.deleteShader(shader);
      throw new Error(message);
    }

    return shader;
  }

  function createProgram(vertexSource, fragmentSource) {
    const program = gl.createProgram();
    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(program) || 'Particle program linking failed.';
      gl.deleteProgram(program);
      throw new Error(message);
    }

    return program;
  }

  function createFloatTexture(data) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA32F,
      STATE_SIZE,
      STATE_SIZE,
      0,
      gl.RGBA,
      gl.FLOAT,
      data
    );
    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
  }

  function createFramebuffer(texture) {
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      throw new Error('Particle framebuffer is incomplete.');
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return framebuffer;
  }

  function uniformMap(program, names) {
    return names.reduce((result, name) => {
      result[name] = gl.getUniformLocation(program, name);
      return result;
    }, {});
  }

  try {
    const points = createPoissonPoints();
    const particleCount = points.length;
    const referenceData = new Float32Array(STATE_SIZE * STATE_SIZE * 4);
    const initialData = new Float32Array(STATE_SIZE * STATE_SIZE * 4);
    const lookupData = new Float32Array(particleCount * 2);
    const seedData = new Float32Array(particleCount);

    for (let index = 0; index < particleCount; index += 1) {
      const dataIndex = index * 4;
      const textureX = index % STATE_SIZE;
      const textureY = Math.floor(index / STATE_SIZE);
      const [x, y] = points[index];

      referenceData[dataIndex] = x;
      referenceData[dataIndex + 1] = y;
      initialData[dataIndex] = x;
      initialData[dataIndex + 1] = y;
      lookupData[index * 2] = (textureX + 0.5) / STATE_SIZE;
      lookupData[index * 2 + 1] = (textureY + 0.5) / STATE_SIZE;
      seedData[index] = random();
    }

    const referenceTexture = createFloatTexture(referenceData);
    const stateTextures = [createFloatTexture(initialData), createFloatTexture(initialData)];
    const stateFramebuffers = stateTextures.map(createFramebuffer);
    const simulationProgram = createProgram(SIM_VERTEX_SHADER, SIM_FRAGMENT_SHADER);
    const particleProgram = createProgram(PARTICLE_VERTEX_SHADER, PARTICLE_FRAGMENT_SHADER);
    const simulationVao = gl.createVertexArray();
    const particleVao = gl.createVertexArray();

    const simulationUniforms = uniformMap(simulationProgram, [
      'uPosition', 'uPositionReferences', 'uRingPosition', 'uRingRadius', 'uDeltaTime',
      'uRingWidth', 'uRingWidth2', 'uRingDisplacement', 'uTime'
    ]);
    const particleUniforms = uniformMap(particleProgram, [
      'uPosition', 'uParticleScale', 'uPixelRatio', 'uTime', 'uRingPosition', 'uColor1', 'uColor2', 'uColor3', 'uAlpha'
    ]);

    gl.bindVertexArray(particleVao);

    const lookupBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, lookupBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, lookupData, gl.STATIC_DRAW);
    const lookupLocation = gl.getAttribLocation(particleProgram, 'aLookup');
    gl.enableVertexAttribArray(lookupLocation);
    gl.vertexAttribPointer(lookupLocation, 2, gl.FLOAT, false, 0, 0);

    const seedBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, seedBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, seedData, gl.STATIC_DRAW);
    const seedLocation = gl.getAttribLocation(particleProgram, 'aSeed');
    gl.enableVertexAttribArray(seedLocation);
    gl.vertexAttribPointer(seedLocation, 1, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null);

    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let readIndex = 0;
    let pointerX = window.innerWidth * 0.5;
    let pointerY = window.innerHeight * 0.35;
    let ringX = 0;
    let ringY = 0;
    let lastFrame = 0;
    let rafId = 0;
    let visible = true;

    const getBounds = () => {
      if (viewportMode) {
        return {
          left: 0,
          top: 0,
          right: window.innerWidth,
          bottom: window.innerHeight,
          width: window.innerWidth,
          height: window.innerHeight
        };
      }
      return surface.getBoundingClientRect();
    };

    const resize = () => {
      const bounds = getBounds();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const updateRing = (time) => {
      const bounds = getBounds();
      const inside = followsFinePointer && (
        pointerX >= bounds.left &&
        pointerX <= bounds.right &&
        pointerY >= bounds.top &&
        pointerY <= bounds.bottom
      );
      const noiseX = Math.sin(time * 0.66 + 94.234);
      const noiseY = Math.cos(time * 0.75 + 21.028);
      let targetX = Math.sin(time * 0.18 + 1.4) * 0.52 + noiseX * 0.14;
      let targetY = Math.cos(time * 0.22 + 0.6) * 0.34 + noiseY * 0.12;

      if (inside) {
        const normalizedX = ((pointerX - bounds.left) / Math.max(bounds.width, 1)) * 2 - 1;
        const normalizedY = -((pointerY - bounds.top) / Math.max(bounds.height, 1)) * 2 + 1;
        // The particles are rendered directly in clip space, so the pointer must
        // stay in the same -1..1 coordinate system. The previous camera-style
        // conversion compressed the target into a small area around the centre.
        targetX = Math.max(-0.96, Math.min(0.96, normalizedX + noiseX * 0.018));
        targetY = Math.max(-0.92, Math.min(0.92, normalizedY + noiseY * 0.018));
      }

      const easing = inside ? 0.085 : 0.012;
      ringX += (targetX - ringX) * easing;
      ringY += (targetY - ringY) * easing;
    };

    const draw = (now) => {
      rafId = window.requestAnimationFrame(draw);
      if (!visible || document.hidden) return;

      const time = now * 0.001;
      const delta = lastFrame ? Math.min((now - lastFrame) * 0.001, 0.05) : 0.016;
      lastFrame = now;
      updateRing(time);

      const writeIndex = 1 - readIndex;
      gl.bindFramebuffer(gl.FRAMEBUFFER, stateFramebuffers[writeIndex]);
      gl.viewport(0, 0, STATE_SIZE, STATE_SIZE);
      gl.useProgram(simulationProgram);
      gl.bindVertexArray(simulationVao);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, stateTextures[readIndex]);
      gl.uniform1i(simulationUniforms.uPosition, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, referenceTexture);
      gl.uniform1i(simulationUniforms.uPositionReferences, 1);
      gl.uniform2f(simulationUniforms.uRingPosition, ringX, ringY);
      gl.uniform1f(simulationUniforms.uRingRadius, 0.175 + Math.sin(time) * 0.03 + Math.cos(time * 3.0) * 0.02);
      gl.uniform1f(simulationUniforms.uDeltaTime, delta);
      gl.uniform1f(simulationUniforms.uRingWidth, RING_WIDTH);
      gl.uniform1f(simulationUniforms.uRingWidth2, RING_WIDTH_2);
      gl.uniform1f(simulationUniforms.uRingDisplacement, RING_DISPLACEMENT);
      gl.uniform1f(simulationUniforms.uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      readIndex = writeIndex;
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.disable(gl.DEPTH_TEST);

      gl.useProgram(particleProgram);
      gl.bindVertexArray(particleVao);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, stateTextures[readIndex]);
      gl.uniform1i(particleUniforms.uPosition, 0);
      const desktopParticleScale = width / pixelRatio / 2000 * HERO_PARTICLE_SCALE;
      const touchParticleScale = Math.max(
        0.38,
        Math.min(0.46, width / pixelRatio / 1100 * HERO_PARTICLE_SCALE)
      );
      gl.uniform1f(
        particleUniforms.uParticleScale,
        followsFinePointer ? desktopParticleScale : touchParticleScale
      );
      gl.uniform1f(particleUniforms.uPixelRatio, pixelRatio);
      gl.uniform1f(particleUniforms.uTime, time);
      gl.uniform2f(particleUniforms.uRingPosition, ringX, ringY);
      gl.uniform3f(particleUniforms.uColor1, 0.17, 0.39, 0.93);
      gl.uniform3f(particleUniforms.uColor2, 0.97, 0.26, 0.26);
      gl.uniform3f(particleUniforms.uColor3, 1.00, 0.81, 0.01);
      gl.uniform1f(particleUniforms.uAlpha, 1.0);
      gl.drawArrays(gl.POINTS, 0, particleCount);

      gl.bindVertexArray(null);
      gl.bindTexture(gl.TEXTURE_2D, null);
    };

    if (followsFinePointer) {
      window.addEventListener('pointermove', (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
      }, { passive: true });
    }
    window.addEventListener('resize', resize, { passive: true });

    if (!viewportMode && 'ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(surface);
    }

    if (!viewportMode && 'IntersectionObserver' in window) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
      }, { threshold: 0 });
      intersectionObserver.observe(surface);
    }

    resize();
    rafId = window.requestAnimationFrame(draw);

    window.addEventListener('pagehide', () => {
      window.cancelAnimationFrame(rafId);
      gl.deleteTexture(referenceTexture);
      stateTextures.forEach((texture) => gl.deleteTexture(texture));
      stateFramebuffers.forEach((framebuffer) => gl.deleteFramebuffer(framebuffer));
      gl.deleteProgram(simulationProgram);
      gl.deleteProgram(particleProgram);
      gl.deleteBuffer(lookupBuffer);
      gl.deleteBuffer(seedBuffer);
    }, { once: true });
  } catch (error) {
    canvas.classList.add('is-fallback');
    console.warn('SoundShare Antigravity particle preview disabled:', error);
  }
})();

/*
 * Element-local convex glass optics. No DOM or image blur is involved.
 *
 * References (the implementation below is independently calculated):
 * https://github.com/shuding/liquid-glass — SDF / SVG displacement-map approach
 * https://github.com/Zettersten/skills/tree/main/skills/liquid-glass — Snell model
 *
 * A straight-on ray enters a convex superellipse surface and travels to the
 * plane beneath it. This is a one-interface optical approximation, not a full
 * path tracer. The 2.25 exponent and broad bezel make the rim visible without
 * the caustic/fold of a sharp fourth-power squircle. A rounded rectangle and
 * a capsule use the same local edge normals; neither pulls to a global centre.
 */
(function (root, factory) {
  const optics = factory();
  if (typeof module === 'object' && module.exports) module.exports = optics;
  else root.PortfolioGlassOptics = optics;
})(typeof window === 'object' ? window : globalThis, function () {
  'use strict';

  const NEUTRAL = 128;
  const PROFILE_SAMPLES = 2048;
  const DISPERSION = 0.18;
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));

  function dimensions(width, height) {
    if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1) {
      throw new RangeError('Glass dimensions must be finite positive CSS pixel sizes.');
    }
    return [Math.round(width), Math.round(height)];
  }

  function createLens(width, height, cornerRadius) {
    [width, height] = dimensions(width, height);
    if (cornerRadius !== undefined && (!Number.isFinite(cornerRadius) || cornerRadius <= 0)) {
      throw new RangeError('Glass corner radius must be a finite positive CSS pixel size.');
    }
    const radius = Math.min(cornerRadius ?? Infinity, width / 2, height / 2);
    const bezel = Math.min(27, radius * 0.7);
    const thickness = bezel;
    const exponent = 2.25;
    const refractiveIndex = 1.5;
    const eta = 1 / refractiveIndex;
    const innerHalfWidth = width / 2 - radius;
    const innerHalfHeight = height / 2 - radius;
    const profile = new Float64Array(PROFILE_SAMPLES + 1);
    let maxDisplacement = 0;

    // Curve height is zero at the edge and flat at the inner bezel boundary.
    // Trace I=(0,0,-1) through N=(slope*nx,slope*ny,1), normalized.
    for (let i = 1; i < PROFILE_SAMPLES; i++) {
      const depth = i / PROFILE_SAMPLES;
      const q = 1 - depth;
      const base = 1 - Math.pow(q, exponent);
      const surfaceHeight = thickness * Math.pow(base, 1 / exponent);
      const slope = thickness / bezel * Math.pow(q, exponent - 1) /
        Math.pow(base, 1 - 1 / exponent);
      const normalZ = 1 / Math.hypot(slope, 1);
      const normalLateral = slope * normalZ;
      const transmitted = eta * normalZ -
        Math.sqrt(1 - eta * eta * (1 - normalZ * normalZ));
      const rayLateral = transmitted * normalLateral;
      const rayZ = -eta + transmitted * normalZ;
      const displacement = -rayLateral / -rayZ * surfaceHeight;
      profile[i] = displacement;
      maxDisplacement = Math.max(maxDisplacement, displacement);
    }

    function sample(x, y) {
      const px = x - width / 2;
      const py = y - height / 2;
      // Nearest point on the rounded rectangle's inner box. At the maximum
      // radius the box becomes the capsule's centre segment. Straight edges
      // have exactly zero tangential displacement, including on wide cards.
      const nxRaw = px - clamp(px, -innerHalfWidth, innerHalfWidth);
      const nyRaw = py - clamp(py, -innerHalfHeight, innerHalfHeight);
      const distance = Math.hypot(nxRaw, nyRaw);
      const depth = radius - distance;
      if (depth <= 0 || depth >= bezel || distance === 0) return { x: 0, y: 0 };
      const position = depth / bezel * PROFILE_SAMPLES;
      const lower = Math.floor(position);
      const fraction = position - lower;
      const magnitude = profile[lower] * (1 - fraction) + profile[lower + 1] * fraction;
      return { x: -nxRaw / distance * magnitude, y: -nyRaw / distance * magnitude };
    }

    return {
      width, height, radius, bezel, thickness, exponent, refractiveIndex,
      maxDisplacement, dispersion: DISPERSION, sample
    };
  }

  function createMap(width, height, cornerRadius) {
    const lens = createLens(width, height, cornerRadius);
    const pixels = new Uint8ClampedArray(lens.width * lens.height * 4);
    // Leave encoding headroom. A single CSS-pixel scale keeps the effect
    // independent of the navigation width and screen device-pixel ratio.
    const scale = Math.ceil(lens.maxDisplacement * 2.1 * 1000) / 1000;
    for (let y = 0; y < lens.height; y++) {
      for (let x = 0; x < lens.width; x++) {
        const offset = lens.sample(x + 0.5, y + 0.5);
        const index = (y * lens.width + x) * 4;
        pixels[index] = Math.round(NEUTRAL + offset.x / scale * 255);
        pixels[index + 1] = Math.round(NEUTRAL + offset.y / scale * 255);
        pixels[index + 2] = NEUTRAL;
        pixels[index + 3] = 255;
      }
    }
    return {
      width: lens.width,
      height: lens.height,
      pixels,
      scale,
      neutralPoint: NEUTRAL / 255,
      // SVG's natural neutral is 0.5, whereas a PNG cannot encode 127.5.
      // Apply this R/G intercept with feColorMatrix before displacement.
      neutralCorrection: 0.5 - NEUTRAL / 255,
      radius: lens.radius,
      bezel: lens.bezel,
      thickness: lens.thickness,
      maxDisplacement: lens.maxDisplacement,
      exponent: lens.exponent,
      refractiveIndex: lens.refractiveIndex,
      dispersion: lens.dispersion
    };
  }

  return Object.freeze({ createMap, createLens });
});

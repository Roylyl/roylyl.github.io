const assert = require('node:assert/strict');
const test = require('node:test');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const vm = require('node:vm');
const { createMap, createLens } = require('../nav-glass-optics.js');

const sizes = [[1320, 76], [976, 76], [744, 64], [358, 64], [300, 56], [320, 88], [360, 180, 28], [300, 220, 28]];
const dispersion = createLens(1320, 76).dispersion;
const channels = [1 - dispersion, 1, 1 + dispersion];
const close = (actual, expected, tolerance = 1e-9) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);

test('also loads as a dependency-free classic browser script', () => {
  const window = {};
  vm.runInNewContext(readFileSync(resolve(__dirname, '../nav-glass-optics.js'), 'utf8'), { window });
  assert.equal(typeof window.PortfolioGlassOptics.createMap, 'function');
});

test('flat glass and straight edges cannot introduce lateral drift', () => {
  for (const [width, height, radius] of sizes) {
    const lens = createLens(width, height, radius);
    for (const x of [lens.radius, width / 3, width / 2, width - lens.radius]) {
      close(lens.sample(x, height / 2).x, 0);
      close(lens.sample(x, height / 2).y, 0);
      for (const depth of [0.1, 1, 5, lens.bezel - 0.1]) {
        close(lens.sample(x, depth).x, 0);
        close(lens.sample(x, height - depth).x, 0);
      }
    }
    assert.ok(lens.maxDisplacement >= 5 && lens.maxDisplacement < 7.1);
  }
});

test('mirror symmetry preserves the background centre on all screen widths', () => {
  for (const [width, height, radius] of sizes) {
    const lens = createLens(width, height, radius);
    for (let x = 0.5; x < width; x += 7) {
      for (let y = 0.5; y < height; y += 3) {
        const a = lens.sample(x, y);
        const horizontal = lens.sample(width - x, y);
        const vertical = lens.sample(x, height - y);
        close(a.x, -horizontal.x);
        close(a.y, horizontal.y);
        close(a.x, vertical.x);
        close(a.y, -vertical.y);
      }
    }
  }
});

test('ray mapping never folds or samples outside the rounded glass for any RGB pass', () => {
  let minimumDeterminant = Infinity;
  for (const [width, height, radius] of sizes) {
    const lens = createLens(width, height, radius);
    const epsilon = 0.01;
    const innerHalfWidth = width / 2 - lens.radius;
    const innerHalfHeight = height / 2 - lens.radius;
    for (let y = 0.25; y < height; y += 0.5) {
      // Curved ends plus the straight centre exercise every unique normal.
      for (const x of [...Array.from({ length: height * 2 }, (_, i) => i / 2 + 0.25), width / 2]) {
        const distance = Math.hypot(Math.max(Math.abs(x - width / 2) - innerHalfWidth, 0), Math.max(Math.abs(y - height / 2) - innerHalfHeight, 0));
        if (distance >= lens.radius - epsilon) continue;
        const centre = lens.sample(x, y);
        const left = lens.sample(x - epsilon, y);
        const right = lens.sample(x + epsilon, y);
        const top = lens.sample(x, y - epsilon);
        const bottom = lens.sample(x, y + epsilon);
        const dxx = (right.x - left.x) / (2 * epsilon);
        const dxy = (bottom.x - top.x) / (2 * epsilon);
        const dyx = (right.y - left.y) / (2 * epsilon);
        const dyy = (bottom.y - top.y) / (2 * epsilon);
        for (const channel of channels) {
          const determinant = (1 + channel * dxx) * (1 + channel * dyy) - channel * channel * dxy * dyx;
          minimumDeterminant = Math.min(minimumDeterminant, determinant);
          assert.ok(determinant > 0.35, `Fold at ${width}×${height} (${x},${y}), channel ${channel}: ${determinant}`);
          const sx = x + centre.x * channel;
          const sy = y + centre.y * channel;
          const sampleDistance = Math.hypot(Math.max(Math.abs(sx - width / 2) - innerHalfWidth, 0), Math.max(Math.abs(sy - height / 2) - innerHalfHeight, 0));
          assert.ok(sampleDistance < lens.radius, 'An edge ray sampled outside the clipped glass');
        }
      }
    }
  }
  assert.ok(minimumDeterminant < 1, 'Test must include the actual refracting bezel');
});

test('8-bit map stays neutral in the centre and does not fold after encoding', () => {
  for (const [width, height, radius] of sizes) {
    const map = createMap(width, height, radius);
    assert.equal(map.pixels.length, width * height * 4);
    close(map.neutralPoint + map.neutralCorrection, 0.5);
    const decoded = (x, y) => {
      const index = (y * width + x) * 4;
      return {
        x: (map.pixels[index] / 255 + map.neutralCorrection - 0.5) * map.scale,
        y: (map.pixels[index + 1] / 255 + map.neutralCorrection - 0.5) * map.scale
      };
    };
    close(decoded(Math.floor(width / 2), Math.floor(height / 2)).x, 0);
    close(decoded(Math.floor(width / 2), Math.floor(height / 2)).y, 0);
    const inside = (x, y) => Math.hypot(
      Math.max(Math.abs(x + 0.5 - width / 2) - (width / 2 - map.radius), 0),
      Math.max(Math.abs(y + 0.5 - height / 2) - (height / 2 - map.radius), 0)
    ) < map.radius;
    for (let y = 0; y < height - 1; y++) {
      for (let x = 0; x < width - 1; x++) {
        if (!inside(x, y) || !inside(x + 1, y) || !inside(x, y + 1) || !inside(x + 1, y + 1)) continue;
        const a = decoded(x, y);
        const b = decoded(x + 1, y);
        const c = decoded(x, y + 1);
        const d = decoded(x + 1, y + 1);
        for (const channel of channels) {
          // Bilinear image sampling has an affine Jacobian determinant within
          // each pixel cell; checking all four corners also bounds its interior.
          for (const [dx, dy] of [
            [{ x: b.x - a.x, y: b.y - a.y }, { x: c.x - a.x, y: c.y - a.y }],
            [{ x: b.x - a.x, y: b.y - a.y }, { x: d.x - b.x, y: d.y - b.y }],
            [{ x: d.x - c.x, y: d.y - c.y }, { x: c.x - a.x, y: c.y - a.y }],
            [{ x: d.x - c.x, y: d.y - c.y }, { x: d.x - b.x, y: d.y - b.y }]
          ]) {
            const determinant = (1 + dx.x * channel) * (1 + dy.y * channel) - dx.y * dy.x * channel * channel;
            assert.ok(determinant > 0.2, `Encoded map fold at ${width}×${height} (${x},${y}): ${determinant}`);
          }
        }
      }
    }
  }
});

test('resizing changes capsule ends without stretching the long-side optics', () => {
  const desktop = createLens(1320, 76);
  const phone = createLens(358, 76);
  for (let y = 0.1; y < 76; y += 0.3) {
    close(desktop.sample(660, y).x, phone.sample(179, y).x);
    close(desktop.sample(660, y).y, phone.sample(179, y).y);
    close(desktop.sample(8, y).x, phone.sample(8, y).x);
    close(desktop.sample(8, y).y, phone.sample(8, y).y);
  }
});

test('stronger bezel and shared dispersion remain within the visible, non-folding range', () => {
  for (const [width, height, radius] of sizes) {
    const lens = createLens(width, height, radius);
    const map = createMap(width, height, radius);
    const separation = lens.maxDisplacement * lens.dispersion * 2;
    assert.ok(separation >= 1.8 && separation < 2.6, `RGB separation ${separation}px`);
    close(map.dispersion, lens.dispersion);
    close(lens.thickness, lens.bezel);
    if (radius === undefined) assert.ok(height - lens.bezel * 2 >= height * 0.25);
  }
});

test('cards keep their rounded rectangle rather than becoming capsules', () => {
  for (const [width, height] of [[360, 180], [300, 220]]) {
    const lens = createLens(width, height, 28);
    assert.equal(lens.radius, 28);
    assert.ok(lens.radius < Math.min(width, height) / 2);
    for (const y of [28, height / 3, height / 2, height - 28]) {
      for (const depth of [0.1, 1, 5, lens.bezel - 0.1]) {
        close(lens.sample(depth, y).y, 0);
        close(lens.sample(width - depth, y).y, 0);
      }
    }
    const corner = lens.sample(12, 12);
    assert.ok(corner.x > 0 && corner.y > 0);
    close(corner.x, corner.y);
  }
  assert.equal(createLens(360, 64, 999).radius, 32);
});

test('rejects invalid dimensions before allocating an image', () => {
  for (const pair of [[0, 64], [320, 0], [NaN, 64], [320, Infinity], [-1, 64]]) {
    assert.throws(() => createMap(...pair), RangeError);
  }
  for (const radius of [0, -1, NaN, Infinity]) {
    assert.throws(() => createMap(360, 180, radius), RangeError);
  }
});

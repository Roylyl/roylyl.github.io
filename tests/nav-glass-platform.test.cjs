const { test } = require('node:test');
const assert = require('node:assert/strict');
const { usesNativeBlur } = require('../nav-glass-platform.js');
for (const [name, device, expected] of [
  ['iPhone Safari', {userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit Safari',maxTouchPoints:5},true],
  ['iPad desktop mode', {userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) Safari',platform:'MacIntel',maxTouchPoints:5},true],
  ['Android tablet without Mobile token', {userAgent:'Mozilla/5.0 (Linux; Android 16; Tablet) Chrome/140 Safari',maxTouchPoints:5},true],
  ['Android phone', {userAgent:'Mozilla/5.0 (Linux; Android 16) Chrome/140 Mobile Safari'},true],
  ['mobile client hint', {userAgent:'Browser',userAgentData:{mobile:true}},true],
  ['Windows touchscreen', {userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/140',maxTouchPoints:10},false],
  ['Mac Safari', {userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) Safari',platform:'MacIntel',maxTouchPoints:0},false],
  ['Mac Chrome', {userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) Chrome/140 Safari',maxTouchPoints:0},false]
]) test(name,()=>assert.equal(usesNativeBlur(device),expected));

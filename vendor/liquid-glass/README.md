# Local integration adaptations

Pinned upstream revision: `9f1ca87d360d9a1c79a1f0e318ab804156c8f9c1` (package.json 5.3.1).

- Vanilla entry exports createLiquidGlassBackdrop and createWebGLSurface without React.
- SceneCaptureOptions.sections optionally selects tiles without rearranging page DOM. For document.body, default selection flattens main children, excludes headers, nav, iframes, audio, resource tags, dialogs, and hidden or ignored nodes.
- SceneCaptureOptions.captureMedia=false excludes canvas and video from snapshots; keep live WebGL particle captures disabled until capture timing can be guaranteed.
- SceneCaptureOptions.backgroundColor optionally defines opaque page paint. Defaults to computed body background, as upstream. Opaque paint prevents original and refracted glyphs showing together.
- A body capture never captures the full-document shell. Auxiliary snapshots and fixed origin markers have data-liquid-glass-ignore.
- Capture excludes iframe contents, avoiding unsupported captures and redundant embeds.
- With blur=0, optical shader samples the full-resolution u_bgTex directly. Upstream sampled u_blurTex even with zero blur, which unnecessarily downsampled page pixels through half-resolution blur FBOs.

Build: vanilla-entry.ts with esbuild 0.25.12, format esm, target safari16, bundled html-to-image 1.11.11, minified. LICENSES.txt and generated LEGAL.txt contain upstream notices.

- SceneCaptureOptions.paintBackground(ctx, area) optionally paints a live underlay after the opaque background and before HTML snapshots; the context is saved and restored around the callback. This supports a small synchronous particle-frame copy without enabling preserveDrawingBuffer.

## Portfolio adapter

`nav-glass-webgl.js` supplies the same convex capsule map as the SVG renderer, with zero blur and a 24 MiB section cache. It selects visual body backgrounds and direct main children, including introductory headers and hero wrappers. The scene `paintBackground` hook receives a small synchronous particle crop supplied after the existing WebGL particle draw. No `preserveDrawingBuffer` or full-screen framebuffer copy is enabled. Route hiding, document hiding and page exit release the capture canvases and GPU surface.

This directory contains only the deployed ESM bundle and required license notices; no package installation or build cache is shipped.

- High-DPI captures default to min(devicePixelRatio, 2). Section rasters retain the 2 Mi-pixel cap; moving canvases use DPR-sized buffers with CSS-coordinate drawing transforms. Work-canvas compositing specifies the CSS destination size to avoid double scaling. DPR changes invalidate cached tiles.

Phones and tablets use native CSS Gaussian blur and do not load this adapter. The desktop portfolio adapter now keeps the same WebGL optical path during scrolling and at rest. Each frame crops the current scene coordinates onto an opaque base, preventing undisplaced live content from leaking through transparent pixels. A separate foreground material layer keeps tint and edge lighting above the optical output. Device-specific asynchronous scrolling latency still requires real-device testing.

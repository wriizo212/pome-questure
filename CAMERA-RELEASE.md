# Camera cursor release — 1 November 2026

Application build: `8d5445cfdf7c`.

## Changes

MediaPipe Hand Landmarker runs with two-hand detection in a classic Web Worker. The pinned 0.10.14 runtime and licence are included in the hosted assets; model/WASM downloads remain official remote dependencies. Face Landmarker loads only when required. One transferable ImageBitmap may be in flight; no frame queue builds up. Stopping the camera terminates the worker and cancels pending requests. Old/hidden results cannot trigger actions.

Cursor animation has a separate 60 FPS target and one position-writing path, with reduced input smoothing delay. The overlay retains its last complete skeleton while new inference is running. Repeated tracking-loss frames no longer rewrite every control panel. Display/cursor FPS and AI Hz are shown separately.

Either hand can point/pinch; nearest-wrist continuity keeps the primary hand stable when results reorder. Two open palms or two pinches control zoom and horizontal orbit in all eight 3D learning scenes. Index + middle finger controls orbit. Existing Stage 3 two-hand zoom, pinch matching, 1–4 finger quiz answers (in finger mode), five-finger next, swipe, mouth and head gestures are preserved. All 32 synthetic finger combinations and the existing bent-ring/rotated-hand cases passed. Synthetic gestures do not establish real-user accuracy.

## Camera-on measurements

Three 60-second captures on the exact build above, with 640×480 generated video showing the official MediaPipe `right_hands.jpg` reference. The middle capture crops the reference to one hand and verifies the cursor is visible; other captures detect two hands. Actual MediaPipe inference runs, not mocked detection. This is not a physical camera test.

GPU: ANGLE (AMD, AMD Radeon(TM) 610M (0x0000164E) Direct3D11 vs_5_0 ps_5_0, D3D11).

| Capture | Detected hands | Plant p95 ms | Plant p99 ms | Cursor FPS | AI Hz |
| --- | --- | --- | --- | --- | --- |
| 1 | 2 | 17.1 | 20.1 | 60 | 20 |
| 2 | 1 | 17.2 | 20.8 | 59 | 19 |
| 3 | 2 | 17.2 | 17.8 | 59 | 20 |

All captures meet the measured gate of p95 ≤17.5 ms and fewer than 1% draw intervals over 33.3 ms. Plant intervals are callbacks submitting actual WebGL draws; cursor FPS is its animation loop, not a claim of 60 new AI inferences per second. No page errors. MediaPipe emitted 3 diagnostic warnings concerning OpenGL error checking/feedback tensors; these are retained in the raw local report.

## Checks and limits

Passed optional camera startup/denial, synthetic selection and pinch sliders, tracking-loss cancellation, camera worker stop/restart, lazy face loading, no-Worker compatibility fallback, two-hand routing across the 3D scenes, randomized Stage 3 touch/gesture matching, and the full legacy 140-point quiz/monsoon/QR/PDF journey during this work. A compatibility-start attempt timed out once; an isolated retry succeeded. Network-dependent model loading is not guaranteed offline.

Physical Android/iOS/Windows cameras, varied lighting/skin tones/occlusion and real low-end-device GPU performance remain untested. No universal 60 FPS guarantee is made. The compatibility path runs inference less frequently on the main thread and cannot carry the same Worker performance claim. Earlier camera-off ten-minute soak results belong to the preceding release; this camera build has its own measurements above.

Sources: [MediaPipe web hand-landmarker guide](https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker/web_js), [official test image](https://storage.googleapis.com/mediapipe-assets/right_hands.jpg). The reference image is used only by local validation and is not included in the game publication.

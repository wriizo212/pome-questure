# Release validation — POME QUESTURE

Build: `8736dd8b7da3`. Validation date: 31 October 2026.

## Functional checks

Passed the English and Bahasa Melayu five-mission journeys, sequential unlocking, 400-point scoring, reload persistence and unscored monsoon extension. Passed physical plant controls, process animation, native equipment clips, instanced fish/reed motion and isolated health materials. Passed Low assets, GitHub-style subpath loading, model retry, storage failure recovery, touch-event dragging, EN/BM report generation and escaped student text. Passed Eco Lab station routes, keyboard return focus and accessible station labels.

Passed synthetic hand selection/valve drag, tracking loss, pause/rearm and no automatic camera startup. Camera permission denial preserves manual controls. A fake-camera test loaded the actual MediaPipe models and verified preview switching and camera shutdown; it does not validate a physical camera.

The retained 20-question game passed 140-point completion, randomised Stage 3 layout and touch/gesture matching, 45-second monsoon success/failure, QR checksum/corruption handling and PDF download. QR checksums are not authenticated assessment certificates.

## Performance and duration

Headless Microsoft Edge, 1440×1000 viewport, desktop GPU reported by ANGLE. Measures intervals between callbacks that submit WebGL draws, not screen presentation timestamps. No physical camera inference active.

| 60-second capture | p95 ms | p99 ms | Over 33.3 ms |
| --- | --- | --- | --- |
| 1 | 16.8 | 16.9 | 0.028% |
| 2 | 16.8 | 18.7 | 0.169% |
| 3 | 16.8 | 17.0 | 0.028% |

All three captures meet the declared p95 ≤17.5 ms and <1% intervals over 33.3 ms checks. A further 600 seconds repeatedly switched plant, hub, river and microscope. No runtime errors or warnings. Final eight samples retained 4 contexts and stable tracked resources (1881 buffers, 26 textures). This is a duration/resource test, not proof of zero leaks or a temperature measurement.

## Boundaries

Real Android/iOS camera accuracy, real-device GPU performance and thermal behaviour remain untested. Tablet tests use desktop touch emulation. Some legacy BM content remains untranslated. Low geometry is selected at model load; reload after changing graphics quality to load a different geometry variant. Adaptive resolution is used in the plant and Eco Lab; other scenes retain their quality/visibility controls. Cached scene renderers have not been converted to a single shared renderer. Low plant rendering uses 125 draw calls, above the original aspirational 100-call budget. No claim is made that every long-term architecture/performance target is complete.

The published runtime package excludes source PDFs, Blender source backups, local machine paths, personal author metadata, credentials and student records. Original artwork and local development sources are preserved separately. Live deployment verification is recorded after publication.

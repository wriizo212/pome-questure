# Research Studio release

## Implemented scope

- Lobby retains one primary mission action, now styled as a larger continuation card, with the existing progress map and a separate Research Studio activity shelf.
- Existing 3D scenes gain focus and fullscreen actions. Closing a fullscreen scene exits fullscreen. Existing contextual equipment panels and operating animations remain connected to pump, valve, air and flow state.
- Optional camera practice guides open palm, pointing, target selection and release, with hand-distance feedback. It has no compulsory timeout and never starts a camera automatically.
- Camera target assistance accepts near misses within 22 screen pixels on visible dialog buttons, without reaching across overlays or overriding a canvas/input. Targets have a visible outline and selection pulse. Reduced-motion settings suppress decorative animation.
- The sample experiment locks primary hand ownership while pinched. The second hand selects aeration or turns the illustrated sample view with two fingers, and can point/dwell on controls. Wrist continuity tolerates reordered detections. Loss, release and hiding cancel the grip. Touch/mouse/keyboard controls remain available.
- Scan orb records illustrative temperature, pH, BOD and DO at four locations, with a required evidence explanation. These example readings are not measurements or drinking-water claims.
- Equal eight-second OFF/ON aeration trials require a prediction and held sample. Each trial resets to the same initial conditions and locks aeration. Oxygen and organic-material indices update from the running simulation. Completed trials and an explanation unlock comparison tools.
- River rescue has three faults, visual cues, diagnosis, gated repair and an explanation. A diagnosis alone cannot earn its badge. The activity explains that real ecosystem recovery is gradual.
- Layered notes use What happens / Why / Remember, a recall prompt and an unlocked tank section illustration. Badges unlock section-view, comparison and inspector content. Evidence and badges save locally without student identity.

## Presentation and limits

The new Research Studio uses lightweight styled illustrations, not newly generated Blender geometry. Existing Blender learning scenes remain available. The new activity UI is bilingual; existing legacy translation limitations remain. The optional practice is paced by the learner and typically takes about 20 seconds, with no timing guarantee.

Real physical-camera accuracy and mobile GPU/thermal performance require device testing. Automated gesture fixtures and generated camera streams cannot prove those properties. No universal 60 FPS promise is made.

## Validation record

Functional checks passed the full Research Studio journey, two timed comparison trials, wrong-answer rejection, all three faults, unlocked notes, Bahasa Melayu, synthetic camera practice, dual-hand ownership under reordering/loss, mobile layout, persisted evidence/rewards, focus/fullscreen close, no auto camera and no page errors. Existing five-mission 400-point journey and legacy 140-point quiz/monsoon/QR/PDF journey also passed. Camera-control regressions covered all 32 synthetic finger combinations, two-hand routing through eight 3D scenes, pinch sliders and tracking loss.

Final application build: `2e41e672a8a3`. The final inference scheduling adjustment uses measured worker-processing time to space jobs, with a 50–100 ms minimum sampling interval. Cursor rendering remains independently scheduled. This reduces inference frequency under load rather than queueing stale frames.

An earlier Studio benchmark on build `12d263ce75fd` measured p95 draw intervals of 16.8, 17.2 and 22.3 ms in three 60-second generated-camera captures. The third missed the 17.5 ms target; this result is retained rather than omitted. It prompted the adaptive inference adjustment. These measurements are not physical camera tests.

## Exact-build camera measurements

Three 60-second generated-camera captures on build `2e41e672a8a3`, using actual MediaPipe inference on the official reference image, produced these results.

| Capture | Plant draw interval p95 | Cursor animation FPS | AI detections/s | Draw intervals >33.3 ms |
| --- | --- | --- | --- | --- |
| 1 | 16.8 ms | 60 | 14 | 0.028% |
| 2 | 16.8 ms | 60 | 13 | 0.000% |
| 3 | 18.5 ms | 60 | 14 | 0.227% |

No runtime page errors. The third capture still exceeds the strict 17.5 ms plant p95 target, although the cursor loop reports 60 FPS and fewer than 0.23% of plant intervals exceed 33.3 ms. Thus this release does not claim a locked 60 FPS plant or universal device performance. The measurements use desktop Edge on AMD Radeon 610M with generated reference video, not a physical camera. MediaPipe diagnostic warnings are retained in the local raw report.

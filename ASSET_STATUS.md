# Asset Status

Audit date: 2026-07-20.

Runtime paths are centralized in `src/config/assets.ts`. Raw files under `design/new/` are local source material; assets approved for the public demo are promoted to `public/assets/` with stable names.

Status meanings:

- `integrated`: present at the runtime path and used by a component.
- `supplied; reserved`: present and mapped in `assets.ts`, but intentionally not used for live state swapping.
- `local-only integrated`: wired and visible locally, but excluded from Git and public deployment.
- `missing`: no independent production asset exists; the HTML/CSS fallback remains active.
- `reference only`: a board exists for visual guidance but must not be cropped into a runtime asset.

## Backgrounds

| Asset | Status | Runtime behavior |
|---|---|---|
| `home_bg_desktop.png` | integrated | Home scene background |
| `result_bg_desktop.png` | integrated | Revealing and result scene background |
| `home_bg_mobile.webp` | missing | Desktop home image is reused with responsive CSS crop |
| `result_bg_mobile.webp` | missing | Desktop result image is reused with responsive CSS crop |

## Titles And Labels

| Asset | Status | Runtime behavior |
|---|---|---|
| Final hero title | missing; reference only | Accessible HTML title and licensed font treatment remain active |
| English observation label | missing; reference only | IBM Plex Mono HTML text remains active |
| Five result-level titles | missing; reference only | HTML result-level labels remain active |

`design/new/标题与英文标签参考板.png` and `design/new/五种结果标题参考板.png` are boards, not independent transparent assets.

## Input And Buttons

| Asset group | Status | Runtime behavior |
|---|---|---|
| `input_frame_default.webp` | integrated | Transparent, tightly cropped default textarea frame |
| `input_frame_focus.webp` | supplied; reserved | Optimized but not switched live because its palette jump competes with text-entry focus |
| `input_frame_filled.webp` | integrated | Transparent, tightly cropped non-empty textarea frame |
| `btn_primary_default.webp` | integrated | Transparent default roll button |
| `btn_primary_hover.webp` | supplied; reserved | Optimized; default plate remains stable and mouse hover uses a subtle CSS response |
| `btn_primary_pressed.webp` | supplied; reserved | Optimized; press uses a 1px CSS displacement |
| `btn_primary_loading.webp` | integrated | Transparent rolling-state plate |
| `btn_secondary_default.webp` | integrated | Transparent result and modal action plate |
| `btn_secondary_hover.webp` | supplied; reserved | Optimized; mouse hover uses a subtle CSS response |
| `btn_secondary_pressed.webp` | supplied; reserved | Optimized; press uses a 1px CSS displacement |

The original RGB PNG canvases were replaced by transparent, tightly cropped WebP files. Strongly recolored focus, hover, and pressed plates remain mapped in `assets.ts`, but are not preloaded or swapped during ordinary interaction because that created abrupt color flashes and sticky touch hover feedback.

## Dice

| Asset group | Status | Runtime behavior |
|---|---|---|
| `dice_ivory_1.webp` ... `dice_ivory_6.webp` | integrated | Transparent 384px exports, mapped by the actual top face |
| `dice_red_1.webp` ... `dice_red_6.webp` | integrated | Transparent 384px exports, mapped by the actual top face |

All twelve result images use the same `DiceRoller` interface and retain the CSS pip fallback.

## Icons

| Asset | Status | Usage |
|---|---|---|
| `icon_dice_pair.webp` | integrated | Home button in the header |
| `icon_history.webp` | integrated | History navigation |
| `icon_retry.webp` | integrated | Roll again |
| `icon_shuffle.webp` | integrated | Replace skill voices |
| `icon_share.webp` | integrated | Generate share image |
| `icon_back.webp` | integrated | Edit question |
| `icon_expand.webp` | integrated | Generate share preview |
| `icon_info.webp` | integrated | About navigation |
| `icon_close.webp` | integrated | Modal and drawer close controls |

The icons are transparent, tightly cropped 192px WebP files. `AssetIcon` no longer relies on clipping or screen blending. The original hand-written SVG placeholders remain as independent fallbacks.

## Skill Portraits

All 24 portraits are converted to and mapped as `public/assets/skills/original/<skill-id>.webp`. All 24 skill IDs are reachable from at least one category pool, and local result-flow verification confirms the image path is active.

Status: `local-only integrated`.

The directory remains ignored by Git in accordance with `docs/04-assets-and-rights.md`. Public builds omit these files and use the existing CSS attribute-color fallback unless redistribution rights are confirmed. The WebP conversion does not change this distribution boundary.

## Optimization

Run `npm run assets:optimize` to regenerate all supplied UI, dice, icon, and local portrait WebP assets from `design/new/`.

- UI, dice, and icon runtime assets: approximately 37 MB of PNG source copies to 1.2 MB of transparent WebP files.
- All 55 processed files including local portraits: 42.02 MB to 2.08 MB, approximately 95% smaller.
- Background removal is edge-connected, so enclosed dark details such as dice pips are retained.
- Superseded public PNG copies have been removed; raw sources remain local under `design/new/`.

## Still Missing

- Dedicated mobile home and result backgrounds.
- Independent hero-title and observation-label assets.
- Independent result-level title assets.
- `texture_overlay_grain.webp` and `texture_overlay_paper.webp`.
- `divider_long.webp` and `divider_short.webp`.
- `paper_tag_01.webp`, `paper_tag_02.webp`, `note_corner_01.webp`, and `note_corner_02.webp`.
- `share_card_bg_a.webp`, `share_card_bg_b.webp`, and `share_card_bg_c.webp`.

All missing groups retain CSS/HTML fallbacks and do not block the interaction flow.

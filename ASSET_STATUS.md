# Asset Status

Audit date: 2026-07-20.

Runtime paths are centralized in `src/config/assets.ts`. Raw files under `design/new/` are local source material; assets approved for the public demo are promoted to `public/assets/` with stable names.

Status meanings:

- `integrated`: present at the runtime path and used by a component.
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
| `input_frame_default.png` | integrated | Default textarea frame |
| `input_frame_focus.png` | integrated | `:focus-within` frame |
| `input_frame_filled.png` | integrated | Non-empty textarea frame |
| `btn_primary_default.png` | integrated | Default roll button |
| `btn_primary_hover.png` | integrated | Primary hover state |
| `btn_primary_pressed.png` | integrated | Primary active state |
| `btn_primary_loading.png` | integrated | Rolling state |
| `btn_secondary_default.png` | integrated | Result and modal actions |
| `btn_secondary_hover.png` | integrated | Secondary hover state |
| `btn_secondary_pressed.png` | integrated | Secondary active state |

The supplied PNGs include a large black canvas. CSS background positioning crops to the plate while preserving HTML text and button semantics. Transparent, tightly cropped WebP/PNG exports are still recommended for production performance.

## Dice

| Asset group | Status | Runtime behavior |
|---|---|---|
| `dice_ivory_1.png` ... `dice_ivory_6.png` | integrated | Mapped by the actual top face, not source filename order |
| `dice_red_1.png` ... `dice_red_6.png` | integrated | Mapped by the actual top face, not source filename order |

All twelve result images use the same `DiceRoller` interface and retain the CSS pip fallback.

## Icons

| Asset | Status | Usage |
|---|---|---|
| `icon_dice_pair.png` | integrated | Home button in the header |
| `icon_history.png` | integrated | History navigation |
| `icon_retry.png` | integrated | Roll again |
| `icon_shuffle.png` | integrated | Replace skill voices |
| `icon_share.png` | integrated | Generate share image |
| `icon_back.png` | integrated | Edit question |
| `icon_expand.png` | integrated | Generate share preview |
| `icon_info.png` | integrated | About navigation |
| `icon_close.png` | integrated | Modal and drawer close controls |

The supplied icons also contain a black canvas. `AssetIcon` clips the source and uses screen blending on dark surfaces. The original hand-written SVG placeholders remain in the repository but are no longer the primary runtime paths.

## Skill Portraits

All 24 portraits are mapped to `public/assets/skills/original/<skill-id>.png`, and all 24 skill IDs are reachable from at least one category pool.

Status: `local-only integrated`.

The directory remains ignored by Git in accordance with `docs/04-assets-and-rights.md`. Public builds must omit these files and use the existing CSS attribute-color fallback unless redistribution rights are confirmed.

## Still Missing

- Dedicated mobile home and result backgrounds.
- Independent hero-title and observation-label assets.
- Independent result-level title assets.
- `texture_overlay_grain.webp` and `texture_overlay_paper.webp`.
- `divider_long.webp` and `divider_short.webp`.
- `paper_tag_01.webp`, `paper_tag_02.webp`, `note_corner_01.webp`, and `note_corner_02.webp`.
- `share_card_bg_a.webp`, `share_card_bg_b.webp`, and `share_card_bg_c.webp`.
- Transparent, tightly cropped, web-optimized exports for the supplied PNG UI, dice, and icon assets.

All missing groups retain CSS/HTML fallbacks and do not block the interaction flow.

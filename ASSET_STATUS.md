# Asset Status

v1.0 currently uses CSS/HTML placeholders for all missing visual assets. Runtime paths are centralized in `src/config/assets.ts`; replacing a file at the documented path does not require business-logic changes.

Status meanings:

- `missing`: no formal visual file is present.
- `placeholder implemented`: a CSS/HTML or simple SVG fallback is active.
- `ready for replacement`: the final file path and component interface are wired.

## Backgrounds

| Asset | File | Fallback | Integration |
|---|---|---|---|
| `home_bg_desktop.webp` | missing | placeholder implemented (design reference region) | ready for replacement |
| `home_bg_mobile.webp` | missing | placeholder implemented (design reference region) | ready for replacement |
| `result_bg_desktop.webp` | missing | placeholder implemented (design reference region) | ready for replacement |
| `result_bg_mobile.webp` | missing | placeholder implemented (design reference region) | ready for replacement |

## Input And Buttons

| Asset group | File | Fallback | Integration |
|---|---|---|---|
| `input_frame_default.webp` | missing | placeholder implemented | ready for replacement |
| `input_frame_focus.webp` | missing | placeholder implemented | ready for replacement |
| `input_frame_filled.webp` | missing | placeholder implemented | ready for replacement |
| `btn_primary_default.webp` | missing | placeholder implemented | ready for replacement |
| `btn_primary_hover.webp` | missing | placeholder implemented | ready for replacement |
| `btn_primary_pressed.webp` | missing | placeholder implemented | ready for replacement |
| `btn_primary_loading.webp` | missing | placeholder implemented | ready for replacement |
| `btn_secondary_default.webp` | missing | placeholder implemented | ready for replacement |
| `btn_secondary_hover.webp` | missing | placeholder implemented | ready for replacement |
| `btn_secondary_pressed.webp` | missing | placeholder implemented | ready for replacement |

## Dice

| Asset group | File | Fallback | Integration |
|---|---|---|---|
| `dice_ivory_1.webp` ... `dice_ivory_6.webp` | missing | placeholder implemented | ready for replacement |
| `dice_red_1.webp` ... `dice_red_6.webp` | missing | placeholder implemented | ready for replacement |

## Icons

The following files are simple hand-written SVG placeholders, not final art:

| Assets | File | Fallback | Integration |
|---|---|---|---|
| `icon_dice_pair.svg` | placeholder implemented | placeholder implemented | ready for replacement |
| `icon_history.svg` | placeholder implemented | placeholder implemented | ready for replacement |
| `icon_retry.svg` | placeholder implemented | placeholder implemented | ready for replacement |
| `icon_shuffle.svg` | placeholder implemented | placeholder implemented | ready for replacement |
| `icon_share.svg` | placeholder implemented | placeholder implemented | ready for replacement |
| `icon_back.svg` | placeholder implemented | placeholder implemented | ready for replacement |
| `icon_expand.svg` | placeholder implemented | placeholder implemented | ready for replacement |
| `icon_info.svg` | placeholder implemented | placeholder implemented | ready for replacement |
| `icon_close.svg` | placeholder implemented | placeholder implemented | ready for replacement |

## Textures And Decorations

| Asset group | File | Fallback | Integration |
|---|---|---|---|
| `texture_overlay_grain.webp` | missing | placeholder implemented | ready for replacement |
| `texture_overlay_paper.webp` | missing | placeholder implemented | ready for replacement |
| `divider_long.webp` | missing | placeholder implemented | ready for replacement |
| `divider_short.webp` | missing | placeholder implemented | ready for replacement |
| `paper_tag_01.webp`, `paper_tag_02.webp` | missing | placeholder implemented | ready for replacement |
| `note_corner_01.webp`, `note_corner_02.webp` | missing | placeholder implemented | ready for replacement |

## Share Cards

| Asset | File | Fallback | Integration |
|---|---|---|---|
| `share_card_bg_a.webp` | missing | placeholder implemented | ready for replacement |
| `share_card_bg_b.webp` | missing | placeholder implemented | ready for replacement |
| `share_card_bg_c.webp` | missing | placeholder implemented | ready for replacement |

## Skill Portraits

`public/assets/skills/original/` is intentionally ignored by Git. The first eight portrait paths are wired but contain no files:

| Asset | File | Fallback | Integration |
|---|---|---|---|
| `logic.webp` | missing | placeholder implemented | ready for replacement |
| `volition.webp` | missing | placeholder implemented | ready for replacement |
| `inland-empire.webp` | missing | placeholder implemented | ready for replacement |
| `electrochemistry.webp` | missing | placeholder implemented | ready for replacement |
| `shivers.webp` | missing | placeholder implemented | ready for replacement |
| `drama.webp` | missing | placeholder implemented | ready for replacement |
| `composure.webp` | missing | placeholder implemented | ready for replacement |
| `conceptualization.webp` | missing | placeholder implemented | ready for replacement |

All remaining skill slugs listed in `src/data/skills.json` use the same `SkillPortrait` interface and CSS attribute fallback.

## Reference Files

The PNG files in `design/` remain the source references. Two clearly separated background regions are currently exposed through copies in `public/assets/reference/` and clipped by CSS at runtime; prototype pages containing fixed UI text are still not used as webpage backgrounds.

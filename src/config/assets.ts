const baseUrl = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;
const path = (value: string) => `${baseUrl}assets/${value}`;

export const assets = {
  backgrounds: {
    homeDesktop: path("backgrounds/home_bg_desktop.png"),
    homeMobile: path("backgrounds/home_bg_desktop.png"),
    resultDesktop: path("backgrounds/result_bg_desktop.png"),
    resultMobile: path("backgrounds/result_bg_desktop.png"),
  },
  input: {
    default: path("ui/input_frame_default.webp"),
    focus: path("ui/input_frame_focus.webp"),
    filled: path("ui/input_frame_filled.webp"),
  },
  buttons: {
    primaryDefault: path("ui/btn_primary_default.webp"),
    primaryHover: path("ui/btn_primary_hover.webp"),
    primaryPressed: path("ui/btn_primary_pressed.webp"),
    primaryLoading: path("ui/btn_primary_loading.webp"),
    secondaryDefault: path("ui/btn_secondary_default.webp"),
    secondaryHover: path("ui/btn_secondary_hover.webp"),
    secondaryPressed: path("ui/btn_secondary_pressed.webp"),
  },
  dice: {
    ivory: (value: number) => path(`dice/dice_ivory_${value}.webp`),
    red: (value: number) => path(`dice/dice_red_${value}.webp`),
  },
  icons: {
    dicePair: path("icons/icon_dice_pair.webp"),
    history: path("icons/icon_history.webp"),
    retry: path("icons/icon_retry.webp"),
    shuffle: path("icons/icon_shuffle.webp"),
    share: path("icons/icon_share.webp"),
    back: path("icons/icon_back.webp"),
    expand: path("icons/icon_expand.webp"),
    info: path("icons/icon_info.webp"),
    close: path("icons/icon_close.webp"),
  },
  textures: {
    grain: path("textures/texture_overlay_grain.webp"),
    paper: path("textures/texture_overlay_paper.webp"),
    dividerLong: path("textures/divider_long.webp"),
    dividerShort: path("textures/divider_short.webp"),
    paperTag01: path("textures/paper_tag_01.webp"),
    paperTag02: path("textures/paper_tag_02.webp"),
    noteCorner01: path("textures/note_corner_01.webp"),
    noteCorner02: path("textures/note_corner_02.webp"),
  },
  share: {
    backgroundA: path("share/share_card_bg_a.webp"),
    backgroundB: path("share/share_card_bg_b.webp"),
    backgroundC: path("share/share_card_bg_c.webp"),
  },
  references: {
    homeBackgroundSheet: path("reference/home_background_sheet.png"),
    resultBackgroundSheet: path("reference/result_background_sheet.png"),
  },
  skillPortrait: (slug: string) => path(`skills/original/${slug}.webp`),
} as const;

export const assetVariableSources = {
  "--asset-input-default": assets.input.default,
  "--asset-input-filled": assets.input.filled,
  "--asset-primary-default": assets.buttons.primaryDefault,
  "--asset-primary-loading": assets.buttons.primaryLoading,
  "--asset-secondary-default": assets.buttons.secondaryDefault,
  "--asset-grain": assets.textures.grain,
  "--asset-paper": assets.textures.paper,
  "--asset-share-a": assets.share.backgroundA,
} as const;

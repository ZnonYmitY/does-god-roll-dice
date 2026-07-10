const path = (value: string) => `/assets/${value}`;

export const assets = {
  backgrounds: {
    homeDesktop: path("backgrounds/home_bg_desktop.webp"),
    homeMobile: path("backgrounds/home_bg_mobile.webp"),
    resultDesktop: path("backgrounds/result_bg_desktop.webp"),
    resultMobile: path("backgrounds/result_bg_mobile.webp"),
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
    dicePair: path("icons/icon_dice_pair.svg"),
    history: path("icons/icon_history.svg"),
    retry: path("icons/icon_retry.svg"),
    shuffle: path("icons/icon_shuffle.svg"),
    share: path("icons/icon_share.svg"),
    back: path("icons/icon_back.svg"),
    expand: path("icons/icon_expand.svg"),
    info: path("icons/icon_info.svg"),
    close: path("icons/icon_close.svg"),
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
  skillPortrait: (slug: string) => path(`skills/original/${slug}.webp`),
} as const;

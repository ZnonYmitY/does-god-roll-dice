# 开发交接与资产准备清单 v1.0

## 1. 目标

本文件用于保证 Codex 仅查看 GitHub 仓库时，就能理解页面结构、交互状态和资产职责，不需要自行重新设计或生图。

## 2. 当前可以立即开始的开发内容

Codex 可以先完成：

- React + TypeScript 项目骨架；
- 首页、加载态、结果态的状态机；
- 2D6 随机逻辑；
- 输入分类、对象提取、技能选择、文案组合；
- `localStorage` 历史记录和去重；
- 动态低语轮播；
- 分享图 DOM / Canvas 数据结构；
- 响应式布局骨架；
- `prefers-reduced-motion` 动画降级。

## 3. 当前不能宣称完成的内容

如果独立资产尚未放入仓库，Codex 不得：

- 自行生成新背景图；
- 自行重绘按钮、输入框、骰子和纹理；
- 将整张原型图作为网页背景后叠点击热区；
- 用与设计稿明显不同的通用 UI 替代最终视觉；
- 把设计图上的文字直接当作网页文字截图使用。

## 4. 已确认的信息架构

### 顶部

- 左上角：两枚骰子的图标；
- 导航：`关于检定`、`检定记录`；
- v1.0 不提供：登录 / 注册、社区、思维图谱、声音开关。

### 首页

- 主标题：`上帝掷骰子吗？`
- 副文案：`某些问题本不值得回答。遗憾的是，它们已经醒了。`
- 输入提示：`向混沌提出一个问题……`
- 主按钮：`掷骰检定`
- 说明：`两枚骰子对此表示愿意负责，但它们不会解释结果。`
- 首页底部展示少量动态技能低语。

### 加载态

- 文案：`你的脑内正在请求一次检定……`
- 两枚 D6 开始滚动；
- 输入框失焦；
- 背景亮度轻微下降；
- 技能名短暂闪现。

### 结果态

必须包含：

- 两枚骰子的点数；
- 总和，例如 `4 + 3 = 7`；
- 结果等级；
- 2–4 条技能发言；
- 最终判定；
- `再检定一次`、`换一批技能发言`、`生成分享图`。

## 5. 页面分层

网页必须由以下层共同构成：

1. 背景层：雨夜城市与桌面环境；
2. 纹理层：颗粒、旧纸、刮痕；
3. HTML 内容层：标题、输入框、按钮、结果文本；
4. 技能肖像层；
5. 骰子层；
6. 动态低语层；
7. 分享图 / 弹窗层。

不能把整页作为单张图片铺底。

## 6. HTML 与图片的职责

### 必须由 HTML 渲染

- 标题、副标题、导航；
- 输入内容；
- 按钮文字；
- 动态低语；
- 骰点数字；
- 结果等级；
- 技能发言；
- 最终判定；
- 分享图里的可变文本。

### 由图片资产承担

- 环境背景；
- 做旧边框；
- 纹理、纸张角和装饰线；
- 按钮底板；
- 骰子造型；
- 图标；
- 技能肖像；
- 分享卡底板。

## 7. 资产路径规范

```text
public/assets/
  backgrounds/
    home_bg_desktop.webp
    home_bg_mobile.webp
    result_bg_desktop.webp
    result_bg_mobile.webp
  ui/
    input_frame_default.webp
    input_frame_focus.webp
    input_frame_filled.webp
    btn_primary_default.webp
    btn_primary_hover.webp
    btn_primary_pressed.webp
    btn_primary_loading.webp
    btn_secondary_default.webp
    btn_secondary_hover.webp
    btn_secondary_pressed.webp
  dice/
    dice_ivory_1.webp ... dice_ivory_6.webp
    dice_red_1.webp ... dice_red_6.webp
  icons/
    icon_dice_pair.svg
    icon_history.svg
    icon_retry.svg
    icon_shuffle.svg
    icon_share.svg
    icon_back.svg
    icon_expand.svg
    icon_info.svg
    icon_close.svg
  textures/
    texture_overlay_grain.webp
    texture_overlay_paper.webp
    divider_long.webp
    divider_short.webp
    paper_tag_01.webp
    paper_tag_02.webp
    note_corner_01.webp
    note_corner_02.webp
  share/
    share_card_bg_a.webp
    share_card_bg_b.webp
    share_card_bg_c.webp
  skills/original/
    logic.webp
    inland-empire.webp
    electrochemistry.webp
    volition.webp
    shivers.webp
    drama.webp
    composure.webp
    conceptualization.webp
```

`skills/original/` 中的 24 张 WebP 肖像随公开 Demo 发布；组件必须继续保留图片加载失败时的 CSS 属性色回退。

## 8. 当前母版设计图

建议归档到：

```text
design/reference/
  home-page.png
  result-page.png
  design-system.png
  interaction-spec.png
```

母版图只用于视觉对照，不直接作为页面切图。

## 9. 是否可以开工

可以。建议分两阶段：

### 阶段 A：现在开始

先完成逻辑、状态机、布局和占位资源接入。

### 阶段 B：独立资产入仓后

替换背景、边框、按钮、骰子、图标、纹理和分享图底板，完成视觉验收。

## 10. 完成定义

只有满足以下条件，才算“无需 Codex 自己生图即可复原”：

- 四张母版图已归档；
- 独立背景图已入仓；
- 输入框、按钮、图标、骰子和纹理为独立文件；
- 文件名与本规范一致；
- 页面所有可变文字均由 HTML 渲染；
- Codex 不需要自己补画任何视觉资产。

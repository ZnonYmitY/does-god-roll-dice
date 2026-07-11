# 上帝掷骰子吗？

> 某些问题本不值得回答。遗憾的是，它们已经醒了。
>
> 两枚骰子对此表示愿意负责。  
> 但它们不会解释结果。

一个致敬《极乐迪斯科》技能检定体验的轻量互动网页。用户可以输入问题、念头或任何精神噪声，掷出两枚六面骰，让脑内技能依次发言，并获得一个不一定可靠、但足够有戏剧性的结果。

## v1.0 产品边界

- 纯前端实现，不接大模型。
- 使用两枚六面骰（2D6）。
- 不引入难度值、技能值和修正值。
- 通过关键词分类、对象提取、模板随机组合和历史去重生成结果。
- 支持非问句、情绪碎片和荒诞输入。
- 结果包含骰点、2–4 条技能发言、最终判定和分享图。
- 首版允许使用《极乐迪斯科》原作技能肖像作为个人 Demo 本地占位素材。
- v1.0 不要求用户登录；检定记录、收藏和设置优先保存在浏览器本地。

## 核心文案

- 产品名 / 首页主标题：**上帝掷骰子吗？**
- 首页副文案：**某些问题本不值得回答。遗憾的是，它们已经醒了。**
- 输入提示：**向混沌提出一个问题……**
- 主按钮：**掷骰检定**
- 加载态：**你的脑内正在请求一次检定……**
- 骰子说明：**两枚骰子对此表示愿意负责，但它们不会解释结果。**

## 文档

1. [产品需求文档 PRD v1.0](docs/01-product-requirements.md)
2. [文字库与模板设计 v1.0](docs/02-content-library.md)
3. [视觉与交互设计方案 v1.0](docs/03-visual-design.md)
4. [素材、肖像与版权说明](docs/04-assets-and-rights.md)
5. [开发交接与资产准备清单](docs/05-development-handoff.md)
6. [Codex 开发启动任务](docs/06-codex-start-task.md)

## 建议技术栈

- React + TypeScript
- Vite
- CSS / Motion 实现动画
- localStorage 保存最近结果并去重
- html-to-image 生成分享图

## 字体与排版实现

页面使用“宋体骨架 + 旧印刷纹理 + 轻微错位”的字体系统，字体职责集中为以下 CSS 变量：

```css
--font-display-cn: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
--font-body-cn: "Noto Serif SC", "Songti SC", serif;
--font-skill-en: "Cormorant Garamond", Georgia, serif;
--font-system: "IBM Plex Mono", monospace;
```

- 中文主标题使用 Noto Serif SC 900；中文正文使用 400–500；按钮使用 600。
- 英文技能名使用 Cormorant Garamond 600、全大写和轻度字距。
- 骰点、观测编号与系统状态使用 IBM Plex Mono。
- 主标题通过 CSS 复制层实现轻度重影、局部锈红错版和条纹 mask；正文、输入内容及长篇技能发言不使用强破损效果。
- 字体通过 Fontsource 以 WOFF2 随生产构建发布，不依赖运行时 Google Fonts 请求；所有字体均保留系统回退，加载失败不会阻塞页面或破坏布局。

当前使用的 Noto Serif SC、Cormorant Garamond 与 IBM Plex Mono 均采用 SIL Open Font License 1.1。字体包版本与授权元数据记录在 `package-lock.json`，不得替换为来源或授权不明的商业字体。

## 建议目录

```text
src/
  components/
    Header/
    Hero/
    QuestionInput/
    WhisperLayer/
    DiceRoller/
    RollStatus/
    SkillVoice/
    VerdictPanel/
    ResultActions/
    HistoryDrawer/
    ShareCard/
  data/
    skills.json
    categories.json
    keywords.json
    loading-texts.json
    skill-lines.json
    verdicts.json
    share-templates.json
  utils/
    classifyInput.ts
    extractObject.ts
    rollDice.ts
    selectSkills.ts
    selectLines.ts
    avoidRepeat.ts
    generateShareCard.ts
public/
  assets/
    backgrounds/
    ui/
    dice/
    icons/
    textures/
    share/
    skills/original/
```

## 开发状态

v1.0 React Demo 已实现：项目骨架、状态机、2D6 逻辑、文字库接入、动态低语、结果页、历史记录、分享图导出和正式字体接入。

在独立背景、按钮、输入框、骰子、图标和纹理资源进入上述路径前，视觉层使用明确的 CSS/HTML 占位，不自行生图或使用网络图片替代。具体状态见 [ASSET_STATUS.md](ASSET_STATUS.md)。

## 本地运行

```bash
npm install
npm run dev
```

生产构建与静态检查：

```bash
npm run build
npm run lint
```

## 公开预览

[https://znonymity.github.io/does-god-roll-dice/](https://znonymity.github.io/does-god-roll-dice/)

公开站点使用 `feat/v1-web-app` 的本地验证构建产物，通过独立 `gh-pages` 分支发布。

## 后续优化

以下能力不纳入 v1.0，待核心检定体验验证后再评估：

- 登录与注册：邮箱登录或第三方 OAuth。
- 云端同步：跨设备同步检定记录、收藏结果与用户设置。
- 精神档案：基于历史检定统计高频技能、问题分类和结果倾向。
- 社区能力：发布、点赞、收藏、评论与内容审核；只有在分享需求得到验证后再建设。
- 声音系统：环境底噪、骰子碰撞和技能低语；默认可关闭，不影响核心玩法。

## 声明

本项目为非官方个人粉丝致敬 Demo，与 ZA/UM 或《极乐迪斯科》版权方无关联。原作技能名称、肖像和相关视觉资产归其权利人所有。请勿将原作资产用于商业用途；公开发布前应确认素材使用边界或替换为原创资产。

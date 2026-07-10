# 上帝掷骰子吗？

> 你的脑内正在请求一次检定。
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
- 首版允许使用《极乐迪斯科》原作技能肖像作为个人 Demo 占位素材。
- v1.0 不要求用户登录；检定记录、收藏和设置优先保存在浏览器本地。

## 核心文案

- 产品名：**上帝掷骰子吗？**
- 首页主标题：**你的脑内正在请求一次检定。**
- 首页副文案：
  - 某些问题本不值得回答。
  - 遗憾的是，它们已经醒了。
- 主按钮：**掷骰检定**
- 骰子说明：
  - 两枚骰子对此表示愿意负责。
  - 但它们不会解释结果。

## 文档

1. [产品需求文档 PRD v1.0](docs/01-product-requirements.md)
2. [文字库与模板设计 v1.0](docs/02-content-library.md)
3. [视觉与交互设计方案 v1.0](docs/03-visual-design.md)
4. [素材、肖像与版权说明](docs/04-assets-and-rights.md)

## 建议技术栈

- React + TypeScript
- Vite 或 Next.js 静态导出
- CSS / Motion 实现动画
- localStorage 保存最近结果并去重
- html2canvas 或 satori 生成分享图

## 建议目录

```text
src/
  components/
    QuestionInput/
    DiceRoller/
    SkillVoice/
    VerdictPanel/
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
    dice/
    skills/
    textures/
    audio/
```

## 后续优化

以下能力不纳入 v1.0，待核心检定体验验证后再评估：

- 登录与注册：邮箱登录或第三方 OAuth。
- 云端同步：跨设备同步检定记录、收藏结果与用户设置。
- 精神档案：基于历史检定统计高频技能、问题分类和结果倾向。
- 社区能力：发布、点赞、收藏、评论与内容审核；只有在分享需求得到验证后再建设。
- 声音系统：环境底噪、骰子碰撞和技能低语；默认可关闭，不影响核心玩法。

## 声明

本项目为非官方个人粉丝致敬 Demo，与 ZA/UM 或《极乐迪斯科》版权方无关联。原作技能名称、肖像和相关视觉资产归其权利人所有。请勿将原作资产用于商业用途；公开发布前应确认素材使用边界或替换为原创资产。
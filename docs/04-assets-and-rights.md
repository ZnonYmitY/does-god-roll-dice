# 素材、技能肖像与版权说明

## 1. v1.0 决策

首版个人 Demo 使用《极乐迪斯科》原作技能肖像作为界面占位和致敬素材，暂不投入 24 张技能肖像的重新绘制。

该选择的目标是优先验证：

- 技能肖像与网页构图是否成立；
- 一次应显示多少肖像；
- 肖像如何从背景中浮现；
- 分享图应保留一张还是多张肖像；
- 移动端如何裁切。

## 2. 仓库策略

仓库包含首版 Demo 使用的 24 张技能肖像 WebP，统一放入：

```text
public/assets/skills/original/
```

文件命名：

```text
logic.webp
encyclopedia.webp
rhetoric.webp
drama.webp
conceptualization.webp
visual-calculus.webp
volition.webp
inland-empire.webp
empathy.webp
authority.webp
esprit-de-corps.webp
suggestion.webp
endurance.webp
pain-threshold.webp
physical-instrument.webp
electrochemistry.webp
shivers.webp
half-light.webp
hand-eye-coordination.webp
perception.webp
reaction-speed.webp
savoir-faire.webp
interfacing.webp
composure.webp
```

前端通过统一的 `SkillPortrait` 组件读取这些路径；文件加载失败时自动降级为四属性 CSS 占位肖像。

## 3. 使用边界

- 项目仅作为非商业个人粉丝 Demo；
- 不声称与 ZA/UM 或版权方存在官方关系；
- 不出售含原作肖像的商品、会员、付费功能或素材包；
- 不移除原作资产中的署名或标识；
- 不将肖像单独提供下载；
- 若未来接入广告、商业化或改变使用范围，应重新确认授权边界并按需替换资产。

## 4. 页面声明

建议“关于”页面和 README 使用：

> 本项目为非官方个人粉丝致敬 Demo，与 ZA/UM 或《极乐迪斯科》版权方无关联。原作技能名称、肖像及相关视觉资产归其权利人所有。本项目不提供原作素材下载，亦不用于商业用途。

页面底部可简化为：

> 非官方粉丝致敬项目。原作相关资产归其权利人所有。

## 5. 替换路径

如果后续需要原创化，可保留：

- 24 个脑内能力的结构；
- 2D6 检定；
- 技能争吵；
- 四类属性色彩；
- 表现主义油画语言。

逐步替换：

- 技能名称；
- 技能肖像；
- 属性名；
- 原作字体和 UI 细节；
- 过于接近原作的布局。

## 6. 当前仓库资产范围

当前纳入仓库和公开 Demo：

- 24 张优化后的技能肖像 WebP；
- 项目自有的背景、UI、骰子和图标资产；
- 加载失败时使用的 CSS 占位视觉。

当前仍不纳入仓库：

- 原作截图；
- 游戏音效；
- 游戏字体；
- 游戏 Logo；
- 其他可直接提取的资源文件。

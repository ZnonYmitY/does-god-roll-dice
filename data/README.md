# Data 目录

本目录用于存放 v1.0 的规则和文案 JSON。

建议文件：

- `skills.json`：24 个技能的属性、名称、语气和适用分类；
- `categories.json`：问题分类和技能池；
- `keywords.json`：关键词、强弱权重和动作词；
- `loading-texts.json`：通用与分类加载文案；
- `object-templates.json`：带 `{object}` 的可复用模板；
- `skill-lines.json`：技能发言；
- `verdicts.json`：分类 × 结果等级的最终判定；
- `share-templates.json`：分享图标题、副标题和页脚；
- `safety-responses.json`：高风险输入的统一提醒。

所有条目必须有稳定唯一 ID，用于去重、日志和后续内容迭代。

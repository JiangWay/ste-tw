# STE-TW

繁中＋英文技術名詞版的簡化技術寫作規範（草案）。

STE-TW 改編自 ASD-STE100 Simplified Technical English。它保留 STE 的文法規則，用「核准詞表＋名詞表」取代 STE 的英文字典，並保留英文技術名詞。目標讀者是工程師、維運人員和 LLM。

> **聲明**：本專案是非官方的改編，和 ASD（AeroSpace and Defence Industries Association of Europe）沒有關係。ASD-STE100 和 Simplified Technical English 是 ASD 的商標。官方規範見 [asd-ste100.org](https://www.asd-ste100.org/)。

*An unofficial Traditional Chinese (Taiwan) adaptation of ASD-STE100 for mixed Chinese–English technical writing. Not affiliated with ASD.*

## 為什麼要有 STE-TW

- **消除歧義**：一個詞只有一個意思，一個意思只用一個詞。
- **讓 LLM 穩定產出**：規則明確，LLM 比較容易遵守。
- **降低 token 用量**：實測中，STE 寫法比一般寫法少 30～40% token。系統指令每一輪都會重送，所以節省會累積。

## 適用文件

| 類型 | 遵守程度 | 例子 |
| --- | --- | --- |
| 程序（告訴讀者做什麼） | 100% | runbook、SOP、安裝步驟、incident 處理步驟 |
| 規格與訊息 | 100% | OpenSpec requirement、錯誤訊息、Copilot Studio 系統指令 |
| 說明（告訴讀者是什麼、為什麼） | 約 80% | 架構說明、PR 說明、incident 報告、交接文件 |
| 不適用 | — | 行銷文案、論文本文、對客戶的情感性溝通 |

## 快速開始

**只想讓 LLM 照規範寫**：把 [`prompts/system-prompt.md`](prompts/system-prompt.md) 的內容貼到下列位置之一：

- GitHub Copilot：`.github/copilot-instructions.md`
- Claude Code：`CLAUDE.md`
- Copilot Studio：agent 的 instructions

**要用 Agent Skill**：執行 `scripts/build-skill.sh`，然後把 `skills/ste-tw/` 複製到工具的 skills 資料夾。

**要量測 token**：見 [`bench/`](bench/)。

## 專案結構

| 路徑 | 內容 |
| --- | --- |
| [`spec/rules.md`](spec/rules.md) | 核心原則、寫作規則（W、S、P、D、F）、中英混寫規則（M） |
| [`spec/word-choice.md`](spec/word-choice.md) | 常用詞語選用表：連接詞、情態詞、動詞、否定與指稱 |
| [`glossary/`](glossary/) | 名詞表（CSV）：保留英文、使用繁中、產險業務名詞 |
| [`examples/rewrites.md`](examples/rewrites.md) | 改寫前後對照，附 token 數 |
| [`prompts/system-prompt.md`](prompts/system-prompt.md) | 可直接貼用的系統指令（509 token，o200k） |
| [`skills/ste-tw/`](skills/ste-tw/) | Agent Skill 格式 |
| [`bench/`](bench/) | token 量測腳本與語料 |
| [`ROADMAP.md`](ROADMAP.md) | 待決事項與驗證方式 |

名詞表用 CSV，所以 lint 工具和 skill 可以直接讀取。

## 狀態

草案。句長門檻、中英空格規則和產險名詞表還沒有校準。詳見 [`ROADMAP.md`](ROADMAP.md)。

## 授權

- 文件（`spec/`、`glossary/`、`examples/`、`prompts/`、`skills/`）：[CC BY 4.0](LICENSE-docs)
- 程式碼（`bench/`、`scripts/`）：[MIT](LICENSE)

## 參考

- [ASD-STE100 官方網站](https://www.asd-ste100.org/)
- [AminBlg](https://github.com/AminBlg)/[SimpleEnglish](https://github.com/AminBlg/SimpleEnglish)：英文 STE 的 Agent Skill
- [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119)：MUST、SHOULD、MAY 的定義

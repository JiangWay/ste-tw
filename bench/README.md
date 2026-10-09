# Token 量測

`scen.mjs` 量測同一內容在不同語言、寫法和格式下的 token 數。tokenizer 是 o200k（GPT-4o 系列）和 Llama 3。

## 執行

```bash
cd bench
npm install
npm run bench
```

結果輸出到終端機，並寫入 `results.json` 和 `corpus.json`。

## 情境

| 情境 | 比較的變體 |
| --- | --- |
| 1. 程式開發：程式碼本體 | 英文註解、繁中註解、無註解、Tab 縮排、壓成一行 |
| 1b. 程式開發：給 Copilot 的指令 | 英文、繁中＋英文術語、全繁中 |
| 2. 論文閱讀 | 英文原文、繁中譯文、繁中＋英文術語 |
| 3. 純英文技術文章 | 英文原文、全繁中、STE 英文 |
| 4. 繁中＋英文技術文章 | 混寫、全英文、全繁中 |
| 5a. Agent 系統指令 | 一般英文、一般繁中、STE 英文、STE 繁中 |
| 5b. Entra ID 登入日誌 | JSON 縮排、JSON 壓縮、YAML、CSV |
| 5c. OpenSpec requirement | 英文、繁中＋英文關鍵字、全繁中 |

## 限制

- 每個情境只有一組平行語料，語料由作者撰寫。
- Claude 的 tokenizer 不公開。量測 Claude 時，用 Anthropic API 的 `count_tokens`。
- 本腳本只量測 token 數，不量測品質。

# 名詞表

名詞表定義每個概念的唯一寫法。新名詞依 [`../spec/rules.md`](../spec/rules.md) 第 3 節的條件，決定放在哪一個檔案。

| 檔案 | 內容 | 欄位 |
| --- | --- | --- |
| `keep-english.csv` | 保留英文的名詞 | term、domain、meaning_zh、avoid |
| `zh-tw.csv` | 使用繁中的名詞 | term、english、avoid、reason |
| `insurance.csv` | 產險業務名詞（初稿，必須由業務單位確認） | term、english、avoid、note |

格式規則：

- 一個欄位中有多個值時，用全形頓號「、」分隔。
- `—` 表示沒有內容。
- 檔案編碼是 UTF-8。

## 同字不同義的處理

- 身分憑據和 LLM 計量單位都叫 token。如果同一份文件兩者都有，身分憑據寫完整名稱：access token、refresh token。
- K8s 的 `Service`、Kong 的 service、Spring 的 `@Service` 意思不同。K8s 和 Spring 的用 code 格式，Kong 的寫「Kong service」。
- 動詞「部署」、K8s 的 `Deployment`、Azure OpenAI 的 model deployment 是三個不同概念。依照名詞表各寫一種寫法。
- 業務的 claim 寫「理賠」，JWT 的 claim 保留英文。
- 「保單」是 insurance policy。英文「policy」只用於技術原則，例如 Conditional Access policy。

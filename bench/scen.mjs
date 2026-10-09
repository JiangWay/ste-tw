import { encode as o200k } from 'gpt-tokenizer/encoding/o200k_base';
import llama3 from 'llama3-tokenizer-js';
const L = t => llama3.encode(t, { bos: false, eos: false }).length;

const javaBody = (c) => `@RestController
@RequestMapping("/api/v1/claims")
@RequiredArgsConstructor
public class ClaimController {

    private final ClaimService claimService;

    ${c[0]}
    @GetMapping("/{claimId}")
    public ResponseEntity<ClaimResponse> getClaim(@PathVariable String claimId) {
        ${c[1]}
        Claim claim = claimService.findById(claimId)
                .orElseThrow(() -> new ClaimNotFoundException(claimId));
        ${c[2]}
        if (!claim.isVisibleTo(SecurityContextHolder.getContext().getAuthentication())) {
            throw new AccessDeniedException("Forbidden");
        }
        return ResponseEntity.ok(ClaimResponse.from(claim));
    }
}`;
const javaEN = javaBody([
  '/** Returns a single claim. Throws 404 if the claim does not exist. */',
  '// Look up the claim; fail fast when it is missing',
  '// Only the policy holder or an adjuster may view the claim']);
const javaZH = javaBody([
  '/** 回傳單筆理賠案件。若案件不存在則拋出 404。 */',
  '// 查詢理賠案件；若不存在則立即失敗',
  '// 只有要保人或理賠人員可以檢視此案件']);
const javaNoComment = javaBody(['', '', '']);
const javaMin = javaNoComment.replace(/\n\s*/g, ' ');
const javaTabs = javaEN.replace(/    /g, '\t');

const S = {
  '1. 程式開發 — 程式碼本體': {
    'Java 英文註解': javaEN,
    'Java 繁中註解': javaZH,
    'Java 無註解': javaNoComment,
    'Java 英文註解+Tab 縮排': javaTabs,
    'Java 壓成一行(無註解)': javaMin,
  },
  '1b. 程式開發 — 給 Copilot 的指令': {
    '英文': 'Refactor ClaimController to use constructor injection, add input validation for claimId, and write JUnit 5 tests for the not-found and forbidden cases.',
    '繁中+英文術語': '把 ClaimController 改成 constructor injection，幫 claimId 加上 input validation，並針對 not-found 和 forbidden 兩種情況寫 JUnit 5 測試。',
    '全繁中': '請重構理賠控制器，改用建構子注入，為案件編號加上輸入驗證，並針對查無資料與禁止存取兩種情況撰寫單元測試。',
  },
  '2. 論文閱讀(摘要段落)': {
    '英文原文': 'Large language models are increasingly deployed in enterprise settings where inference cost scales with the number of tokens processed. We study how prompt language, terminology mixing, and output verbosity affect token consumption across three tokenizers. Our experiments on 1,200 parallel technical documents show that controlled-language prompting reduces output length by 31% without a measurable loss in task accuracy. We further find that code-switching between Traditional Chinese and English technical terms yields a token count within 15% of monolingual English.',
    '繁中譯文': '大型語言模型越來越常部署於企業環境中，而其推論成本會隨處理的詞元數量而增加。本研究探討提示語言、術語混用以及輸出冗長程度，如何影響三種分詞器的詞元消耗。我們以一千兩百份平行技術文件進行實驗，結果顯示受控語言提示可使輸出長度減少百分之三十一，且任務準確率沒有可量測的下降。我們進一步發現，在繁體中文與英文技術術語之間進行語碼轉換，其詞元數與純英文相差不到百分之十五。',
    '繁中+英文術語': '大型語言模型(LLM)越來越常部署於企業環境，其 inference cost 會隨處理的 token 數增加。本研究探討 prompt 語言、術語混用與 output verbosity 如何影響三種 tokenizer 的 token 消耗。我們以 1,200 份平行技術文件實驗，結果顯示 controlled-language prompting 可使輸出長度減少 31%，且 task accuracy 無可量測下降。我們進一步發現，繁體中文與英文技術術語的 code-switching，其 token 數與純英文相差不到 15%。',
  },
  '3. 純英文技術文章': {
    '英文原文(直接讀)': 'When a client application needs to call a downstream API on behalf of a signed-in user, it should not simply forward the original access token. Instead, the middle-tier service exchanges the incoming token for a new one that is scoped to the downstream resource. In Microsoft Entra ID this pattern is called the On-Behalf-Of flow, and it ensures that each service only receives the permissions it actually needs. Developers often overlook the fact that the exchanged token has its own lifetime and must be cached separately.',
    '先翻成全繁中再處理': '當用戶端應用程式需要代表已登入的使用者呼叫下游應用程式介面時，不應直接轉送原始的存取權杖。相反地，中介層服務會將收到的權杖交換為一個新的權杖，其範圍僅限於下游資源。在微軟的身分識別服務中，這種模式稱為代理流程，它能確保每個服務只取得實際需要的權限。開發人員經常忽略，交換後的權杖有自己的有效期限，必須另外快取。',
    '改寫成 STE 英文': 'Do not forward the original access token to a downstream API. The middle-tier service must exchange the token for a new token. The new token is scoped to the downstream resource. Entra ID calls this the On-Behalf-Of flow. Each service gets only the permissions that it needs. The new token has its own lifetime. Cache it separately.',
  },
  '4. 繁中+英文技術文章': {
    '混寫原文': '在 Kubernetes 上部署 Spring Boot 時，建議把 liveness probe 和 readiness probe 分開設定。readiness probe 失敗時，Service 會暫時把這個 Pod 從 endpoint 移除，但不會重啟；liveness probe 失敗才會觸發 restart。如果兩者都指向同一個 /actuator/health，DB 連線短暫中斷就可能造成整批 Pod 被重啟，引發 cascading failure。',
    '全英文版': 'When deploying Spring Boot on Kubernetes, configure the liveness probe and readiness probe separately. When the readiness probe fails, the Service temporarily removes the Pod from its endpoints but does not restart it; only a liveness probe failure triggers a restart. If both point to the same /actuator/health, a brief database disconnection can restart a whole batch of Pods and cause a cascading failure.',
    '全繁中版': '在容器編排平台上部署春季框架應用時，建議把存活探測與就緒探測分開設定。就緒探測失敗時，服務會暫時把該容器組從端點移除，但不會重啟；存活探測失敗才會觸發重啟。如果兩者都指向同一個健康檢查路徑，資料庫連線短暫中斷就可能造成整批容器組被重啟，引發連鎖故障。',
  },
  '5a. Copilot Studio / Agent 系統指令': {
    '一般英文': 'You are a helpful and friendly assistant for our claims department. Please make sure to always answer questions politely and in a clear way. If you are not completely sure about something, it would be great if you could let the user know and suggest that they contact a human agent. Try to keep your answers reasonably short, but feel free to include extra details when they would be useful.',
    '一般繁中': '你是我們理賠部門親切又樂於助人的助理。請務必隨時以禮貌且清楚的方式回答問題。如果你對某件事不是很確定，希望你能讓使用者知道，並建議他們聯絡真人客服。盡量讓回答保持適度簡短，但如果額外的細節有幫助，也歡迎補充。',
    'STE 英文': 'You answer questions for the claims department. Be polite. Use short sentences. If you are not sure, tell the user. Then tell the user to contact a human agent. Give extra details only when they help the user.',
    'STE 繁中': '你負責回答理賠部門的問題。保持禮貌。使用短句。不確定時，告知使用者，並請他聯絡真人客服。只在有幫助時補充細節。',
  },
};

// 5b structured data: Entra ID sign-in logs
const rows = Array.from({ length: 5 }, (_, i) => ({
  createdDateTime: `2026-10-0${i + 1}T08:1${i}:22Z`,
  userPrincipalName: `user${i}@example.com`,
  appDisplayName: 'Claims Portal',
  ipAddress: `10.20.30.${40 + i}`,
  status: { errorCode: i % 2 ? 50126 : 0, failureReason: i % 2 ? 'Invalid username or password' : '' },
  conditionalAccessStatus: i % 2 ? 'notApplied' : 'success',
}));
const toYaml = rs => rs.map(r => `- createdDateTime: ${r.createdDateTime}\n  userPrincipalName: ${r.userPrincipalName}\n  appDisplayName: ${r.appDisplayName}\n  ipAddress: ${r.ipAddress}\n  status:\n    errorCode: ${r.status.errorCode}\n    failureReason: "${r.status.failureReason}"\n  conditionalAccessStatus: ${r.conditionalAccessStatus}`).join('\n');
const toCsv = rs => 'createdDateTime,userPrincipalName,appDisplayName,ipAddress,errorCode,failureReason,conditionalAccessStatus\n' + rs.map(r => [r.createdDateTime, r.userPrincipalName, r.appDisplayName, r.ipAddress, r.status.errorCode, r.status.failureReason, r.conditionalAccessStatus].join(',')).join('\n');
S['5b. Entra ID 登入日誌(5 筆)'] = {
  'JSON 縮排(2 空格)': JSON.stringify(rows, null, 2),
  'JSON 壓縮': JSON.stringify(rows),
  'YAML': toYaml(rows),
  'CSV': toCsv(rows),
};

S['5c. SDD 規格(OpenSpec requirement)'] = {
  '英文': `### Requirement: Claim visibility\nThe system SHALL return a claim only to the policy holder or an assigned adjuster.\n\n#### Scenario: Policy holder views own claim\n- GIVEN a signed-in policy holder\n- WHEN they request a claim they own\n- THEN the system returns HTTP 200 with the claim\n\n#### Scenario: Other user is denied\n- GIVEN a signed-in user who is not the holder or adjuster\n- WHEN they request the claim\n- THEN the system returns HTTP 403`,
  '繁中+英文關鍵字': `### Requirement: 理賠案件可見性\n系統 SHALL 僅將理賠案件回傳給要保人或指派的理賠人員。\n\n#### Scenario: 要保人檢視自己的案件\n- GIVEN 已登入的要保人\n- WHEN 查詢自己的理賠案件\n- THEN 系統回傳 HTTP 200 與案件資料\n\n#### Scenario: 其他使用者被拒絕\n- GIVEN 非要保人亦非理賠人員的已登入使用者\n- WHEN 查詢該案件\n- THEN 系統回傳 HTTP 403`,
  '全繁中': `### 需求：理賠案件可見性\n系統應僅將理賠案件回傳給要保人或指派的理賠人員。\n\n#### 情境：要保人檢視自己的案件\n- 前提：已登入的要保人\n- 當：查詢自己的理賠案件\n- 則：系統回傳成功狀態與案件資料\n\n#### 情境：其他使用者被拒絕\n- 前提：非要保人亦非理賠人員的已登入使用者\n- 當：查詢該案件\n- 則：系統回傳禁止存取`,
};

const out = {};
for (const [name, s] of Object.entries(S)) {
  const keys = Object.keys(s); const b0 = o200k(s[keys[0]]).length, b1 = L(s[keys[0]]);
  console.log(`\n== ${name} ==`);
  out[name] = {};
  for (const k of keys) {
    const a = o200k(s[k]).length, c = L(s[k]);
    out[name][k] = { o200k: a, llama3: c, chars: [...s[k]].length };
    console.log(`${k.padEnd(22)}\to200k ${String(a).padStart(4)} (${(a / b0).toFixed(2)}x)\tllama3 ${String(c).padStart(4)} (${(c / b1).toFixed(2)}x)`);
  }
}
import fs from 'fs';
fs.writeFileSync('results.json', JSON.stringify(out, null, 2));
fs.writeFileSync('corpus.json', JSON.stringify(S, null, 2));

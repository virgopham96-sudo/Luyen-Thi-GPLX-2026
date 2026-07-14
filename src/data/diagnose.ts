import { QUESTIONS } from './questions';

const STOP_WORDS = new Set([
  "xe", "đường", "giao", "thông", "luật", "người", "lái", "phải", "khi", "đúng", "không", 
  "theo", "quy", "tắc", "bị", "hành", "vi", "cấm", "cho", "của", "các", "những", "trên", 
  "dưới", "đây", "như", "nào", "một", "hai", "ba", "bốn", "đi", "đứng", "nơi", "gặp", 
  "trường", "hợp", "này", "được", "hoặc", "phần", "làn", "chạy", "tốc", "độ", "bên", 
  "phải", "trái", "trước", "sau", "tuyệt", "đối", "định", "nghiêm", "nhất", "an", 
  "toàn", "tính", "mạng", "pháp", "luật", "với", "trong", "để", "nhưng", "bằng", 
  "bởi", "thế", "nào", "vào", "ra", "lên", "xuống", "tại", "sự", "nhóm", "loại",
  "đã", "đang", "sẽ", "chỉ", "cũng", "đều", "có", "là", "thì", "mà", "hơn", "nhiều", "ít"
]);

function getKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"?]/g, "")
    .split(/\s+/)
    .map(w => w.trim())
    .filter(word => word.length >= 3 && !STOP_WORDS.has(word));
}

const allExplanations = QUESTIONS.map(q => q.explanation);

const shiftCounts: { [key: number]: number } = {};

for (let i = 0; i < QUESTIONS.length; i++) {
  const q = QUESTIONS[i];
  const qText = `${q.content} ${q.options.join(" ")}`;
  const qKeywords = getKeywords(qText);
  const qKeywordsSet = new Set(qKeywords);
  
  let bestIdx = -1;
  let maxScore = 0;
  
  for (let idx = 0; idx < allExplanations.length; idx++) {
    const exp = allExplanations[idx];
    if (!exp) continue;
    const expKeywords = getKeywords(exp);
    let score = 0;
    for (const w of expKeywords) {
      if (qKeywordsSet.has(w)) {
        score++;
      }
    }
    
    if (score > maxScore) {
      maxScore = score;
      bestIdx = idx;
    }
  }
  
  if (maxScore >= 2) {
    const shift = bestIdx - i;
    shiftCounts[shift] = (shiftCounts[shift] || 0) + 1;
    if (i < 50) {
      console.log(`Q${i+1} -> best explanation at Q${bestIdx+1} (shift ${shift}, score ${maxScore})`);
    }
  } else {
    if (i < 50) {
      console.log(`Q${i+1} -> no strong match`);
    }
  }
}

console.log("\nShift distribution frequency:");
const sortedShifts = Object.entries(shiftCounts).sort((a, b) => b[1] - a[1]);
for (const [shift, count] of sortedShifts.slice(0, 10)) {
  console.log(`Shift: ${shift}, Count: ${count}`);
}

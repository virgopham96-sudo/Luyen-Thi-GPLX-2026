import { Question, LicenseClassConfig, LicenseClassId } from '../types';

export const APPENDIX_1_IDS = new Set([
  // Quy định chung và quy tắc (100)
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 19, 20, 21, 22, 24, 26, 27,
  28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
  38, 39, 40, 41, 43, 44, 45, 46, 47, 48,
  49, 51, 52, 53, 54, 56, 57, 59, 63, 64,
  65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
  75, 76, 77, 80, 81, 87, 88, 90, 91, 92,
  93, 94, 96, 97, 98, 99, 100, 102, 103, 107,
  109, 110, 111, 119, 123, 124, 125, 126, 137, 138,
  140, 141, 142, 145, 146, 151, 155, 163, 167, 178,

  // Văn hóa giao thông, đạo đức (10)
  182, 185, 187, 189, 191, 192, 193, 194, 195, 200,

  // Kỹ thuật lái xe (15)
  206, 215, 219, 232, 233, 240, 241, 242, 254, 255,
  257, 258, 259, 260, 261,

  // Báo hiệu đường bộ (90)
  303, 304, 305, 306, 307, 313, 314, 315, 317, 318,
  322, 323, 324, 325, 326, 329, 330, 335, 345, 346,
  347, 348, 349, 350, 351, 354, 360, 362, 364, 366,
  367, 368, 369, 370, 371, 372, 373, 374, 375, 376,
  377, 380, 381, 382, 386, 387, 389, 390, 391, 393,
  394, 395, 397, 398, 400, 401, 411, 412, 413, 415,
  419, 422, 427, 430, 431, 432, 433, 434, 435, 437,
  438, 439, 440, 441, 442, 445, 450, 451, 452, 454,
  455, 457, 458, 459, 460, 461, 474, 475, 476, 478,

  // Giải thế sa hình và xử lý tình huống (35)
  486, 487, 490, 492, 495, 499,
  500, 503, 504, 505, 507, 508,
  509, 517, 520, 525, 527, 528,
  529, 538, 539, 540, 543, 548,
  553, 556, 559, 560, 562, 565,
  567, 568, 583, 592, 600
]);

export const APPENDIX_2_IDS = new Set([
  // Quy định chung và quy tắc (110)
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 19, 20, 21, 22, 24, 26, 27,
  28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
  38, 39, 40, 41, 43, 44, 45, 46, 47, 48,
  49, 51, 52, 53, 54, 55, 56, 57, 59, 63,
  64, 65, 66, 67, 68, 69, 70, 71, 72, 73,
  74, 75, 76, 77, 78, 80, 81, 82, 87, 88,
  89, 90, 91, 92, 93, 94, 96, 97, 98, 99,
  100, 102, 103, 107, 108, 109, 110, 111, 119, 123,
  124, 125, 126, 137, 138, 139, 140, 141, 142, 145,
  146, 151, 155, 157, 162, 163, 165, 166, 167, 178,

  // Văn hóa giao thông, đạo đức (10)
  182, 185, 187, 189, 191, 192, 193, 194, 195, 200,

  // Kỹ thuật lái xe và cấu tạo sửa chữa (17)
  206, 215, 219, 232, 233, 240, 241, 242, 254, 255,
  257, 258, 259, 260, 261, 266, 285,

  // Báo hiệu đường bộ (128)
  303, 304, 305, 306, 307, 313, 314, 315, 317, 318,
  322, 323, 324, 325, 326, 329, 330, 332, 333, 334,
  335, 344, 345, 346, 347, 348, 349, 350, 351, 354,
  355, 360, 361, 362, 364, 366, 367, 368, 369, 370,
  371, 372, 373, 374, 375, 376, 377, 380, 381, 382,
  383, 384, 385, 386, 387, 388, 389, 390, 391, 392,
  393, 394, 395, 396, 397, 398, 400, 401, 402, 405,
  406, 407, 408, 409, 410, 411, 412, 413, 415, 416,
  418, 419, 420, 421, 422, 423, 424, 425, 426, 427,
  430, 431, 432, 433, 434, 435, 436, 437, 438, 439,
  440, 441, 442, 443, 444, 445, 446, 450, 451, 452,
  454, 455, 456, 457, 458, 459, 460, 461, 474, 475,
  476, 477, 478, 479, 480, 481, 482, 483, 485,

  // Giải thế sa hình và kỹ năng xử lý tình huống (35)
  486, 487, 490, 492, 495, 499, 500, 503, 504, 505,
  507, 508, 509, 517, 520, 525, 527, 528, 529, 538,
  539, 540, 543, 548, 553, 556, 559, 560, 562, 565,
  567, 568, 583, 592, 600
]);

export const LICENSE_CLASSES: LicenseClassConfig[] = [
  {
    id: 'A1',
    name: 'Hạng A1',
    description: 'Mô tô hai bánh dung tích xi lanh đến 125 cm3 hoặc động cơ điện đến 11 kW (Phụ lục 1)',
    totalQuestions: 250,
    examQuestionsCount: 25,
    examTime: 19 * 60, // 19 mins
    passScore: 21,
  },
  {
    id: 'A',
    name: 'Hạng A',
    description: 'Mô tô hai bánh dung tích xi lanh trên 125 cm3 hoặc xe động cơ điện trên 11 kW (Phụ lục 1)',
    totalQuestions: 250,
    examQuestionsCount: 25,
    examTime: 19 * 60, // 19 mins
    passScore: 23,
  },
  {
    id: 'B1',
    name: 'Hạng B1',
    description: 'Ô tô chở người đến 9 chỗ; tải dưới 3.500 kg không hành nghề lái xe (Phụ lục 2)',
    totalQuestions: 300,
    examQuestionsCount: 25,
    examTime: 19 * 60, // 19 mins
    passScore: 23,
  },
  {
    id: 'B',
    name: 'Hạng B',
    description: 'Ô tô chở người đến 9 chỗ; xe tải dưới 3.500 kg (Trọn bộ 600 câu)',
    totalQuestions: 600,
    examQuestionsCount: 30,
    examTime: 20 * 60, // 20 mins
    passScore: 27,
  },
  {
    id: 'C1',
    name: 'Hạng C1',
    description: 'Ô tô tải có thiết kế kỹ thuật từ 3.500 kg đến 7.500 kg (Trọn bộ 600 câu)',
    totalQuestions: 600,
    examQuestionsCount: 35,
    examTime: 22 * 60, // 22 mins
    passScore: 32,
  },
  {
    id: 'C',
    name: 'Hạng C',
    description: 'Ô tô tải có thiết kế kỹ thuật trên 7.500 kg (Trọn bộ 600 câu)',
    totalQuestions: 600,
    examQuestionsCount: 40,
    examTime: 24 * 60, // 24 mins
    passScore: 36,
  },
  {
    id: 'DEF',
    name: 'Hạng D, E, F',
    description: 'Các hạng D1, D2, D, BE, C1E, CE, D1E, D2E, DE (Trọn bộ 600 câu)',
    totalQuestions: 600,
    examQuestionsCount: 45,
    examTime: 26 * 60, // 26 mins
    passScore: 41,
  },
];

export function filterQuestionsForLicense(questions: Question[], licenseId: LicenseClassId): Question[] {
  switch (licenseId) {
    case 'A1':
    case 'A':
      return questions.filter(q => APPENDIX_1_IDS.has(q.id));
    case 'B1':
      return questions.filter(q => APPENDIX_2_IDS.has(q.id));
    case 'B':
    case 'C1':
    case 'C':
    case 'DEF':
    default:
      return questions;
  }
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function draw(pool: Question[], topic: string, count: number, output: Question[], usedIds: Set<number>) {
  const topicPool = pool.filter(q => q.topic === topic && !usedIds.has(q.id));
  const selected = shuffle(topicPool).slice(0, count);
  selected.forEach(q => {
    output.push(q);
    usedIds.add(q.id);
  });
}

export const CRITICAL_A1_A_IDS = new Set([
  19, 20, 21, 22, 24, 26, 27, 28, 30, 47, 48, 52, 53, 63, 64, 65, 68, 70, 71, 72
]);

export const CRITICAL_B1_IDS = new Set([
  19, 20, 21, 22, 24, 26, 27, 28, 30, 47, 48, 52, 53, 63, 64, 65, 68, 70, 71, 72,
  73, 74, 87, 89, 90, 91, 92, 215, 254, 255
]);

export const CRITICAL_60_IDS = new Set([
  19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
  30, 32, 34, 35, 47, 48, 52, 53, 55, 58,
  63, 64, 65, 66, 67, 68, 70, 71, 72, 73,
  74, 85, 86, 87, 88, 89, 90, 91, 92, 93,
  97, 98, 102, 117, 163, 165, 167, 197, 198, 206,
  215, 226, 234, 245, 246, 252, 253, 254, 255, 260
]);

export function isQuestionCritical(questionId: number, licenseId: LicenseClassId): boolean {
  if (licenseId === 'A1' || licenseId === 'A') {
    return CRITICAL_A1_A_IDS.has(questionId);
  }
  if (licenseId === 'B1') {
    return CRITICAL_B1_IDS.has(questionId);
  }
  return CRITICAL_60_IDS.has(questionId);
}

export function generateExamQuestions(questions: Question[], licenseId: LicenseClassId): Question[] {
  const licenseQuestions = filterQuestionsForLicense(questions, licenseId);
  
  // We need exactly 1 critical question (important for this license)
  const criticalPool = licenseQuestions.filter(q => isQuestionCritical(q.id, licenseId));
  // Non-critical questions
  const nonCriticalPool = licenseQuestions.filter(q => !isQuestionCritical(q.id, licenseId));
  
  const selectedCritical = shuffle(criticalPool).slice(0, 1);
  const usedIds = new Set<number>(selectedCritical.map(q => q.id));
  
  const examQuestions: Question[] = [...selectedCritical];
  
  // Define topic distributions (for non-critical questions)
  if (licenseId === 'A1' || licenseId === 'A' || licenseId === 'B1') {
    // 8 quy tac, 1 van hoa dao duc, 1 ki thuat/cau tao, 8 bien bao, 6 sa hinh
    draw(nonCriticalPool, 'khaiNiemQuyTac', 8, examQuestions, usedIds);
    draw(nonCriticalPool, 'vanHoaDaoDuc', 1, examQuestions, usedIds);
    // Draw 1 ki thuat or cau tao sua chua
    const combinedPool = nonCriticalPool.filter(q => (q.topic === 'kiThuatLaiXe' || q.topic === 'cauTaoSuaChua') && !usedIds.has(q.id));
    const selectedTech = shuffle(combinedPool).slice(0, 1);
    selectedTech.forEach(q => {
      examQuestions.push(q);
      usedIds.add(q.id);
    });
    draw(nonCriticalPool, 'bienBao', 8, examQuestions, usedIds);
    draw(nonCriticalPool, 'saHinh', 6, examQuestions, usedIds);
  } else if (licenseId === 'B') {
    // 8 quy tac, 1 van hoa, 1 ki thuat, 1 cau tao, 9 bien bao, 9 sa hinh
    draw(nonCriticalPool, 'khaiNiemQuyTac', 8, examQuestions, usedIds);
    draw(nonCriticalPool, 'vanHoaDaoDuc', 1, examQuestions, usedIds);
    draw(nonCriticalPool, 'kiThuatLaiXe', 1, examQuestions, usedIds);
    draw(nonCriticalPool, 'cauTaoSuaChua', 1, examQuestions, usedIds);
    draw(nonCriticalPool, 'bienBao', 9, examQuestions, usedIds);
    draw(nonCriticalPool, 'saHinh', 9, examQuestions, usedIds);
  } else if (licenseId === 'C1') {
    // 10 quy tac, 1 van hoa, 2 ki thuat, 1 cau tao, 10 bien bao, 10 sa hinh
    draw(nonCriticalPool, 'khaiNiemQuyTac', 10, examQuestions, usedIds);
    draw(nonCriticalPool, 'vanHoaDaoDuc', 1, examQuestions, usedIds);
    draw(nonCriticalPool, 'kiThuatLaiXe', 2, examQuestions, usedIds);
    draw(nonCriticalPool, 'cauTaoSuaChua', 1, examQuestions, usedIds);
    draw(nonCriticalPool, 'bienBao', 10, examQuestions, usedIds);
    draw(nonCriticalPool, 'saHinh', 10, examQuestions, usedIds);
  } else if (licenseId === 'C') {
    // 10 quy tac, 1 van hoa, 2 ki thuat, 1 cau tao, 14 bien bao, 11 sa hinh
    draw(nonCriticalPool, 'khaiNiemQuyTac', 10, examQuestions, usedIds);
    draw(nonCriticalPool, 'vanHoaDaoDuc', 1, examQuestions, usedIds);
    draw(nonCriticalPool, 'kiThuatLaiXe', 2, examQuestions, usedIds);
    draw(nonCriticalPool, 'cauTaoSuaChua', 1, examQuestions, usedIds);
    draw(nonCriticalPool, 'bienBao', 14, examQuestions, usedIds);
    draw(nonCriticalPool, 'saHinh', 11, examQuestions, usedIds);
  } else { // DEF
    // 10 quy tac, 1 van hoa, 2 ki thuat, 1 cau tao, 16 bien bao, 14 sa hinh
    draw(nonCriticalPool, 'khaiNiemQuyTac', 10, examQuestions, usedIds);
    draw(nonCriticalPool, 'vanHoaDaoDuc', 1, examQuestions, usedIds);
    draw(nonCriticalPool, 'kiThuatLaiXe', 2, examQuestions, usedIds);
    draw(nonCriticalPool, 'cauTaoSuaChua', 1, examQuestions, usedIds);
    draw(nonCriticalPool, 'bienBao', 16, examQuestions, usedIds);
    draw(nonCriticalPool, 'saHinh', 14, examQuestions, usedIds);
  }
  
  // Get expected total questions
  const config = LICENSE_CLASSES.find(lc => lc.id === licenseId);
  const targetCount = config ? config.examQuestionsCount : 25;
  
  // Fill remaining gaps if any (sanity check)
  if (examQuestions.length < targetCount) {
    const remainingPool = nonCriticalPool.filter(q => !usedIds.has(q.id));
    const needed = targetCount - examQuestions.length;
    const fillers = shuffle(remainingPool).slice(0, needed);
    fillers.forEach(q => {
      examQuestions.push(q);
      usedIds.add(q.id);
    });
  }
  
  return shuffle(examQuestions);
}

export function generateFixedExamQuestions(
  questions: Question[],
  licenseId: LicenseClassId,
  examIndex: number // 0-based index
): Question[] {
  const licenseQuestions = filterQuestionsForLicense(questions, licenseId);
  
  // Separate into critical and non-critical sorted by ID for stable results
  const critical = licenseQuestions.filter(q => isQuestionCritical(q.id, licenseId)).sort((a, b) => a.id - b.id);
  const nonCritical = licenseQuestions.filter(q => !isQuestionCritical(q.id, licenseId)).sort((a, b) => a.id - b.id);
  
  const examQuestions: Question[] = [];
  
  if (licenseId === 'A1' || licenseId === 'A') {
    // 10 sets of 25 questions: each set has exactly 2 critical and 23 non-critical
    const criticalCount = 2;
    const nonCriticalCount = 23;
    
    // Select 2 critical questions
    if (critical.length > 0) {
      for (let j = 0; j < criticalCount; j++) {
        const idx = (examIndex * criticalCount + j) % critical.length;
        examQuestions.push(critical[idx]);
      }
    }
    
    // Select 23 non-critical questions
    if (nonCritical.length > 0) {
      for (let j = 0; j < nonCriticalCount; j++) {
        const idx = (examIndex * nonCriticalCount + j) % nonCritical.length;
        examQuestions.push(nonCritical[idx]);
      }
    }
  } else {
    // Other categories: 20 sets of exams
    const config = LICENSE_CLASSES.find(lc => lc.id === licenseId);
    const targetCount = config ? config.examQuestionsCount : 30;
    
    // B1 has 25 questions: 2 critical and 23 non-critical
    // B has 30 questions: 3 critical and 27 non-critical
    // C1 has 35 questions: 3 critical and 32 non-critical
    // C has 40 questions: 3 critical and 37 non-critical
    // DEF has 45 questions: 3 critical and 42 non-critical
    let criticalCount = 3;
    if (licenseId === 'B1') {
      criticalCount = 2;
    }
    const nonCriticalCount = targetCount - criticalCount;
    
    // Select critical questions
    if (critical.length > 0) {
      for (let j = 0; j < criticalCount; j++) {
        const idx = (examIndex * criticalCount + j) % critical.length;
        examQuestions.push(critical[idx]);
      }
    }
    
    // Select non-critical questions
    if (nonCritical.length > 0) {
      for (let j = 0; j < nonCriticalCount; j++) {
        const idx = (examIndex * nonCriticalCount + j) % nonCritical.length;
        examQuestions.push(nonCritical[idx]);
      }
    }
  }
  
  // Sort questions by ID to maintain a professional, structured exam layout
  return examQuestions.sort((a, b) => a.id - b.id);
}


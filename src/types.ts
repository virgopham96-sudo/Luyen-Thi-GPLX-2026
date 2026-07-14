export interface Question {
  id: number;
  content: string;
  options: string[];
  answer: string; // "A" | "B" | "C" | "D"
  explanation: string;
  important: boolean;
  url?: string;
  topic: 'diemLiet' | 'khaiNiemQuyTac' | 'vanHoaDaoDuc' | 'kiThuatLaiXe' | 'bienBao' | 'saHinh' | 'cauTaoSuaChua';
}

export interface ExamSession {
  questions: Question[];
  answers: Record<number, string>; // Maps question.id to selected answer ("A", "B", etc.)
  timeLeft: number; // in seconds
  isSubmitted: boolean;
  score: number;
  passed: boolean;
  failedByCritical: boolean;
}

export type TopicKey = 'toanBo' | 'diemLiet' | 'khaiNiemQuyTac' | 'vanHoaDaoDuc' | 'kiThuatLaiXe' | 'bienBao' | 'saHinh' | 'cauTaoSuaChua';

export interface TopicInfo {
  key: TopicKey;
  name: string;
  count: number;
  icon: string;
  description: string;
}

export type LicenseClassId = 'A1' | 'A' | 'B1' | 'B' | 'C1' | 'C' | 'DEF';

export interface LicenseClassConfig {
  id: LicenseClassId;
  name: string;
  description: string;
  totalQuestions: number;
  examQuestionsCount: number;
  examTime: number; // in seconds
  passScore: number;
  minId?: number;
  maxId?: number;
}


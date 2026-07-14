import React, { useState, useEffect, useRef } from 'react';
import { Timer, AlertTriangle, CheckCircle2, XCircle, ArrowLeft, ArrowRight, RotateCcw, Award, BookOpen, AlertCircle, Flame } from 'lucide-react';
import { Question, LicenseClassId } from '../types';
import { QUESTIONS } from '../data/questions';
import { LICENSE_CLASSES, generateExamQuestions, isQuestionCritical, generateFixedExamQuestions } from '../data/licenses';

interface ExamSessionProps {
  licenseClass: LicenseClassId;
  examIndex?: number;
  onBack: () => void;
  onSaveProgress: (questionId: number, isCorrect: boolean) => void;
}

export default function ExamSession({ licenseClass, examIndex, onBack, onSaveProgress }: ExamSessionProps) {
  const currentConfig = LICENSE_CLASSES.find(lc => lc.id === licenseClass) || LICENSE_CLASSES[0];
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(currentConfig.examTime);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const timerRef = useRef<any>(null);

  // 1. Generate standard exam on mount
  useEffect(() => {
    const examQuestions = examIndex !== undefined 
      ? generateFixedExamQuestions(QUESTIONS, licenseClass, examIndex)
      : generateExamQuestions(QUESTIONS, licenseClass);
    setQuestions(examQuestions);

    // Start timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // Auto submit
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [licenseClass, examIndex]);

  const shuffle = <T,>(array: T[]): T[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleSelectAnswer = (optionIndex: number) => {
    if (isSubmitted) return;
    const currentQ = questions[currentIndex];
    const letter = ['A', 'B', 'C', 'D'][optionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: letter
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const triggerSubmit = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSubmitted(true);
    setShowConfirmModal(false);

    // Save progress to home dashboard
    questions.forEach(q => {
      const selected = answers[q.id];
      const isCorrect = selected === q.answer;
      onSaveProgress(q.id, isCorrect);
    });
  };

  // 2. Score calculations
  const totalCorrect = questions.reduce((sum, q) => {
    return sum + (answers[q.id] === q.answer ? 1 : 0);
  }, 0);

  const missedCritical = questions.filter(q => isQuestionCritical(q.id, licenseClass)).some(q => {
    const ans = answers[q.id];
    return ans !== q.answer; // Either wrong or unanswered
  });

  const isPassed = totalCorrect >= currentConfig.passScore && !missedCritical;

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="space-y-6">
      {/* 2.1 Top Banner Bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-100 p-3 sm:p-4 gap-3 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Thoát</span><span className="hidden xs:inline">bài thi</span>
          </button>
          <span className="w-px h-4 bg-slate-200 hidden sm:inline"></span>
          <span className="font-bold text-slate-700 text-sm font-display hidden sm:inline">
            {examIndex !== undefined ? `Đề cố định số ${examIndex + 1}` : `Đề thi ngẫu nhiên`} ({currentConfig.name})
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-indigo-100">
            <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
            <span className="font-mono font-bold tracking-wider text-xs sm:text-sm">{formatTime(timeLeft)}</span>
          </div>

          {!isSubmitted && (
            <button
              onClick={triggerSubmit}
              className="px-3.5 py-1.5 sm:px-6 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md cursor-pointer transition-colors text-xs sm:text-sm"
            >
              Nộp Bài
            </button>
          )}
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <p className="text-slate-500">Đang chuẩn bị đề thi...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 2.2 Left: Question Sheet / Card */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
              {/* Question metadata */}
              <div className="flex items-center justify-between">
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">
                  Câu hỏi {currentIndex + 1} / {questions.length}
                </span>

                {currentQ && isQuestionCritical(currentQ.id, licenseClass) && (
                  <span className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-100 animate-pulse">
                    <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                    CÂU ĐIỂM LIỆT
                  </span>
                )}
              </div>

              {/* Question text */}
              <h3 className="text-lg font-bold text-slate-800 leading-relaxed">
                {currentQ?.content}
              </h3>

              {/* Question Image if present */}
              {currentQ?.url && (
                <div className="rounded-xl overflow-hidden border border-slate-100 max-h-60 bg-slate-50 flex items-center justify-center p-4">
                  <img
                    referrerPolicy="no-referrer"
                    src={currentQ.url}
                    alt="Question visual illustration"
                    className="max-h-52 object-contain"
                  />
                </div>
              )}

              {/* Multiple Choice Options */}
              <div className="space-y-3">
                {currentQ?.options.map((option, idx) => {
                  const letter = ['A', 'B', 'C', 'D'][idx];
                  const isSelected = answers[currentQ.id] === letter;
                  
                  let optionStyles = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
                  
                  if (isSubmitted) {
                    const isCorrect = currentQ.answer === letter;
                    if (isCorrect) {
                      optionStyles = "bg-emerald-50 border-emerald-300 text-emerald-800 font-medium";
                    } else if (isSelected) {
                      optionStyles = "bg-red-50 border-red-300 text-red-800";
                    }
                  } else if (isSelected) {
                    optionStyles = "bg-blue-50 border-blue-400 text-blue-800 ring-2 ring-blue-100 font-medium";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-150 flex items-start gap-3 cursor-pointer ${optionStyles}`}
                    >
                      <span className="font-mono font-bold">{idx + 1}.</span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Nav actions */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 text-xs md:text-sm font-semibold text-slate-500 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50"
                >
                  Câu trước
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === questions.length - 1}
                  className="px-4 py-2 text-xs md:text-sm font-semibold text-slate-500 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50"
                >
                  Câu sau
                </button>
              </div>
            </div>

            {/* 2.3 Explanation under submitted mode */}
            {isSubmitted && currentQ?.explanation && (
              <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <span>Giải Thích Đáp Án</span>
                </div>
                <p className="text-xs md:text-sm text-amber-900 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>

          {/* 2.4 Right Sidebar: Question list index and results */}
          <div className="space-y-6">
            {/* If submitted, show full visual summary */}
            {isSubmitted && (
              <div className={`p-6 rounded-2xl border text-center space-y-4 shadow-sm ${
                isPassed 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="flex justify-center">
                  <Award className={`w-12 h-12 ${isPassed ? 'text-emerald-500 animate-bounce' : 'text-red-500'}`} />
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-xl font-bold font-display uppercase tracking-wider">
                    {isPassed ? 'BẠN ĐÃ ĐẠT!' : 'BẠN CHƯA ĐẠT!'}
                  </h4>
                  <p className="text-3xl font-bold font-display">
                    {totalCorrect} / {questions.length}
                  </p>
                  <p className="text-xs text-slate-500">
                    {isPassed 
                      ? 'Xin chúc mừng! Bạn đã hoàn thành xuất sắc bài thi thử.' 
                      : missedCritical 
                        ? 'Bạn đạt đủ điểm nhưng sai câu hỏi ĐIỂM LIỆT.' 
                        : `Điểm số của bạn dưới mức yêu cầu (${currentConfig.passScore}/${questions.length} câu).`}
                  </p>
                </div>
              </div>
            )}

            {/* Question Quick-Selector Matrix */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-800 font-display text-sm">
                Danh sách câu hỏi
              </h4>

              <div className="grid grid-cols-5 xs:grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-5 gap-1.5 sm:gap-2">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = !!answers[q.id];
                  
                  let bgStyles = "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100";
                  
                  if (isSubmitted) {
                    const isCorrect = answers[q.id] === q.answer;
                    if (isCorrect) {
                      bgStyles = "bg-emerald-500 text-white border-emerald-500 shadow-sm";
                    } else {
                      bgStyles = "bg-red-500 text-white border-red-500 shadow-sm";
                    }
                  } else {
                    if (isCurrent) {
                      bgStyles = "bg-blue-600 text-white border-blue-600 shadow-md ring-4 ring-blue-100 font-bold";
                    } else if (isAnswered) {
                      bgStyles = "bg-blue-100 text-blue-700 border-blue-200 font-semibold";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-11 rounded-xl border text-xs font-mono font-bold flex items-center justify-center relative cursor-pointer ${bgStyles}`}
                    >
                      {idx + 1}
                      {/* Critical visual marker */}
                      {isQuestionCritical(q.id, licenseClass) && !isSubmitted && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="border-t border-slate-50 pt-3 text-[10px] text-slate-400 space-y-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 bg-slate-100 border border-slate-200 rounded-sm"></div>
                    <span>Chưa làm</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 bg-blue-100 border border-blue-200 rounded-sm"></div>
                    <span>Đã lưu</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 bg-blue-600 rounded-sm"></div>
                    <span>Đang xem</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  <span>Câu hỏi điểm liệt (Nếu trả lời sai sẽ trượt)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2.5 Submit Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-50 space-y-4">
            <div className="flex justify-center">
              <AlertTriangle className="w-12 h-12 text-amber-500 animate-pulse" />
            </div>

            <div className="text-center space-y-2">
              <h4 className="text-lg font-bold text-slate-800 font-display">
                Xác nhận nộp bài thi?
              </h4>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                Bạn có chắc chắn muốn nộp bài thi ngay bây giờ? Sau khi nộp bài, bạn sẽ không thể chỉnh sửa đáp án đã chọn.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-xs md:text-sm font-semibold text-slate-500 hover:bg-slate-50"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs md:text-sm font-semibold shadow-md"
              >
                Nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

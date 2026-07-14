import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, Info, Flame, ChevronRight, ChevronLeft } from 'lucide-react';
import { Question, TopicKey, LicenseClassId } from '../types';
import { QUESTIONS, TOPICS } from '../data/questions';
import { filterQuestionsForLicense, isQuestionCritical } from '../data/licenses';

interface TopicReviewProps {
  licenseClass: LicenseClassId;
  topicKey: TopicKey;
  onBack: () => void;
  onSaveProgress: (questionId: number, isCorrect: boolean) => void;
  userProgress: Record<number, boolean>; // map question ID -> was correct
}

export default function TopicReview({ licenseClass, topicKey, onBack, onSaveProgress, userProgress }: TopicReviewProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionAnswers, setSessionAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    let filtered: Question[] = [];
    const licenseQuestions = filterQuestionsForLicense(QUESTIONS, licenseClass);
    
    if (topicKey === 'toanBo') {
      filtered = licenseQuestions;
    } else if (topicKey === 'diemLiet') {
      filtered = licenseQuestions.filter(q => isQuestionCritical(q.id, licenseClass));
    } else {
      filtered = licenseQuestions.filter(q => q.topic === topicKey);
    }
    setQuestions(filtered);
    setCurrentIndex(0);
  }, [topicKey, licenseClass]);

  const activeTopic = TOPICS.find(t => t.key === topicKey);
  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (letter: string) => {
    // If already answered this question in this session, don't allow re-selection
    if (sessionAnswers[currentQ.id]) return;

    setSessionAnswers(prev => ({
      ...prev,
      [currentQ.id]: letter
    }));

    const isCorrect = letter === currentQ.answer;
    onSaveProgress(currentQ.id, isCorrect);
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

  // Stats
  const answeredCount = Object.keys(sessionAnswers).length;
  const correctCount = Object.entries(sessionAnswers).filter(([id, ans]) => {
    const q = QUESTIONS.find(q => q.id === parseInt(id));
    return q?.answer === ans;
  }).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Header Navigation Bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-100 p-3 sm:p-4 gap-3 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span><span className="hidden xs:inline">trang chủ</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-6 text-slate-500">
          <div className="flex items-center gap-1.5 font-bold text-[10px] sm:text-xs">
            <span className="text-slate-800 truncate max-w-[120px] sm:max-w-none">{activeTopic?.name}</span>
            <span>•</span>
            <span className="text-blue-600">{questions.length} câu</span>
          </div>

          {answeredCount > 0 && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 font-extrabold px-2 py-1 rounded-full text-[9px] sm:text-xs">
              Đúng {correctCount}/{answeredCount}
            </div>
          )}
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <p className="text-slate-500">Không tìm thấy câu hỏi phù hợp.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 2. Left: Question study Card */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6 relative">
              {/* Question metadata */}
              <div className="flex items-center justify-between">
                <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold">
                  Câu hỏi {currentIndex + 1} / {questions.length}
                </span>

                {currentQ && isQuestionCritical(currentQ.id, licenseClass) && (
                  <span className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-100">
                    <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                    ĐIỂM LIỆT
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
                  const userAns = sessionAnswers[currentQ.id];
                  const isSelected = userAns === letter;
                  const isCorrectAnswer = currentQ.answer === letter;
                  
                  let optionStyles = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
                  
                  // In study review mode, show highlights immediately if answered
                  if (userAns) {
                    if (isCorrectAnswer) {
                      optionStyles = "bg-emerald-50 border-emerald-300 text-emerald-800 font-medium";
                    } else if (isSelected) {
                      optionStyles = "bg-red-50 border-red-300 text-red-800";
                    } else {
                      optionStyles = "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(letter)}
                      disabled={!!userAns}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-150 flex items-start gap-3 cursor-pointer ${optionStyles}`}
                    >
                      <span className="font-mono font-bold">{idx + 1}.</span>
                      <span className="flex-1">{option}</span>
                      
                      {userAns && isCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      )}
                      {userAns && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Nav actions */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 text-xs md:text-sm font-semibold text-slate-500 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Câu trước
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === questions.length - 1}
                  className="px-4 py-2 text-xs md:text-sm font-semibold text-slate-500 border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
                >
                  Câu sau
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Explanation card (Instant visibility once answered) */}
            {sessionAnswers[currentQ?.id] && currentQ?.explanation && (
              <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 space-y-2 animate-fade-in">
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

          {/* 3. Right: Fast matrix navigation */}
          <div className="space-y-4 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm h-fit">
            <h4 className="font-bold text-slate-800 font-display text-sm">
              Xem nhanh câu hỏi
            </h4>

            <div className="grid grid-cols-5 gap-2.5">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const userAns = sessionAnswers[q.id];
                
                let bgStyles = "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100";
                
                if (isCurrent) {
                  bgStyles = "bg-blue-600 text-white border-blue-600 shadow-md ring-4 ring-blue-100 font-bold";
                } else if (userAns) {
                  const isCorrect = userAns === q.answer;
                  bgStyles = isCorrect 
                    ? "bg-emerald-100 text-emerald-800 border-emerald-200" 
                    : "bg-red-100 text-red-800 border-red-200";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-11 rounded-xl border text-xs font-mono font-bold flex items-center justify-center relative cursor-pointer ${bgStyles}`}
                  >
                    {idx + 1}
                    {q.important && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-slate-50 pt-3 text-[10px] text-slate-400 space-y-2">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-emerald-100 border border-emerald-200 rounded-sm"></div>
                  <span>Trả lời đúng</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-100 border border-red-200 rounded-sm"></div>
                  <span>Trả lời sai</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-slate-100 border border-slate-200 rounded-sm"></div>
                  <span>Chưa trả lời</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                <span>Câu hỏi điểm liệt quan trọng</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

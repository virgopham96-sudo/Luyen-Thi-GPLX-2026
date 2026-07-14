import React, { useState, useEffect } from 'react';
import { BookOpen, Award, ShieldCheck, Heart, UserCheck } from 'lucide-react';
import Home from './components/Home';
import ExamSession from './components/ExamSession';
import TopicReview from './components/TopicReview';
import SignboardsLookUp from './components/SignboardsLookUp';
import LawsLookUp from './components/LawsLookUp';
import TipsCarousel from './components/TipsCarousel';
import { TopicKey, LicenseClassId } from './types';
import { LICENSE_CLASSES } from './data/licenses';

type ActiveView = 'home' | 'exam' | 'review' | 'signs' | 'laws' | 'tips';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedTopic, setSelectedTopic] = useState<TopicKey>('toanBo');
  const [selectedExamIndex, setSelectedExamIndex] = useState<number | undefined>(undefined);
  const [userProgress, setUserProgress] = useState<Record<number, boolean>>({});
  const [licenseClass, setLicenseClass] = useState<LicenseClassId>(() => {
    try {
      const saved = localStorage.getItem('gplx_license_class');
      return (saved as LicenseClassId) || 'A1';
    } catch {
      return 'A1';
    }
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gplx_user_progress');
      if (saved) {
        setUserProgress(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load user progress', e);
    }
  }, []);

  // Save license class changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gplx_license_class', licenseClass);
    } catch (e) {
      console.error('Failed to save license class', e);
    }
  }, [licenseClass]);

  // Save progress changes to localStorage
  const handleSaveProgress = (questionId: number, isCorrect: boolean) => {
    setUserProgress(prev => {
      const updated = {
        ...prev,
        [questionId]: isCorrect
      };
      try {
        localStorage.setItem('gplx_user_progress', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save user progress', e);
      }
      return updated;
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả lịch sử ôn tập để học lại từ đầu?')) {
      setUserProgress({});
      try {
        localStorage.removeItem('gplx_user_progress');
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleStartExam = (examIndex?: number) => {
    setSelectedExamIndex(examIndex);
    setActiveView('exam');
  };

  const handleSelectTopic = (topic: TopicKey) => {
    setSelectedTopic(topic);
    setActiveView('review');
  };

  const handleSelectResource = (view: 'signs' | 'laws' | 'tips' | 'practical') => {
    if (view === 'signs') {
      setActiveView('signs');
    } else if (view === 'laws') {
      setActiveView('laws');
    } else {
      setActiveView('tips');
    }
  };

  const currentConfig = LICENSE_CLASSES.find(lc => lc.id === licenseClass) || LICENSE_CLASSES[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          <div 
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 select-none flex-shrink-0"
          >
            <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg sm:rounded-xl shadow-md text-white flex-shrink-0">
              <Award className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex-shrink-0">
              <span className="font-extrabold text-slate-800 font-display tracking-tight text-sm sm:text-base md:text-lg block leading-none">
                Luyện Thi GPLX
              </span>
              <span className="text-[10px] text-slate-400 font-medium font-sans mt-1 hidden sm:block">
                Trợ lý ôn thi lý thuyết 600 câu hỏi
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 min-w-0">
            {/* Header License Selector */}
            <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
              <span className="text-xs text-slate-400 font-semibold hidden md:inline">Đang ôn:</span>
              <select
                id="license-selector-header"
                value={licenseClass}
                onChange={(e) => setLicenseClass(e.target.value as LicenseClassId)}
                className="bg-slate-100 border border-slate-200 text-slate-700 text-[11px] sm:text-xs font-extrabold rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer max-w-[125px] sm:max-w-none"
              >
                {LICENSE_CLASSES.map(lc => (
                  <option key={lc.id} value={lc.id}>
                    Hạng {lc.id} ({lc.totalQuestions} câu)
                  </option>
                ))}
              </select>
            </div>

            {Object.keys(userProgress).length > 0 && (
              <button
                onClick={handleResetProgress}
                className="text-xs text-red-500 hover:text-red-700 font-semibold bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full border border-red-100 transition-colors cursor-pointer hidden sm:inline-block"
              >
                Xóa lịch sử ôn
              </button>
            )}
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-emerald-100 font-extrabold flex-shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">Chính xác 100%</span>
              <span className="sm:hidden">100%</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {activeView === 'home' && (
          <Home
            licenseClass={licenseClass}
            onLicenseClassChange={setLicenseClass}
            onStartExam={handleStartExam}
            onSelectTopic={handleSelectTopic}
            onSelectResource={handleSelectResource}
            userProgress={userProgress as any}
          />
        )}

        {activeView === 'exam' && (
          <ExamSession
            licenseClass={licenseClass}
            examIndex={selectedExamIndex}
            onBack={() => {
              setActiveView('home');
              setSelectedExamIndex(undefined);
            }}
            onSaveProgress={handleSaveProgress}
          />
        )}

        {activeView === 'review' && (
          <TopicReview
            licenseClass={licenseClass}
            topicKey={selectedTopic}
            onBack={() => setActiveView('home')}
            onSaveProgress={handleSaveProgress}
            userProgress={userProgress}
          />
        )}

        {activeView === 'signs' && (
          <SignboardsLookUp
            onBack={() => setActiveView('home')}
          />
        )}

        {activeView === 'laws' && (
          <LawsLookUp
            onBack={() => setActiveView('home')}
          />
        )}



        {activeView === 'tips' && (
          <TipsCarousel
            licenseClass={licenseClass}
            onBack={() => setActiveView('home')}
          />
        )}
      </main>

      {/* 3. Footer Bar */}
      <footer className="bg-white border-t border-slate-100 py-6 mt-12 text-slate-400 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-500 flex items-center justify-center gap-1 font-display">
            Hệ thống ôn luyện thi lý thuyết lái xe Việt Nam - {currentConfig.name} ({currentConfig.totalQuestions} câu hỏi)
          </p>
          <p className="text-slate-400">
            Dữ liệu câu hỏi điểm liệt, biển báo, sa hình được cập nhật theo bộ 600 câu hỏi chuẩn Bộ Giao Thông Vận Tải.
          </p>
          <div className="flex items-center justify-center gap-1.5 pt-2 text-slate-300">
            <span>Thiết kế tối giản và hiện đại</span>
            <span>•</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>•</span>
            <span>Tự tin đạt kết quả tuyệt đối</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

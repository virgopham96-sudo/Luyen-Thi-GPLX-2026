import React from 'react';
import { BookOpen, Flame, FileText, Users, Sliders, Settings, Signpost, Compass, Award, HelpCircle, ArrowRight, CheckCircle2, X, Car, Trash2 } from 'lucide-react';
import { QUESTIONS, TOPICS } from '../data/questions';
import { LICENSE_CLASSES, filterQuestionsForLicense, isQuestionCritical, generateFixedExamQuestions } from '../data/licenses';
import { TopicKey, LicenseClassId } from '../types';

interface HomeProps {
  licenseClass: LicenseClassId;
  onLicenseClassChange: (licenseClass: LicenseClassId) => void;
  onStartExam: (examIndex?: number) => void;
  onSelectTopic: (topic: TopicKey) => void;
  onSelectResource: (view: 'signs' | 'laws' | 'tips' | 'practical') => void;
  userProgress: Record<number, boolean>; // questionId -> isCorrect
  onResetProgress: () => void;
}

export default function Home({ 
  licenseClass, 
  onLicenseClassChange, 
  onStartExam, 
  onSelectTopic, 
  onSelectResource, 
  userProgress,
  onResetProgress
}: HomeProps) {
  const [showFixedExams, setShowFixedExams] = React.useState(false);

  // Filter questions for active license class
  const licenseQuestions = filterQuestionsForLicense(QUESTIONS, licenseClass);
  const totalQuestionsCount = licenseQuestions.length;

  // Calculate user progress on filtered questions
  const answeredInLicense = Object.entries(userProgress).filter(([id]) => {
    const qId = parseInt(id);
    return licenseQuestions.some(q => q.id === qId);
  });
  
  const totalQuestionsAnswered = answeredInLicense.length;
  const progressPercentage = totalQuestionsCount > 0 
    ? Math.round((totalQuestionsAnswered / totalQuestionsCount) * 100) 
    : 0;

  // Helper to map icon name to Lucide Component
  const renderTopicIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-white" };
    switch (iconName) {
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Flame': return <Flame {...props} className="w-6 h-6 text-orange-200 animate-pulse" />;
      case 'FileText': return <FileText {...props} />;
      case 'Users': return <Users {...props} />;
      case 'Sliders': return <Sliders {...props} />;
      case 'Settings': return <Settings {...props} />;
      case 'Signpost': return <Signpost {...props} />;
      case 'Compass': return <Compass {...props} />;
      default: return <HelpCircle {...props} />;
    }
  };

  const getTopicColor = (key: TopicKey) => {
    switch (key) {
      case 'toanBo': return 'from-indigo-500 to-indigo-600';
      case 'diemLiet': return 'from-red-500 to-orange-600 shadow-md ring-2 ring-red-300';
      case 'khaiNiemQuyTac': return 'from-emerald-500 to-teal-600';
      case 'vanHoaDaoDuc': return 'from-blue-500 to-indigo-600';
      case 'kiThuatLaiXe': return 'from-amber-500 to-orange-600';
      case 'cauTaoSuaChua': return 'from-slate-500 to-slate-600';
      case 'bienBao': return 'from-cyan-500 to-blue-600';
      case 'saHinh': return 'from-violet-500 to-purple-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const currentConfig = LICENSE_CLASSES.find(lc => lc.id === licenseClass) || LICENSE_CLASSES[0];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="bg-amber-400 text-slate-900 text-xs sm:text-sm font-black tracking-wider px-2.5 py-1 rounded-lg uppercase shadow-xs">
              {currentConfig.name}
            </span>
            <div className="space-y-0.5">
              <h1 className="text-sm sm:text-base font-extrabold font-display leading-none">
                {currentConfig.totalQuestions} câu hỏi mới nhất
              </h1>
              <p className="text-[10px] sm:text-xs text-blue-100/90 font-medium">
                Học lý thuyết & thực hành lái xe Việt Nam
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl px-3 py-1.5 w-full sm:max-w-[260px] sm:ml-auto">
            <Award className="w-4.5 h-4.5 text-amber-300 flex-shrink-0 animate-pulse" />
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center text-[10px] font-bold text-blue-100 leading-none">
                <span>Tiến độ: {totalQuestionsAnswered}/{totalQuestionsCount} câu</span>
                <span>{progressPercentage}%</span>
              </div>
              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="pt-1 flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (totalQuestionsAnswered > 0) {
                      onResetProgress();
                    }
                  }}
                  disabled={totalQuestionsAnswered === 0}
                  className={`text-[9px] font-extrabold transition-all flex items-center gap-1 select-none ${
                    totalQuestionsAnswered > 0
                      ? 'text-red-200 hover:text-white cursor-pointer'
                      : 'text-blue-300/50 cursor-not-allowed'
                  }`}
                  title={totalQuestionsAnswered > 0 ? "Xóa toàn bộ lịch sử ôn tập và thi thử" : "Chưa có tiến độ học tập để xóa"}
                >
                  <Trash2 className="w-2.5 h-2.5" />
                  <span>Xóa lịch sử ôn & thi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Grid of Topics & Fixed Exam Sets */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 font-display">
            Học tập & Ôn luyện ({currentConfig.name})
          </h2>
          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
            Chọn hình thức ôn tập phù hợp
          </span>
        </div>

        {/* Top Section: Ôn tập toàn bộ next to Luyện thi theo bộ đề & Thi đề ngẫu nhiên */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Left: Ôn tập toàn bộ */}
          <div className="flex flex-col">
            {(() => {
              const topic = TOPICS.find(t => t.key === 'toanBo')!;
              const topicQuestions = licenseQuestions;
              const topicCount = topicQuestions.length;
              const answeredCount = Object.entries(userProgress).filter(([id]) => {
                const qId = parseInt(id);
                return topicQuestions.some(q => q.id === qId);
              }).length;
              const topicProgressPct = Math.round((answeredCount / topicCount) * 100) || 0;

              return (
                <div
                  id={`topic-card-${topic.key}`}
                  onClick={() => onSelectTopic(topic.key)}
                  className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group h-full"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${getTopicColor(topic.key)} shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                        {renderTopicIcon(topic.icon)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors font-display text-base">
                          {topic.name}
                        </h3>
                        <span className="text-xs text-slate-400 font-medium">
                          {topicCount} câu hỏi
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed pr-2">
                      {topic.description}
                    </p>
                  </div>

                  <div className="mt-5 space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400">
                      <span>Đã ôn: {answeredCount}/{topicCount} câu</span>
                      <span className="text-slate-500">{topicProgressPct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${topicProgressPct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Middle: Luyện thi theo bộ đề cố định */}
          <div className="flex flex-col">
            {(() => {
              const totalExamsCount = (licenseClass === 'A1' || licenseClass === 'A') ? 10 : 20;
              let completedExamsCount = 0;
              for (let i = 0; i < totalExamsCount; i++) {
                const examQuestions = generateFixedExamQuestions(QUESTIONS, licenseClass, i);
                const answeredInSet = examQuestions.filter(q => userProgress[q.id] !== undefined).length;
                if (answeredInSet === examQuestions.length) {
                  completedExamsCount++;
                }
              }
              const progressPct = totalExamsCount > 0 ? Math.round((completedExamsCount / totalExamsCount) * 100) : 0;

              return (
                <div
                  id="fixed-exams-trigger-card"
                  onClick={() => setShowFixedExams(true)}
                  className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group h-full"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-600 shadow-sm group-hover:scale-105 transition-transform duration-200">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors font-display text-base">
                          Luyện thi theo bộ đề
                        </h3>
                        <span className="text-xs text-slate-400 font-medium">
                          {totalExamsCount} bộ đề cố định
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed pr-2">
                      {licenseClass === 'A1' || licenseClass === 'A' 
                        ? 'Danh sách 10 bộ đề thi cố định, bao phủ toàn bộ 250 câu hỏi của hạng đề.' 
                        : `Danh sách 20 bộ đề thi cố định, bao phủ toàn bộ câu hỏi của hạng ${currentConfig.name}.`}
                    </p>
                  </div>

                  <div className="mt-5 space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400">
                      <span>Đã xong: {completedExamsCount}/{totalExamsCount} đề</span>
                      <span className="text-slate-500">{progressPct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Right: Thi đề ngẫu nhiên */}
          <div className="flex flex-col">
            <div
              id="random-exam-trigger-card"
              onClick={() => onStartExam()}
              className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group h-full animate-fade-in"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-sm group-hover:scale-105 transition-transform duration-200">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors font-display text-base">
                      Thi đề ngẫu nhiên
                    </h3>
                    <span className="text-xs text-slate-400 font-medium">
                      Chuẩn cấu trúc đề sát hạch
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pr-2">
                  Đề thi ngẫu nhiên hạng {currentConfig.name} gồm {currentConfig.examQuestionsCount} câu làm trong {currentConfig.examTime / 60} phút. Đạt tối thiểu {currentConfig.passScore} câu và không sai câu điểm liệt.
                </p>
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400">
                  <span>Yêu cầu đạt: {currentConfig.passScore}/{currentConfig.examQuestionsCount} câu</span>
                  <span className="text-slate-500">{Math.round((currentConfig.passScore / currentConfig.examQuestionsCount) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.round((currentConfig.passScore / currentConfig.examQuestionsCount) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Topics Section (excluding toanBo) */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-slate-700 font-display text-sm">
            Học chi tiết theo nhóm câu hỏi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOPICS.filter(t => t.key !== 'toanBo').map((topic) => {
              const topicKey = topic.key;
              
              // Filter questions for this topic for the active license
              const topicQuestions = licenseQuestions.filter(q => {
                if (topicKey === 'diemLiet') return isQuestionCritical(q.id, licenseClass);
                return q.topic === topicKey;
              });
              
              const topicCount = topicQuestions.length;

              // If a topic has 0 questions for this license class (e.g. Cấu tạo sửa chữa for A1), hide it!
              if (topicCount === 0) return null;

              const answeredCount = Object.entries(userProgress).filter(([id]) => {
                const qId = parseInt(id);
                return topicQuestions.some(q => q.id === qId);
              }).length;

              const topicProgressPct = Math.round((answeredCount / topicCount) * 100) || 0;

              return (
                <div
                  id={`topic-card-${topic.key}`}
                  key={topic.key}
                  onClick={() => onSelectTopic(topic.key)}
                  className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${getTopicColor(topic.key)} shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                        {renderTopicIcon(topic.icon)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors font-display text-base">
                          {topic.name}
                        </h4>
                        <span className="text-xs text-slate-400 font-medium">
                          {topicCount} câu hỏi
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  <div className="mt-5 space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400">
                      <span>Đã ôn: {answeredCount}/{topicCount} câu</span>
                      <span className="text-slate-500">{topicProgressPct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${topicProgressPct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Practical Guides and Extra Resources */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 font-display">
          Tra cứu nhanh & Mẹo thi
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {/* Look Up Signs */}
          <div 
            id="resource-signs"
            onClick={() => onSelectResource('signs')}
            className="bg-white rounded-2xl border border-slate-100 p-3.5 sm:p-5 hover:border-cyan-200 hover:shadow-md transition-all duration-200 cursor-pointer text-center space-y-2 sm:space-y-3 flex flex-col justify-center items-center group"
          >
            <div className="p-3 sm:p-4 rounded-full bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100 group-hover:scale-110 transition-all duration-200">
              <Signpost className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="font-bold text-slate-800 font-display text-xs sm:text-sm">Tra Cứu Biển Báo</h3>
              <p className="text-[10px] sm:text-xs text-slate-400 line-clamp-2">Học nghĩa biển cấm, cảnh báo, hiệu lệnh</p>
            </div>
          </div>

          {/* Look Up Laws */}
          <div 
            id="resource-laws"
            onClick={() => onSelectResource('laws')}
            className="bg-white rounded-2xl border border-slate-100 p-3.5 sm:p-5 hover:border-teal-200 hover:shadow-md transition-all duration-200 cursor-pointer text-center space-y-2 sm:space-y-3 flex flex-col justify-center items-center group"
          >
            <div className="p-3 sm:p-4 rounded-full bg-teal-50 text-teal-600 group-hover:bg-teal-100 group-hover:scale-110 transition-all duration-200">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="font-bold text-slate-800 font-display text-xs sm:text-sm">Tra Cứu Luật & Phạt</h3>
              <p className="text-[10px] sm:text-xs text-slate-400 line-clamp-2">Các lỗi và mức phạt cồn, lùi xe, tốc độ</p>
            </div>
          </div>

          {/* Tips Carousel */}
          <div 
            id="resource-tips"
            onClick={() => onSelectResource('tips')}
            className="bg-white rounded-2xl border border-slate-100 p-3.5 sm:p-5 hover:border-amber-200 hover:shadow-md transition-all duration-200 cursor-pointer text-center space-y-2 sm:space-y-3 flex flex-col justify-center items-center group"
          >
            <div className="p-3 sm:p-4 rounded-full bg-amber-50 text-amber-600 group-hover:bg-amber-100 group-hover:scale-110 transition-all duration-200">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="font-bold text-slate-800 font-display text-xs sm:text-sm">Mẹo Thi Lý Thuyết</h3>
              <p className="text-[10px] sm:text-xs text-slate-400 line-clamp-2">Học nhanh các cụm từ khóa ăn điểm</p>
            </div>
          </div>

          {/* Practical Exam */}
          <div 
            id="resource-practical"
            onClick={() => onSelectResource('practical')}
            className="bg-white rounded-2xl border border-slate-100 p-3.5 sm:p-5 hover:border-violet-200 hover:shadow-md transition-all duration-200 cursor-pointer text-center space-y-2 sm:space-y-3 flex flex-col justify-center items-center group"
          >
            <div className="p-3 sm:p-4 rounded-full bg-violet-50 text-violet-600 group-hover:bg-violet-100 group-hover:scale-110 transition-all duration-200">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="font-bold text-slate-800 font-display text-xs sm:text-sm">Thi Thực Hành</h3>
              <p className="text-[10px] sm:text-xs text-slate-400 line-clamp-2">Cách đi vòng số 8, lùi chuồng dọc/ngang</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Exams Modal */}
      {showFixedExams && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full p-4 sm:p-6 md:p-8 relative border border-slate-100 max-h-[85vh] overflow-y-auto flex flex-col gap-4 sm:gap-6">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 sm:pb-4">
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2 text-slate-800">
                  <BookOpen className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-blue-600" />
                  <h3 className="font-extrabold font-display text-base sm:text-lg md:text-xl text-slate-900 leading-tight">
                    Luyện thi bộ đề cố định ({currentConfig.name})
                  </h3>
                </div>
                <p className="text-slate-500 text-[10px] sm:text-xs">
                  {licenseClass === 'A1' || licenseClass === 'A' 
                    ? 'Danh sách 10 bộ đề thi cố định, bao phủ toàn bộ 250 câu hỏi của hạng đề' 
                    : `Danh sách 20 bộ đề thi cố định, bao phủ toàn bộ câu hỏi của hạng ${currentConfig.name}`}
                </p>
              </div>
              <button
                onClick={() => setShowFixedExams(false)}
                className="p-1.5 sm:p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-colors cursor-pointer flex-shrink-0"
              >
                <X className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Content: Grid of Exam Sets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Array.from({ length: (licenseClass === 'A1' || licenseClass === 'A') ? 10 : 20 }).map((_, i) => {
                const examQuestions = generateFixedExamQuestions(QUESTIONS, licenseClass, i);
                const answeredInSet = examQuestions.filter(q => userProgress[q.id] !== undefined);
                const correctInSet = examQuestions.filter(q => userProgress[q.id] === true);
                
                const isCompleted = answeredInSet.length === examQuestions.length;
                const totalCorrect = correctInSet.length;
                const missedCritical = examQuestions.filter(q => isQuestionCritical(q.id, licenseClass)).some(q => userProgress[q.id] === false);
                const passed = totalCorrect >= currentConfig.passScore && !missedCritical;
                
                let btnClass = "bg-white hover:border-blue-300 border-slate-100 text-slate-700 hover:bg-slate-50";
                let statusDot = <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>;
                let statusLabel = "Chưa làm";
                
                if (answeredInSet.length > 0) {
                  if (isCompleted) {
                    if (passed) {
                      btnClass = "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800 font-bold";
                      statusDot = <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>;
                      statusLabel = `Đạt: ${totalCorrect}/${examQuestions.length}`;
                    } else {
                      btnClass = "bg-red-50 hover:bg-red-100 border-red-200 text-red-800 font-bold";
                      statusDot = <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>;
                      statusLabel = "Không đạt";
                    }
                  } else {
                    btnClass = "bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800 font-bold";
                    statusDot = <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>;
                    statusLabel = `Đang làm: ${answeredInSet.length}/${examQuestions.length}`;
                  }
                }

                return (
                  <button
                    id={`modal-fixed-exam-btn-${i}`}
                    key={i}
                    onClick={() => {
                      setShowFixedExams(false);
                      onStartExam(i);
                    }}
                    className={`py-2 sm:py-3 px-2 sm:px-4 rounded-xl sm:rounded-2xl border text-xs sm:text-sm transition-all duration-150 cursor-pointer flex flex-col justify-between items-center text-center gap-1 sm:gap-2 shadow-sm ${btnClass}`}
                  >
                    <span className="font-extrabold font-display text-sm sm:text-base">Đề số {i + 1}</span>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold flex items-center gap-1 sm:gap-1.5 truncate max-w-full">
                      {statusDot}
                      {statusLabel}
                    </span>
                  </button>
                );
              })}
            </div>
            
            {/* Footer */}
            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowFixedExams(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

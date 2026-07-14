import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Search, FileText, ChevronDown, ChevronUp, ShieldAlert, 
  Award, Bot, MessageSquare, Send, Sparkles, Trash2, Scale, Car, Bike, Info, AlertTriangle
} from 'lucide-react';

interface LawItem {
  id: string;
  title: string;
  violation: string;
  penaltyCar: string;
  penaltyMoto: string;
  additionalCar: string;
  additionalMoto: string;
  pointCar?: string;
  pointMoto?: string;
  category: 'speed' | 'alcohol' | 'behavior' | 'document';
  citationCar: string;
  citationMoto: string;
  tip: string;
}

const LAWS_DATA: LawItem[] = [
  {
    id: 'l1',
    title: 'Nồng độ cồn mức 1 (Chưa vượt quá 0.25 mg/l khí thở)',
    violation: 'Điều khiển phương tiện tham gia giao thông mà trong máu hoặc hơi thở có nồng độ cồn nhưng chưa vượt quá 50 mg/100 ml máu hoặc chưa vượt quá 0.25 mg/l khí thở.',
    penaltyCar: 'Phạt tiền từ 6.000.000đ - 8.000.000đ',
    penaltyMoto: 'Phạt tiền từ 2.000.000đ - 3.000.000đ',
    additionalCar: 'Tước GPLX từ 10 - 12 tháng. Tạm giữ xe đến 7 ngày.',
    additionalMoto: 'Tước GPLX từ 10 - 12 tháng. Tạm giữ xe đến 7 ngày.',
    pointCar: 'Trừ 2 điểm Giấy phép lái xe (quy định mới)',
    pointMoto: 'Trừ 2 điểm Giấy phép lái xe (quy định mới)',
    category: 'alcohol',
    citationCar: 'Nghị định 100/2019/NĐ-CP, Điều 5, Khoản 6, Điểm c',
    citationMoto: 'Nghị định 100/2019/NĐ-CP, Điều 6, Khoản 6, Điểm c',
    tip: 'Chỉ cần uống một ngụm bia nhỏ, máy đo hơi thở của Cảnh sát giao thông đã có thể ghi nhận trị số vượt mức 0!'
  },
  {
    id: 'l2',
    title: 'Nồng độ cồn mức 2 (Vượt quá 0.25 mg/l đến 0.4 mg/l)',
    violation: 'Điều khiển phương tiện giao thông trên đường mà trong máu hoặc hơi thở có nồng độ cồn vượt quá 50 mg đến 80 mg/100 ml máu hoặc vượt quá 0.25 mg đến 0.40 mg/l khí thở.',
    penaltyCar: 'Phạt tiền từ 16.000.000đ - 18.000.000đ',
    penaltyMoto: 'Phạt tiền từ 4.000.000đ - 5.000.000đ',
    additionalCar: 'Tước GPLX từ 16 - 18 tháng. Tạm giữ xe đến 7 ngày.',
    additionalMoto: 'Tước GPLX từ 16 - 18 tháng. Tạm giữ xe đến 7 ngày.',
    pointCar: 'Trừ 10 điểm Giấy phép lái xe',
    pointMoto: 'Trừ 10 điểm Giấy phép lái xe',
    category: 'alcohol',
    citationCar: 'Nghị định 100/2019/NĐ-CP, Điều 5, Khoản 7, Điểm c',
    citationMoto: 'Nghị định 100/2019/NĐ-CP, Điều 6, Khoản 7, Điểm c',
    tip: 'Tương đương với khoảng 2-3 lon bia tiêu chuẩn đối với một nam giới khỏe mạnh trong vòng 1-2 tiếng.'
  },
  {
    id: 'l3',
    title: 'Nồng độ cồn mức 3 (Vượt quá 0.4 mg/l khí thở - Kịch khung)',
    violation: 'Điều khiển phương tiện giao thông trên đường mà trong máu hoặc hơi thở có nồng độ cồn vượt quá 80 mg/100 ml máu hoặc vượt quá 0.40 mg/l khí thở.',
    penaltyCar: 'Phạt tiền từ 30.000.000đ - 40.000.000đ',
    penaltyMoto: 'Phạt tiền từ 6.000.000đ - 8.000.000đ',
    additionalCar: 'Tước GPLX từ 22 - 24 tháng. Tạm giữ xe đến 7 ngày.',
    additionalMoto: 'Tước GPLX từ 22 - 24 tháng. Tạm giữ xe đến 7 ngày.',
    pointCar: 'Trừ hết 12 điểm Giấy phép lái xe (Thu hồi bằng lái)',
    pointMoto: 'Trừ hết 12 điểm Giấy phép lái xe (Thu hồi bằng lái)',
    category: 'alcohol',
    citationCar: 'Nghị định 100/2019/NĐ-CP, Điều 5, Khoản 8, Điểm a',
    citationMoto: 'Nghị định 100/2019/NĐ-CP, Điều 6, Khoản 8, Điểm e',
    tip: 'Đây là lỗi phạt nặng nhất về nồng độ cồn. Hãy sử dụng taxi hoặc xe ôm công nghệ để ra về sau khi liên hoan.'
  },
  {
    id: 'l4',
    title: 'Chạy quá tốc độ từ 5 km/h đến dưới 10 km/h',
    violation: 'Điều khiển phương tiện chạy quá tốc độ quy định cho phép từ 5 km/h đến dưới 10 km/h.',
    penaltyCar: 'Phạt tiền từ 800.000đ - 1.000.000đ',
    penaltyMoto: 'Phạt tiền từ 300.000đ - 400.000đ',
    additionalCar: 'Không áp dụng tước bằng lái.',
    additionalMoto: 'Không áp dụng tước bằng lái.',
    category: 'speed',
    citationCar: 'Nghị định 100/2019/NĐ-CP, Điều 5, Khoản 3, Điểm a',
    citationMoto: 'Nghị định 100/2019/NĐ-CP, Điều 6, Khoản 3, Điểm a',
    tip: 'Dưới 5 km/h so với tốc độ quy định sẽ bị cảnh cáo nhắc nhở bằng lời nói, chưa bị phạt tiền.'
  },
  {
    id: 'l5',
    title: 'Chạy quá tốc độ từ 10 km/h đến 20 km/h',
    violation: 'Điều khiển phương tiện chạy quá tốc độ quy định cho phép từ 10 km/h đến 20 km/h.',
    penaltyCar: 'Phạt tiền từ 4.000.000đ - 6.000.000đ',
    penaltyMoto: 'Phạt tiền từ 800.000đ - 1.000.000đ',
    additionalCar: 'Tước GPLX từ 1 - 3 tháng.',
    additionalMoto: 'Không áp dụng tước bằng lái (Chỉ phạt tiền).',
    category: 'speed',
    citationCar: 'Nghị định 100/2019/NĐ-CP, Điều 5, Khoản 5, Điểm i',
    citationMoto: 'Nghị định 100/2019/NĐ-CP, Điều 6, Khoản 4, Điểm a',
    tip: 'Luôn chú ý biển báo R.420 (Bắt đầu khu đông dân cư) để chủ động giảm tốc độ xuống 50km/h (đường đôi) hoặc 40km/h.'
  },
  {
    id: 'l6',
    title: 'Chạy quá tốc độ trên 20 km/h đến 35 km/h (Ô tô) hoặc trên 20 km/h (Xe máy)',
    violation: 'Điều khiển phương tiện chạy quá tốc độ quy định cho phép trên 20 km/h đến 35 km/h (đối với ô tô) hoặc trên 20 km/h (đối với xe máy).',
    penaltyCar: 'Phạt tiền từ 6.000.000đ - 8.000.000đ',
    penaltyMoto: 'Phạt tiền từ 4.000.000đ - 5.000.000đ',
    additionalCar: 'Tước GPLX từ 2 - 4 tháng.',
    additionalMoto: 'Tước GPLX từ 2 - 4 tháng.',
    category: 'speed',
    citationCar: 'Nghị định 100/2019/NĐ-CP, Điều 5, Khoản 6, Điểm a',
    citationMoto: 'Nghị định 100/2019/NĐ-CP, Điều 6, Khoản 7, Điểm a',
    tip: 'Đây là mức quá tốc độ cực kỳ nguy hiểm, cả xe máy và ô tô đều bị tạm giữ bằng lái từ 2 đến 4 tháng.'
  },
  {
    id: 'l7',
    title: 'Không chấp hành tín hiệu đèn giao thông (Vượt đèn đỏ, đèn vàng)',
    violation: 'Không chấp hành hiệu lệnh của đèn tín hiệu giao thông khi đèn đã chuyển sang màu đỏ hoặc màu vàng (trừ trường hợp đã đi quá vạch dừng).',
    penaltyCar: 'Phạt tiền từ 4.000.000đ - 6.000.000đ',
    penaltyMoto: 'Phạt tiền từ 800.000đ - 1.000.000đ',
    additionalCar: 'Tước GPLX từ 1 - 3 tháng (Tước 2 - 4 tháng nếu gây tai nạn).',
    additionalMoto: 'Tước GPLX từ 1 - 3 tháng (Tước 2 - 4 tháng nếu gây tai nạn).',
    category: 'behavior',
    citationCar: 'Nghị định 100/2019/NĐ-CP, Điều 5, Khoản 5, Điểm đ',
    citationMoto: 'Nghị định 100/2019/NĐ-CP, Điều 6, Khoản 4, Điểm g',
    tip: 'Đèn vàng báo hiệu chuẩn bị chuyển sang đèn đỏ, lái xe bắt buộc phải giảm tốc độ dừng trước vạch, cố tình tăng ga vượt đèn vàng sẽ phạt tương đương vượt đèn đỏ.'
  },
  {
    id: 'l8',
    title: 'Đi ngược chiều đường một chiều hoặc đi vào đường cấm',
    violation: 'Đi ngược chiều của đường một chiều, đi ngược chiều trên đường có biển "Cấm đi ngược chiều" hoặc đi vào đường có biển báo cấm phương tiện đang điều khiển.',
    penaltyCar: 'Phạt tiền từ 4.000.000đ - 6.000.000đ',
    penaltyMoto: 'Phạt tiền từ 1.000.000đ - 2.000.000đ',
    additionalCar: 'Tước GPLX từ 2 - 4 tháng.',
    additionalMoto: 'Tước GPLX từ 1 - 3 tháng.',
    category: 'behavior',
    citationCar: 'Nghị định 100/2019/NĐ-CP, Điều 5, Khoản 5, Điểm c',
    citationMoto: 'Nghị định 100/2019/NĐ-CP, Điều 6, Khoản 5, Điểm a',
    tip: 'Riêng đối với hành vi đi ngược chiều trên đường cao tốc, ô tô bị phạt cực nặng từ 16-18 triệu đồng và tước bằng lái 5-7 tháng.'
  },
  {
    id: 'l9',
    title: 'Sử dụng điện thoại di động khi đang điều khiển phương tiện',
    violation: 'Người điều khiển phương tiện sử dụng điện thoại di động, thiết bị âm thanh (trừ thiết bị trợ thính đối với người đi xe máy) khi đang di chuyển trên đường.',
    penaltyCar: 'Phạt tiền từ 2.000.000đ - 3.000.000đ',
    penaltyMoto: 'Phạt tiền từ 800.000đ - 1.000.000đ',
    additionalCar: 'Tước GPLX từ 1 - 3 tháng (Tước 2 - 4 tháng nếu gây tai nạn).',
    additionalMoto: 'Tước GPLX từ 1 - 3 tháng (Tước 2 - 4 tháng nếu gây tai nạn).',
    category: 'behavior',
    citationCar: 'Nghị định 100/2019/NĐ-CP, Điều 5, Khoản 4, Điểm a',
    citationMoto: 'Nghị định 100/2019/NĐ-CP, Điều 6, Khoản 4, Điểm h',
    tip: 'Hãy tấp xe vào lề đường, dừng hẳn xe ở vị trí an toàn trước khi cầm điện thoại để kiểm tra bản đồ hoặc nhận cuộc gọi.'
  },
  {
    id: 'l10',
    title: 'Không mang theo hoặc Không có Giấy phép lái xe (GPLX)',
    violation: 'Không mang theo Giấy phép lái xe hoặc Không có Giấy phép lái xe (chưa thi bằng hoặc bằng lái không hợp lệ/đã bị thu hồi) khi tham gia giao thông.',
    penaltyCar: 'Quên mang: Phạt 200k - 400k. Không có: Phạt 10.000.000đ - 12.000.000đ',
    penaltyMoto: 'Quên mang: Phạt 100k - 200k. Không có: Phạt 1.000.000đ - 2.000.000đ (dưới 175cc) hoặc 4tr - 5tr (trên 175cc)',
    additionalCar: 'Tạm giữ xe tối đa 7 ngày để xác minh.',
    additionalMoto: 'Tạm giữ xe tối đa 7 ngày để xác minh.',
    category: 'document',
    citationCar: 'Nghị định 100/2019/NĐ-CP, Điều 21, Khoản 3 & Khoản 8',
    citationMoto: 'Nghị định 100/2019/NĐ-CP, Điều 21, Khoản 2, 5 & 7',
    tip: 'Khi bị kiểm tra, nếu bạn quên mang bằng lái thì biên bản sẽ tạm ghi lỗi không bằng lái. Bạn cần mang bằng lái gốc đến cơ quan chức năng để chứng minh và đổi sang lỗi quên mang bằng nhẹ hơn.'
  }
];

const PRESET_QUESTIONS = [
  "Ô tô vượt đèn đỏ bị phạt bao nhiêu tiền và giam bằng mấy tháng?",
  "Nồng độ cồn mức kịch khung của xe máy bị phạt bao nhiêu và có bị giữ xe không?",
  "Chạy xe máy quá tốc độ 15km/h bị phạt bao nhiêu? Có bị tước GPLX không?",
  "Lỗi quên mang bằng lái xe và không có bằng lái xe máy khác nhau thế nào?",
  "Quy định trừ điểm Giấy phép lái xe theo Luật mới 2024 hoạt động như thế nào?"
];

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export default function LawsLookUp({ onBack }: { onBack: () => void }) {
  // Directory Tab States
  const [activeCategory, setActiveCategory] = useState<'all' | 'speed' | 'alcohol' | 'behavior' | 'document'>('all');
  const [vehicleFilter, setVehicleFilter] = useState<'all' | 'car' | 'moto'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('l1');

  // Modal for showing citation detail
  const [activeCitation, setActiveCitation] = useState<string | null>(null);

  // Compile placeholders for dead code block
  const penaltyPlate = "";
  const penaltyVehicle = "1";
  const isSearchingPenalty = false;
  const penaltyError = null;
  const penaltyResult: any = null;
  const searchStep = 0;
  const handlePenaltySearch = (e: any) => {};
  const setPenaltyPlate = (val: any) => {};
  const setPenaltyVehicle = (val: any) => {};

  // Filtered Laws for Directory
  const filteredLaws = LAWS_DATA.filter(law => {
    const matchesCategory = activeCategory === 'all' || law.category === activeCategory;
    const matchesSearch = 
      law.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      law.violation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.penaltyCar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.penaltyMoto.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCitationClick = (citationText: string) => {
    setActiveCitation(citationText);
  };

  // Parse text into beautiful content with interactive citation badges and markdown bolding
  const renderFormattedText = (text: string) => {
    if (!text) return null;
    
    // Split by custom citations: [Nghị định/Luật...]
    const parts: any[] = [];
    let currentIndex = 0;
    const citationRegex = /\[(Nghị định [^,\]]+|Luật [^,\]]+)([^\]]*)\]/g;
    let match;
    
    while ((match = citationRegex.exec(text)) !== null) {
      const matchIndex = match.index;
      
      if (matchIndex > currentIndex) {
        parts.push({
          type: 'text',
          content: text.substring(currentIndex, matchIndex)
        });
      }
      
      parts.push({
        type: 'citation',
        source: match[1],
        details: match[2],
        full: match[0]
      });
      
      currentIndex = citationRegex.lastIndex;
    }
    
    if (currentIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.substring(currentIndex)
      });
    }
    
    if (parts.length === 0) {
      // Basic fallback with markdown-like bold handling
      return <div className="whitespace-pre-wrap leading-relaxed">{renderBoldText(text)}</div>;
    }
    
    return (
      <div className="whitespace-pre-wrap leading-relaxed">
        {parts.map((part, index) => {
          if (part.type === 'citation') {
            return (
              <button
                key={index}
                onClick={() => handleCitationClick(part.full)}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 mx-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-full transition-colors cursor-pointer select-none align-middle shadow-xs"
                title="Xem chi tiết nguồn luật"
              >
                <Scale className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                <span>{part.source}{part.details}</span>
              </button>
            );
          }
          return <span key={index}>{renderBoldText(part.content)}</span>;
        })}
      </div>
    );
  };

  // Helper to parse **bold** text in markdown format
  const renderBoldText = (txt: string) => {
    if (!txt) return "";
    const boldParts = txt.split(/\*\*([^*]+)\*\*/g);
    if (boldParts.length <= 1) return txt;
    
    return boldParts.map((subPart, subIndex) => {
      if (subIndex % 2 === 1) {
        return <strong key={subIndex} className="font-extrabold text-slate-900 bg-slate-100/60 px-1 rounded-sm">{subPart}</strong>;
      }
      return subPart;
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Navigation / Header */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-100 p-3 sm:p-4 gap-3 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Quay lại</span><span className="hidden xs:inline">trang chủ</span>
        </button>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100 truncate max-w-[160px] sm:max-w-none">
          <Scale className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 animate-pulse" />
          <span>Tra Cứu Luật & Phạt</span>
        </div>
      </div>

      <div className="space-y-6">
          {/* Controls Panel */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative flex items-center border border-slate-200 rounded-xl px-3 bg-slate-50/50 focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
                <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Tìm hành vi, mức phạt (Nồng độ cồn, chạy quá tốc độ, vượt đèn đỏ...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-2.5 pr-4 py-3 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>

              {/* Vehicle Type Switcher */}
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-stretch items-center">
                {[
                  { key: 'all', label: 'Tất cả xe', icon: Scale },
                  { key: 'car', label: 'Xe Ô tô', icon: Car },
                  { key: 'moto', label: 'Xe Máy', icon: Bike }
                ].map(vehicle => {
                  const IconComponent = vehicle.icon;
                  return (
                    <button
                      key={vehicle.key}
                      onClick={() => setVehicleFilter(vehicle.key as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        vehicleFilter === vehicle.key
                          ? 'bg-white text-slate-800 shadow-xs border border-slate-200'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      {vehicle.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Horizontal scroll tabs */}
            <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
              {[
                { key: 'all', label: 'Tất cả lỗi vi phạm' },
                { key: 'alcohol', label: 'Nồng độ cồn' },
                { key: 'speed', label: 'Chạy quá tốc độ' },
                { key: 'behavior', label: 'Hành vi vượt đèn/làn' },
                { key: 'document', label: 'Bằng lái & Giấy tờ xe' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key as any)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    activeCategory === tab.key
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/10'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Directory Results List */}
          <div className="space-y-4">
            {filteredLaws.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-slate-500 font-bold text-sm">Không tìm thấy hành vi vi phạm nào khớp.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="text-xs font-semibold text-emerald-600 hover:underline cursor-pointer"
                >
                  Đặt lại bộ lọc tìm kiếm
                </button>
              </div>
            ) : (
              filteredLaws.map(law => {
                const isExpanded = expandedId === law.id;

                return (
                  <div
                    key={law.id}
                    className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                      isExpanded ? 'border-emerald-200 ring-2 ring-emerald-500/5' : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    {/* Collapsed Header Bar */}
                    <div
                      onClick={() => toggleExpand(law.id)}
                      className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 select-none"
                    >
                      <div className="flex items-center gap-4 min-w-0 pr-2">
                        <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                          law.category === 'alcohol' ? 'bg-red-50 text-red-600' :
                          law.category === 'speed' ? 'bg-amber-50 text-amber-600' :
                          law.category === 'document' ? 'bg-blue-50 text-blue-600' :
                          'bg-emerald-50 text-emerald-600'
                        }`}>
                          <ShieldAlert className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-800 text-sm md:text-base leading-snug">
                            {law.title}
                          </h4>
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">
                            {law.category === 'alcohol' ? 'Lỗi nồng độ cồn' :
                             law.category === 'speed' ? 'Lỗi quá tốc độ' :
                             law.category === 'document' ? 'Lỗi giấy tờ xe' : 'Hành vi vi phạm'}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-400 bg-slate-100 p-1 rounded-full" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 bg-slate-50 p-1 rounded-full hover:bg-slate-100" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-slate-50 pt-4 space-y-4 bg-slate-50/20">
                        {/* Core Violation text */}
                        <div className="space-y-1">
                          <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider block">Hành vi mô tả chi tiết:</span>
                          <p className="text-slate-700 leading-relaxed font-medium text-xs md:text-sm">{law.violation}</p>
                        </div>

                        {/* Split Vehicles Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Ô TÔ COLUMN */}
                          {(vehicleFilter === 'all' || vehicleFilter === 'car') && (
                            <div className="bg-white border border-slate-100 rounded-2xl p-4 md:p-5 space-y-3.5 relative shadow-xs">
                              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                                <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs md:text-sm">
                                  <Car className="w-4 h-4 text-emerald-600" />
                                  <span>Dành cho xe Ô tô</span>
                                </div>
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                                  Ô tô
                                </span>
                              </div>

                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">Mức phạt hành chính:</span>
                                <p className="text-slate-800 font-bold text-sm leading-snug">{law.penaltyCar}</p>
                              </div>

                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Hình phạt bổ sung:</span>
                                <p className="text-slate-600 font-medium text-xs leading-relaxed">{law.additionalCar}</p>
                              </div>

                              {law.pointCar && (
                                <div className="space-y-1">
                                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">Điểm GPLX (Luật 2024):</span>
                                  <p className="text-amber-800 font-semibold text-xs">{law.pointCar}</p>
                                </div>
                              )}

                              <div className="pt-2 border-t border-slate-50 flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-50 -mx-4 -mb-4 px-4 py-2 rounded-b-2xl">
                                <Scale className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Căn cứ: <span className="text-slate-800 font-bold">{law.citationCar}</span></span>
                              </div>
                            </div>
                          )}

                          {/* XE MÁY COLUMN */}
                          {(vehicleFilter === 'all' || vehicleFilter === 'moto') && (
                            <div className="bg-white border border-slate-100 rounded-2xl p-4 md:p-5 space-y-3.5 relative shadow-xs">
                              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                                <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs md:text-sm">
                                  <Bike className="w-4 h-4 text-blue-600" />
                                  <span>Dành cho xe Máy</span>
                                </div>
                                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                                  Xe máy
                                </span>
                              </div>

                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">Mức phạt hành chính:</span>
                                <p className="text-slate-800 font-bold text-sm leading-snug">{law.penaltyMoto}</p>
                              </div>

                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Hình phạt bổ sung:</span>
                                <p className="text-slate-600 font-medium text-xs leading-relaxed">{law.additionalMoto}</p>
                              </div>

                              {law.pointMoto && (
                                <div className="space-y-1">
                                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">Điểm GPLX (Luật 2024):</span>
                                  <p className="text-amber-800 font-semibold text-xs">{law.pointMoto}</p>
                                </div>
                              )}

                              <div className="pt-2 border-t border-slate-50 flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-50 -mx-4 -mb-4 px-4 py-2 rounded-b-2xl">
                                <Scale className="w-3.5 h-3.5 text-blue-600" />
                                <span>Căn cứ: <span className="text-slate-800 font-bold">{law.citationMoto}</span></span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Tip advice section */}
                        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
                          <Award className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5 animate-pulse" />
                          <div className="space-y-1">
                            <span className="font-bold text-emerald-800 text-[10px] uppercase tracking-wider block">Kinh nghiệm lái xe & Mẹo thi:</span>
                            <p className="text-emerald-900 leading-relaxed text-xs font-medium">{law.tip}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      {/* Old Penalty block removed - handled by PhatNguoiLookUp */}
      {false && (
        <div className="space-y-6 animate-fade-in">
          {/* Controls Panel */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
              <div className="p-2 bg-emerald-50 rounded-xl">
                <Car className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm md:text-base">Tra Cứu Phạt Nguội Trực Tuyến</h3>
                <p className="text-xs text-slate-400 mt-0.5">Dữ liệu kết nối trực tiếp đến Cổng thông tin điện tử Cục Cảnh sát giao thông (csgt.vn)</p>
              </div>
            </div>

            <form onSubmit={handlePenaltySearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                {/* Vehicle Type Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">1. Chọn loại phương tiện:</label>
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 h-[46px] items-center">
                    {[
                      { key: '1', label: 'Ô tô', icon: Car },
                      { key: '2', label: 'Xe máy', icon: Bike },
                    ].map(type => {
                      const IconComponent = type.icon;
                      return (
                        <button
                          key={type.key}
                          type="button"
                          onClick={() => setPenaltyVehicle(type.key as any)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            penaltyVehicle === type.key
                              ? 'bg-white text-slate-800 shadow-xs border border-slate-200'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          {type.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* License Plate Input */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">2. Nhập biển kiểm soát (Biển số):</label>
                  <div className="flex gap-2.5">
                    <div className="flex-1 relative flex items-center border border-slate-200 rounded-xl px-3 bg-slate-50/50 focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all h-[46px]">
                      <Scale className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Ví dụ: 30A12345 hoặc 30A-123.45"
                        value={penaltyPlate}
                        onChange={(e) => setPenaltyPlate(e.target.value)}
                        className="w-full pl-2.5 pr-2 py-2 bg-transparent text-sm font-bold uppercase text-slate-800 placeholder-slate-400 focus:outline-none"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSearchingPenalty || !penaltyPlate.trim()}
                      className="px-6 bg-emerald-600 text-white font-bold text-xs md:text-sm rounded-xl hover:bg-emerald-700 active:scale-95 disabled:opacity-40 disabled:scale-100 transition-all flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/10 cursor-pointer h-[46px]"
                    >
                      {isSearchingPenalty ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Đang tra cứu...</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4" />
                          <span>Kiểm tra</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Loading status steps */}
          {isSearchingPenalty && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 animate-bounce">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs md:text-sm animate-pulse">Hệ thống đang xử lý truy vấn tự động...</h4>
                  <p className="text-[11px] text-slate-400 italic">Mất khoảng 2-5 giây để giải CAPTCHA và phản hồi</p>
                </div>
              </div>

              {/* Progress Steps Indicators */}
              <div className="space-y-2.5 pt-2 border-t border-slate-50">
                {[
                  { step: 1, label: "Kết nối tới Cổng thông tin điện tử Cục Cảnh sát giao thông" },
                  { step: 2, label: "Tải xuống và tự động giải mã hình ảnh CAPTCHA (OCR.space)" },
                  { step: 3, label: "Gửi yêu cầu truy vấn thông tin vi phạm phương tiện" },
                  { step: 4, label: "Nhận kết quả và trích xuất chi tiết dữ liệu lỗi vi phạm" }
                ].map(item => {
                  const isActive = searchStep === item.step;
                  const isDone = searchStep > item.step;
                  return (
                    <div key={item.step} className="flex items-center gap-2.5 text-xs font-semibold">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isDone ? 'bg-emerald-100 text-emerald-700' :
                        isActive ? 'bg-amber-100 text-amber-700 animate-pulse' :
                        'bg-slate-50 text-slate-300'
                      }`}>
                        {isDone ? "✓" : item.step}
                      </div>
                      <span className={`${
                        isDone ? 'text-slate-500' :
                        isActive ? 'text-slate-800 font-bold' :
                        'text-slate-400'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Penalty Error Display */}
          {penaltyError && (
            <div className="bg-red-50 border border-red-200/80 rounded-2xl p-5 flex items-start gap-3.5 max-w-2xl mx-auto shadow-xs animate-fade-in">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5 animate-pulse" />
              <div className="space-y-1">
                <h5 className="font-bold text-red-800 text-xs md:text-sm">Không thể hoàn tất tra cứu:</h5>
                <p className="text-red-700 text-xs md:text-sm leading-relaxed">{penaltyError}</p>
                <div className="pt-2 text-[10px] text-slate-400 leading-relaxed">
                  <p className="font-bold">Gợi ý cách khắc phục:</p>
                  <ul className="list-disc pl-4 space-y-0.5 mt-0.5">
                    <li>Đảm bảo bạn nhập đúng biển số xe (Ví dụ: viết liền mạch không dấu hoặc viết đầy đủ).</li>
                    <li>Có thể máy chủ CSGT đang quá tải hoặc thay đổi cấu trúc bảo mật CAPTCHA. Vui lòng thử lại sau vài phút.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Penalty Results Display */}
          {penaltyResult && (
            <div className="space-y-4 animate-fade-in">
              {penaltyResult.violations && penaltyResult.violations.length > 0 ? (
                <>
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 shadow-xs">
                    <AlertTriangle className="w-5 h-5 text-amber-600 animate-bounce" />
                    <div>
                      <h4 className="font-bold text-amber-800 text-xs md:text-sm">Tìm Thấy {penaltyResult.violations.length} Lỗi Vi Phạm Giao Thông!</h4>
                      <p className="text-[11px] text-amber-700">Vui lòng kiểm tra chi tiết các hành vi, thời gian và địa điểm xử lý bên dưới.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {penaltyResult.violations.map((v: any, index: number) => (
                      <div key={index} className="bg-white border-l-4 border-l-red-500 border border-slate-100 rounded-2xl shadow-sm overflow-hidden p-5 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-50 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-sm md:text-base tracking-widest text-slate-800 bg-slate-100 px-3 py-1 rounded-md border border-slate-200 shadow-xs uppercase">
                              {v.license_plate}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              {v.vehicle_type}
                            </span>
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                            v.status?.includes("Chưa") || v.status?.includes("chua")
                              ? 'bg-red-50 text-red-700 border-red-100 animate-pulse'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          }`}>
                            {v.status || "Chưa xử phạt"}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="space-y-3">
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Thời gian vi phạm:</span>
                              <p className="text-slate-700 font-semibold">{v.violation_time}</p>
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Địa điểm vi phạm:</span>
                              <p className="text-slate-700 font-medium leading-relaxed">{v.location}</p>
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Màu sắc biển số:</span>
                              <p className="text-slate-700 font-medium">{v.plate_color}</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Đơn vị phát hiện vi phạm:</span>
                              <p className="text-slate-700 font-medium leading-relaxed">{v.detecting_unit}</p>
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Nơi giải quyết vụ việc:</span>
                              <p className="text-slate-700 font-semibold leading-relaxed text-emerald-700">{v.resolution_point || "Đang cập nhật..."}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-red-50/50 border border-red-100/50 rounded-xl p-4 space-y-1">
                          <span className="text-[10px] font-black text-red-600 uppercase tracking-wider block">Hành vi vi phạm chính xác:</span>
                          <p className="text-red-950 font-bold leading-relaxed text-xs md:text-sm">{v.behavior}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-100 p-8 text-center max-w-xl mx-auto shadow-sm space-y-5">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto shadow-xs border border-emerald-100">
                    <Award className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-800 text-sm md:text-base">Không Phát Hiện Lỗi Phạt Nguội!</h4>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                      {penaltyResult.message || "Tuyệt vời! Chúc mừng chủ phương tiện, không tìm thấy thông tin lỗi vi phạm phạt nguội nào của phương tiện này trên hệ thống cơ sở dữ liệu CSGT Quốc gia."}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 text-[11px] text-slate-400 leading-relaxed text-left border border-slate-200/50">
                    <p className="font-bold text-slate-500 mb-1">Lưu ý an toàn giao thông:</p>
                    Hệ thống kiểm tra tự động theo dữ liệu đồng bộ thời gian thực từ Cục CSGT. Hãy luôn giữ tốc độ an toàn, chấp hành hiệu lệnh đèn tín hiệu, vạch kẻ đường và tuyệt đối không sử dụng rượu bia khi lái xe để bảo vệ bản thân và mọi người xung quanh!
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Interactive Citation Detail Overlay Modal */}
      {activeCitation && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 max-w-md w-full shadow-xl space-y-4 animate-scale-in">
            <div className="flex items-center gap-3 text-emerald-800">
              <div className="p-2 bg-emerald-50 rounded-xl">
                <Scale className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="font-extrabold text-sm md:text-base">Xác minh Căn cứ Pháp lý</h4>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 text-xs md:text-sm text-slate-700 leading-relaxed space-y-2">
              <p className="font-bold text-slate-800">Thông tin trích dẫn gốc:</p>
              <div className="font-mono bg-white p-2.5 rounded-lg border border-slate-150 text-xs text-emerald-800 select-all">
                {activeCitation}
              </div>
              <p className="text-[11px] text-slate-400">
                Đây là điều khoản cụ thể trích xuất từ văn bản luật quy định chi tiết về hành vi đang được thảo luận. Toàn bộ nội dung quy định khung xử phạt hành chính và bổ sung đều tuân thủ chặt chẽ theo căn cứ này.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveCitation(null)}
                className="px-5 py-2.5 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition-all cursor-pointer"
              >
                Đóng xác minh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

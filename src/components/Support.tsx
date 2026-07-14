import React, { useState } from 'react';
import { ArrowLeft, Heart, Copy, Check, QrCode, ExternalLink, HelpCircle } from 'lucide-react';

interface SupportProps {
  onBack: () => void;
}

export default function Support({ onBack }: SupportProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const accountInfo = {
    owner: 'PHAM VAN BINH',
    number: '106002115544',
    bank: 'VietinBank (Ngân hàng Công thương Việt Nam)',
    qrUrl: 'https://qr.sepay.vn/img?acc=106002115544&bank=ICB&amount=0&des=Ung%20ho%20web%20luyen%20thi%20GPLX'
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Navigation header */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-100 p-3 sm:p-4 gap-3 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer select-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại trang chủ</span>
        </button>
        <span className="text-[10px] sm:text-xs text-pink-700 font-bold bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100 flex items-center gap-1">
          <Heart className="w-3 h-3 text-pink-500 fill-pink-500 animate-pulse" />
          <span>Đồng hành cùng dự án</span>
        </span>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Left column: Appreciation & Info */}
        <div className="p-6 sm:p-8 md:col-span-7 flex flex-col justify-between space-y-6 border-b md:border-b-0 md:border-r border-slate-100">
          <div className="space-y-4">
            <div className="inline-flex p-3 bg-pink-50 rounded-2xl text-pink-500">
              <Heart className="w-8 h-8 fill-pink-500 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-800 font-display tracking-tight">
                Ủng hộ phát triển dự án
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Chào bạn! Mình là <strong className="text-slate-800">Phạm Văn Bình</strong>, người xây dựng và duy trì trang web <strong className="text-blue-600">Luyện Thi GPLX</strong> này.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Ứng dụng hoàn toàn miễn phí và không có quảng cáo gây khó chịu, nhằm mang lại trải nghiệm học tập tốt nhất cho mọi người. 
                Sự ủng hộ của bạn là nguồn động lực cực kỳ to lớn giúp mình duy trì máy chủ, cập nhật liên tục bộ câu hỏi mới nhất và phát triển thêm nhiều tính năng hữu ích khác.
              </p>
              <p className="text-slate-600 text-sm font-bold italic">
                Cảm ơn sự đồng hành và lòng hảo tâm của bạn! Chúc bạn ôn tập thật tốt và đạt kết quả tuyệt đối trong kỳ thi GPLX sắp tới! 🍀
              </p>
            </div>
          </div>

          {/* Copyable Account Details */}
          <div className="space-y-3 pt-6 border-t border-slate-50">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Thông tin tài khoản</h3>
            
            <div className="space-y-2.5">
              {/* Bank Name */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Ngân hàng</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-700 truncate">{accountInfo.bank}</div>
                </div>
                <button
                  onClick={() => copyToClipboard('VietinBank', 'bank')}
                  className="p-1.5 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-slate-600"
                  title="Sao chép tên ngân hàng"
                >
                  {copiedField === 'bank' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Account Number */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Số tài khoản</div>
                  <div className="text-sm sm:text-base font-extrabold text-blue-600 tracking-wide font-mono">{accountInfo.number}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(accountInfo.number, 'number')}
                  className="p-1.5 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-slate-600"
                  title="Sao chép số tài khoản"
                >
                  {copiedField === 'number' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Owner Name */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Chủ tài khoản</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-700">{accountInfo.owner}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(accountInfo.owner, 'owner')}
                  className="p-1.5 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-slate-600"
                  title="Sao chép tên chủ tài khoản"
                >
                  {copiedField === 'owner' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: QR Code Scanner */}
        <div className="p-6 sm:p-8 md:col-span-5 bg-slate-50/50 flex flex-col items-center justify-center space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-md max-w-[240px] w-full flex flex-col items-center">
            <div className="relative group overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
              <img
                referrerPolicy="no-referrer"
                src={accountInfo.qrUrl}
                alt="QR Code Chuyển khoản VietinBank"
                className="w-full h-auto object-contain select-none"
                onError={(e) => {
                  // Fallback if SePay service has issues
                  e.currentTarget.src = `https://api.vietqr.io/image/ICB-${accountInfo.number}-compact.jpg?accountName=${encodeURIComponent(accountInfo.owner)}&addInfo=Ung%20ho%20web%20luyen%20thi%20GPLX`;
                }}
              />
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-slate-600">
              <QrCode className="w-4 h-4 text-blue-500" />
              <span>Quét mã VietQR chuyển khoản</span>
            </div>
          </div>
          
          <p className="text-[10px] sm:text-xs text-slate-400 text-center max-w-[220px]">
            Hệ thống hỗ trợ quét mã VietQR/SePay tự động điền sẵn thông tin số tài khoản và nội dung chuyển khoản nhanh chóng.
          </p>

          <a
            href={accountInfo.qrUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] sm:text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
          >
            <span>Mở liên kết ảnh QR</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

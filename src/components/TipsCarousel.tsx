import React, { useState } from 'react';
import { ArrowLeft, Award, CheckCircle, Info, Star, Compass, Play, BookOpen } from 'lucide-react';

interface TipSection {
  title: string;
  subtitle: string;
  bullets: string[];
  keyMnemonic?: string;
}

const THEORY_TIPS: TipSection[] = [
  {
    title: 'Mẹo giải nhanh phần Khái niệm (Đặt trong dấu ngoặc kép " ")',
    subtitle: 'Mẹo nhận diện nhanh các câu hỏi lý thuyết về định nghĩa và các khái niệm đường bộ.',
    bullets: [
      'Chọn ngay Ý 1 khi câu hỏi hỏi về các khái niệm: Đường cao tốc, xe thô sơ, vượt khổ giới hạn đường bộ.',
      'Chọn ngay Ý 2 khi câu hỏi hỏi về các khái niệm: Vạch kẻ đường, dải phân cách, dừng xe, đỗ xe, phần làn xe, xe cơ giới.',
      'Chọn ngay Ý 3 khi câu hỏi có từ "gồm những" hỏi về đối tượng tham gia giao thông hoặc phương tiện giao thông đường bộ.',
      'Định nghĩa nhân sự - Người điều khiển giao thông: Là Cảnh sát giao thông.',
      'Định nghĩa nhân sự - Người lái xe: Là Người điều khiển xe cơ giới.'
    ],
    keyMnemonic: 'Khẩu quyết: "Cao tốc, thô sơ, vượt khổ, người lái chọn ý 1" • "Vạch, dải, dừng, đỗ, phần làn cơ giới chọn ý 2"'
  },
  {
    title: 'Mẹo Hiệu lệnh của Cảnh sát Giao thông (CSGT)',
    subtitle: 'Nhận biết nhanh đáp án đúng dựa vào tư thế tay điều khiển của Cảnh sát giao thông.',
    bullets: [
      'CSGT đứng trên bục giang hai tay (2 tay) -> Chọn ngay Ý 4.',
      'CSGT giơ tay thẳng đứng (1 tay) chỉ lên trời -> Chọn ngay Ý 3.'
    ],
    keyMnemonic: 'Mẹo nhớ nhanh: "2-4" (Giang 2 tay chọn Ý 4) • "1-3" (Giơ 1 tay chọn Ý 3)'
  },
  {
    title: 'Mẹo Đáp án chứa chữ "Cả..." & Các câu ngoại lệ',
    subtitle: 'Quy tắc chọn nhanh ý bao quát và danh sách những câu hỏi ngoại lệ bắt buộc phải nhớ.',
    bullets: [
      'Nếu đáp án số 4 có chữ "Cả ý... và ý..." hoặc "Cả ba ý" -> Chọn ngay Ý 4.',
      '⚠️ 4 câu ngoại lệ bắt buộc phải nhớ (Không áp dụng mẹo chọn Ý 4):',
      '• Vạch kẻ đường (Câu 5): Chọn Ý 2.',
      '• Độ tuổi từ 16 đến dưới 18 tuổi (Câu 123): Chỉ được lái xe gắn máy dưới 50cc -> Chọn Ý 2.',
      '• Hành vi bị nghiêm cấm trong vận tải khách (Câu 170): Đe dọa, xúc phạm, tranh giành khách... -> Chọn Ý 3.',
      '• Phát hiện ngọn lửa, khói từ xe (Câu 204): Đưa xe vào lề, tắt chìa khóa... -> Chọn Ý 1.'
    ],
    keyMnemonic: 'Ngoại lệ bắt buộc nhớ: Vạch kẻ (Ý 2) • 16-18 tuổi (Ý 2) • Cấm vận tải (Ý 3) • Khói lửa (Ý 1)'
  },
  {
    title: 'Mẹo về Ký hiệu đèn cảnh báo & Thiết bị trên ô tô',
    subtitle: 'Nhận diện nhanh các biểu tượng cảnh báo hệ thống hoặc thiết bị cứu hộ khẩn cấp trên bảng táp-lô ô tô.',
    bullets: [
      '🎡 Hình vô lăng kèm dấu chấm than: Hệ thống lái gặp sự cố -> Chọn ngay Ý 4.',
      '🛢️ Hình bình dầu bôi trơn: Áp suất dầu ở mức thấp / sắp hết nhớt -> Chọn ngay Ý 4.',
      '🛑 Ký hiệu ABS: Hệ thống phanh chống bó cứng bị lỗi -> Chọn ngay Ý 1.',
      '🦺 Hình người cài dây an toàn: Lái xe và người ngồi phía trước chưa cài dây an toàn -> Chọn ngay Ý 3.',
      '⛽ Hình cây xăng: Sắp hết nhiên liệu -> Chọn ngay Ý 4.',
      '🌡️ Hình nhiệt kế: Nhiệt độ nước làm mát động cơ quá ngưỡng cho phép -> Chọn ngay Ý 1.',
      '🅿️ Hình phanh tay (chữ P hoặc dấu chấm than): Phanh tay đang hãm hoặc chưa nhả -> Chọn ngay Ý 1.',
      '🛞 Hình mặt cắt lốp xe bị xẹp: Áp suất lốp không đủ -> Chọn ngay Ý 2.',
      '🍃 Chữ "Echo" / "Eco": Chế độ lái tiết kiệm nhiên liệu đang bật -> Chọn ngay Ý 3.',
      '🚙 Hình động cơ (đèn cá vàng): Cần kiểm tra động cơ xe -> Chọn ngay Ý 4.',
      '🛠️ Các thiết bị khẩn cấp & khởi động:',
      '• Hình chiếc kích: Dùng để kích nâng xe ô tô -> Chọn Ý 1.',
      '• Hình chiếc búa: Búa phá kính trong trường hợp khẩn cấp -> Chọn Ý 3.',
      '• Hình bình cứu hỏa: Bình dùng để chữa cháy khi hỏa hoạn -> Chọn Ý 3.',
      '• Nút tam giác đỏ: Bật đèn báo hiệu khẩn cấp -> Chọn Ý 3.',
      '• Khởi động xe bằng chìa khóa thông minh: Bắt buộc phải đạp hết hành trình bàn đạp phanh -> Chọn Ý 1.'
    ],
    keyMnemonic: '🎡 🛢️ ⛽ 🚙 -> Ý 4 • 🛑 🌡️ 🅿️ 🛠️Kích -> Ý 1 • 🛞 Lốp -> Ý 2 • 🦺 🍃 🛠️Búa/Cứu hỏa/Tam giác -> Ý 3'
  },
  {
    title: 'Mẹo về các Con số kỹ thuật quan trọng',
    subtitle: 'Các quy định khắt khe về giới hạn thời gian, niên hạn và khoảng cách an toàn.',
    bullets: [
      '🚛 Niên hạn sử dụng xe: Xe tải = 25 năm; Xe khách (chở người trên 8 chỗ ngồi) = 20 năm.',
      '⏱️ Thời gian lái xe: Lái liên tục tối đa 4 giờ; Tổng thời gian lái xe trong ngày không quá 10 giờ.',
      '📏 Khoảng cách dừng, đỗ xe:',
      '• Cách vỉa hè, lề đường: Không quá 0,25 m.',
      '• Cách xe ô tô đỗ ngược chiều tối thiểu trên đường phố hẹp: 20 m.',
      '• Khoảng cách an toàn tối thiểu đến đường ray đường sắt: 5 m.',
      '📯 Thời gian sử dụng còi trong khu dân cư: Chỉ được sử dụng từ 5:00 sáng đến 22:00 tối.'
    ],
    keyMnemonic: 'Khẩu quyết: "Tải 25, khách 20" • "4 giờ, 10 giờ" • Đỗ sát lề 0.25 m • Cách xe đỗ hẹp 20 m • Cách ray sắt 5 m'
  },
  {
    title: 'Mẹo giải nhanh 60 câu hỏi Điểm liệt',
    subtitle: 'Bộ từ khóa vàng "bảo chứng" luôn ĐÚNG hoặc loại bỏ ngay các từ khóa SAI.',
    bullets: [
      '🔑 Từ khóa "bảo chứng" luôn ĐÚNG (Thấy trong đáp án là chọn ngay):',
      '• "Bị nghiêm cấm", "Không được phép", "Không được...".',
      '• "Cơ quan thẩm quyền cấp phép" / "Được cơ quan có thẩm quyền cấp phép".',
      '• "Ở nơi quy định" / "Ở nơi cho phép".',
      '• Đáp án có hành vi lái xe văn minh: "Giảm tốc độ", "Đi sát về bên phải", "Nhường đường".',
      '❌ Từ khóa luôn SAI (Thấy trong đáp án là loại trừ ngay):',
      '• "Tăng tốc độ", "Rú ga/Cú ga liên tục".',
      '• "Đi sang làn ngược chiều", "Đi bên trái".',
      '• "Tự ý", "Buông cả hai tay".'
    ],
    keyMnemonic: 'Lựa chọn vàng: CẤM, KHÔNG ĐƯỢC PHÉP, GIẢM TỐC, NHƯỜNG ĐƯỜNG • Loại ngay: TĂNG TỐC, RÚ GA, TỰ Ý'
  },
  {
    title: 'Nguyên tắc nhường đường & giải Sa hình',
    subtitle: 'Thứ tự ưu tiên di chuyển tại các nút giao cắt đồng cấp hoặc có biển báo phân định.',
    bullets: [
      '🚒 Quy tắc ưu tiên xe: Hỏa – Sự – Công – Thương (Cứu hỏa -> Quân sự -> Công an -> Cứu thương).',
      '🔄 Quy tắc nhường đường tại nơi giao nhau:',
      '• Có vòng xuyến: Phải nhường đường cho xe đi từ bên trái.',
      '• Không có vòng xuyến: Phải nhường đường cho xe đi từ bên phải.',
      '• Đường dốc: Xe xuống dốc phải nhường đường cho xe lên dốc.',
      '• Đường nhánh ra đường chính: Phải nhường đường cho xe trên đường ưu tiên hoặc đường chính đi tới từ bất kỳ hướng nào.',
      '📐 Quy tắc giải Sa hình đồng cấp (Tứ cấp):',
      '• Xe có đường bên Phải trống được đi trước.',
      '• Thứ tự hướng đi ưu tiên: Rẽ Phải -> Đi Thẳng -> Rẽ Trái.'
    ],
    keyMnemonic: 'Ưu tiên xe: Hỏa - Sự - Công - Thương • Vòng xuyến: "Có trái, Không phải" • Sa hình đồng cấp: "Phải - Thẳng - Trái"'
  }
];

const PRACTICAL_A1_TIPS = [
  {
    step: 'Bài 1',
    title: 'Vượt vòng số 8 (Quyết định đậu/trượt)',
    description: 'Đây là bài thi khó nhất, chiếm 80% tỷ lệ trượt thực hành. Bạn phải chạy xe mô tô đi đúng theo hình số 8 vẽ trên mặt đường mà không được chống chân hoặc đè vạch quá 3 lần.',
    techniques: [
      'Khi vào vòng, đi xe ở số 2 hoặc số 3 (khuyên dùng số 2 đối với xe máy số để xe đầm, số 1 quá giật, số 3 quá yếu).',
      'Ôm cua rộng: Hãy cho bánh trước đi sát mép vạch ngoài khi rẽ để bánh sau không bị đè vạch trong.',
      'Giữ ga đều tay: Tuyệt đối không bóp phanh đột ngột, sử dụng phanh chân rà nhẹ nếu xe chạy hơi nhanh.'
    ],
    mnemonic: 'Thần chú vòng số 8: "Vào số 2 - Ôm cua sát vạch ngoài - Giữ ga đều tay"'
  },
  {
    step: 'Bài 2',
    title: 'Đi qua đường thẳng hẹp',
    description: 'Bài thi đi trên một dải đường bê tông hẹp khoảng 30cm, dài 15 mét. Yêu cầu giữ thăng bằng đi thẳng, không chạm vạch hai bên.',
    techniques: [
      'Giữ chắc tay lái, hướng mắt nhìn thẳng về phía xa trước mặt (Tuyệt đối không nhìn xuống bánh xe sẽ dễ mất thăng bằng).',
      'Tăng tốc nhẹ nhàng đều tay, đi dứt khoát để xe có đà tự cân bằng.'
    ],
    mnemonic: 'Nhìn thẳng phía trước, không nhìn bánh xe.'
  },
  {
    step: 'Bài 3',
    title: 'Đi đường quanh co (Tránh vật cản)',
    description: 'Đoạn đường quanh co zích zắc liên tiếp với các chướng ngại vật xếp so le. Yêu cầu uốn lượn khéo léo không chạm vạch và không đè chướng ngại vật.',
    techniques: [
      'Chạy xe với tốc độ chậm vừa phải.',
      'Tương tự vòng số 8, ôm cua rộng về phía ngược lại để bánh sau lọt qua an toàn.'
    ],
    mnemonic: 'Đi chậm, ôm cua rộng ra hai phía rìa.'
  },
  {
    step: 'Bài 4',
    title: 'Đi đường gồ ghề mấp mô',
    description: 'Đoạn đường dài 15m có bố trí các thanh gờ lồi lõm liên tiếp giả lập ổ gà. Thách thức lớn nhất là giữ thăng bằng tay lái.',
    techniques: [
      'Giữ thật chắc tay lái bằng cả hai tay.',
      'Hơi nhỏm nhẹ mông lên một chút nếu đi xe côn/số để đỡ bị xóc, giữ ga đều ổn định.'
    ],
    mnemonic: 'Gia cố tay lái, ga đều vượt chướng ngại.'
  }
];

const PRACTICAL_B1_TIPS = [
  {
    step: 'Bài 1',
    title: 'Xuất phát (Mở màn sa hình)',
    description: 'Bắt đầu bài thi sa hình. Xe đỗ trước vạch xuất phát, máy nổ sẵn, chờ hiệu lệnh.',
    techniques: [
      'Hãy chỉnh ghế lái, thắt dây an toàn, điều chỉnh 2 gương chiếu hậu thật vừa tầm quan sát của bạn.',
      'Bật xi nhan trái trước khi xuất phát. Khi nghe tiếng "Bính boong" báo hiệu xe đã qua vạch, hãy tắt xi nhan ngay trong vòng 5 giây để tránh bị trừ 5 điểm phạt.',
      'Đạp phanh chân, nhả phanh tay, chuyển số sang D và nhẹ nhàng nhả phanh cho xe bò lên phía trước.'
    ],
    mnemonic: 'Thần chú Xuất phát: "Thắt dây an toàn - Bật xi nhan trái - Tắt ngay khi bính boong"'
  },
  {
    step: 'Bài 2',
    title: 'Dừng xe nhường đường cho người đi bộ',
    description: 'Cần dừng xe đúng khoảng cách an toàn trước vạch dừng màu trắng quy định cho người đi bộ.',
    techniques: [
      'Giữ tốc độ xe bò thật chậm, mắt quan sát gương cầu lồi phía đầu xe để căn chỉnh khoảng cách cản trước.',
      'Căn cản trước cách vạch dừng trắng khoảng 20 - 30cm (trong gương cầu lồi thấy đầu xe mấp mé sát hoặc cách vạch dừng một khoảng nhỏ dẹt) thì đạp phanh dứt khoát.',
      'Tuyệt đối tránh dừng non quá xa hoặc đè lên vạch trắng (bị trừ 5 điểm phạt).'
    ],
    mnemonic: 'Căn gương cầu lồi chuẩn xác, phanh dứt khoát 1-2 giây rồi thả ra đi tiếp.'
  },
  {
    step: 'Bài 3',
    title: 'Dừng xe và khởi hành ngang dốc (Dốc cầu)',
    description: 'Đây vốn là nỗi ám ảnh lớn của xe số sàn B2, nhưng cực kỳ nhẹ nhàng với xe số tự động B1.',
    techniques: [
      'Bò chậm lên dốc, tuyệt đối không được để xe vượt quá vạch đỏ giới hạn (lỗi này bị truất quyền thi trực tiếp).',
      'Mẹo quý giá từ daylaixenhabe.com: Nếu không chắc chắn, hãy chấp nhận dừng non trước vạch một chút để bị trừ 5 điểm, đảm bảo an toàn tuyệt đối không bị loại.',
      'Khi xuất phát tiếp: Chuyển nhanh chân phanh sang chân ga, đệm ga nhẹ nhàng là xe tự động bò qua dốc mà không bao giờ bị trôi dốc hay chết máy.'
    ],
    mnemonic: 'Bí quyết dốc cầu B1: "Thà dừng non mất 5 điểm, quyết không vượt quá vạch đỏ!"'
  },
  {
    step: 'Bài 4',
    title: 'Qua vệt bánh xe và đường hẹp vuông góc',
    description: 'Yêu cầu điều khiển bánh xe bên phụ đi lọt vào giữa hàng đinh (vệt bánh xe) và rẽ vuông góc chữ L không đè vạch.',
    techniques: [
      'Căn lề: Hãy giữ xe bò cực chậm, căn sao cho tâm vô lăng và khuy áo ngực thẳng hàng với một điểm mốc sơn đỏ/trắng nổi bật trên vỉa hè phía trước.',
      'Nhìn gương chiếu hậu hai bên để theo dõi lốp sau đi qua hàng đinh, giữ chắc và thẳng tay lái.',
      'Khi qua cua vuông góc chữ L: Khi thấy gương chiếu hậu bên nào ngang với góc cua bên đó thì nhanh tay đánh hết lái về hướng đó.'
    ],
    mnemonic: 'Căn tâm vô lăng thẳng mốc vỉa hè; Gương ngang góc cua -> Đánh hết lái dứt khoát.'
  },
  {
    step: 'Bài 5',
    title: 'Qua ngã tư có tín hiệu điều khiển giao thông',
    description: 'Chấp hành nghiêm chỉnh tín hiệu giao thông và các hướng rẽ tại ngã tư liên hoàn.',
    techniques: [
      'Mẹo dừng: Nên cho xe dừng trước vạch vàng giới hạn khoảng 1m (dừng khuất vạch vàng) để dễ dàng nhìn đèn tín hiệu.',
      'Mẹo căn thời gian: Khi thấy đèn đỏ còn 2 giây, hãy bắt đầu thả phanh chân ra để xe tự động bò lên qua ngã tư đúng lúc đèn xanh bật, tránh bị trễ đèn phạt 5 điểm.',
      'Nhớ bật xi nhan tương ứng khi thực hiện rẽ trái hoặc rẽ phải tại ngã tư.'
    ],
    mnemonic: 'Dừng xa vạch vàng 1m; Đèn đỏ còn 2 giây bắt đầu nhả phanh bò đi.'
  },
  {
    step: 'Bài 6',
    title: 'Đường vòng quanh co (S-curve)',
    description: 'Lái xe vượt qua đoạn cua cong liên tiếp hình chữ S uốn lượn mà không chạm vạch giới hạn.',
    techniques: [
      'Áp dụng quy tắc vàng bất hủ: "Tiến bám lưng - Lùi bám bụng".',
      'Khi tiến vào cua cong chữ S, lái xe áp sát về phía cua rộng bên ngoài (lưng) để bánh sau bên cua hẹp trong (bụng) không bị đè lên vạch vỉa hè.',
      'Đi với tốc độ bò chậm, liên tục trả lái và xoay vô lăng nhịp nhàng theo độ lượn của dải đường.'
    ],
    mnemonic: 'Ôm sát lề bên rộng khi tiến cua (cua trái bám lề phải, cua phải bám lề trái).'
  },
  {
    step: 'Bài 7',
    title: 'Ghép xe dọc vào nơi đỗ (Nhà xe dọc)',
    description: 'Kỹ thuật đưa xe lùi vào chuồng dọc chuẩn xác trong chu kỳ thời gian cho phép.',
    techniques: [
      'Bò xe song song và cách thành nhà xe khoảng 20 - 30cm.',
      'Tiến lên cho tới khi vai của bạn thẳng với tâm giữa của nhà xe dọc thì dừng lại, đánh hết lái phải bò lên.',
      'Nhìn gương chiếu hậu trái: Khi thấy thành xe trái thẳng hàng với góc chữ V trong cùng của nhà xe thì phanh dừng lại. Đánh hết lái trái, cài số lùi (R) lùi chậm. Khi xe song song với hai vạch giới hạn thì trả thẳng lái lùi thêm đến khi có tiếng "Tu" nhận bài.'
    ],
    mnemonic: 'Vai thẳng giữa -> Hết lái phải tiến -> Thành xe thẳng góc nhà xe -> Hết lái trái lùi song song -> Thẳng lái lùi nhận bài.'
  },
  {
    step: 'Bài 8',
    title: 'Tạm dừng ở nơi có đường sắt chạy qua',
    description: 'Yêu cầu dừng xe đúng khoảng cách quy định trước dải đường sắt cắt ngang sa hình.',
    techniques: [
      'Điều khiển xe chạy thật chậm, quan sát gương cầu lồi để xác định cản trước xe.',
      'Căn cản trước cách vạch dừng trắng khoảng 20 - 30cm tương tự như bài thi người đi bộ, sau đó đạp phanh dứt khoát.',
      'Giữ phanh xe dừng hẳn hoàn toàn từ 1 - 2 giây rồi nhẹ nhàng nhả ra đi tiếp.'
    ],
    mnemonic: 'Dùng gương cầu lồi căn cản trước dừng sát vạch trắng dứt khoát.'
  },
  {
    step: 'Bài 9',
    title: 'Thay đổi số trên đường bằng (Tăng tốc)',
    description: 'Yêu cầu gia tốc tốc độ xe đạt trên 20km/h trong quãng đường quy định.',
    techniques: [
      'Ưu thế vượt trội của xe tự động B1: Bạn hoàn toàn không cần phải thao tác cần số tay phức tạp.',
      'Khi đầu xe qua biển xuất phát và nghe tiếng nhạc "Bính boong", ngay lập tức đạp dứt khoát chân ga mạnh mẽ để tốc độ xe vượt trên 20km/h trước khi qua biển báo tốc độ 20 màu xanh.',
      'Sau đó rà phanh, giảm tốc độ xe xuống dưới 20km/h trước khi xe lăn bánh qua biển báo giới hạn tốc độ 20 màu đỏ.'
    ],
    mnemonic: 'Nghe bính boong -> Đạp thốc ga mạnh mẽ (>20km/h) -> Rà phanh chậm lại trước biển đỏ (<20km/h).'
  },
  {
    step: 'Bài 10',
    title: 'Ghép xe ngang vào nơi đỗ (Nhà xe ngang)',
    description: 'Đưa xe đỗ song song vào vỉa hè hẹp. Đây là bài thi khó nhất và dễ mất điểm nhất sa hình B1.',
    techniques: [
      'Bò xe song song sát dải chuồng ngang (cách 20cm). Dừng xe khi bánh sau hoặc gương chiếu hậu ngang với vạch mốc đầu nhà xe.',
      'Đánh hết lái phải lùi chậm, quan sát gương trái thấy thành xe chiếu thẳng vào góc nhọn chữ V sâu nhất trong cùng của chuồng thì phanh dừng lại.',
      'Trả thẳng lái, lùi tiếp cho đến khi bánh xe sau bên trái chạm đè nhẹ vào vạch vàng giới hạn chuồng. Đánh hết lái trái, lùi chậm và quan sát gương bên phải thấy xe song song đẹp mắt sát lề dưới 25cm thì trả thẳng lái, lùi nhẹ nghe tiếng "Tu" nhận bài.'
    ],
    mnemonic: 'Ngang mốc -> Hết lái phải lùi 45 độ -> Thẳng lái lùi đè vạch vàng -> Hết lái trái lùi song song.'
  },
  {
    step: 'Bài 11',
    title: 'Kết thúc hành trình',
    description: 'Chạy xe qua vạch kết thúc để hoàn thành xuất sắc 11 bài thi liên hoàn.',
    techniques: [
      'Ngay sau khi rẽ hướng thẳng về phía vạch đích, hãy bật xi nhan phải.',
      'Giữ tay lái thật thẳng, có thể dùng một ngón tay giữ nhẹ lẫy xi nhan để đề phòng xe tự trả lái làm tắt xi nhan khi chưa hoàn toàn qua vạch kết thúc.',
      'Di chuyển chậm rãi qua vạch đích và nhận kết quả thi đạt!'
    ],
    mnemonic: 'Bật xi nhan phải, giữ chặt tay lái thẳng qua vạch đích kết thúc.'
  }
];

export default function TipsCarousel({ onBack, licenseClass }: { onBack: () => void; licenseClass?: string }) {
  const [activeTab, setActiveTab] = useState<'theory' | 'practical'>('theory');
  
  const isCarLicense = licenseClass && ['B1', 'B', 'C1', 'C', 'DEF'].includes(licenseClass);
  const [practicalClass, setPracticalClass] = useState<'A1' | 'B1'>(isCarLicense ? 'B1' : 'A1');
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const currentPracticalTips = practicalClass === 'A1' ? PRACTICAL_A1_TIPS : PRACTICAL_B1_TIPS;

  // Reset active step if it goes out of bounds when switching category
  React.useEffect(() => {
    setActiveStepIdx(0);
  }, [practicalClass]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-100 p-3 sm:p-4 gap-3 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span><span className="hidden xs:inline">trang chủ</span>
        </button>
        <span className="text-[10px] sm:text-xs text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 truncate max-w-[160px] sm:max-w-none">
          Mẹo Hay Hạng {licenseClass || (activeTab === 'theory' ? 'Lý Thuyết' : practicalClass)}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-100 pb-1">
        <button
          onClick={() => { setActiveTab('theory'); setActiveStepIdx(0); }}
          className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'theory' 
              ? 'border-amber-500 text-amber-600' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Mẹo thi Lý Thuyết
        </button>
        <button
          onClick={() => { setActiveTab('practical'); setActiveStepIdx(0); }}
          className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'practical' 
              ? 'border-amber-500 text-amber-600' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Compass className="w-4 h-4" />
          Mẹo thi Thực Hành (Sa hình)
        </button>
      </div>

      {/* Content */}
      {activeTab === 'theory' ? (
        <div className="space-y-6">
          {THEORY_TIPS.map((tip, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4 hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-600">
                  <Star className="w-5 h-5 fill-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Mẹo hay #0{idx+1}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 font-display">
                  {tip.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {tip.subtitle}
                </p>
              </div>

              <ul className="space-y-2.5 pt-2 border-t border-slate-50">
                {tip.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5 text-slate-600 text-xs md:text-sm leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {tip.keyMnemonic && (
                <div className="bg-amber-50 border border-amber-100 p-3.5 rounded-xl text-center text-amber-800 font-bold font-display text-xs md:text-sm tracking-wide">
                  {tip.keyMnemonic}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Sub-tabs for Practical categories */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Chọn hạng thực hành:</span>
            <div className="flex p-1 bg-slate-100 rounded-xl max-w-sm border border-slate-200">
              <button
                onClick={() => setPracticalClass('A1')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  practicalClass === 'A1'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-200/50'
                }`}
              >
                Hạng A1 (Xe máy)
              </button>
              <button
                onClick={() => setPracticalClass('B1')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  practicalClass === 'B1'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-200/50'
                }`}
              >
                Hạng B1 (Ô tô tự động)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Steps List */}
            <div className="space-y-3 lg:col-span-1">
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Trình tự {currentPracticalTips.length} bài thi liên hoàn
                </span>
                <div className="space-y-1 max-h-[480px] overflow-y-auto pr-1">
                  {currentPracticalTips.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStepIdx(idx)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                        activeStepIdx === idx 
                          ? 'bg-amber-500 text-white font-bold shadow-md' 
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`font-mono text-xs px-1.5 py-0.5 rounded-md ${activeStepIdx === idx ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                          {step.step}
                        </span>
                        <span className="text-xs font-semibold truncate">
                          {step.title.split(' (')[0]}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Step details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border border-amber-200">
                    {currentPracticalTips[activeStepIdx].step} • {practicalClass === 'A1' ? 'Thực Hành A1 (Xe máy)' : 'Thực Hành B1 (Ô tô số tự động)'}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 font-display">
                    {currentPracticalTips[activeStepIdx].title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                    {currentPracticalTips[activeStepIdx].description}
                  </p>
                </div>

                {/* Visual sa hinh diagram if A1 Bài 1 */}
                {practicalClass === 'A1' && activeStepIdx === 0 && (
                  <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 p-4 flex flex-col items-center justify-center space-y-2 max-h-72">
                    <img
                      referrerPolicy="no-referrer"
                      src="/Giaodien/giaoDienThucHien/sahinh.png"
                      alt="Sơ đồ vòng số 8 thực hành"
                      className="max-h-56 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "https://i.imgur.com/YhWf0Xg.png";
                      }}
                    />
                    <span className="text-[10px] text-slate-400 font-medium">Sơ đồ đi vòng số 8 đúng chuẩn: Vào cửa rẽ phải ôm cung cua ngoài</span>
                  </div>
                )}

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-slate-800 text-sm font-display flex items-center gap-2">
                    <Play className="w-4 h-4 text-amber-500 fill-amber-500" />
                    Bí quyết kỹ thuật cốt lõi đạt điểm tối đa:
                  </h4>

                  <div className="space-y-3">
                    {currentPracticalTips[activeStepIdx].techniques.map((tech, idx) => (
                      <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs md:text-sm leading-relaxed text-slate-600 flex items-start gap-3 hover:bg-slate-100/50 transition-colors">
                        <span className="font-mono font-bold text-amber-600">{idx+1}.</span>
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-extrabold text-amber-700 tracking-wider">Kinh nghiệm bỏ túi:</span>
                    <div className="text-xs md:text-sm text-amber-900 font-semibold leading-relaxed">
                      {currentPracticalTips[activeStepIdx].mnemonic}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

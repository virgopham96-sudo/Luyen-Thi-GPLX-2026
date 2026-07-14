import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Info, HelpCircle, Trophy, RefreshCw, X, 
  Eye, ShieldAlert, CheckCircle, AlertTriangle, Scale, Car, Bike, Sparkles, Star
} from 'lucide-react';

interface Sign {
  code: string;
  name: string;
  description: string;
  meaning: string;
  penalty?: string;
  category: 'prohibitive' | 'warning' | 'mandatory' | 'guide';
  url: string;
  fallbackUrl?: string;
  tip: string;
}

const SIGNS_DATA: Sign[] = [
  // --- BIỂN BÁO CẤM (Prohibitive) ---
  {code: 'P.101',
    name: 'Đường cấm',
    description: 'Báo hiệu đường cấm tất cả các loại phương tiện (cơ giới và thô sơ) đi lại cả hai hướng, trừ các xe được ưu tiên theo quy định.',
    meaning: 'Nghiêm cấm mọi phương tiện lưu thông đi vào đoạn đường này từ cả hai chiều đặt biển. Hãy quay đầu xe tìm lộ trình khác.',
    penalty: 'Ô tô: Phạt 1.000.000đ - 2.000.000đ. Xe máy: Phạt 400.000đ - 600.000đ. Tước GPLX từ 1 - 3 tháng.',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P101.svg',
    fallbackUrl: '/assets/bienbao/bien-bao-cam-101.jpg',
    tip: 'Lỗi này thường xảy ra khi đi vào các tuyến phố đi bộ hoặc đường đang thi công sửa chữa.'
  },
  {code: 'P.102',
    name: 'Cấm đi ngược chiều',
    description: 'Báo hiệu cấm tất cả các loại xe (cơ giới và thô sơ) đi vào theo chiều đặt biển, trừ các xe được ưu tiên theo quy định.',
    meaning: 'Cấm đi vào theo hướng đặt biển. Phương tiện chỉ được phép di chuyển ra khỏi tuyến đường này theo chiều đối diện, không được đi vào.',
    penalty: 'Ô tô: Phạt 4.000.000đ - 6.000.000đ (Tước GPLX 2-4 tháng). Xe máy: Phạt 1.000.000đ - 2.000.000đ (Tước GPLX 1-3 tháng).',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P102.svg',
    fallbackUrl: '/assets/bienbao/bien-bao-cam-102.jpg',
    tip: 'Cực kỳ nguy hiểm khi đi vào đường một chiều. Chú ý biển báo ở các đầu ngã ba, ngã tư giao lộ.'
  },
  {code: 'P.103a',
    name: 'Cấm xe ô tô',
    description: 'Báo hiệu đường cấm tất cả các loại xe cơ giới kể cả môtô 3 bánh có thùng đi qua, trừ xe môtô hai bánh, xe gắn máy và các xe ưu tiên.',
    meaning: 'Cấm toàn bộ các loại ô tô từ 4 bánh trở lên đi vào. Xe máy 2 bánh vẫn di chuyển bình thường.',
    penalty: 'Ô tô: Phạt 1.000.000đ - 2.000.000đ. Tước quyền sử dụng Giấy phép lái xe từ 1 đến 3 tháng.',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P103a.svg',
    fallbackUrl: '/assets/bienbao/bien-bao-cam-103a.jpg',
    tip: 'Biển này thường cấm ô tô đi vào các ngõ hẻm nhỏ hoặc các tuyến phố hạn chế phương tiện lớn giờ cao điểm.'
  },
  {code: 'P.103b',
    name: 'Cấm xe ô tô rẽ phải',
    description: 'Báo hiệu cấm các loại xe ô tô rẽ sang phía tay phải tại ngã rẽ giao lộ.',
    meaning: 'Các loại xe ô tô (bao gồm cả xe tải, xe khách) không được rẽ phải tại nút giao. Xe máy vẫn được rẽ phải.',
    penalty: 'Ô tô: Phạt 800.000đ - 1.000.000đ. Gây tai nạn bị tước GPLX 2 - 4 tháng.',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P103b.svg',
    fallbackUrl: '/assets/bienbao/bien-bao-cam-103b.jpg',
    tip: 'Quy chuẩn mới tách biệt rõ ràng giữa cấm rẽ phải và cấm quay đầu, cấm rẽ phải không đồng nghĩa với cấm quay đầu.'
  },
  {code: 'P.103c',
    name: 'Cấm xe ô tô rẽ trái',
    description: 'Báo hiệu cấm các loại xe ô tô rẽ sang phía tay trái tại ngã rẽ giao lộ.',
    meaning: 'Các loại xe ô tô không được rẽ trái tại nút giao. Tuy nhiên, ô tô vẫn được phép quay đầu xe theo quy chuẩn mới nhất.',
    penalty: 'Ô tô: Phạt 800.000đ - 1.000.000đ.',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P103c.svg',
    fallbackUrl: '/assets/bienbao/bien-bao-cam-103c.jpg',
    tip: 'Nhớ kỹ: Cấm ô tô rẽ trái thì vẫn ĐƯỢC PHÉP quay đầu xe (trừ khi có biển cấm quay đầu xe riêng biệt).'
  },
  {code: 'P.104',
    name: 'Cấm xe mô tô',
    description: 'Báo hiệu đường cấm tất cả các loại xe môtô đi qua, trừ các xe môtô được ưu tiên theo quy định.',
    meaning: 'Đường cấm mọi loại xe máy, xe mô tô (dung tích xi lanh từ 50cc trở lên) đi vào. Xe máy điện hoặc xe gắn máy dưới 50cc vẫn có thể đi vào.',
    penalty: 'Xe máy: Phạt 400.000đ - 600.000đ. Tước quyền sử dụng GPLX từ 1 - 3 tháng.',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P104.svg',
    fallbackUrl: '/assets/bienbao/bien-bao-cam-104.jpg',
    tip: 'Biển này thường xuất hiện ở các đường cao tốc, cầu vượt vượt sông quy mô lớn hoặc hầm đường bộ.'
  },
  {code: 'P.105',
    name: 'Cấm xe ô tô và xe mô tô',
    description: 'Báo hiệu đường cấm cả xe ô tô và xe mô tô đi lại trên đoạn đường đó.',
    meaning: 'Cấm tuyệt đối cả ô tô và xe máy lưu thông, chỉ cho phép xe thô sơ, người đi bộ hoặc xe ưu tiên đi vào.',
    penalty: 'Ô tô: Phạt 1.000.000đ - 2.000.000đ. Xe máy: Phạt 400.000đ - 600.000đ.',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P105.svg',
    tip: 'Rất hay gặp ở các khu phố cổ hoặc khu bảo tồn đi bộ trung tâm thành phố.'
  },
  {code: 'P.106a',
    name: 'Cấm xe ô tô tải',
    description: 'Báo hiệu đường cấm tất cả các loại xe ô tô tải có khối lượng chuyên chở lớn hơn 1,5 tấn (trừ các xe ưu tiên).',
    meaning: 'Cấm xe tải lưu thông vào đoạn đường để hạn chế ùn tắc giao thông hoặc bảo vệ hạ tầng đường xá nhỏ.',
    penalty: 'Phạt tiền từ 1.000.000đ - 2.000.000đ; tước GPLX từ 1 - 3 tháng.',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P106a.svg',
    tip: 'Các bác tài xe bán tải (pickup) cần lưu ý khối lượng chuyên chở ghi trong đăng kiểm để tránh đi vào biển này.'
  },
  {code: 'P.112',
    name: 'Cấm người đi bộ',
    description: 'Báo hiệu đường cấm người đi bộ đi qua đoạn đường này.',
    meaning: 'Nghiêm cấm người đi bộ đi vào lề đường, vỉa hè hoặc lòng đường của đoạn đường nguy hiểm này.',
    penalty: 'Cảnh cáo hoặc phạt tiền từ 60.000đ - 100.000đ.',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P112.svg',
    tip: 'Biển này luôn được đặt tại các đường cao tốc hoặc các cầu vượt đô thị có tốc độ lưu thông cực nhanh.'
  },
  {code: 'P.115',
    name: 'Hạn chế trọng tải toàn bộ xe',
    description: 'Báo hiệu cấm các xe (cơ giới và thô sơ) kể cả xe được ưu tiên có trọng lượng toàn bộ vượt quá trị số ghi trên biển đi qua.',
    meaning: 'Cấm các xe có tổng tải trọng cả xe và hàng hóa lớn hơn số tấn ghi trên biển báo đi qua (ví dụ: 10 tấn).',
    penalty: 'Phạt tiền cực nặng từ 3.000.000đ - 5.000.000đ và yêu cầu hạ tải ngay lập tức.',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P115.svg',
    tip: 'Thường thấy ở trước các cây cầu yếu hoặc đường giao thông nông thôn.'
  },
  {code: 'P.123a',
    name: 'Cấm rẽ trái',
    description: 'Báo hiệu cấm tất cả các loại phương tiện rẽ trái tại ngã ba, ngã tư hoặc nơi giao nhau.',
    meaning: 'Các phương tiện không được phép rẽ trái tại vị trí giao nhau này, tuy nhiên vẫn được phép quay đầu xe.',
    penalty: 'Ô tô: Phạt 800.000đ - 1.000.000đ. Xe máy: Phạt 400.000đ - 600.000đ.',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P123a.svg',
    tip: 'Ghi nhớ luật mới nhất: Cấm rẽ trái KHÔNG cấm quay đầu!'
  },
  {code: 'P.123b',
    name: 'Cấm rẽ phải',
    description: 'Báo hiệu cấm tất cả các loại phương tiện rẽ phải tại ngã ba, ngã tư giao lộ.',
    meaning: 'Cấm các xe rẽ sang hướng tay phải tại nơi giao cắt.',
    penalty: 'Ô tô: Phạt 800.000đ - 1.000.000đ. Xe máy: Phạt 400.000đ - 600.000đ.',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P123b.svg',
    tip: 'Tương tự, cấm rẽ phải thì xe vẫn có thể tiến hành quay đầu xe nếu không có biển cấm quay đầu.'
  },
  {code: 'P.124a',
    name: 'Cấm quay đầu xe',
    description: 'Báo hiệu cấm tất cả các loại phương tiện quay đầu xe theo kiểu chữ U tại đoạn đường đặt biển.',
    meaning: 'Không được phép quay ngược đầu xe, nhưng phương tiện vẫn được rẽ trái bình thường.',
    penalty: 'Ô tô: Phạt 800.000đ - 1.000.000đ. Xe máy: Phạt 400.000đ - 600.000đ.',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P124a1.svg',
    tip: 'Cấm quay đầu nhưng vẫn ĐƯỢC PHÉP rẽ trái!'
  },
  {code: 'P.125',
    name: 'Cấm vượt',
    description: 'Báo hiệu cấm các loại xe cơ giới vượt nhau trên đoạn đường có biển báo hiệu lực.',
    meaning: 'Nghiêm cấm các xe vượt lên trước xe khác. Phải kiên nhẫn đi sau cho đến khi gặp biển hết cấm vượt (P.135 hoặc P.133).',
    penalty: 'Ô tô: Phạt 4.000.000đ - 6.000.000đ; tước GPLX 1 - 3 tháng.',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P.125_(QCVN_41-2019-BGTVT).svg',
    tip: 'Lỗi này rất hay bị phạt nguội thông qua camera hành trình hoặc máy bắn tốc độ.'
  },
  {code: 'P.127',
    name: 'Tốc độ tối đa cho phép',
    description: 'Báo hiệu tốc độ tối đa cho phép các xe cơ giới chạy trên đoạn đường đó (trị số tính bằng km/h).',
    meaning: 'Nghiêm cấm điều khiển phương tiện chạy quá tốc độ ghi trên biển báo (ví dụ: 50 km/h).',
    penalty: 'Phạt tiền từ 300.000đ đến 12.000.000đ tùy mức độ chạy quá tốc độ từ 5km/h đến trên 35km/h.',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P127-50.svg',
    tip: 'Chỉ cần chạy quá tốc độ từ 5km/h trở lên là đã bị xử phạt hành chính rồi.'
  },
  {code: 'P.130',
    name: 'Cấm dừng xe và đỗ xe',
    description: 'Báo hiệu cấm tất cả các loại xe cơ giới dừng và đỗ ở phía đường có đặt biển, trừ các xe ưu tiên.',
    meaning: 'Nghiêm cấm đỗ xe (tắt máy bỏ xe đi) và dừng xe (bật xi nhan tạm thời nổ máy lái xe ngồi trong).',
    penalty: 'Ô tô: Phạt 800.000đ - 1.000.000đ. Xe máy: Phạt 300.000đ - 400.000đ.',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P130.svg',
    tip: 'Biển này có 2 vạch chéo màu đỏ cắt nhau tạo hình chữ X. Cực kỳ nghiêm ngặt!'
  },
  {code: 'P.131a',
    name: 'Cấm đỗ xe',
    description: 'Báo hiệu cấm các loại xe cơ giới đỗ ở phía đường có đặt biển (xe được dừng tạm thời để bốc dỡ hàng/khách).',
    meaning: 'Cấm đỗ xe tại lề đường, nhưng cho phép dừng xe tạm thời (tài xế không rời ghế lái, máy vẫn nổ và bật cảnh báo).',
    penalty: 'Ô tô: Phạt 800.000đ - 1.000.000đ. Xe máy: Phạt 300.000đ - 400.000đ.',
    category: 'prohibitive',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_P131a.svg',
    tip: 'Biển này chỉ có một vạch chéo màu đỏ duy nhất màu nền xanh dương.'
  },

  // --- BIỂN BÁO NGUY HIỂM VÀ CẢNH BÁO (Warning) ---
  {code: 'W.201a',
    name: 'Chỗ ngoặt nguy hiểm vòng bên trái',
    description: 'Cảnh báo sắp đến một chỗ ngoặt nguy hiểm vòng về phía bên trái theo hướng đi, cần giảm tốc độ.',
    meaning: 'Báo trước sắp tới khúc cua gấp khuất tầm nhìn lệch về bên tay trái. Tài xế cần giảm tốc độ và không được vượt.',
    penalty: 'Không chấp hành cảnh báo tốc độ dẫn đến tai nạn giao thông sẽ bị truy cứu trách nhiệm hình sự.',
    category: 'warning',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_W201a.svg',
    fallbackUrl: '/assets/bienbao/201a.jpg',
    tip: 'Đi số thấp khi qua các đoạn cua đèo núi hiểm trở.'
  },
  {code: 'W.201b',
    name: 'Chỗ ngoặt nguy hiểm vòng bên phải',
    description: 'Cảnh báo sắp đến một chỗ ngoặt nguy hiểm vòng về phía bên phải theo hướng đi, cần giảm tốc độ.',
    meaning: 'Khúc cua gấp khuất tầm nhìn nghiêng về phía bên tay phải đang ở phía trước. Hãy đi chậm và bóp còi cảnh báo.',
    penalty: 'Đi chậm dưới tốc độ tối đa cho phép, chú ý làn đường tránh lấn vạch kẻ liền.',
    category: 'warning',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_W201b.svg',
    fallbackUrl: '/assets/bienbao/201b.jpg',
    tip: 'Lấn vạch đè tim đường ở khúc cua phải có thể va chạm trực diện với xe ngược chiều.'
  },
  {code: 'W.202a',
    name: 'Nhiều chỗ ngoặt nguy hiểm liên tiếp vòng bên trái trước',
    description: 'Cảnh báo sắp đến nhiều chỗ ngoặt liên tiếp nguy hiểm, vòng đầu tiên hướng sang bên trái.',
    meaning: 'Đường đèo dốc uốn lượn liên tục uốn lượn nhiều khúc. Khúc cua đầu tiên cua về phía bên trái.',
    penalty: 'Bắt buộc lái xe tập trung, giảm tốc độ về số thấp để ghìm xe bằng động cơ.',
    category: 'warning',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_W202a.svg',
    fallbackUrl: '/assets/bienbao/202a.jpg',
    tip: 'Rất hay gặp ở cung đường đèo Tây Bắc, Đà Lạt hoặc đèo Hải Vân.'
  },
  {code: 'W.203a',
    name: 'Đường hẹp cả hai bên',
    description: 'Báo trước sắp đến một đoạn đường bị hẹp đột ngột cả hai bên trái và phải, người lái xe phải giảm tốc độ.',
    meaning: 'Lòng đường chuẩn bị bóp nhỏ diện tích lưu thông cả hai bên hông. Lái xe cần nhường đường đi trước cho xe đã vào cầu/đoạn hẹp.',
    penalty: 'Vượt xe trong đoạn đường hẹp nguy hiểm phạt tiền rất nặng.',
    category: 'warning',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_W203a.svg',
    fallbackUrl: '/assets/bienbao/203a.jpg',
    tip: 'Đặc biệt chú ý nhường nhịn xe tải lớn đi ngược chiều khi qua cầu hẹp.'
  },
  {code: 'W.203b',
    name: 'Đường hẹp bên trái',
    description: 'Báo trước sắp đến đoạn đường hẹp đột ngột ở phía bên tay trái.',
    meaning: 'Lòng đường phía trước bị co thắt thu hẹp ở bên hông trái. Các xe di chuyển ở làn trái cần chủ động xi nhan nhập làn sang phải.',
    category: 'warning',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_W203b.svg',
    fallbackUrl: '/assets/bienbao/203b.jpg',
    tip: 'Luôn quan sát gương chiếu hậu bên phải trước khi nhập làn an toàn.'
  },
  {code: 'W.203c',
    name: 'Đường hẹp bên phải',
    description: 'Báo trước sắp đến đoạn đường hẹp đột ngột ở phía bên tay phải.',
    meaning: 'Phần đường bên lề phải bị co hẹp (do thi công sửa chữa hoặc có vật cản hẹp lòng đường). Hãy nhường đường và di chuyển chậm.',
    category: 'warning',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_W203c.svg',
    fallbackUrl: '/assets/bienbao/203c.jpg',
    tip: 'Thường thấy khi sắp đi qua các đoạn đường đang sạt lở hoặc thi công cống thoát nước.'
  },
  {code: 'W.205a',
    name: 'Đường giao nhau cùng cấp',
    description: 'Báo trước sắp tới nơi giao nhau của các tuyến đường cùng cấp (giao nhau chữ thập).',
    meaning: 'Nút giao các tuyến đường có vai trò và độ ưu tiên ngang nhau. Áp dụng quy tắc nhường đường cho phương tiện đi tới từ phía bên phải.',
    penalty: 'Không nhường đường tại nơi đường giao nhau cùng cấp bị phạt từ 300.000đ - 500.000đ.',
    category: 'warning',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_W205a.svg',
    tip: 'Hãy đi chậm quan sát ngã tư khuất tầm nhìn, chuẩn bị chân phanh để xử lý sự cố.'
  },
  {code: 'W.207a',
    name: 'Giao nhau với đường không ưu tiên',
    description: 'Báo trước sắp đến nơi giao nhau với đường không ưu tiên (đường phụ, ngõ nhỏ).',
    meaning: 'Bạn đang đi trên đường chính lớn (ưu tiên), các phương tiện từ ngõ nhỏ đi ra bắt buộc phải nhường đường cho bạn.',
    penalty: 'Dù được ưu tiên, lái xe vẫn cần quan sát đề phòng xe máy từ ngõ phụ lao ra bất ngờ.',
    category: 'warning',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_W207a.svg',
    tip: 'Biển này có hình mũi tên lớn đi thẳng, cắt ngang qua vạch đen nhỏ tượng trưng đường phụ.'
  },
  {code: 'W.208',
    name: 'Giao nhau với đường ưu tiên',
    description: 'Báo trước sắp đến nơi giao nhau với đường ưu tiên (đường chính lớn).',
    meaning: 'Bạn đang đi từ đường phụ nhỏ sắp nhập vào đường chính lớn có tốc độ lưu thông cao. Bắt buộc dừng lại quan sát, nhường đường tuyệt đối.',
    penalty: 'Không nhường đường cho xe đi trên đường ưu tiên: Phạt 800.000đ - 1.000.000đ (ô tô); 300.000đ - 400.000đ (xe máy).',
    category: 'warning',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_W208.svg',
    tip: 'Biển này là một hình tam giác đều lộn ngược (đỉnh hướng xuống dưới), cực kỳ dễ nhận diện từ xa.'
  },
  {code: 'W.209',
    name: 'Giao nhau có tín hiệu đèn',
    description: 'Báo trước nơi giao nhau có đèn tín hiệu điều khiển giao thông (đèn xanh, vàng, đỏ).',
    meaning: 'Sắp tới giao lộ được điều khiển bằng hệ thống đèn giao thông tự động. Giảm tốc độ và tuân thủ tín hiệu đèn.',
    penalty: 'Vượt đèn đỏ phạt tiền đến 6.000.000đ và giam bằng lái tới 3 tháng.',
    category: 'warning',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_W209.svg',
    tip: 'Nhiều ngã tư khuất tầm nhìn sau cây xanh, biển báo này cảnh báo cực kỳ hữu ích.'
  },
  {code: 'W.210',
    name: 'Giao nhau với đường sắt có rào chắn',
    description: 'Báo trước sắp đến nơi giao nhau đường bộ với đường sắt có rào chắn bảo vệ.',
    meaning: 'Sắp cắt ngang đường tàu hỏa có chắn tự động hoặc nhân viên túc trực kéo gác chắn. Dừng lại an toàn khi chuông reo.',
    penalty: 'Cố tình vượt rào chắn đường sắt bị phạt từ 3.000.000đ - 5.000.000đ và giam xe.',
    category: 'warning',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_W210.svg',
    tip: 'Khi đèn đỏ nhấp nháy tại gác chắn, tuyệt đối không được cố vượt qua lách khe hở.'
  },
  {code: 'W.211a',
    name: 'Giao nhau với đường sắt không có rào chắn',
    description: 'Báo trước sắp đến nơi giao nhau đường bộ với đường sắt không có rào chắn tự động hay người gác.',
    meaning: 'Đặc biệt nguy hiểm! Sắp cắt ngang đường tàu hỏa thô sơ. Lái xe bắt buộc dừng xe cách đường ray tối thiểu 5m để tự quan sát và lắng nghe tiếng còi tàu.',
    penalty: 'Lỗi không chú ý quan sát tại đường ray thô sơ là nguyên nhân hàng đầu gây tai nạn đường sắt nghiêm trọng.',
    category: 'warning',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_W211a.svg',
    tip: 'Hãy hạ kính xe ô tô xuống, tắt nhạc để lắng nghe tiếng còi tàu hỏa cảnh báo từ xa.'
  },
  {code: 'W.219',
    name: 'Dốc xuống nguy hiểm',
    description: 'Báo trước sắp đến đoạn đường xuống dốc có độ dốc đứng nguy hiểm (trị số ghi % độ dốc).',
    meaning: 'Đoạn dốc xuống hiểm trở phía trước. Yêu cầu lái xe về số thấp (xe số, ô tô số sàn hoặc tự động chuyển chế độ bán tự động), cấm rà liên tục phanh chân.',
    category: 'warning',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_W219.svg',
    tip: 'Rà phanh chân liên tục khi xuống dốc dài sẽ làm sôi dầu phanh, cháy má phanh gây mất phanh hoàn toàn!'
  },
  {code: 'W.224',
    name: 'Đường người đi bộ cắt ngang',
    description: 'Báo trước sắp đến phần đường dành cho người đi bộ cắt ngang qua lòng đường.',
    meaning: 'Phía trước có vạch kẻ sang đường của người bộ hành. Giảm tốc độ, chú ý quan sát nhường đường cho người đi bộ.',
    penalty: 'Không nhường đường cho người đi bộ tại nơi có vạch sang đường phạt đến 400.000đ.',
    category: 'warning',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_W224.svg',
    tip: 'Luôn giữ khoảng cách an toàn, không bóp còi inh ỏi hối thúc người đi bộ qua đường.'
  },
  {code: 'W.225',
    name: 'Trẻ em',
    description: 'Báo trước sắp đến đoạn đường thường có trẻ em đi ngang qua hoặc tụ tập trên đường (gần trường học, nhà trẻ).',
    meaning: 'Cảnh báo có học sinh băng qua đường đột ngột từ các trường học lân cận. Lái xe cực kỳ chậm rãi quan sát hai bên lề đường.',
    category: 'warning',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_W225.svg',
    tip: 'Giờ tan trường (11h30 trưa hoặc 17h00 chiều) là khung giờ cần đặc biệt cảnh giác đi chậm.'
  },
  {code: 'W.227',
    name: 'Công trường',
    description: 'Báo trước sắp đến đoạn đường đang có công trường thi công, nâng cấp đường xá.',
    meaning: 'Đường có thể có chướng ngại vật, đất đá rơi vãi, máy móc thi công hoặc công nhân làm việc. Giảm tốc độ tối đa.',
    category: 'warning',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_W227.svg',
    tip: 'Lái xe tốc độ cao qua công trường có thể làm bắn đá dăm trúng người lao động hoặc vỡ kính xe khác.'
  },

  // --- BIỂN BÁO HIỆU LỆNH (Mandatory) ---
  {code: 'R.301a',
    name: 'Hướng đi thẳng phải theo',
    description: 'Các loại xe chỉ được đi thẳng tại ngã ba, ngã tư hoặc giao lộ đặt biển này.',
    meaning: 'Bắt buộc các phương tiện chỉ được đi thẳng tiến lên phía trước. Nghiêm cấm rẽ sang trái, rẽ phải hoặc tiến hành quay đầu xe.',
    penalty: 'Phạt lỗi không chấp hành chỉ dẫn của biển báo hiệu lệnh: Ô tô: phạt 300.000đ - 400.000đ; Xe máy: phạt 100.000đ - 200.000đ.',
    category: 'mandatory',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_R301a.svg',
    fallbackUrl: '/assets/bienbao/301a.jpg',
    tip: 'Biển hiệu lệnh có dạng hình tròn màu xanh lam, biểu tượng màu trắng vẽ hướng đi.'
  },
  {code: 'R.301b',
    name: 'Hướng đi rẽ phải phải theo',
    description: 'Các loại xe bắt buộc chỉ được rẽ tay phải trước nơi giao nhau đặt biển này.',
    meaning: 'Chỉ cho phép rẽ sang hướng bên phải, nghiêm cấm đi thẳng hoặc rẽ trái tại nút giao này.',
    penalty: 'Phạt lỗi không chấp hành hiệu lệnh: 100.000đ - 400.000đ tùy phương tiện.',
    category: 'mandatory',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_R301b.svg',
    fallbackUrl: '/assets/bienbao/301b.jpg',
    tip: 'Thường đặt ở các lối rẽ nhập làn vào đường vành đai hoặc đường một chiều.'
  },
  {code: 'R.301c',
    name: 'Hướng đi rẽ trái phải theo',
    description: 'Các loại xe bắt buộc chỉ được rẽ tay trái trước nơi đặt biển này.',
    meaning: 'Chỉ được phép rẽ sang hướng tay trái tại ngã rẽ giao lộ tiếp theo.',
    penalty: 'Phạt lỗi không tuân thủ chỉ dẫn hướng đi bắt buộc: Phạt từ 100.000đ - 400.000đ.',
    category: 'mandatory',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_R301c.svg',
    fallbackUrl: '/assets/bienbao/301c.jpg',
    tip: 'Cần xi nhan rẽ trái sớm để báo hiệu cho các xe di chuyển phía sau.'
  },
  {code: 'R.303',
    name: 'Nơi giao nhau chạy theo vòng xuyến',
    description: 'Báo hiệu bắt buộc các phương tiện đi vào nút giao phải chạy vòng quanh đảo giao thông theo chiều mũi tên.',
    meaning: 'Bắt buộc đi theo vòng xuyến bùng binh. Áp dụng quy tắc nhường đường cho xe đi từ phía bên trái (xe đã ở trong vòng xuyến).',
    penalty: 'Không xi nhan khi ra vào vòng xuyến hoặc không nhường đường đúng quy tắc bị phạt tiền.',
    category: 'mandatory',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_R303.svg',
    tip: 'Mẹo nhớ xi nhan vòng xuyến: "Vào rẽ trái, ra rẽ phải".'
  },
  {code: 'R.304',
    name: 'Đường dành cho xe thô sơ',
    description: 'Báo hiệu đường dành riêng cho xe thô sơ (xe đạp, xe xích lô, xe bò...) và người đi bộ.',
    meaning: 'Đường ưu tiên bảo vệ xe thô sơ. Nghiêm cấm tất cả các loại xe cơ giới kể cả xe máy đi vào làn đường này.',
    penalty: 'Xe máy đi vào đường thô sơ: phạt 400.000đ - 600.000đ.',
    category: 'mandatory',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_R304.svg',
    tip: 'Hạn chế tối đa nguy cơ va chạm nguy hiểm giữa phương tiện tốc độ cao và xe thô sơ chậm rãi.'
  },
  {code: 'R.306',
    name: 'Tốc độ tối thiểu cho phép',
    description: 'Nghiêm cấm các loại xe cơ giới chạy với tốc độ nhỏ hơn trị số ghi trên biển báo (ví dụ: 60 km/h).',
    meaning: 'Bắt buộc phải chạy nhanh hơn hoặc bằng tốc độ tối thiểu quy định. Không được đi quá chậm gây cản trở giao thông trên các đại lộ/cao tốc.',
    penalty: 'Lái xe dưới tốc độ tối thiểu cho phép trên cao tốc: Phạt từ 800.000đ - 1.000.000đ.',
    category: 'mandatory',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_R306.svg',
    tip: 'Nếu phương tiện gặp sự cố không thể duy trì tốc độ tối thiểu, hãy bật đèn khẩn cấp hazard và di chuyển vào làn dừng khẩn cấp.'
  },
  {code: 'R.403a',
    name: 'Đường dành cho xe ô tô',
    description: 'Báo hiệu bắt đầu đoạn đường dành riêng cho các loại xe ô tô lưu thông.',
    meaning: 'Đường cao tốc hoặc đường gom đô thị chỉ cho phép xe ô tô đi vào. Nghiêm cấm xe máy, xe thô sơ hoặc người đi bộ đi vào cực kỳ nguy hiểm.',
    penalty: 'Xe máy đi vào đường dành cho ô tô: Phạt 2.000.000đ - 3.000.000đ và giam bằng lái đến 5 tháng.',
    category: 'mandatory',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_R403a.svg',
    tip: 'Lỗi cực kỳ phổ biến của người đi xe máy khi vô tình đi lên các cầu vượt trục chính hoặc đường cao tốc vành đai.'
  },
  {code: 'R.403b',
    name: 'Đường dành cho xe ô tô, xe máy',
    description: 'Báo hiệu bắt đầu đoạn đường dành riêng cho xe ô tô và xe máy cùng di chuyển chung.',
    meaning: 'Cho phép cả ô tô và xe máy đi vào làn đường này, cấm các phương tiện thô sơ khác.',
    penalty: 'Tách biệt dòng phương tiện thô sơ chậm chạp ra khỏi dòng xe động cơ tốc độ cao để giữ an toàn.',
    category: 'mandatory',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_R403b.svg',
    tip: 'Biển này vẽ rõ ràng hình chiếc ô tô xếp phía trên chiếc xe máy màu trắng.'
  },

  // --- BIỂN CHỈ DẪN (Guide) ---
  {code: 'I.407a',
    name: 'Đường một chiều',
    description: 'Chỉ dẫn những đoạn đường chỉ cho phép phương tiện giao thông di chuyển theo một chiều hướng lên phía trước.',
    meaning: 'Báo hiệu đoạn đường một chiều bắt đầu. Các phương tiện chỉ được đi theo chiều tiến lên, nghiêm cấm quay đầu đi ngược lại.',
    penalty: 'Cố tình quay đầu xe đi ngược lại trên đường một chiều phạt nặng tương đương lỗi đi ngược chiều.',
    category: 'guide',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_I407a.svg',
    tip: 'Biển chỉ dẫn có hình chữ nhật nền xanh dương đứng thẳng, vẽ mũi tên màu trắng hướng lên.'
  },
  {code: 'I.408a',
    name: 'Nơi đỗ xe',
    description: 'Chỉ dẫn khu vực dừng đỗ xe an toàn, hợp lệ bên lề đường.',
    meaning: 'Khu vực bãi đỗ xe được cấp phép hợp pháp. Tài xế có thể dừng đỗ xe lâu dài ở đây mà không lo bị lập biên bản.',
    category: 'guide',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_I408a.svg',
    tip: 'Biển vẽ chữ P màu trắng nổi bật trên nền xanh vuông vức.'
  },
  {code: 'I.423a',
    name: 'Đường người đi bộ sang ngang',
    description: 'Chỉ dẫn vị trí chính xác vạch sang ngang dành cho người đi bộ qua đường.',
    meaning: 'Chỉ dẫn người đi bộ sang đường tại vị trí này để bảo đảm an toàn. Lái xe cần quan sát kỹ lưỡng và đi chậm.',
    category: 'guide',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_I423a.svg',
    tip: 'Biển hình vuông vẽ hình người đi bộ màu đen đang bước đi trên vạch kẻ trắng hình tam giác.'
  },
  {code: 'I.424a',
    name: 'Cầu vượt bộ hành',
    description: 'Chỉ dẫn có cầu vượt trên cao dành riêng cho người đi bộ qua đường an toàn.',
    meaning: 'Khuyến khích người đi bộ sử dụng cầu vượt trên cao để sang đường thay vì đi bộ cắt ngang dòng xe nguy hiểm phía dưới.',
    category: 'guide',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_I424a.svg',
    tip: 'Thường thấy trước các khu vực bệnh viện lớn, trường học quốc lộ hoặc tuyến đường trục chính đô thị.'
  },
  {code: 'I.443',
    name: 'Chợ',
    description: 'Báo hiệu sắp qua khu vực chợ ven đường, dân cư đông đúc tụ tập lấn chiếm lòng lề đường.',
    meaning: 'Báo hiệu phía trước là chợ họp tạm, có nhiều hoạt động giao thương lấn lòng đường, người bộ hành băng qua bất ngờ không quan sát. Lái xe đi cực kỳ chậm bóp còi cảnh báo.',
    category: 'guide',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_road_sign_I443.svg',
    tip: 'Đặc biệt cẩn thận khi lái xe qua các chợ vùng quê ven các con đường quốc lộ cũ.'
  }
];

const RenderSignPlaceholder = ({ category, code }: { category: string; code: string }) => {
  if (category === 'prohibitive') {
    return (
      <div className="w-14 h-14 rounded-full border-[3px] border-red-500 bg-white flex items-center justify-center relative shadow-xs select-none">
        <div className="absolute w-full h-0.75 bg-red-500 rotate-45" />
        <span className="text-[9px] font-extrabold font-mono text-red-700 bg-white/90 px-1 rounded z-10">{code}</span>
      </div>
    );
  }
  if (category === 'warning') {
    return (
      <div className="w-14 h-14 flex items-center justify-center relative select-none">
        <svg className="w-14 h-14 absolute text-amber-500" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,15 15,80 85,80" className="stroke-amber-600 stroke-[6]" fill="#fef3c7" />
        </svg>
        <span className="text-[9px] font-extrabold font-mono text-amber-800 z-10 mt-3">{code}</span>
      </div>
    );
  }
  if (category === 'mandatory') {
    return (
      <div className="w-14 h-14 rounded-full bg-blue-600 border border-white flex items-center justify-center shadow-xs select-none">
        <span className="text-[9px] font-extrabold font-mono text-white">{code}</span>
      </div>
    );
  }
  return (
    <div className="w-14 h-11 rounded bg-cyan-600 border border-cyan-500 flex items-center justify-center shadow-xs select-none">
      <span className="text-[9px] font-extrabold font-mono text-white">{code}</span>
    </div>
  );
};

export default function SignboardsLookUp({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'directory' | 'quiz'>('directory');
  
  // Directory State
  const [activeCategory, setActiveCategory] = useState<'all' | 'prohibitive' | 'warning' | 'mandatory' | 'guide'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSign, setSelectedSign] = useState<Sign | null>(null);
  
  // Image error state handling
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Quiz State
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Sign | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);

  // Search & filter logic
  const filteredSigns = SIGNS_DATA.filter(sign => {
    const matchesTab = activeCategory === 'all' || sign.category === activeCategory;
    const matchesSearch = sign.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sign.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sign.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getCategoryName = (cat: string) => {
    switch (cat) {
      case 'prohibitive': return 'Biển báo cấm';
      case 'warning': return 'Biển báo nguy hiểm';
      case 'mandatory': return 'Biển hiệu lệnh';
      case 'guide': return 'Biển chỉ dẫn';
      default: return 'Khác';
    }
  };

  const getCategoryStyle = (cat: string) => {
    switch (cat) {
      case 'prohibitive': return 'bg-red-50 text-red-700 border-red-100';
      case 'warning': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'mandatory': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'guide': return 'bg-cyan-50 text-cyan-700 border-cyan-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  // Quiz logic implementation
  const startQuizMode = () => {
    setQuizActive(true);
    setQuizScore(0);
    setQuizCount(0);
    setQuizStreak(0);
    setHighestStreak(0);
    generateNewQuestion();
  };

  const generateNewQuestion = () => {
    if (SIGNS_DATA.length < 4) return;
    
    const randomIndex = Math.floor(Math.random() * SIGNS_DATA.length);
    const correctSign = SIGNS_DATA[randomIndex];
    setCurrentQuestion(correctSign);
    setSelectedOption(null);
    setHasAnswered(false);
    
    // Select 3 distractors
    const otherSigns = SIGNS_DATA.filter(s => s.code !== correctSign.code);
    const shuffledOthers = [...otherSigns].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, 3).map(s => s.name);
    
    // Scramble choices
    const mixedOptions = [correctSign.name, ...distractors].sort(() => 0.5 - Math.random());
    setOptions(mixedOptions);
  };

  const handleAnswerSelect = (option: string) => {
    if (hasAnswered || !currentQuestion) return;
    
    setSelectedOption(option);
    setHasAnswered(true);
    setQuizCount(prev => prev + 1);
    
    const isCorrect = option === currentQuestion.name;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      setQuizStreak(prev => {
        const next = prev + 1;
        if (next > highestStreak) {
          setHighestStreak(next);
        }
        return next;
      });
    } else {
      setQuizStreak(0);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* 1. Header Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-2xl border border-slate-100 p-4 gap-4 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Quay lại trang chủ
        </button>
        <div className="flex items-center gap-2 text-xs font-semibold bg-cyan-50 text-cyan-700 px-3.5 py-1.5 rounded-full border border-cyan-100 shadow-xs">
          <Eye className="w-4 h-4 text-cyan-600 animate-pulse" />
          Mục Tra Cứu Biển Báo Đường Bộ & Luyện Nhớ
        </div>
      </div>

      {/* 2. Mode Tabs Selection (Lookup vs Quiz Game) */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 max-w-sm">
        <button
          onClick={() => setActiveTab('directory')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs md:text-sm font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'directory'
              ? 'bg-white text-slate-800 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Search className="w-4 h-4" />
          Danh mục biển báo
        </button>
        <button
          onClick={() => {
            setActiveTab('quiz');
            if (!quizActive) startQuizMode();
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs md:text-sm font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/15'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Luyện nhớ biển báo
        </button>
      </div>

      {/* 3. DIRECTORY MODE */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Controls - Search & Filters */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
            <div className="relative flex items-center border border-slate-200 rounded-xl px-3 bg-slate-50/50 focus-within:bg-white focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/10 transition-all">
              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Tìm tên biển báo, mã hiệu hoặc mô tả (ví dụ: P.101, Cấm, Ngoặt nguy hiểm, Vòng xuyến...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-2.5 pr-4 py-3 bg-transparent text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-1 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )}
            </div>

            {/* Category horizontal categories */}
            <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
              {[
                { key: 'all', label: 'Tất cả biển báo', count: SIGNS_DATA.length },
                { key: 'prohibitive', label: 'Biển báo cấm', count: SIGNS_DATA.filter(s=>s.category==='prohibitive').length },
                { key: 'warning', label: 'Biển báo nguy hiểm', count: SIGNS_DATA.filter(s=>s.category==='warning').length },
                { key: 'mandatory', label: 'Biển hiệu lệnh', count: SIGNS_DATA.filter(s=>s.category==='mandatory').length },
                { key: 'guide', label: 'Biển chỉ dẫn', count: SIGNS_DATA.filter(s=>s.category==='guide').length }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key as any)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === tab.key
                      ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm shadow-cyan-600/15'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200/50'
                  }`}
                >
                  {tab.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeCategory === tab.key ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500 font-extrabold'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Directory Grid */}
          {filteredSigns.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <Info className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-slate-500 font-bold text-sm">Không tìm thấy biển báo nào.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="text-xs font-semibold text-cyan-600 hover:underline cursor-pointer"
              >
                Đặt lại bộ lọc tìm kiếm
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSigns.map(sign => {
                const isImgFailed = imageErrors[sign.code];

                return (
                  <div
                    key={sign.code}
                    onClick={() => setSelectedSign(sign)}
                    className="bg-white rounded-2xl border border-slate-100 hover:border-cyan-200 hover:shadow-md hover:-translate-y-0.5 p-4 flex gap-4 transition-all duration-200 cursor-pointer select-none"
                  >
                    {/* Visual box */}
                    <div className="w-20 h-20 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-2 flex-shrink-0 overflow-hidden shadow-xs">
                      {isImgFailed && !sign.fallbackUrl ? (
                        <RenderSignPlaceholder category={sign.category} code={sign.code} />
                      ) : (
                        <img
                          referrerPolicy="no-referrer"
                          src={isImgFailed ? sign.fallbackUrl : sign.url}
                          alt={sign.name}
                          className="max-w-full max-h-full object-contain"
                          onError={() => {
                            setImageErrors(prev => ({ ...prev, [sign.code]: true }));
                          }}
                        />
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="space-y-1.5 flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-150">
                          {sign.code}
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                          sign.category === 'prohibitive' ? 'bg-red-50 text-red-600' :
                          sign.category === 'warning' ? 'bg-amber-50 text-amber-700' :
                          sign.category === 'mandatory' ? 'bg-blue-50 text-blue-600' :
                          'bg-cyan-50 text-cyan-700'
                        }`}>
                          {sign.category === 'prohibitive' ? 'Biển cấm' :
                           sign.category === 'warning' ? 'Cảnh báo' :
                           sign.category === 'mandatory' ? 'Hiệu lệnh' : 'Chỉ dẫn'}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-800 text-xs md:text-sm leading-snug truncate">
                        {sign.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                        {sign.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. MEMORIZATION QUIZ GAME */}
      {activeTab === 'quiz' && quizActive && currentQuestion && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-md space-y-6">
          {/* Header Dashboard of Game */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500 animate-bounce" />
              <div>
                <span className="text-xs text-slate-400 font-bold block leading-none">LUYỆN TẬP</span>
                <span className="text-sm font-extrabold text-slate-800">
                  Đúng {quizScore} / {quizCount} câu
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-400 font-bold block leading-none">STREAK HIỆN TẠI</span>
                <span className="text-sm font-extrabold text-emerald-600 flex items-center gap-1 justify-end">
                  <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                  {quizStreak}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-100" />
              <div className="text-right">
                <span className="text-xs text-slate-400 font-bold block leading-none">KỶ LỤC</span>
                <span className="text-sm font-extrabold text-amber-600 font-mono">
                  {highestStreak}
                </span>
              </div>
            </div>
          </div>

          {/* Graphic Question Prompt */}
          <div className="text-center space-y-4">
            <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
              Biển báo nào sau đây tương ứng với hình ảnh dưới đây?
            </p>
            
            {/* Centered Large Signboard Image */}
            <div className="w-36 h-36 bg-slate-50 rounded-2xl border border-slate-150 mx-auto flex items-center justify-center p-4 shadow-sm overflow-hidden relative group">
              {imageErrors[currentQuestion.code] && !currentQuestion.fallbackUrl ? (
                <RenderSignPlaceholder category={currentQuestion.category} code={currentQuestion.code} />
              ) : (
                <img
                  referrerPolicy="no-referrer"
                  src={imageErrors[currentQuestion.code] ? currentQuestion.fallbackUrl : currentQuestion.url}
                  alt="Câu hỏi biển báo"
                  className="max-w-full max-h-full object-contain"
                  onError={() => {
                    setImageErrors(prev => ({ ...prev, [currentQuestion.code]: true }));
                  }}
                />
              )}
              <span className="absolute bottom-2 right-2 text-[9px] font-mono bg-slate-900/80 text-white font-extrabold px-1.5 py-0.5 rounded-md">
                Gợi ý mã: {currentQuestion.code}
              </span>
            </div>
          </div>

          {/* Option Selection Grid */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            {options.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQuestion.name;
              
              let buttonStyle = 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 hover:border-slate-300 text-slate-700';
              let iconElement = null;

              if (hasAnswered) {
                if (isCorrect) {
                  buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-extrabold ring-2 ring-emerald-500/10';
                  iconElement = <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />;
                } else if (isSelected) {
                  buttonStyle = 'border-red-500 bg-red-50 text-red-950 font-extrabold ring-2 ring-red-500/10';
                  iconElement = <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 animate-shake" />;
                } else {
                  buttonStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60 pointer-events-none';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-xl text-left text-xs md:text-sm font-bold border transition-all flex items-center justify-between cursor-pointer disabled:cursor-default shadow-xs ${buttonStyle}`}
                >
                  <span className="min-w-0 pr-2 leading-relaxed">{option}</span>
                  {iconElement}
                </button>
              );
            })}
          </div>

          {/* Explanation panel after answering */}
          {hasAnswered && (
            <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4.5 space-y-3.5 animate-slide-up">
              <div className="flex items-start gap-2.5">
                <Info className="w-4.5 h-4.5 text-cyan-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Giải thích & Mẹo ghi nhớ ({currentQuestion.code}):
                  </span>
                  <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-semibold">
                    {currentQuestion.name}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {currentQuestion.description}
                  </p>
                </div>
              </div>

              {/* Penalties Cross reference */}
              {currentQuestion.penalty && (
                <div className="border-t border-slate-200/60 pt-2.5 flex items-start gap-2.5">
                  <ShieldAlert className="w-4.5 h-4.5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-red-500 tracking-wider block">
                      Khung phạt vi phạm (Nghị định 100/123):
                    </span>
                    <p className="text-[11px] md:text-xs text-red-950 font-bold leading-relaxed">
                      {currentQuestion.penalty}
                    </p>
                  </div>
                </div>
              )}

              {/* Next Question button */}
              <button
                onClick={generateNewQuestion}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white font-bold text-xs md:text-sm rounded-xl shadow-md shadow-cyan-600/15 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <RefreshCw className="w-4 h-4 animate-spin-slow" />
                Tiếp tục câu tiếp theo
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. INTERACTIVE DETAIL POPUP MODAL */}
      {selectedSign && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 max-w-lg w-full shadow-2xl overflow-hidden animate-scale-in max-h-[90vh] flex flex-col">
            {/* Modal header */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-bold border border-slate-300">
                  {selectedSign.code}
                </span>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${getCategoryStyle(selectedSign.category)}`}>
                  {getCategoryName(selectedSign.category)}
                </span>
              </div>
              <button
                onClick={() => setSelectedSign(null)}
                className="p-1.5 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal content (scrollable) */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1 leading-relaxed">
              {/* Image presentation section */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 bg-slate-50/50 border border-slate-150 rounded-2xl mx-auto flex items-center justify-center p-3 sm:p-4.5 shadow-xs overflow-hidden">
                {imageErrors[selectedSign.code] && !selectedSign.fallbackUrl ? (
                  <RenderSignPlaceholder category={selectedSign.category} code={selectedSign.code} />
                ) : (
                  <img
                    referrerPolicy="no-referrer"
                    src={imageErrors[selectedSign.code] ? selectedSign.fallbackUrl : selectedSign.url}
                    alt={selectedSign.name}
                    className="max-w-full max-h-full object-contain"
                    onError={() => {
                      setImageErrors(prev => ({ ...prev, [selectedSign.code]: true }));
                    }}
                  />
                )}
              </div>

              {/* Text content details */}
              <div className="text-center space-y-1">
                <h3 className="font-extrabold text-slate-800 text-base md:text-lg leading-snug">
                  {selectedSign.name}
                </h3>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Mã hiệu: {selectedSign.code}
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                {/* Description info block */}
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Mô tả đặc điểm:</span>
                  <p className="text-xs md:text-sm text-slate-600 font-medium">{selectedSign.description}</p>
                </div>

                {/* Meaning & action block */}
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Ý nghĩa & Hành động yêu cầu:</span>
                  <p className="text-xs md:text-sm text-slate-700 font-semibold">{selectedSign.meaning}</p>
                </div>

                {/* Penalty cross reference if prohibitive/warning */}
                {selectedSign.penalty && (
                  <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5 animate-pulse" />
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-extrabold text-red-700 uppercase tracking-wider block">Khung xử phạt liên quan (Nghị định 100/123):</span>
                      <p className="text-xs text-red-950 font-bold leading-relaxed">{selectedSign.penalty}</p>
                    </div>
                  </div>
                )}

                {/* Driving tips block */}
                {selectedSign.tip && (
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block">Mẹo nhớ & Kinh nghiệm sa hình:</span>
                      <p className="text-xs text-emerald-950 font-semibold leading-relaxed">{selectedSign.tip}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal footer close button */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedSign(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 active:scale-95 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Đóng chi tiết
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

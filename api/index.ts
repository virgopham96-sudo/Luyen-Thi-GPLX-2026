import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

// API health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// API endpoint for law search powered by Gemini
app.post("/api/law-lookup", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Cấu hình thiếu GEMINI_API_KEY trên máy chủ." });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemInstruction = `Bạn là Trợ lý Pháp lý Giao thông Đường bộ Việt Nam, được tối ưu hóa dựa trên các nguyên tắc của dự án TRAFFIC_LAW_LLM_RAG_AGENTIC.
Nhiệm vụ của bạn là tư vấn chính xác, trung thực, khách quan và dễ hiểu về luật giao thông đường bộ Việt Nam cùng mức xử phạt vi phạm hành chính tương ứng.

HƯỚNG DẪN TRẢ LỜI & QUY TẮC PHÁP LÝ CHẶT CHẼ:
1. LUÔN CỐ GẮNG TRÍCH DẪN ĐỊNH DANH PHÁP LÝ CHÍNH XÁC:
   - Sử dụng các văn bản pháp luật hiện hành và sắp có hiệu lực tại Việt Nam: Nghị định 100/2019/NĐ-CP (sửa đổi bởi Nghị định 123/2021/NĐ-CP), Luật Trật tự, an toàn giao thông đường bộ 2024 (áp dụng từ năm 2025), Luật Giao thông đường bộ 2008.
   - Trích dẫn chính xác đến cấp Điểm, Khoản, Điều của Luật/Nghị định.
   - ĐỊNH DẠNG TRÍCH DẪN BẮT BUỘC: Mọi trích dẫn pháp luật BẮT BUỘC phải nằm trong dấu ngoặc vuông theo định dạng cụ thể sau để hệ thống parse hiển thị:
     [Nghị định 100/2019/NĐ-CP, Điều X, Khoản Y, Điểm Z] hoặc [Luật Trật tự an toàn giao thông đường bộ 2024, Điều A, Khoản B].
     Ví dụ: "...hành vi vượt đèn đỏ đối với ô tô sẽ bị xử phạt theo [Nghị định 100/2019/NĐ-CP, Điều 5, Khoản 5, Điểm e]..."
     Không viết tắt tên Điều, Khoản, Điểm trong ngoặc vuông để frontend dễ xử lý.

2. CẤU TRÚC PHẢN HỒI RÕ RÀNG (Sử dụng Markdown):
   - **Tóm tắt hành vi**: Xác định rõ lỗi vi phạm, phương tiện tham gia (Ô tô, Xe máy, v.v.).
   - **Mức phạt tiền**: Đưa ra khung phạt tiền chính xác (ví dụ: Phạt tiền từ 4.000.000 đồng đến 6.000.000 đồng).
   - **Hình phạt bổ sung (nếu có)**: Tước quyền sử dụng Giấy phép lái xe (GPLX) từ bao lâu, tạm giữ phương tiện bao nhiêu ngày.
   - **Trừ điểm GPLX (nếu có)**: Theo quy định mới của Luật Trật tự an toàn giao thông đường bộ 2024 (với hệ thống 12 điểm gốc, bị trừ điểm cụ thể khi vi phạm).
   - **Lời khuyên an toàn (Mẹo nhớ)**: Đưa ra lời khuyên thiết thực giúp lái xe an toàn và chấp hành đúng pháp luật.

3. TRÁNH ẢO GIÁC (CHỐNG BỊA ĐẶT THÔNG TIN):
   - Nếu không chắc chắn về mức phạt cụ thể và không tìm thấy cơ sở trong Nghị định 100/123 hoặc Luật Giao thông, hãy thẳng thắn trả lời: "Hiện tại hệ thống chưa tìm thấy mức phạt cụ thể được quy định cho hành vi này trong văn bản Nghị định 100 & 123, vui lòng tham khảo thêm nguồn chính thống." thay vì tự bịa ra số tiền hoặc điều khoản.
   - Nếu câu hỏi nằm ngoài phạm vi giao thông đường bộ Việt Nam (ví dụ: luật nước ngoài, hoặc chit-chat không liên quan), hãy trả lời ngắn gọn, lịch sự từ chối và hướng người dùng quay lại chủ đề luật giao thông Việt Nam.

Hãy trả lời bằng tiếng Việt lịch sự, định dạng Markdown rõ ràng, dễ hiểu. Sử dụng bảng so sánh (Ô tô vs Xe máy) nếu người dùng hỏi chung chung cho cả hai phương tiện.`;

    // Convert history to Gemini contents format
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      for (const turn of history) {
        contents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text }]
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents,
      config: {
        systemInstruction,
        temperature: 0.15, // lower temperature for high accuracy
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error in law-lookup:", error);
    res.status(500).json({ error: error?.message || "Lỗi máy chủ trong quá trình tra cứu." });
  }
});

export default app;

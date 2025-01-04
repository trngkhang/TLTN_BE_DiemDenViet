import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const genfromDB = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Yêu cầu:\nTôi muốn bạn nhận dữ liệu từ tôi và trả về kết quả từ dữ liệu đó.\nNhiệm vụ:\nTạo kế hoạch du lịch cho Thành phố Hồ Chí Minh trong 3 ngày cho gia đình với ngân sách xa xỉ và sở thích ngắm cảnh, đảm bảo:\nĐề xuất tối đa 5 khách sạn để lựa chọn.\nGợi ý lịch trình ăn uống và tham quan địa điểm theo thời gian và ngày dựa trên dữ liệu đầu vào, với các quy định:\nMỗi buổi (sáng/chiều/tối) tham quan tối đa 3 địa điểm.\nChỉ cần thông tin _id :value của khách sạn và địa điểm trong kết quả.\n\nDữ liệu đầu vào:\nKhách sạn (mảng):\nMỗi khách sạn có các trường: {_id, name, ticketPrice}\nĐịa điểm (mảng):\nMỗi địa điểm có các trường: {_id, name, category, openingTime, ticketPrice}\nĐịnh dạng đầu ra:\nKết quả trả về là một object JSON gồm:\nDanh sách khách sạn:\nChỉ bao gồm trường _id của tối đa 5 khách sạn phù hợp.\nLịch trình tham quan:\nChia theo từng ngày và buổi (sáng/chiều/tối).\nMỗi địa điểm chỉ cần trường _id :value.\n\nDữ liệu:\n_input",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '{\n  "hotels": [\n    {\n      "_id": "6768efa86ccbec0c591e454d"\n    }\n  ],\n  "itinerary": [\n    {\n      "day": "Ngày 1",\n      "morning": [\n        {\n          "_id": "6753a56bd51644238643c721"\n        },\n        {\n          "_id": "6753148e72c282a0d476eaa3"\n        }\n      ],\n      "afternoon": [\n        {\n          "_id": "6752cedc72c282a0d476e96c"\n        },\n        {\n          "_id": "6753169272c282a0d476eace"\n        }\n      ],\n      "evening": [\n        {\n          "_id": "6753a69ef13101d6e688ff04"\n        }\n      ]\n    },\n    {\n      "day": "Ngày 2",\n      "morning": [\n        {\n          "_id": "67646bdd93f27f083dcc335c"\n        }\n      ],\n      "afternoon": [\n        {\n          "_id": "6753a46385e71b3c5c3045ed"\n        }\n      ],\n      "evening": []\n    },\n    {\n      "day": "Ngày 3",\n      "morning": [],\n      "afternoon": [],\n      "evening": []\n    }\n  ]\n}',
        },
      ],
    },
  ],
});

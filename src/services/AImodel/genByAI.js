import { GoogleGenerativeAI } from "@google/generative-ai";
import envVar from "../../utils/envVariable.js";

const apiKey = envVar.gemini_apikey;
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

export const genByAI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Tạo kế hoạch du lịch cho địa điểm Thành phố Hồ chí Minh, trong 3 ngày cho Gia dình với ngân sách Xa xỉ, sở thích nắm cảnh với yều cầu sau:\nCung cấp danh sách các lựa chọn khách sạn bao gồm: { name, address, price, rating, description }.\nGợi ý lịch trình ăn uống và tham quan với { name, time, details, price } của địa điểm trong 3 ngày với kế hoạch mỗi ngày.\nTối ưu thời gian trả về, tên biến bằng tiếng anh nhưng giá trị, đơn vị tiền tệ bằng tiếng việt.\nmẫu:\n{ hotelOptions: [ { name, address, price, rating, description } ], itinerary: [ { day: Ngày 1, plan: [ { name, time details, price, } ] } ] }",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '{"hotelOptions": [{"name": "The Reverie Saigon", "address": "22-36 Nguyễn Huệ, Quận 1, Thành phố Hồ Chí Minh", "price": "Từ 7.000.000 VND/đêm", "rating": "9.5", "description": "Khách sạn sang trọng bậc nhất Sài Gòn với thiết kế lộng lẫy và dịch vụ đẳng cấp."}, {"name": "Park Hyatt Saigon", "address": "2 Công Trường Lam Sơn, Quận 1, Thành phố Hồ Chí Minh", "price": "Từ 6.000.000 VND/đêm", "rating": "9.4", "description": "Khách sạn mang phong cách hiện đại, tinh tế với tầm nhìn tuyệt đẹp ra thành phố."}, {"name": "Rex Hotel", "address": "141 Nguyễn Huệ, Quận 1, Thành phố Hồ Chí Minh", "price": "Từ 4.000.000 VND/đêm", "rating": "9.0", "description": "Khách sạn lịch sử với kiến trúc cổ điển và vị trí trung tâm."}], "itinerary": [{"day": "Ngày 1", "plan": [{"name": "Ăn sáng tại khách sạn", "time": "7:00 - 8:00", "details": "Thưởng thức buffet sáng sang trọng tại khách sạn.", "price": "Đã bao gồm trong giá phòng"}, {"name": "Tham quan Dinh Độc Lập", "time": "9:00 - 11:00", "details": "Khám phá lịch sử và kiến trúc của Dinh Độc Lập.", "price": "50.000 VND/người"}, {"name": "Ăn trưa tại nhà hàng Noir. Dining In The Dark", "time": "12:00 - 14:00", "details": "Trải nghiệm ẩm thực độc đáo trong bóng tối.", "price": "800.000 VND/người"}, {"name": "Mua sắm tại Saigon Centre", "time": "15:00 - 18:00", "details": "Khám phá các thương hiệu thời trang cao cấp.", "price": "Tùy theo nhu cầu"}, {"name": "Ăn tối tại nhà hàng Cuc Gach Quan", "time": "19:00 - 21:00", "details": "Thưởng thức ẩm thực Việt Nam truyền thống trong không gian ấm cúng.", "price": "500.000 VND/người"}]}, {"day": "Ngày 2", "plan": [{"name": "Ăn sáng tại khách sạn", "time": "7:00 - 8:00", "details": "Thưởng thức buffet sáng tại khách sạn.", "price": "Đã bao gồm trong giá phòng"}, {"name": "Tham quan địa đạo Củ Chi", "time": "9:00 - 14:00", "details": "Khám phá hệ thống địa đạo lịch sử.", "price": "200.000 VND/người"}, {"name": "Ăn trưa tại nhà hàng địa phương", "time": "14:00 - 15:00", "details": "Thưởng thức đặc sản địa phương.", "price": "200.000 VND/người"}, {"name": "Thư giãn tại My Spa", "time": "16:00 - 18:00", "details": "Trải nghiệm các liệu pháp spa thư giãn.", "price": "1.000.000 VND/người"}, {"name": "Ăn tối tại nhà hàng Shri Restaurant & Lounge", "time": "19:00 - 21:00", "details": "Thưởng thức ẩm thực Ấn Độ cao cấp.", "price": "700.000 VND/người"}]}, {"day": "Ngày 3", "plan": [{"name": "Ăn sáng tại khách sạn", "time": "7:00 - 8:00", "details": "Thưởng thức buffet sáng tại khách sạn.", "price": "Đã bao gồm trong giá phòng"}, {"name": "Tham quan Chợ Bến Thành", "time": "9:00 - 11:00", "details": "Mua sắm quà lưu niệm và trải nghiệm không khí chợ truyền thống.", "price": "Tùy theo nhu cầu"}, {"name": "Ăn trưa tại nhà hàng Secret Garden", "time": "12:00 - 14:00", "details": "Thưởng thức ẩm thực Việt Nam trong không gian xanh mát.", "price": "400.000 VND/người"}, {"name": "Khám phá thành phố bằng xe máy cổ", "time": "15:00 - 18:00", "details": "Tham quan thành phố với trải nghiệm độc đáo.", "price": "500.000 VND/người"}, {"name": "Ăn tối tại nhà hàng Temple Club", "time": "19:00 - 21:00", "details": "Thưởng thức ẩm thực Việt Nam và quốc tế trong không gian sang trọng.", "price": "600.000 VND/người"}]}]}',
        },
      ],
    },
  ],
});

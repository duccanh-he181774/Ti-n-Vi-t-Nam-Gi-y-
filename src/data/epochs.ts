import { TimeEpoch } from '../types';

export const epochs: TimeEpoch[] = [
  {
    id: "modern",
    name: "Thời Hiện Đại",
    startYear: 2003,
    endYear: 2025,
    scrollHeight: 800,
    color: "hsl(45, 70%, 85%)",
    description: "VND ổn định, thanh toán điện tử phát triển"
  },
  {
    id: "reform",
    name: "Đổi Mới & Phát Triển",
    startYear: 1980,
    endYear: 2003,
    scrollHeight: 1200,
    color: "hsl(40, 65%, 75%)",
    description: "Cải cách tiền tệ, xây dựng hệ thống hiện đại"
  },
  {
    id: "reunification",
    name: "Thống Nhất Đất Nước",
    startYear: 1975,
    endYear: 1980,
    scrollHeight: 600,
    color: "hsl(35, 60%, 65%)",
    description: "Hợp nhất hệ thống tiền tệ hai miền"
  },
  {
    id: "war",
    name: "Thời Kỳ Chiến Tranh",
    startYear: 1954,
    endYear: 1975,
    scrollHeight: 1400,
    color: "hsl(30, 55%, 55%)",
    description: "Hai hệ thống tiền tệ song song, ảnh hưởng USD"
  },
  {
    id: "revolution",
    name: "Cách Mạng & Kháng Chiến",
    startYear: 1945,
    endYear: 1954,
    scrollHeight: 800,
    color: "hsl(25, 50%, 50%)",
    description: "Ra đời đồng tiền độc lập đầu tiên"
  },
  {
    id: "colonial",
    name: "Thời Pháp Thuộc",
    startYear: 1868,
    endYear: 1945,
    scrollHeight: 1600,
    color: "hsl(20, 45%, 45%)",
    description: "Piastre Đông Dương thay thế tiền địa phương"
  },
  {
    id: "feudal-late",
    name: "Phong Kiến Cận Đại",
    startYear: 1500,
    endYear: 1868,
    scrollHeight: 2000,
    color: "hsl(15, 40%, 40%)",
    description: "Tiền đồng triều đại, bạc tael"
  },
  {
    id: "feudal-early",
    name: "Phong Kiến Độc Lập",
    startYear: 1000,
    endYear: 1500,
    scrollHeight: 2200,
    color: "hsl(10, 35%, 35%)",
    description: "Các triều đại đúc tiền mang niên hiệu"
  },
  {
    id: "chinese",
    name: "Thời Bắc Thuộc",
    startYear: -111,
    endYear: 939,
    scrollHeight: 1800,
    color: "hsl(5, 30%, 30%)",
    description: "Tiền Trung Hoa lưu thông"
  },
  {
    id: "ancient",
    name: "Thời Cổ Đại",
    startYear: -2000,
    endYear: -111,
    scrollHeight: 1000,
    color: "hsl(0, 25%, 25%)",
    description: "Đồ đồng, vỏ sò, trao đổi hàng hóa"
  }
];
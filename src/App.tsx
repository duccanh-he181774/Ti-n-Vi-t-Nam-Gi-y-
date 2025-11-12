import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CurrencyItem {
  id: string;
  name: string;
  year: number;
  description: string;
  issuer: string;
  issueDate?: string; // Thời gian phát hành
  withdrawalDate?: string; // Thời gian thu hồi
  imageUrl: string;
  imageDetailUrl?: string;
}

interface TimeEpoch {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  scrollHeight: number;
  color: string;
  description: string;
  backgroundImage?: string;
}

const epochs: TimeEpoch[] = [
  {
    id: "modern-2000s",
    name: "Thời Kỳ Hiện Đại",
    startYear: 2000,
    endYear: 2010,
    scrollHeight: 1500,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description:
      "Ra đời tiền polymer, hệ thống ngân hàng hiện đại hóa, VND ổn định."
  },
  {
    id: "renovation-1985-1995",
    name: "Thời Kỳ Đổi Mới",
    startYear: 1985,
    endYear: 1995,
    scrollHeight: 1700,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Cải cách kinh tế, phát hành đồng tiền mới, ổn định thị trường tài chính."
  },
  {
    id: "unification-1985",
    name: "Đồng Tiền Thống Nhất",
    startYear: 1985,
    endYear: 1985,
    scrollHeight: 500,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Đổi tiền 10 đồng cũ lấy 1 đồng mới, chống lạm phát."
  },
  {
    id: "economic-reform-1979-1982",
    name: "Cải Cách Tiền Tệ",
    startYear: 1979,
    endYear: 1982,
    scrollHeight: 800,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Điều chỉnh chính sách tiền tệ, phát triển hệ thống ngân hàng."
  },
  {
    id: "post-war-economy-1977-1979",
    name: "Khôi Phục Kinh Tế",
    startYear: 1977,
    endYear: 1979,
    scrollHeight: 300,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Tái thiết kinh tế sau chiến tranh, xây dựng hệ thống tài chính mới."
  },
  {
    id: "reunification-1973-1976",
    name: "Thời Kỳ Thống Nhất",
    startYear: 1973,
    endYear: 1976,
    scrollHeight: 1000,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Hợp nhất hệ thống tiền tệ Nam - Bắc, xây dựng nền kinh tế thống nhất."
  },
  {
    id: "liberation-1971-1972",
    name: "Giải Phóng Miền Nam",
    startYear: 1971,
    endYear: 1972,
    scrollHeight: 550,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Chuẩn bị thống nhất tiền tệ, phát triển hệ thống ngân hàng cách mạng."
  },
  {
    id: "war-period-1970-1971",
    name: "Thời Kỳ Chiến Tranh",
    startYear: 1970,
    endYear: 1971,
    scrollHeight: 200,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Duy trì hệ thống tiền tệ trong điều kiện chiến tranh ác liệt."
  },
  {
    id: "tet-offensive-1970",
    name: "Sau Tổng Tiến Công",
    startYear: 1970,
    endYear: 1970,
    scrollHeight: 550,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Điều chỉnh chính sách tiền tệ sau chiến dịch Tết Mậu Thân."
  },
  {
    id: "escalation-1968-1969",
    name: "Leo Thang Chiến Tranh",
    startYear: 1968,
    endYear: 1969,
    scrollHeight: 570,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Hệ thống tiền tệ trong thời kỳ chiến tranh leo thang."
  },
  {
    id: "mid-war-1966-1968",
    name: "Giữa Thời Kỳ Chiến Tranh",
    startYear: 1966,
    endYear: 1968,
    scrollHeight: 500,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Phát triển tiền tệ vùng giải phóng, tăng cường kinh tế kháng chiến."
  },
  {
    id: "currency-reform-1966",
    name: "Cải Cách Tiền Tệ 1966",
    startYear: 1966,
    endYear: 1966,
    scrollHeight: 550,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Phát hành loại tiền mới tại Miền Bắc."
  },
  {
    id: "early-war-1964-1965",
    name: "Đầu Thời Kỳ Chiến Tranh",
    startYear: 1964,
    endYear: 1965,
    scrollHeight: 450,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Khởi đầu chiến tranh chống Mỹ, điều chỉnh hệ thống tiền tệ."
  },
  {
    id: "pre-war-1963-1964",
    name: "Trước Chiến Tranh",
    startYear: 1963,
    endYear: 1964,
    scrollHeight: 600,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Chuẩn bị kinh tế - tài chính cho cuộc kháng chiến lâu dài."
  },
  {
    id: "socialist-build-1961-1963",
    name: "Xây Dựng Chủ Nghĩa Xã Hội",
    startYear: 1961,
    endYear: 1963,
    scrollHeight: 800,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Phát triển hệ thống tiền tệ xã hội chủ nghĩa, quốc hữu hóa ngân hàng."
  },
  {
    id: "first-five-year-1957-1958",
    name: "Kế Hoạch 5 Năm Đầu",
    startYear: 1957,
    endYear: 1958,
    scrollHeight: 400,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Triển khai kế hoạch phát triển kinh tế - tài chính 5 năm đầu tiên."
  },
  {
    id: "currency-stabilization-1956",
    name: "Ổn Định Tiền Tệ",
    startYear: 1956,
    endYear: 1956,
    scrollHeight: 250,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Củng cố và ổn định hệ thống tiền tệ sau giải phóng Thủ đô."
  },
  {
    id: "post-dien-bien-1955",
    name: "Sau Điện Biên Phủ",
    startYear: 1955,
    endYear: 1955,
    scrollHeight: 550,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Phát triển hệ thống tài chính sau chiến thắng lịch sử."
  },
  {
    id: "land-reform-1952-1954",
    name: "Cải Cách Ruộng Đất",
    startYear: 1952,
    endYear: 1954,
    scrollHeight: 500,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Cải cách ruộng đất, xây dựng nền kinh tế nông nghiệp mới."
  },
  {
    id: "dong-currency-1950-1951",
    name: "Ra Đời Đồng Việt Nam",
    startYear: 1950,
    endYear: 1951,
    scrollHeight: 600,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Phát hành đồng tiền Việt Nam Dân chủ Cộng hòa đầu tiên."
  },
  {
    id: "early-resistance-1948-1949",
    name: "Đầu Thời Kỳ Kháng Chiến",
    startYear: 1948,
    endYear: 1949,
    scrollHeight: 200,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Xây dựng hệ thống tài chính kháng chiến."
  },
  {
    id: "resistance-economy-1948",
    name: "Kinh Tế Kháng Chiến",
    startYear: 1948,
    endYear: 1948,
    scrollHeight: 600,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Phát triển kinh tế kháng chiến, chuẩn bị phát hành tiền mới."
  },
  {
    id: "indochina-war-1944-1947",
    name: "Chiến Tranh Đông Dương",
    startYear: 1944,
    endYear: 1947,
    scrollHeight: 600,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Hệ thống tiền tệ trong thời kỳ đầu kháng chiến chống Pháp."
  },
  {
    id: "wwii-1941-1943",
    name: "Thế Chiến Thứ II",
    startYear: 1941,
    endYear: 1943,
    scrollHeight: 800,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Đồng tiền Đông Dương dưới sự chiếm đóng của Nhật Bản."
  },
  {
    id: "pre-wwii-1939",
    name: "Trước Thế Chiến",
    startYear: 1939,
    endYear: 1939,
    scrollHeight: 200,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Hệ thống tiền tệ trước Thế chiến thứ II."
  },
  {
    id: "depression-1935-1937",
    name: "Khủng Hoảng Kinh Tế",
    startYear: 1935,
    endYear: 1937,
    scrollHeight: 400,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Thời kỳ khủng hoảng kinh tế thế giới ảnh hưởng đến Đông Dương."
  },
  {
    id: "colonial-reform-1931-1933",
    name: "Cải Cách Thuộc Địa",
    startYear: 1931,
    endYear: 1933,
    scrollHeight: 300,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Pháp điều chỉnh hệ thống tiền tệ thuộc địa."
  },
  {
    id: "post-wwi-1927-1929",
    name: "Sau Thế Chiến I",
    startYear: 1927,
    endYear: 1929,
    scrollHeight: 300,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Phát triển kinh tế thuộc địa sau Thế chiến thứ nhất."
  },
  {
    id: "wwi-impact-1919-1922",
    name: "Tác Động Thế Chiến I",
    startYear: 1919,
    endYear: 1922,
    scrollHeight: 600,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Hệ thống tiền tệ chịu ảnh hưởng của Thế chiến thứ nhất."
  },
  {
    id: "wwi-period-1913-1918",
    name: "Thế Chiến Thứ I",
    startYear: 1913,
    endYear: 1918,
    scrollHeight: 600,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Đông Dương trong Thế chiến thứ nhất, điều chỉnh tiền tệ."
  },
  {
    id: "french-colonial-1894-1905",
    name: "Đầu Thời Kỳ Thuộc Địa Pháp",
    startYear: 1894,
    endYear: 1905,
    scrollHeight: 700,
    color: "hsl(45, 70%, 85%)",
    backgroundImage:
      "url('https://puolotrip.com/uploads/images/2023/09/mount-Fansipan-summit-view-1-jpg.webp')",
    description: "Pháp thiết lập hệ thống tiền tệ thuộc địa tại Đông Dương."
  }
];

const currencyData: CurrencyItem[] = [
  {
    "id": "polymer-10k",
    "name": "10.000 Đồng Polymer",
    "year": 2006,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là giàn khoan khai thác dầu khí, biểu trưng cho ngành công nghiệp dầu khí hiện đại. Tờ tiền được phát hành trên chất liệu polymer từ năm 2006 để tăng độ bền, thay thế cho mẫu tiền cotton.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "30/08/2006",
    "withdrawalDate": "vẫn đang lưu hành",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419575/Screenshot_2025-11-06_144406_grcrls.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419576/Screenshot_2025-11-06_144411_hceoeu.png"
  },
  {
    "id": "polymer-20k",
    "name": "20.000 Đồng Polymer",
    "year": 2006,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh Chùa Cầu tại Hội An, di sản văn hóa thế giới, biểu tượng cho sự giao thoa văn hóa. Tờ tiền polymer này được phát hành năm 2006, thay thế mẫu tiền giấy cotton.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "30/08/2006",
    "withdrawalDate": "vẫn đang lưu hành",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419575/Screenshot_2025-11-06_144351_ua3g4j.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419577/Screenshot_2025-11-06_144400_bhyhpm.png"
  },
  {
    "id": "polymer-200k",
    "name": "200.000 Đồng Polymer",
    "year": 2006,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là phong cảnh Vịnh Hạ Long, với hòn Đỉnh Hương, di sản thiên nhiên thế giới. Tờ tiền polymer này được phát hành năm 2006, là một trong những mệnh giá cao, thể hiện sự phát triển kinh tế.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "30/08/2006",
    "withdrawalDate": "vẫn đang lưu hành",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419656/Screenshot_2025-11-06_144252_rokfji.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419656/Screenshot_2025-11-06_144302_wdonqv.png"
  },
  {
    "id": "polymer-100k",
    "name": "100.000 Đồng Polymer",
    "year": 2004,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh Khuê Văn Các tại Văn Miếu - Quốc Tử Giám (Hà Nội), biểu tượng cho truyền thống hiếu học và văn hiến của dân tộc. Đây là một trong những mệnh giá polymer đầu tiên, phát hành năm 2004.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "01/09/2004",
    "withdrawalDate": "vẫn đang lưu hành",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419954/Screenshot_2025-11-06_160547_eq9lqi.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419932/Screenshot_2025-11-06_160508_htez81.png"
  },
  {
    "id": "polymer-50k",
    "name": "50.000 Đồng Polymer",
    "year": 2003,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là cụm di tích Nghinh Lương Đình và Phu Văn Lâu tại Cố đô Huế. Đây là một trong hai mệnh giá polymer đầu tiên, mở đầu cho việc thay thế tiền cotton bằng tiền polymer tại Việt Nam vào cuối năm 2003.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "17/12/2003",
    "withdrawalDate": "vẫn đang lưu hành",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419576/Screenshot_2025-11-06_144323_rgskl3.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419576/Screenshot_2025-11-06_144336_lnzhjk.png"
  },
  {
    "id": "polymer-500k",
    "name": "500.000 Đồng Polymer",
    "year": 2003,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh ngôi nhà tranh tại Làng Sen, Kim Liên, Nghệ An - quê hương của Chủ tịch Hồ Chí Minh. Là mệnh giá cao nhất, tờ tiền này được phát hành đợt đầu tiên vào cuối năm 2003.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "17/12/2003",
    "withdrawalDate": "vẫn đang lưu hành",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419656/Screenshot_2025-11-06_144233_qiek1i.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419656/Screenshot_2025-11-06_144244_uszpbv.png"
  },
  {
    "id": "polymer-50-kyniem",
    "name": "50 Đồng Kỷ Niệm",
    "year": 2001,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh và quốc huy. Mặt sau là hình ảnh tòa nhà trụ sở Ngân hàng Nhà nước Việt Nam. Đây là tờ tiền polymer đầu tiên, phát hành với tư cách tiền lưu niệm (không có giá trị thanh toán) nhân kỷ niệm 50 năm thành lập Ngân hàng (1951-2001).",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "12/05/2001",
    "withdrawalDate": "Không có giá trị lưu hành",
    "imageUrl": "https://art-hanoi.com/bn/vn/p118-f.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419574/Screenshot_2025-11-06_144428_btda9m.png"
  },
  {
    "id": "paper-100000-nhasan-hcm-1994",
    "name": "100.000 Đồng Giấy",
    "year": 1994,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh Nhà sàn Bác Hồ trong khu Phủ Chủ tịch tại Hà Nội. Đây là tờ tiền cotton mệnh giá cao nhất của Việt Nam trong một thời gian dài, phát hành năm 1994 trước khi được thay thế bằng polymer.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "30/10/1994",
    "withdrawalDate": "01/09/2004",
    "imageUrl": "https://tse3.mm.bing.net/th/id/OIP.QIjc-91j5NDivTMcm8K1uAHaDt?rs=1&pid=ImgDetMain&o=7&rm=3",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419574/Screenshot_2025-11-06_144445_oppah7.png"
  },
  {
    "id": "paper-50000-bencang-nharong-1994",
    "name": "50.000 Đồng Bến Cảng Nhà Rồng",
    "year": 1994,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh Bến cảng Nhà Rồng (TP.HCM), nơi Bác Hồ ra đi tìm đường cứu nước. Tờ tiền cotton này phát hành năm 1994, thay thế mẫu 50.000đ (Cảng Hải Phòng) 1990, trước khi bị thay thế bằng polymer năm 2003.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "15/10/1994",
    "withdrawalDate": "17/12/2003",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419573/Screenshot_2025-11-06_144452_trzygw.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419492/Screenshot_2025-11-06_144500_ckwvi4.png"
  },
  {
    "id": "paper-10k-1993",
    "name": "10.000 Đồng Giấy (Giàn khoan)",
    "year": 1993,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là giàn khoan dầu khí ngoài khơi, biểu tượng cho ngành công nghiệp dầu khí thời kỳ Đổi mới. Đây là mẫu 10.000 đồng cotton thay thế cho mẫu Vịnh Hạ Long 1990, trước khi bị thay thế bởi polymer năm 2006.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "15/10/1993",
    "withdrawalDate": "30/08/2006",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419485/Screenshot_2025-11-06_144558_hxmcmf.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762423267/Screenshot_2025-11-06_170056_mraknh.png"
  },
  {
    "id": "paper-20k-1991",
    "name": "20.000 Đồng Giấy",
    "year": 1991,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh dây chuyền sản xuất bên trong nhà máy đồ hộp, phản ánh trọng tâm phát triển công nghiệp nhẹ và chế biến thực phẩm trong giai đoạn đầu Đổi Mới.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "02/03/1991",
    "withdrawalDate": "30/08/2006",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419486/Screenshot_2025-11-06_144543_wuvx1n.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419486/Screenshot_2025-11-06_144551_wbucmw.png"
  },
  {
    "id": "paper-5k-1991",
    "name": "5.000 Đồng Giấy (Trị An, bản 2)",
    "year": 1991,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là nhà máy thủy điện Trị An. Đây là mẫu thiết kế thứ hai (thay thế mẫu 1987) với chất lượng in tốt hơn, nhấn mạnh vai trò của phát triển năng lượng trong thời kỳ Đổi Mới.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "15/01/1991",
    "withdrawalDate": "vẫn đang lưu hành",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419486/Screenshot_2025-11-06_144628_xl82bj.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419484/Screenshot_2025-11-06_144633_wfad7y.png"
  },
  {
    "id": "paper-100-1991",
    "name": "100 Đồng Giấy",
    "year": 1991,
    "description": "Mặt trước in Quốc huy Việt Nam. Mặt sau là hình ảnh Tháp Phổ Minh (Nam Định), một di tích kiến trúc cổ thời nhà Trần. Tờ tiền này tuy vẫn còn giá trị pháp lý nhưng đã ngưng lưu thông trên thực tế do lạm phát.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "02/09/1991",
    "withdrawalDate": "vẫn đang lưu hành",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419419/Screenshot_2025-11-06_144721_vetcbk.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419418/Screenshot_2025-11-06_144728_h1ilvl.png"
  },
  {
    "id": "paper-50k-1990",
    "name": "50.000 Đồng Giấy",
    "year": 1990,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau khắc họa khung cảnh Cảng Hải Phòng. Tờ tiền này phát hành năm 1990, là mệnh giá cao nhất thời điểm đó, nhưng nhanh chóng được thay thế bằng mẫu 50.000 đồng (Bến Nhà Rồng) năm 1994.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "02/03/1990",
    "withdrawalDate": "15/10/1994",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419491/Screenshot_2025-11-06_144527_yxyjw7.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419487/Screenshot_2025-11-06_144535_j6d7ex.png"
  },
  {
    "id": "paper-10k-1990",
    "name": "10.000 Đồng Giấy (Vịnh Hạ Long)",
    "year": 1990,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau khắc họa Vịnh Hạ Long, di sản thiên nhiên nổi tiếng. Tờ tiền này được phát hành năm 1990 nhưng nhanh chóng được thay thế bằng mẫu 10.000 đồng (hình giàn khoan) năm 1993.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "02/03/1990",
    "withdrawalDate": "15/10/1993",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419484/Screenshot_2025-11-06_144612_fhgngj.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419484/Screenshot_2025-11-06_144618_noedue.png"
  },
  {
    "id": "paper-2000-1988",
    "name": "2.000 Đồng Giấy",
    "year": 1988,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh các nữ công nhân đang làm việc tại nhà máy dệt. Đây là mẫu 2000đ thay thế cho mẫu cảng Hải Phòng 1987.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "28/08/1988",
    "withdrawalDate": "vẫn đang lưu hành",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419484/Screenshot_2025-11-06_144640_gfjczu.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419486/Screenshot_2025-11-06_144649_vgvd7t.png"
  },
  {
    "id": "paper-1000-1988",
    "name": "1.000 Đồng Giấy",
    "year": 1988,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là cảnh khai thác gỗ bằng voi tại Tây Nguyên. Đây là mẫu 1000đ thay thế cho mẫu nhà máy dệt 1987 và vẫn được lưu hành.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "28/08/1988",
    "withdrawalDate": "vẫn đang lưu hành",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419483/Screenshot_2025-11-06_144656_d6isgp.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419420/Screenshot_2025-11-06_144704_xcqly6.png"
  },
  {
    "id": "paper-500-1988",
    "name": "500 Đồng Giấy",
    "year": 1988,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh Cảng Hải Phòng. Tờ tiền này phát hành đầu năm 1989 (dù đề năm 1988), thay thế mẫu 500đ 1985.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "16/01/1989",
    "withdrawalDate": "vẫn đang lưu hành",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419419/Screenshot_2025-11-06_144709_abeaip.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419420/Screenshot_2025-11-06_144715_fz2ger.png"
  },
  {
    "id": "paper-5000-1987",
    "name": "5.000 Đồng Giấy (Trị An, bản 1)",
    "year": 1987,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là Nhà máy thủy điện Trị An. Đây là mệnh giá cao nhất tại thời điểm phát hành (1987). Tờ tiền này được thay thế bằng một mẫu 5.000 đồng mới (cùng hình) vào năm 1991.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "15/01/1987",
    "withdrawalDate": "15/01/1991",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419418/Screenshot_2025-11-06_144737_wrtdyh.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419419/Screenshot_2025-11-06_144745_zhfayh.png"
  },
  {
    "id": "paper-2000-1987",
    "name": "2.000 Đồng Giấy (Cảng)",
    "year": 1987,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh Cảng Hải Phòng. Tờ tiền này được phát hành năm 1987 nhưng nhanh chóng bị thay thế bằng mẫu 2.000 đồng (nhà máy dệt) năm 1988.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "15/08/1987",
    "withdrawalDate": "28/08/1988",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419418/Screenshot_2025-11-06_144750_seg1ev.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419418/Screenshot_2025-11-06_144756_roaks0.png"
  },
  {
    "id": "paper-1000-1987",
    "name": "1.000 Đồng Giấy (Dệt)",
    "year": 1987,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh Nhà máy dệt Nam Định. Tờ tiền này được phát hành năm 1987 và bị thay thế bằng mẫu 1.000 đồng (voi kéo gỗ) năm 1988.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "01/02/1987",
    "withdrawalDate": "28/08/1988",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419417/Screenshot_2025-11-06_144816_acdyzh.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419364/Screenshot_2025-11-06_144822_qvvaly.png"
  },
  {
    "id": "paper-200-1987",
    "name": "200 Đồng Giấy",
    "year": 1987,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là cảnh sản xuất nông nghiệp với máy cày và nông dân, nhấn mạnh tầm quan trọng của nông nghiệp trong giai đoạn đầu Đổi Mới.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "10/03/1987",
    "withdrawalDate": "vẫn đang lưu hành",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419364/Screenshot_2025-11-06_144830_rf453n.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419358/Screenshot_2025-11-06_144842_iczziw.png"
  },
  {
    "id": "paper-500-1985",
    "name": "500 Đồng Giấy",
    "year": 1985,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh Cảng Hải Phòng. Đây là mệnh giá cao nhất trong bộ tiền Đổi tiền năm 1985, nhưng nhanh chóng mất giá do lạm phát phi mã.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "14/09/1985",
    "withdrawalDate": "16/01/1989",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419357/Screenshot_2025-11-06_144850_rvquor.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419357/Screenshot_2025-11-06_144857_tkqleg.png"
  },
  {
    "id": "paper-100-1985",
    "name": "100 Đồng Giấy",
    "year": 1985,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là cảnh cấy lúa, phản ánh nền kinh tế còn dựa nặng vào nông nghiệp. Thuộc bộ tiền Đổi tiền 1985.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "14/09/1985",
    "withdrawalDate": "vẫn đang lưu hành",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419357/Screenshot_2025-11-06_144902_qs25ls.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419357/Screenshot_2025-11-06_144917_tjjob6.png"
  },
  {
    "id": "paper-50-1985",
    "name": "50 Đồng Giấy",
    "year": 1985,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là Nhà máy thủy điện Thác Bà, tượng trưng cho khôi phục hạ tầng năng lượng. Thuộc bộ tiền Đổi tiền 1985.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "14/09/1985",
    "withdrawalDate": "1987-1988",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419357/Screenshot_2025-11-06_144924_q6gddf.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419357/Screenshot_2025-11-06_144929_pl1rhp.png"
  },
  {
    "id": "paper-30-1985",
    "name": "30 Đồng Giấy",
    "year": 1985,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là Chợ Bến Thành (TP.HCM), biểu tượng thương mại đô thị. Thuộc bộ tiền Đổi tiền 1985.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "14/09/1985",
    "withdrawalDate": "1987-1988",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419299/Screenshot_2025-11-06_144956_apuswi.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419300/Screenshot_2025-11-06_145000_qtaszq.png"
  },
  {
    "id": "paper-20-1985",
    "name": "20 Đồng Giấy",
    "year": 1985,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh Chùa Một Cột (Hà Nội). Thuộc bộ tiền Đổi tiền 1985.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "14/09/1985",
    "withdrawalDate": "1987-1988",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419299/Screenshot_2025-11-06_145005_e4shgt.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419299/Screenshot_2025-11-06_145012_so680v.png"
  },
  {
    "id": "paper-10-1985",
    "name": "10 Đồng Giấy",
    "year": 1985,
    "description": "Mặt trước in Quốc huy Việt Nam. Mặt sau là hình ảnh Đền Ngọc Sơn (Hà Nội). Thuộc bộ tiền Đổi tiền 1985, mệnh giá nhỏ.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "14/09/1985",
    "withdrawalDate": "1987-1988",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419298/Screenshot_2025-11-06_145017_mykbmy.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419298/Screenshot_2025-11-06_145023_xltipa.png"
  },
  {
    "id": "paper-5-1985",
    "name": "5 Đồng Giấy",
    "year": 1985,
    "description": "Mặt trước in Quốc huy Việt Nam. Mặt sau là cảnh thuyền trên sông Hương (Huế). Thuộc bộ tiền Đổi tiền 1985, mệnh giá rất nhỏ.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "14/09/1985",
    "withdrawalDate": "1987-1988",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419298/Screenshot_2025-11-06_145031_dnyea4.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419298/Screenshot_2025-11-06_145043_ccqt3g.png"
  },
  {
    "id": "paper-2-1985",
    "name": "2 Đồng Giấy",
    "year": 1985,
    "description": "Mặt trước in Quốc huy Việt Nam. Mặt sau là cảnh thuyền buồm trên Vịnh Hạ Long. Thuộc bộ tiền Đổi tiền 1985, mệnh giá rất nhỏ.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "14/09/1985",
    "withdrawalDate": "1987-1988",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419297/Screenshot_2025-11-06_145053_v7v6vi.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419244/Screenshot_2025-11-06_145059_kmhxjp.png"
  },
  {
    "id": "paper-1-1985",
    "name": "1 Đồng Giấy",
    "year": 1985,
    "description": "Mặt trước in Quốc huy Việt Nam. Mặt sau là cảnh Hòn Phụ Tử (Kiên Giang). Thuộc bộ tiền Đổi tiền 1985, mệnh giá rất nhỏ.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "14/09/1985",
    "withdrawalDate": "1987-1988",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419243/Screenshot_2025-11-06_145105_fggtjf.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419243/Screenshot_2025-11-06_145110_jtvkil.png"
  },
  {
    "id": "paper-0.5-1985",
    "name": "5 Hào Giấy",
    "year": 1985,
    "description": "Mặt trước in Quốc huy Việt Nam. Mặt sau là Cột Cờ Hà Nội. Đây là mệnh giá phụ (hào) phát hành trong cuộc Đổi tiền 1985, nhanh chóng mất giá trị do lạm phát.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "14/09/1985",
    "withdrawalDate": "1987-1988",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419242/Screenshot_2025-11-06_145115_kabzrt.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419243/Screenshot_2025-11-06_145121_w58mpu.png"
  },
  {
    "id": "paper-30-1981",
    "name": "30 Đồng Giấy",
    "year": 1981,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là Chợ Bến Thành (TP.HCM). Tờ tiền này được phát hành bổ sung trong thời kỳ bao cấp, trước cuộc Đổi tiền 1985.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "1981",
    "withdrawalDate": "14/09/1985",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419242/Screenshot_2025-11-06_145138_yyp96s.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419242/Screenshot_2025-11-06_145145_izwrpe.png"
  },
  {
    "id": "paper-100-1980",
    "name": "100 Đồng Giấy",
    "year": 1980,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh Vịnh Hạ Long. Đây là mệnh giá cao nhất được phát hành bổ sung trong thời kỳ bao cấp, trước cuộc Đổi tiền 1985.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "1980",
    "withdrawalDate": "14/09/1985",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419242/Screenshot_2025-11-06_145127_sqgw2v.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419242/Screenshot_2025-11-06_145132_aefts0.png"
  },
  {
    "id": "paper-10-1980",
    "name": "10 Đồng Giấy",
    "year": 1980,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh Nhà sàn Bác Hồ. Tờ tiền này được phát hành bổ sung, thay thế mẫu 10 đồng (voi kéo gỗ) 1976.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "1980",
    "withdrawalDate": "14/09/1985",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419241/Screenshot_2025-11-06_145150_gvdflk.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762930415/Screenshot_2025-11-12_135326_hjljyw.png"
  },
  {
    "id": "paper-2-1980",
    "name": "2 Đồng Giấy",
    "year": 1980,
    "description": "Mặt trước in Quốc huy Việt Nam. Mặt sau là cảnh thuyền buồm trên Vịnh Hạ Long. Tờ tiền này được phát hành bổ sung trong thời kỳ bao cấp.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "1980",
    "withdrawalDate": "14/09/1985",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419195/Screenshot_2025-11-06_145201_nd1sn4.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419195/Screenshot_2025-11-06_145206_pdaf4h.png"
  },
  {
    "id": "paper-50-1976",
    "name": "50 Đồng Giấy",
    "year": 1976,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là cảnh khai thác than lộ thiên tại Quảng Ninh. Thuộc bộ tiền thống nhất đầu tiên phát hành năm 1976.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "1976",
    "withdrawalDate": "14/09/1985",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419194/Screenshot_2025-11-06_145214_vehfz9.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419195/Screenshot_2025-11-06_145219_uko9lu.png"
  },
  {
    "id": "paper-20-1976",
    "name": "20 Đồng Giấy",
    "year": 1976,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là cảnh đập thủy lợi và máy cày, biểu trưng cho cơ giới hóa nông nghiệp. Thuộc bộ tiền thống nhất 1976.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "1976",
    "withdrawalDate": "14/09/1985",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419194/Screenshot_2025-11-06_145228_uubbu7.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419194/Screenshot_2025-11-06_145234_vql9pq.png"
  },
  {
    "id": "paper-10-1976",
    "name": "10 Đồng Giấy",
    "year": 1976,
    "description": "Mặt trước in Quốc huy Việt Nam. Mặt sau là cảnh khai thác gỗ bằng voi tại Tây Nguyên. Thuộc bộ tiền thống nhất 1976.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "1976",
    "withdrawalDate": "14/09/1985",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419194/Screenshot_2025-11-06_145240_mdwukz.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419194/Screenshot_2025-11-06_145245_epuqcc.png"
  },
  {
    "id": "paper-5-1976",
    "name": "5 Đồng Giấy",
    "year": 1976,
    "description": "Mặt trước in Quốc huy Việt Nam. Mặt sau khắc họa một cảnh lao động sôi động tại cảng biển với tàu thủy và cần cẩu, biểu trưng cho nỗ lực tái thiết. Thuộc bộ tiền thống nhất 1976.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "1976",
    "withdrawalDate": "14/09/1985",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419134/Screenshot_2025-11-06_145251_wbls2q.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419134/Screenshot_2025-11-06_145258_o8k5zd.png"
  },
  {
    "id": "paper-1-1976",
    "name": "1 Đồng Giấy",
    "year": 1976,
    "description": "Mặt trước in Quốc huy Việt Nam. Mặt sau là cảnh nhà máy công nghiệp, biểu trưng cho khôi phục sản xuất. Thuộc bộ tiền thống nhất 1976.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "1976",
    "withdrawalDate": "14/09/1985",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419130/Screenshot_2025-11-06_145316_iknmyu.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419130/Screenshot_2025-11-06_145322_mzq1hz.png"
  },
  {
    "id": "paper-0.5-1976",
    "name": "5 Hào Giấy",
    "year": 1976,
    "description": "Mặt trước in Quốc huy Việt Nam. Mặt sau là hình ảnh cảng biển với tàu và cần cẩu, tượng trưng cho thương mại. Thuộc bộ tiền thống nhất 1976, mệnh giá phụ.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "1976",
    "withdrawalDate": "14/09/1985",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419130/Screenshot_2025-11-06_145328_vkij3p.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419130/Screenshot_2025-11-06_145334_s6lbjl.png"
  },
  {
    "id": "paper-0.2-1975",
    "name": "2 Hào Giấy",
    "year": 1975,
    "description": "Mặt trước in Quốc huy Việt Nam Dân chủ Cộng hòa. Mặt sau là hình ảnh Cột cờ Hà Nội. Đây là tiền phát hành ở miền Bắc, sau đó được đổi sang tiền thống nhất 1976.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "1975",
    "withdrawalDate": "1976",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418947/Screenshot_2025-11-06_145911_kqj7dr.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418943/Screenshot_2025-11-06_145916_ejtquk.png"
  },
  {
    "id": "paper-0.05-1975",
    "name": "5 Xu Giấy",
    "year": 1975,
    "description": "Mặt trước in Quốc huy Việt Nam Dân chủ Cộng hòa. Mặt sau là hoa văn. Mệnh giá rất nhỏ, phát hành ở miền Bắc và nhanh chóng bị thay thế sau khi thống nhất.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "1975",
    "withdrawalDate": "1976",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418905/Screenshot_2025-11-06_145942_wcldlr.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418905/Screenshot_2025-11-06_145950_pridzb.png"
  },
  {
    "id": "vnch-5000d-1974",
    "name": "5.000 Đồng Giấy",
    "year": 1974,
    "description": "Mặt trước in hình Dinh Độc Lập (Sài Gòn). Mặt sau là hình ảnh một con báo (báo gấm), thuộc bộ tiền 'Thú' cuối cùng của VNCH. Tờ tiền này được in nhưng gần như chưa kịp lưu hành rộng rãi trước sự kiện 30/04/1975.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1974",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762395423/Screenshot_2025-11-06_091538_mm3gmy.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762930739/Screenshot_2025-11-12_135851_wbqt1n.png"
  },
  {
    "id": "vnch-10000d-1974",
    "name": "10.000 Đồng Giấy",
    "year": 1974,
    "description": "Mặt trước in hình Dinh Độc Lập. Mặt sau là hình ảnh đầu trâu, biểu tượng cho nông nghiệp. Đây là mệnh giá cao nhất, được in và phát hành ngay trước khi chế độ VNCH sụp đổ, gần như không lưu hành.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1974 (phát hành 1975)",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762395744/Screenshot_2025-11-06_092130_milbto.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418618/Screenshot_2025-11-06_151805_kp7rz3.png"
  },
  {
    "id": "paper-0.1-1972",
    "name": "1 Hào Giấy",
    "year": 1972,
    "description": "Mặt trước in Quốc huy Việt Nam Dân chủ Cộng hòa và mệnh giá. Mặt sau là cảnh lao động sản xuất tại nhà máy. Đây là tiền phát hành ở miền Bắc, trong thời kỳ chiến tranh và bao cấp.",
    "issuer": "Ngân hàng Nhà nước Việt Nam",
    "issueDate": "1972",
    "withdrawalDate": "1976",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418943/Screenshot_2025-11-06_145924_kiuhzu.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418943/Screenshot_2025-11-06_145929_o77f4l.png"
  },
  {
    "id": "paper-1000-1972",
    "name": "1.000 Đồng Giấy",
    "year": 1972,
    "description": "Mặt trước in hình Dinh Độc Lập. Mặt sau là cảnh voi kéo gỗ. Tờ tiền này thuộc bộ 'Thú' 1972 của Việt Nam Cộng Hòa, được in tại Anh.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1972",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418597/Screenshot_2025-11-06_151822_xclptn.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418598/Screenshot_2025-11-06_151828_gvinu0.png"
  },
  {
    "id": "paper-500-1972",
    "name": "500 Đồng Giấy",
    "year": 1972,
    "description": "Mặt trước in hình Dinh Độc Lập. Mặt sau là hình ảnh hổ (cọp), một thiết kế nổi tiếng thuộc bộ 'Thú' 1972 của Việt Nam Cộng Hòa.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1972",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418597/Screenshot_2025-11-06_151835_tgpibc.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418597/Screenshot_2025-11-06_151841_g6jmqe.png"
  },
  {
    "id": "paper-200-1972",
    "name": "200 Đồng Giấy",
    "year": 1972,
    "description": "Mặt trước in hình Dinh Độc Lập. Mặt sau là hình ảnh một cặp nai. Thuộc bộ 'Thú' 1972 của Việt Nam Cộng Hòa, in tại London.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1972",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418596/Screenshot_2025-11-06_151847_smt7ja.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418596/Screenshot_2025-11-06_151853_xunqmi.png"
  },
  {
    "id": "paper-100-1972",
    "name": "100 Đồng Giấy",
    "year": 1972,
    "description": "Mặt trước in hình Dinh Độc Lập. Mặt sau là hình ảnh người nông dân dắt trâu, nhấn mạnh nền nông nghiệp. Thuộc bộ 'Thú' 1972 của Việt Nam Cộng Hòa.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1972",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418596/Screenshot_2025-11-06_151900_inslxd.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418596/Screenshot_2025-11-06_151905_tzj6l5.png"
  },
  {
    "id": "paper-50-1972",
    "name": "50 Đồng Giấy",
    "year": 1972,
    "description": "Mặt trước in hình Dinh Độc Lập. Mặt sau là hình ảnh một bầy ngựa đang phi. Thuộc bộ 'Thú' 1972 của Việt Nam Cộng Hòa.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1972",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418595/Screenshot_2025-11-06_151913_fzux0u.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418595/Screenshot_2025-11-06_151922_igzkyx.png"
  },
  {
    "id": "paper-1000-1971",
    "name": "1.000 Đồng Giấy",
    "year": 1971,
    "description": "Mặt trước in trụ sở Ngân hàng Quốc gia VNCH ở Sài Gòn. Mặt sau là hình ảnh tòa nhà ngân hàng nhìn từ một góc khác. Đây là bộ tiền thống nhất nhận diện bằng hình ảnh trụ sở ngân hàng.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1971",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418595/Screenshot_2025-11-06_151934_vzbmwi.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418595/Screenshot_2025-11-06_151942_qzlkp9.png"
  },
  {
    "id": "paper-500-1970",
    "name": "500 Đồng Giấy",
    "year": 1970,
    "description": "Mặt trước in trụ sở Ngân hàng Quốc gia VNCH. Mặt sau là hình ảnh tòa nhà ngân hàng nhìn từ một góc khác. Thuộc bộ tiền phát hành năm 1970 với watermark Trần Hưng Đạo.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1970",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418595/Screenshot_2025-11-06_151948_xjzazf.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418595/Screenshot_2025-11-06_151954_zpjp29.png"
  },
  {
    "id": "paper-200-1970",
    "name": "200 Đồng Giấy",
    "year": 1970,
    "description": "Mặt trước in trụ sở Ngân hàng Quốc gia VNCH. Mặt sau là hình ảnh tòa nhà ngân hàng nhìn từ một góc khác. Thuộc bộ tiền phát hành năm 1970.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1970",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418594/Screenshot_2025-11-06_151959_bysiog.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418594/Screenshot_2025-11-06_152006_cdldmj.png"
  },
  {
    "id": "paper-100-1970",
    "name": "100 Đồng Giấy",
    "year": 1970,
    "description": "Mặt trước in trụ sở Ngân hàng Quốc gia VNCH. Mặt sau là hình ảnh tòa nhà ngân hàng nhìn từ một góc khác. Thuộc bộ tiền phát hành năm 1970.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1970",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418593/Screenshot_2025-11-06_152012_exhg8d.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418594/Screenshot_2025-11-06_152017_pljjjh.png"
  },
  {
    "id": "mpc-5c-692",
    "name": "5 Cents Series 692",
    "year": 1970,
    "description": "Mặt trước khắc họa tác phẩm điêu khắc 'The Guardian' của James Earle Fraser. Mặt sau là hình ảnh một con bò rừng Mỹ (bison). Đây là series MPC cuối cùng được sử dụng tại Việt Nam, lưu hành từ 1970 đến 1973.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "07/10/1970",
    "withdrawalDate": "15/03/1973",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310615/67cee31fda7c13.76669791-original_qoy47j.jpg",
    "imageDetailUrl": "https://thumbs.worthpoint.com/zoom/images1/1/0513/15/military-payment-certificate-cents_1_d4949bf1fdba4a319cae725286591912.jpg"
  },
  {
    "id": "mpc-10c-692",
    "name": "10 Cents Series 692",
    "year": 1970,
    "description": "Mặt trước khắc họa tác phẩm điêu khắc 'The Guardian'. Mặt sau là hình ảnh bò rừng Mỹ (bison). Thuộc series 692, series MPC cuối cùng dùng tại Việt Nam.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "07/10/1970",
    "withdrawalDate": "15/03/1973",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310615/67cee4da192984.62423117-original_acvinj.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310615/67cee4da192984.62423117-original_acvinj.jpg"
  },
  {
    "id": "mpc-25c-692",
    "name": "25 Cents Series 692",
    "year": 1970,
    "description": "Mặt trước khắc họa tác phẩm điêu khắc 'The Guardian'. Mặt sau là hình ảnh bò rừng Mỹ (bison). Thuộc series 692, series MPC cuối cùng dùng tại Việt Nam.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "07/10/1970",
    "withdrawalDate": "15/03/1973",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310616/6794c113c46ee4.76417145-original_ixylt5.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310616/6794c113c46ee4.76417145-original_ixylt5.jpg"
  },
  {
    "id": "mpc-50c-692",
    "name": "50 Cents Series 692",
    "year": 1970,
    "description": "Mặt trước khắc họa tác phẩm điêu khắc 'The Guardian'. Mặt sau là hình ảnh bò rừng Mỹ (bison). Thuộc series 692, series MPC cuối cùng dùng tại Việt Nam.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "07/10/1970",
    "withdrawalDate": "15/03/1973",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310611/6794bdedf3ad21.98815717-original_a3imlr.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310611/6794bdedf3ad21.98815717-original_a3imlr.jpg"
  },
  {
    "id": "mpc-1d-692",
    "name": "1 Dollar Series 692",
    "year": 1970,
    "description": "Mặt trước là chân dung một phụ nữ (tượng trưng cho Tự do). Mặt sau là hình ảnh bò rừng Mỹ (bison). Đây là mẫu 'Buffalo $1' nổi tiếng, thuộc series MPC cuối cùng dùng tại Việt Nam.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "07/10/1970",
    "withdrawalDate": "15/03/1973",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310612/6796a173818ff3.69166058-original_qfwkll.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310612/6796a173818ff3.69166058-original_qfwkll.jpg"
  },
  {
    "id": "mpc-5d-692",
    "name": "5 Dollars Series 692",
    "year": 1970,
    "description": "Mặt trước là chân dung một phụ nữ. Mặt sau là hình ảnh một con đại bàng. Thuộc series 692, series MPC cuối cùng dùng tại Việt Nam.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "07/10/1970",
    "withdrawalDate": "15/03/1973",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310611/6468303f3f4cf1.61591140-original_npous4.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310611/6468303f3f4cf1.61591140-original_npous4.jpg"
  },
  {
    "id": "mpc-20d-692",
    "name": "20 Dollars Series 692",
    "year": 1970,
    "description": "Mặt trước là chân dung Tù trưởng Ouray của bộ tộc Ute. Mặt sau là hình ảnh đại bàng. Đây là mệnh giá cao nhất của series 692, series MPC cuối cùng dùng tại Việt Nam.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "07/10/1970",
    "withdrawalDate": "15/03/1973",
    "imageUrl": "https://tse3.mm.bing.net/th/id/OIP.csf8KnUqTvQM-aKIKZr6XAHaDR?rs=1&pid=ImgDetMain&o=7&rm=3",
    "imageDetailUrl": "https://tse3.mm.bing.net/th/id/OIP.csf8KnUqTvQM-aKIKZr6XAHaDR?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    "id": "vnch-20d-1969-a",
    "name": "20 đồng Việt Nam Cộng Hòa (1969)",
    "year": 1969,
    "description": "Mặt trước in trụ sở Ngân hàng Quốc gia VNCH. Mặt sau là hình ảnh tòa nhà ngân hàng nhìn từ một góc khác. Thuộc bộ tiền phát hành năm 1969-1970.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1969",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418944/Screenshot_2025-11-06_145856_zsycuw.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418944/Screenshot_2025-11-06_145905_lvsbpw.png"
  },
  {
    "id": "vnch-50d-1969",
    "name": "50 đồng Việt Nam Cộng Hòa (1969)",
    "year": 1969,
    "description": "Mặt trước in trụ sở Ngân hàng Quốc gia VNCH. Mặt sau là hình ảnh tòa nhà ngân hàng nhìn từ một góc khác. Thuộc bộ tiền phát hành năm 1969-1970.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1969",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418593/Screenshot_2025-11-06_152024_ql4jvu.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418593/Screenshot_2025-11-06_152031_uxyxzj.png"
  },
  {
    "id": "vnch-20d-1969-b",
    "name": "20 đồng Việt Nam Cộng Hòa (1969 - bản khác)",
    "year": 1969,
    "description": "Mặt trước in trụ sở Ngân hàng Quốc gia VNCH. Mặt sau là hình ảnh tòa nhà ngân hàng nhìn từ một góc khác. Thuộc bộ tiền phát hành năm 1969-1970, khác biệt về màu sắc.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1969",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418580/Screenshot_2025-11-06_152036_l3pts1.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418580/Screenshot_2025-11-06_152041_wfjiyu.png"
  },
  {
    "id": "mpc-5c-681",
    "name": "5 Cents Series 681",
    "year": 1969,
    "description": "Mặt trước là hình ảnh một phi hành gia. Mặt sau là hình tàu ngầm hải quân. Thuộc series 681, lưu hành tại Việt Nam từ 1969 đến 1970.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "11/08/1969",
    "withdrawalDate": "07/10/1970",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310611/64682ce7a2cff0.56859537-original_uwkhd5.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310611/64682ce7a2cff0.56859537-original_uwkhd5.jpg"
  },
  {
    "id": "mpc-10c-681",
    "name": "10 Cents Series 681",
    "year": 1969,
    "description": "Mặt trước là hình ảnh một phi hành gia. Mặt sau là hình tàu ngầm hải quân. Thuộc series 681, lưu hành tại Việt Nam từ 1969 đến 1970.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "11/08/1969",
    "withdrawalDate": "07/10/1970",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310610/679ad8239394f1.80935059-original_k4ykef.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310610/679ad8239394f1.80935059-original_k4ykef.jpg"
  },
  {
    "id": "mpc-25c-681",
    "name": "25 Cents Series 681",
    "year": 1969,
    "description": "Mặt trước là hình ảnh một phi hành gia. Mặt sau là hình tàu ngầm hải quân. Thuộc series 681, lưu hành tại Việt Nam từ 1969 đến 1970.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "11/08/1969",
    "withdrawalDate": "07/10/1970",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310614/6794c252a7a034.71983251-original_sq5vdm.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310614/6794c252a7a034.71983251-original_sq5vdm.jpg"
  },
  {
    "id": "mpc-50c-681",
    "name": "50 Cents Series 681",
    "year": 1969,
    "description": "Mặt trước là hình ảnh một phi hành gia. Mặt sau là hình tàu ngầm hải quân. Thuộc series 681, lưu hành tại Việt Nam từ 1969 đến 1970.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "11/08/1969",
    "withdrawalDate": "07/10/1970",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310616/6794bf88818076.25635462-original_imxgpe.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310616/6794bf88818076.25635462-original_imxgpe.jpg"
  },
  {
    "id": "mpc-1d-681",
    "name": "1 Dollar Series 681",
    "year": 1969,
    "description": "Mặt trước là chân dung một lính không quân. Mặt sau là đội hình 4 máy bay phản lực. Thuộc series 681, lưu hành tại Việt Nam từ 1969 đến 1970.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "11/08/1969",
    "withdrawalDate": "07/10/1970",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310614/67cee6a9470a34.68860229-original_mkjty5.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310614/67cee6a9470a34.68860229-original_mkjty5.jpg"
  },
  {
    "id": "mpc-5d-681",
    "name": "5 Dollars Series 681",
    "year": 1969,
    "description": "Mặt trước khắc họa một thủy thủ Hải quân Mỹ. Mặt sau là hình ảnh đại bàng. Thuộc series 681, lưu hành tại Việt Nam từ 1969 đến 1970.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "11/08/1969",
    "withdrawalDate": "07/10/1970",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310615/6468303434ede4.90179824-original_kn1cjk.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310615/6468303434ede4.90179824-original_kn1cjk.jpg"
  },
  {
    "id": "mpc-10d-681",
    "name": "10 Dollars Series 681",
    "year": 1969,
    "description": "Mặt trước khắc chân dung lính bộ binh cầm máy bộ đàm PRC-25. Mặt sau là xe tăng M48 Patton. Thuộc series 681, lưu hành tại Việt Nam từ 1969 đến 1970.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "11/08/1969",
    "withdrawalDate": "07/10/1970",
    "imageUrl": "https://th.bing.com/th/id/R.4ab6fff5143855c52fc0a99b8d7e8227?rik=uNXNiidcCkHWGA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-_1GLcTz9718%2fVEGAul7QLVI%2fAAAAAAAACuY%2f4K4GrqEBzfw%2fs1600%2fSeries%252B681%252B%252410%252BMilitary%252BPayment%252BCertificate.JPG&ehk=6sN0QxB4wdBKV5ZkzRkYTZUd8QUeeIrDH9TfhqfdK5A%3d&risl=&pid=ImgRaw&r=0",
    "imageDetailUrl": "https://th.bing.com/th/id/R.4ab6fff5143855c52fc0a99b8d7e8227?rik=uNXNiidcCkHWGA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-_1GLcTz9718%2fVEGAul7QLVI%2fAAAAAAAACuY%2f4K4GrqEBzfw%2fs1600%2fSeries%252B681%252B%252410%252BMilitary%252BPayment%252BCertificate.JPG&ehk=6sN0QxB4wdBKV5ZkzRkYTZUd8QUeeIrDH9TfhqfdK5A%3d&risl=&pid=ImgRaw&r=0"
  },
  {
    "id": "mpc-20d-681",
    "name": "20 Dollars Series 681",
    "year": 1969,
    "description": "Mặt trước là chân dung lính đặc nhiệm (Mũ nồi xanh). Mặt sau là máy bay ném bom B-52. Thuộc series 681, lưu hành tại Việt Nam từ 1969 đến 1970.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "11/08/1969",
    "withdrawalDate": "07/10/1970",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310614/6468309e0b3c62.22427982-original_zxnhmt.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310614/6468309e0b3c62.22427982-original_zxnhmt.jpg"
  },
  {
    "id": "mpc-5c-661",
    "name": "5 Cents Series 661",
    "year": 1968,
    "description": "Mặt trước là chân dung một phụ nữ. Mặt sau là hình ảnh một phi hành gia đi bộ ngoài không gian, lấy cảm hứng từ tàu Gemini. Lưu hành tại Việt Nam từ 1968 đến 1969.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "21/10/1968",
    "withdrawalDate": "11/08/1969",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762311291/2_j5x87n.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762311291/2_j5x87n.jpg"
  },
  {
    "id": "mpc-10c-661",
    "name": "10 Cents Series 661",
    "year": 1968,
    "description": "Mặt trước là chân dung một phụ nữ. Mặt sau là hình ảnh một phi hành gia đi bộ ngoài không gian. Thuộc series 661, lưu hành tại Việt Nam từ 1968 đến 1969.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "21/10/1968",
    "withdrawalDate": "11/08/1969",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310613/67ceee824d7892.55143381-original_o65m4y.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310613/67ceee824d7892.55143381-original_o65m4y.jpg"
  },
  {
    "id": "mpc-25c-661",
    "name": "25 Cents Series 661",
    "year": 1968,
    "description": "Mặt trước là chân dung một phụ nữ. Mặt sau là hình ảnh một phi hành gia đi bộ ngoài không gian. Thuộc series 661, lưu hành tại Việt Nam từ 1968 đến 1969.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "21/10/1968",
    "withdrawalDate": "11/08/1969",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310611/64682e49dcbc29.68144336-original_env5p5.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310611/64682e49dcbc29.68144336-original_env5p5.jpg"
  },
  {
    "id": "mpc-50c-661",
    "name": "50 Cents Series 661",
    "year": 1968,
    "description": "Mặt trước là chân dung một phụ nữ. Mặt sau là hình ảnh một phi hành gia đi bộ ngoài không gian. Thuộc series 661, lưu hành tại Việt Nam từ 1968 đến 1969.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "21/10/1968",
    "withdrawalDate": "11/08/1969",
    "imageUrl": "https://tse4.mm.bing.net/th/id/OIP.bOpFcCRUn-X6NqQWrrC_PwHaDu?rs=1&pid=ImgDetMain&o=7&rm=3",
    "imageDetailUrl": "https://tse4.mm.bing.net/th/id/OIP.bOpFcCRUn-X6NqQWrrC_PwHaDu?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    "id": "mpc-1d-661",
    "name": "1 Dollar Series 661",
    "year": 1968,
    "description": "Mặt trước là hình tượng Nữ thần Tự do. Mặt sau là hoa văn và mệnh giá. Thuộc series 661, lưu hành tại Việt Nam từ 1968 đến 1969.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "21/10/1968",
    "withdrawalDate": "11/08/1969",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310610/64682fc7ada5a0.31248554-original_wygkep.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310610/64682fc7ada5a0.31248554-original_wygkep.jpg"
  },
  {
    "id": "mpc-5d-661",
    "name": "5 Dollars Series 661",
    "year": 1968,
    "description": "Mặt trước khắc chân dung một phụ nữ (tượng trưng). Mặt sau là hình ảnh tàu vũ trụ Mercury. Thuộc series 661, lưu hành tại Việt Nam từ 1968 đến 1969.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "21/10/1968",
    "withdrawalDate": "11/08/1969",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310611/6468301d5f3104.68498721-original_pc722c.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310611/6468301d5f3104.68498721-original_pc722c.jpg"
  },
  {
    "id": "vnch-50d-1966",
    "name": "50 đồng Việt Nam Cộng Hòa (1966)",
    "year": 1966,
    "description": "Mặt trước là cảnh trường học. Mặt sau là hoa văn. Thuộc bộ tiền 'Hoa văn' 1966 của Việt Nam Cộng Hòa.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1966",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419129/Screenshot_2025-11-06_145344_wmtpfr.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419129/Screenshot_2025-11-06_145350_xvpfcl.png"
  },
  {
    "id": "vnch-10d-1966",
    "name": "10 đồng Việt Nam Cộng Hòa (1966)",
    "year": 1966,
    "description": "Mặt trước là cảnh nông thôn. Mặt sau là hoa văn. Thuộc bộ tiền 'Hoa văn' 1966 của Việt Nam Cộng Hòa.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1966",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419128/Screenshot_2025-11-06_145355_asxcpa.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419128/Screenshot_2025-11-06_145400_twstm3.png"
  },
  {
    "id": "vnch-5d-1966",
    "name": "5 đồng Việt Nam Cộng Hòa (1966)",
    "year": 1966,
    "description": "Mặt trước là cảnh nhà máy dệt. Mặt sau là hoa văn. Thuộc bộ tiền 'Hoa văn' 1966 của Việt Nam Cộng Hòa.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1966",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419128/Screenshot_2025-11-06_145404_kjo5lm.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419128/Screenshot_2025-11-06_145410_bpjzod.png"
  },
  {
    "id": "vnch-2d-1966",
    "name": "2 đồng Việt Nam Cộng Hòa (1966)",
    "year": 1966,
    "description": "Mặt trước là cảnh thuyền trên kênh rạch Sài Gòn. Mặt sau là hoa văn. Thuộc bộ tiền 'Hoa văn' 1966 của Việt Nam Cộng Hòa.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1966",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419127/Screenshot_2025-11-06_145415_cxcgxg.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419089/Screenshot_2025-11-06_145422_uukfc0.png"
  },
  {
    "id": "vnch-1d-1966",
    "name": "1 đồng Việt Nam Cộng Hòa (1966)",
    "year": 1966,
    "description": "Mặt trước là cảnh thuyền trên sông. Mặt sau là hoa văn. Thuộc bộ tiền 'Hoa văn' 1966 của Việt Nam Cộng Hòa.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1966",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419084/Screenshot_2025-11-06_145429_yoasxg.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419085/Screenshot_2025-11-06_145500_o5wash.png"
  },
  {
    "id": "vnch-50xu-1966",
    "name": "50 xu Việt Nam Cộng Hòa (1966)",
    "year": 1966,
    "description": "Mặt trước là cảnh dệt chiếu. Mặt sau là cảnh thu hoạch mía. Thuộc bộ tiền 'Hoa văn' 1966, mệnh giá phụ.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1966",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419084/Screenshot_2025-11-06_145506_bgsdl3.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419084/Screenshot_2025-11-06_145510_ky75as.png"
  },
  {
    "id": "vnch-20xu-1966",
    "name": "20 xu Việt Nam Cộng Hòa (1966)",
    "year": 1966,
    "description": "Mặt trước là cảnh đồn điền cao su. Mặt sau là cảnh cày ruộng. Thuộc bộ tiền 'Hoa văn' 1966, mệnh giá phụ.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1966",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419084/Screenshot_2025-11-06_145516_hreern.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419084/Screenshot_2025-11-06_145521_qufuvy.png"
  },
  {
    "id": "vnch-10xu-1966",
    "name": "10 xu Việt Nam Cộng Hòa (1966)",
    "year": 1966,
    "description": "Mặt trước là cảnh làm muối. Mặt sau là cảnh thuyền trên sông. Thuộc bộ tiền 'Hoa văn' 1966, mệnh giá phụ.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1966",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419083/Screenshot_2025-11-06_145527_kk9yus.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419083/Screenshot_2025-11-06_145532_exwn1s.png"
  },
  {
    "id": "vnch-500d-1966-tuong",
    "name": "500 đồng Việt Nam Cộng Hòa (Trần Hưng Đạo)",
    "year": 1966,
    "description": "Mặt trước in chân dung danh tướng Trần Hưng Đạo. Mặt sau là cảnh đoàn thuyền chiến trên sông, biểu tượng cho hải quân. Thuộc bộ tiền 'Danh nhân' 1966 của Việt Nam Cộng Hòa.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1966",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418580/Screenshot_2025-11-06_152047_ezka6j.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418580/Screenshot_2025-11-06_152052_sa0c1x.png"
  },
  {
    "id": "vnch-200d-1966-tuong",
    "name": "200 đồng Việt Nam Cộng Hòa (Quang Trung)",
    "year": 1966,
    "description": "Mặt trước in chân dung vua Quang Trung (Nguyễn Huệ). Mặt sau là cảnh Quang Trung cưỡi ngựa, tượng trưng cho sức mạnh quân sự. Thuộc bộ tiền 'Danh nhân' 1966 của Việt Nam Cộng Hòa.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1966",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418579/Screenshot_2025-11-06_152058_rvwl6n.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418579/Screenshot_2025-11-06_152104_bc43x6.png"
  },
  {
    "id": "vnch-100d-1966-tuong",
    "name": "100 đồng Việt Nam Cộng Hòa (Lê Văn Duyệt)",
    "year": 1966,
    "description": "Mặt trước in chân dung Tổng trấn Lê Văn Duyệt. Mặt sau là hình ảnh Lăng Ông Bà Chiểu (Sài Gòn). Thuộc bộ tiền 'Danh nhân' 1966 của Việt Nam Cộng Hòa.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1966",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418579/Screenshot_2025-11-06_152114_evr8s2.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418579/Screenshot_2025-11-06_152132_eml2kn.png"
  },
  {
    "id": "vnch-50d-1966-tuong",
    "name": "50 đồng Việt Nam Cộng Hòa (Phan Bội Châu)",
    "year": 1966,
    "description": "Mặt trước in chân dung nhà cách mạng Phan Bội Châu. Mặt sau là cảnh nông thôn. Thuộc bộ tiền 'Danh nhân' 1966 của Việt Nam Cộng Hòa.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1966",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418578/Screenshot_2025-11-06_152137_fhs9o8.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418579/Screenshot_2025-11-06_152142_j6nxhs.png"
  },
  {
    "id": "mpc-10c-641",
    "name": "10 Cents Series 641",
    "year": 1965,
    "description": "Mặt trước là chân dung một phụ nữ (tượng trưng). Mặt sau là hình ảnh Nữ thần Tự do. Thuộc series MPC 641, lưu hành tại Việt Nam từ 1965 đến 1968.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "31/08/1965",
    "withdrawalDate": "21/10/1968",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310613/64682dc71bb561.40091606-original_lg8hnv.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310613/64682dc71bb561.40091606-original_lg8hnv.jpg"
  },
  {
    "id": "mpc-25c-641",
    "name": "25 Cents Series 641",
    "year": 1965,
    "description": "Mặt trước là chân dung một phụ nữ (tượng trưng). Mặt sau là hình ảnh một con đại bàng. Thuộc series MPC 641, lưu hành tại Việt Nam từ 1965 đến 1968.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "31/08/1965",
    "withdrawalDate": "21/10/1968",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310613/6794b98c8ee895.51276523-original_ssxg9p.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310613/6794b98c8ee895.51276523-original_ssxg9p.jpg"
  },
  {
    "id": "mpc-50c-641",
    "name": "50 Cents Series 641",
    "year": 1965,
    "description": "Mặt trước là chân dung một phụ nữ (tượng trưng). Mặt sau là hình ảnh Nữ thần Tự do. Thuộc series MPC 641, lưu hành tại Việt Nam từ 1965 đến 1968.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "31/08/1965",
    "withdrawalDate": "21/10/1968",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310775/1_sxlr5p.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310775/1_sxlr5p.jpg"
  },
  {
    "id": "mpc-1d-641",
    "name": "1 Dollar Series 641",
    "year": 1965,
    "description": "Mặt trước in chân dung một phụ nữ (tượng trưng). Mặt sau là hoa văn. Đây là loại tiền lưu hành nội bộ, được lính Mỹ sử dụng tại các căn cứ ở miền Nam Việt Nam từ 1965-1968.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "31/08/1965",
    "withdrawalDate": "21/10/1968",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310613/67cf04ace95806.58377175-original_ul5wsk.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310613/67cf04ace95806.58377175-original_ul5wsk.jpg"
  },
  {
    "id": "mpc-5d-641",
    "name": "5 Dollars Series 641",
    "year": 1965,
    "description": "Mặt trước in chân dung một phụ nữ (tượng trưng). Mặt sau là hoa văn. Thuộc series 641, lưu hành tại Việt Nam từ 1965 đến 1968.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "31/08/1965",
    "withdrawalDate": "21/10/1968",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310613/67cf03b2d2e6b4.41553318-original_nnefnz.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310613/67cf03b2d2e6b4.41553318-original_nnefnz.jpg"
  },
  {
    "id": "mpc-10d-641",
    "name": "10 Dollars Series 641",
    "year": 1965,
    "description": "Mặt trước in chân dung nghiêng của một phụ nữ (tượng trưng). Mặt sau là hoa văn. Thuộc series 641, lưu hành tại Việt Nam từ 1965 đến 1968.",
    "issuer": "U.S. Military Payment Certificate",
    "issueDate": "31/08/1965",
    "withdrawalDate": "21/10/1968",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310612/64683092669fe1.25798366-original_vgyhgb.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762310612/64683092669fe1.25798366-original_vgyhgb.jpg"
  },
  {
    "id": "vnch-10000d-1964",
    "name": "10.000 đồng Công phiếu (1964)",
    "year": 1964,
    "description": "Mặt trước in cờ Mặt trận và đoàn quân, cùng khẩu hiệu 'Mặt Trận Dân Tộc Giải Phóng Miền Nam Việt Nam'. Mặt sau là hoa văn. Đây là 'Công phiếu nuôi quân' phát hành năm 1964, dùng để huy động tài chính trong vùng giải phóng.",
    "issuer": "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam",
    "issueDate": "1964",
    "withdrawalDate": "30/04/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419038/Screenshot_2025-11-06_145547_lkeikl.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419038/Screenshot_2025-11-06_145547_lkeikl.png"
  },
  {
    "id": "vnch-5000d-1964",
    "name": "5.000 đồng Công phiếu (1964)",
    "year": 1964,
    "description": "Mặt trước thể hiện đoàn người với lá cờ Mặt trận và lời kêu gọi 'Nuôi Quân'. Mặt sau là hoa văn. Đây là 'Công phiếu nuôi quân' phát hành năm 1964 dành cho vùng giải phóng.",
    "issuer": "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam",
    "issueDate": "1964",
    "withdrawalDate": "30/04/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419038/Screenshot_2025-11-06_145603_qipdur.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419038/Screenshot_2025-11-06_145613_wsvuw2.png"
  },
  {
    "id": "vnch-1000d-1964",
    "name": "1.000 đồng Công phiếu (1964)",
    "year": 1964,
    "description": "Mặt trước là cảnh nông nghiệp với cày bừa. Mặt sau là dòng 'Công phiếu nuôi quân'. Thuộc bộ công phiếu 1964, sử dụng ở khu vực hậu phương nhằm duy trì sản xuất.",
    "issuer": "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam",
    "issueDate": "1964",
    "withdrawalDate": "30/04/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419037/Screenshot_2025-11-06_145621_n52i8g.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419037/Screenshot_2025-11-06_145627_o1qfym.png"
  },
  {
    "id": "vnch-500d-1964",
    "name": "500 đồng Công phiếu (1964)",
    "year": 1964,
    "description": "Mặt trước mô tả căn cứ quân sự/hải cảng. Mặt sau là dòng 'Công phiếu nuôi quân miền Nam Việt Nam'. Mệnh giá lớn trong bộ công phiếu 1964.",
    "issuer": "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam",
    "issueDate": "1964",
    "withdrawalDate": "30/04/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419037/Screenshot_2025-11-06_145632_elko5d.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419037/Screenshot_2025-11-06_145639_cp5qcq.png"
  },
  {
    "id": "vnch-200d-1964",
    "name": "200 đồng Công phiếu (1964)",
    "year": 1964,
    "description": "Mặt trước là cảnh đồng áng với trâu bò. Mặt sau là dòng 'Công phiếu nuôi quân miền Nam Việt Nam'. Phản ánh ưu tiên vừa sản xuất vừa chiến đấu ở khu vực giải phóng.",
    "issuer": "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam",
    "issueDate": "1964",
    "withdrawalDate": "30/04/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419036/Screenshot_2025-11-06_145649_er4a42.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419036/Screenshot_2025-11-06_145654_lkyxrk.png"
  },
  {
    "id": "vnch-2xu-1964",
    "name": "2 xu 1964",
    "year": 1964,
    "description": "Mặt trước in quốc huy Việt Nam Cộng Hòa và mệnh giá. Mặt sau là hoa văn. Mệnh giá rất nhỏ này thuộc bộ tiền phụ (tiền giấy thay xu) của VNCH 1964.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1964",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418905/Screenshot_2025-11-06_145955_xodf1s.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418904/Screenshot_2025-11-06_150002_hzjm2t.png"
  },
  {
    "id": "vnch-500d-denhung-1964",
    "name": "500 đồng Đền Hùng (1964)",
    "year": 1964,
    "description": "Mặt trước in hình Đền Hùng (Phú Thọ). Mặt sau là hình ảnh hoa văn. Tờ tiền này được VNCH phát hành, sử dụng biểu tượng lịch sử dân tộc trong bối cảnh chiến tranh.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1964",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418578/Screenshot_2025-11-06_152156_hfwmqn.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762931384/Screenshot_2025-11-12_140901_n8el4p.png"
  },
  {
    "id": "vnch-20d-denhung-1964",
    "name": "20 đồng Đền Hùng (1964)",
    "year": 1964,
    "description": "Mặt trước in hình Đền Hùng. Mặt sau là hoa văn. Thuộc bộ tiền 'Đền Hùng' 1964 của VNCH.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1964",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418577/Screenshot_2025-11-06_152207_a5moea.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418573/Screenshot_2025-11-06_152213_bswgj5.png"
  },
  {
    "id": "vnch-1d-denhung-1964",
    "name": "1 đồng Đền Hùng (1964)",
    "year": 1964,
    "description": "Mặt trước in hình Đền Hùng. Mặt sau là cảnh nông thôn. Mệnh giá nhỏ nhất trong bộ 'Đền Hùng' 1964 của VNCH.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1964",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418573/Screenshot_2025-11-06_152218_pbllxa.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418572/Screenshot_2025-11-06_152222_vwojv1.png"
  },
  {
    "id": "vnch-10d-1963",
    "name": "10 đồng Tiền Giải phóng (1963)",
    "year": 1963,
    "description": "Mặt trước là cảnh nông dân và thanh niên cầm cờ Mặt trận. Mặt sau là hoa văn. Đây là tiền của Mặt trận Dân tộc Giải phóng miền Nam Việt Nam, dùng trong vùng giải phóng.",
    "issuer": "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam",
    "issueDate": "1963",
    "withdrawalDate": "30/04/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418998/Screenshot_2025-11-06_145713_nkogii.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418993/Screenshot_2025-11-06_145719_clbxpf.png"
  },
  {
    "id": "vnch-5d-1963",
    "name": "5 đồng Tiền Giải phóng (1963)",
    "year": 1963,
    "description": "Mặt trước là nhóm dân quân và nhân dân. Mặt sau là cảnh thu hoạch. Thuộc bộ tiền 1963 của Mặt trận Dân tộc Giải phóng miền Nam Việt Nam.",
    "issuer": "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam",
    "issueDate": "1963",
    "withdrawalDate": "30/04/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762428999/Screenshot_2025-11-06_183626_x37xiz.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418993/Screenshot_2025-11-06_145725_rtccf5.png"
  },
  {
    "id": "vnch-2d-1963",
    "name": "2 đồng Tiền Giải phóng (1963)",
    "year": 1963,
    "description": "Mặt trước là cảnh đoàn người vượt sông. Mặt sau là hoa văn. Thuộc bộ tiền 1963 của Mặt trận Dân tộc Giải phóng miền Nam Việt Nam.",
    "issuer": "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam",
    "issueDate": "1963",
    "withdrawalDate": "30/04/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418993/Screenshot_2025-11-06_145731_rfzyqm.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418993/Screenshot_2025-11-06_145736_gqunma.png"
  },
  {
    "id": "vnch-1d-1963",
    "name": "1 đồng Tiền Giải phóng (1963)",
    "year": 1963,
    "description": "Mặt trước là cảnh thiếu niên và nông dân mang lúa. Mặt sau là hoa văn. Thuộc bộ tiền 1963 của Mặt trận Dân tộc Giải phóng miền Nam Việt Nam.",
    "issuer": "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam",
    "issueDate": "1963",
    "withdrawalDate": "30/04/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418992/Screenshot_2025-11-06_145744_efox6z.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418993/Screenshot_2025-11-06_145749_noaxek.png"
  },
  {
    "id": "vnch-50xu-1963",
    "name": "50 xu Tiền Giải phóng (1963)",
    "year": 1963,
    "description": "Mặt trước là hình ngôi sao và đoàn người. Mặt sau là hoa văn. Thuộc bộ tiền 1963 của Mặt trận Dân tộc Giải phóng miền Nam Việt Nam, mệnh giá phụ.",
    "issuer": "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam",
    "issueDate": "1963",
    "withdrawalDate": "30/04/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418992/Screenshot_2025-11-06_145755_zoxrds.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418950/Screenshot_2025-11-06_145801_ulwuqc.png"
  },
  {
    "id": "vnch-20xu-1963",
    "name": "20 xu Tiền Giải phóng (1963)",
    "year": 1963,
    "description": "Mặt trước là cảnh sinh hoạt nông thôn. Mặt sau là hoa văn. Thuộc bộ tiền 1963 của Mặt trận Dân tộc Giải phóng miền Nam Việt Nam, mệnh giá phụ.",
    "issuer": "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam",
    "issueDate": "1963",
    "withdrawalDate": "30/04/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418946/Screenshot_2025-11-06_145807_ubp2yw.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418945/Screenshot_2025-11-06_145813_p9jzxr.png"
  },
  {
    "id": "vnch-10xu-1963",
    "name": "10 xu Tiền Giải phóng (1963)",
    "year": 1963,
    "description": "Mặt trước là biểu tượng ngôi sao và nông dân. Mặt sau là hoa văn. Thuộc bộ tiền 1963 của Mặt trận Dân tộc Giải phóng miền Nam Việt Nam, mệnh giá phụ.",
    "issuer": "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam",
    "issueDate": "1963",
    "withdrawalDate": "30/04/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418944/Screenshot_2025-11-06_145830_wgva88.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418945/Screenshot_2025-11-06_145836_tg1llz.png"
  },
  {
    "id": "vnch-50d-1963",
    "name": "50 đồng Việt Nam Cộng Hòa (1963)",
    "year": 1963,
    "description": "Mặt trước là cảnh máy bay trên đồng lúa. Mặt sau là cảnh thu hoạch mía. Thuộc bộ tiền 'Nông nghiệp và Công nghiệp' 1963 của VNCH.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1963",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762419036/Screenshot_2025-11-06_145700_abudvz.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418999/Screenshot_2025-11-06_145707_pchvsi.png"
  },
  {
    "id": "vnch-500d-1962",
    "name": "500 đồng Việt Nam Cộng Hòa (1962)",
    "year": 1962,
    "description": "Mặt trước in trụ sở Ngân hàng Quốc gia Việt Nam. Mặt sau là hình ảnh nông dân đang cày ruộng, thể hiện nền kinh tế nông nghiệp. Tờ tiền mang màu xanh đậm, phát hành 1962.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1962",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418571/Screenshot_2025-11-06_152239_am5vel.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418570/Screenshot_2025-11-06_152247_oyxztx.png"
  },
  {
    "id": "vnch-200d-1962",
    "name": "200 đồng Việt Nam Cộng Hòa (1962)",
    "year": 1962,
    "description": "Mặt trước in trụ sở Ngân hàng Quốc gia Việt Nam. Mặt sau in hình con thuyền buồm trên sông, tượng trưng cho thương mại. Tờ tiền màu tím nhạt, phát hành 1962.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1962",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418569/Screenshot_2025-11-06_152254_e1sdyu.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418566/Screenshot_2025-11-06_152259_tjzoeg.png"
  },
  {
    "id": "vnch-100d-1962",
    "name": "100 đồng Việt Nam Cộng Hòa (1962)",
    "year": 1962,
    "description": "Mặt trước in hình Tòa nhà Quốc hội VNCH (Sài Gòn). Mặt sau là hình cầu Bình Lợi bắc qua sông Sài Gòn, thể hiện hiện đại hóa cơ sở hạ tầng. Tờ tiền màu hồng nâu, phát hành 1962.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1962",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418562/Screenshot_2025-11-06_152317_okxfum.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418562/Screenshot_2025-11-06_152321_toqmis.png"
  },
  {
    "id": "vn-10d-1958",
    "name": "10 đồng (Ngô Đình Diệm)",
    "year": 1958,
    "description": "Mặt trước in chân dung Tổng thống Ngô Đình Diệm. Mặt sau là hình nhà máy công nghiệp, biểu trưng cho chính sách công nghiệp hóa. Thuộc bộ tiền Đệ Nhất Cộng Hòa 1958.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1958",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418904/Screenshot_2025-11-06_150012_lnxrdm.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418904/Screenshot_2025-11-06_150019_mztilz.png"
  },
  {
    "id": "vn-5d-1958",
    "name": "5 đồng (Ngô Đình Diệm)",
    "year": 1958,
    "description": "Mặt trước là chân dung Tổng thống Ngô Đình Diệm. Mặt sau là hình máy xúc thi công, thể hiện công trình kiến thiết đất nước. Thuộc bộ tiền Đệ Nhất Cộng Hòa 1958.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1958",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418904/Screenshot_2025-11-06_150145_ewg04k.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418859/Screenshot_2025-11-06_150152_sbzuql.png"
  },
  {
    "id": "vn-2d-1958",
    "name": "2 đồng (Ngô Đình Diệm)",
    "year": 1958,
    "description": "Mặt trước là hình Tổng thống Ngô Đình Diệm. Mặt sau là cảnh sông nước yên bình. Thuộc bộ tiền Đệ Nhất Cộng Hòa 1958.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1958",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418858/Screenshot_2025-11-06_150211_stplm7.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418858/Screenshot_2025-11-06_150217_ebt6pf.png"
  },
  {
    "id": "vn-1d-1958",
    "name": "1 đồng (Đài Liệt sĩ)",
    "year": 1958,
    "description": "Mặt trước in hình Đài Liệt sĩ Sài Gòn. Mặt sau là đám rước lễ. Thuộc bộ tiền Đệ Nhất Cộng Hòa 1958.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1958",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418857/Screenshot_2025-11-06_150254_bgnmbv.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418857/Screenshot_2025-11-06_150259_u8t128.png"
  },
  {
    "id": "vn-5h-1958",
    "name": "5 hào",
    "year": 1958,
    "description": "Mặt trước có quốc huy Việt Nam Cộng Hòa. Mặt sau là cảnh công nhân trong nhà máy dệt. Thuộc bộ tiền Đệ Nhất Cộng Hòa 1958.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1958",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418857/Screenshot_2025-11-06_150307_ws3o3u.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418837/Screenshot_2025-11-06_150312_vntgo9.png"
  },
  {
    "id": "vn-2h-1958",
    "name": "2 hào",
    "year": 1958,
    "description": "Mặt trước có quốc huy Việt Nam Cộng Hòa. Mặt sau in hình toa tàu hàng, biểu tượng cho giao thương. Thuộc bộ tiền Đệ Nhất Cộng Hòa 1958.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1958",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418836/Screenshot_2025-11-06_150317_yjptwr.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762431319/Screenshot_2025-11-06_191509_kkl2oa.png"
  },
  {
    "id": "vn-1h-1958",
    "name": "1 hào",
    "year": 1958,
    "description": "Mặt trước có quốc huy Việt Nam Cộng Hòa. Mặt sau thể hiện bức tranh nông dân gặt lúa. Thuộc bộ tiền Đệ Nhất Cộng Hòa 1958.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1958",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418833/Screenshot_2025-11-06_150326_pxlfzz.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418833/Screenshot_2025-11-06_150330_pahzwt.png"
  },
  {
    "id": "vn-20d-1957",
    "name": "20 đồng (1957)",
    "year": 1957,
    "description": "Mặt trước thể hiện cảnh làng quê với nông dân cấy lúa. Mặt sau là phong cảnh ruộng đồng. Thuộc bộ tiền đầu tiên của Việt Nam Cộng Hòa.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1957",
    "withdrawalDate": "22/09/1975",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418562/Screenshot_2025-11-06_152330_x9ktda.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418562/Screenshot_2025-11-06_152344_wdzonm.png"
  },
  {
    "id": "vn-10d-1955",
    "name": "10 đồng (Bảo Đại)",
    "year": 1955,
    "description": "Mặt trước in chân dung Quốc trưởng Bảo Đại. Mặt sau là cảnh nông thôn với người cày ruộng. Đây là một trong những tờ tiền cuối cùng in hình Bảo Đại, phát hành bởi Ngân hàng Quốc gia Việt Nam.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1955",
    "withdrawalDate": "1958",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418560/Screenshot_2025-11-06_152350_yjfl1r.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418561/Screenshot_2025-11-06_152357_q9sel8.png"
  },
  {
    "id": "vn-5d-1955",
    "name": "5 đồng (Bảo Đại)",
    "year": 1955,
    "description": "Mặt trước in chân dung Quốc trưởng Bảo Đại. Mặt sau là cảnh nông thôn. Thuộc bộ tiền đầu tiên của Ngân hàng Quốc gia Việt Nam.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1955",
    "withdrawalDate": "1958",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418551/Screenshot_2025-11-06_152405_oqhxt0.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418552/Screenshot_2025-11-06_152412_cmf1fi.png"
  },
  {
    "id": "vn-1d-1955",
    "name": "1 đồng (Bảo Đại)",
    "year": 1955,
    "description": "Mặt trước in chân dung Quốc trưởng Bảo Đại. Mặt sau là cảnh cày ruộng. Thuộc bộ tiền đầu tiên của Ngân hàng Quốc gia Việt Nam, mệnh giá nhỏ nhất.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1955",
    "withdrawalDate": "1958",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418551/Screenshot_2025-11-06_152421_okicjq.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418553/Screenshot_2025-11-06_152431_fwo40i.png"
  },
  {
    "id": "vn-500d-1955",
    "name": "500 đồng (Cá chép)",
    "year": 1955,
    "description": "Mặt trước là hình ảnh cá chép hóa rồng, một biểu tượng của sự thăng tiến. Mặt sau là hình ảnh một người nông dân. Thuộc bộ tiền đầu tiên của Ngân hàng Quốc gia Việt Nam.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1955",
    "withdrawalDate": "1958",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418551/Screenshot_2025-11-06_152438_gk7gte.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418550/Screenshot_2025-11-06_152444_yrrvfj.png"
  },
  {
    "id": "vn-200d-1955",
    "name": "200 đồng (Bảo Đại)",
    "year": 1955,
    "description": "Mặt trước in chân dung Quốc trưởng Bảo Đại. Mặt sau là cảnh nông thôn. Thuộc bộ tiền đầu tiên của Ngân hàng Quốc gia Việt Nam.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1955",
    "withdrawalDate": "1958",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418550/Screenshot_2025-11-06_152452_jemiph.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418549/Screenshot_2025-11-06_152458_tsaxrn.png"
  },
  {
    "id": "vn-100d-1955",
    "name": "100 đồng (Lão nông)",
    "year": 1955,
    "description": "Mặt trước in chân dung một lão nông. Mặt sau là hình ảnh một chiếc thuyền buồm. Thuộc bộ tiền đầu tiên của Ngân hàng Quốc gia Việt Nam.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1955",
    "withdrawalDate": "1958",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418550/Screenshot_2025-11-06_152533_ccljd3.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418551/Screenshot_2025-11-06_152538_cxosn1.png"
  },
  {
    "id": "vn-50d-1955",
    "name": "50 đồng (Trần Hưng Đạo)",
    "year": 1955,
    "description": "Mặt trước in chân dung Tướng Trần Hưng Đạo. Mặt sau là cảnh thuyền chiến. Thuộc bộ tiền đầu tiên của Ngân hàng Quốc gia Việt Nam.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1955",
    "withdrawalDate": "1958",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418549/Screenshot_2025-11-06_152545_wpgiie.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418549/Screenshot_2025-11-06_152552_cfdgll.png"
  },
  {
    "id": "vn-20dB-1955",
    "name": "20 đồng (Quang Trung)",
    "year": 1955,
    "description": "Mặt trước in chân dung Vua Quang Trung. Mặt sau là cảnh quân Tây Sơn. Thuộc bộ tiền đầu tiên của Ngân hàng Quốc gia Việt Nam.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1955",
    "withdrawalDate": "1958",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418541/Screenshot_2025-11-06_152603_slwiz4.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418542/Screenshot_2025-11-06_152607_jghhii.png"
  },
  {
    "id": "vn-10dB-1955",
    "name": "10 đồng (Lý Thường Kiệt)",
    "year": 1955,
    "description": "Mặt trước in chân dung Tướng Lý Thường Kiệt. Mặt sau là cảnh quân đội. Thuộc bộ tiền đầu tiên của Ngân hàng Quốc gia Việt Nam.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1955",
    "withdrawalDate": "1958",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418540/Screenshot_2025-11-06_152612_htcdzj.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418540/Screenshot_2025-11-06_152617_kmdpnj.png"
  },
  {
    "id": "vn-5dB-1955",
    "name": "5 đồng (Lê Lợi)",
    "year": 1955,
    "description": "Mặt trước in chân dung Vua Lê Lợi (Lê Thái Tổ). Mặt sau là cảnh nông thôn. Thuộc bộ tiền đầu tiên của Ngân hàng Quốc gia Việt Nam.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1955",
    "withdrawalDate": "1958",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418538/Screenshot_2025-11-06_152657_qv38g0.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418539/Screenshot_2025-11-06_152705_v2sutw.png"
  },
  {
    "id": "vn-2d-1955",
    "name": "2 đồng (Hai Bà Trưng)",
    "year": 1955,
    "description": "Mặt trước in hình Hai Bà Trưng cưỡi voi. Mặt sau là cảnh quân đội. Thuộc bộ tiền đầu tiên của Ngân hàng Quốc gia Việt Nam.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1955",
    "withdrawalDate": "1958",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418538/Screenshot_2025-11-06_152714_dppfgi.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418541/Screenshot_2025-11-06_152718_bchlgi.png"
  },
  {
    "id": "vn-1dB-1955",
    "name": "1 đồng (Lão nông)",
    "year": 1955,
    "description": "Mặt trước in chân dung một lão nông. Mặt sau là cảnh nông thôn. Thuộc bộ tiền đầu tiên của Ngân hàng Quốc gia Việt Nam.",
    "issuer": "Ngân hàng Quốc gia Việt Nam",
    "issueDate": "1955",
    "withdrawalDate": "1958",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418538/Screenshot_2025-11-06_152725_irkjfb.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418538/Screenshot_2025-11-06_152729_vctgqz.png"
  },
  {
    "id": "vn-200p-1954-A",
    "name": "200 piastre",
    "year": 1954,
    "description": "Mặt trước khắc họa hình ảnh cổng đền Khmer và tượng Phật Bayon. Mặt sau in hình đền Angkor. Đây là tiền do Viện Phát hành Liên quốc gia (Việt-Miên-Lào) phát hành.",
    "issuer": "Viện Phát hành Liên quốc gia Cămpuchia, Lào và Việt Nam",
    "issueDate": "1954",
    "withdrawalDate": "31/10/1955",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418533/Screenshot_2025-11-06_152739_wr9jaz.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418531/Screenshot_2025-11-06_152745_j5qkye.png"
  },
  {
    "id": "vn-100p-1954-A",
    "name": "100 piastre",
    "year": 1954,
    "description": "Mặt trước in hình ba phụ nữ (Việt, Lào, Campuchia) trong trang phục truyền thống. Mặt sau là cảnh nhà tranh và khu vườn dân dã. Phát hành bởi Viện Phát hành Liên quốc gia.",
    "issuer": "Viện Phát hành Liên quốc gia Cămpuchia, Lào và Việt Nam",
    "issueDate": "1954",
    "withdrawalDate": "31/10/1955",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418530/Screenshot_2025-11-06_152801_hfrgdg.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418531/Screenshot_2025-11-06_152806_vl9dzy.png"
  },
  {
    "id": "vn-5000p-1953-A",
    "name": "5.000 đồng (VNDCCH)",
    "year": 1953,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là cảnh nhà máy và nông dân, biểu trưng liên minh Công Nông. Đây là tờ tiền của Việt Nam Dân chủ Cộng hòa (miền Bắc), phát hành năm 1953.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "1953",
    "withdrawalDate": "28/02/1959",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418833/Screenshot_2025-11-06_150337_zrzp2f.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418833/Screenshot_2025-11-06_150343_kpd5ky.png"
  },
  {
    "id": "vn-10p-1953-A",
    "name": "10 piastre",
    "year": 1953,
    "description": "Mặt trước nổi bật với hình mặt trời tỏa sáng sau hoa văn tròn. Mặt sau khắc họa hình một phụ nữ trẻ đội khăn, biểu tượng nét đẹp Việt Nam. Phát hành bởi Viện Phát hành Liên quốc gia.",
    "issuer": "Viện Phát hành Liên quốc gia Cămpuchia, Lào và Việt Nam",
    "issueDate": "1953",
    "withdrawalDate": "31/10/1955",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418530/Screenshot_2025-11-06_152836_gdhxt1.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418529/Screenshot_2025-11-06_152841_borvtx.png"
  },
  {
    "id": "vn-5p-1953-A",
    "name": "5 piastre",
    "year": 1953,
    "description": "Mặt trước in họa tiết thực vật nhiệt đới. Mặt sau thể hiện phong cảnh làng quê với cây dừa và khung cảnh sông nước. Phát hành bởi Viện Phát hành Liên quốc gia.",
    "issuer": "Viện Phát hành Liên quốc gia Cămpuchia, Lào và Việt Nam",
    "issueDate": "1953",
    "withdrawalDate": "31/10/1955",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418529/Screenshot_2025-11-06_152852_qp9fpw.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418531/Screenshot_2025-11-06_152857_xls7hd.png"
  },
  {
    "id": "vn-1p-1953-A",
    "name": "1 piastre (Phụ nữ Bắc)",
    "year": 1953,
    "description": "Mặt trước thể hiện chân dung một phụ nữ miền Bắc trong trang phục truyền thống. Mặt sau mô tả người đàn ông gánh hàng rong. Phát hành bởi Viện Phát hành Liên quốc gia.",
    "issuer": "Viện Phát hành Liên quốc gia Cămpuchia, Lào và Việt Nam",
    "issueDate": "1953",
    "withdrawalDate": "31/10/1955",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418529/Screenshot_2025-11-06_152942_mk5aky.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418529/Screenshot_2025-11-06_152955_jgjwht.png"
  },
  {
    "id": "vn-1000d-1951-A",
    "name": "1.000 đồng (VNDCCH)",
    "year": 1951,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh nông dân, công nhân và bộ đội, biểu tượng liên minh Công-Nông-Binh. Thuộc bộ tiền Ngân hàng Quốc gia Việt Nam (VNDCCH) phát hành 1951.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "12/05/1951",
    "withdrawalDate": "28/02/1959",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418826/Screenshot_2025-11-06_150353_mroswb.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418820/Screenshot_2025-11-06_150358_dfkoc3.png"
  },
  {
    "id": "vn-500d-1951-A",
    "name": "500 đồng (VNDCCH)",
    "year": 1951,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh nông dân gặt lúa. Thuộc bộ tiền Ngân hàng Quốc gia Việt Nam (VNDCCH) phát hành 1951.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "12/05/1951",
    "withdrawalDate": "28/02/1959",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418818/Screenshot_2025-11-06_150404_vc1lmz.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418815/Screenshot_2025-11-06_150409_vol7cw.png"
  },
  {
    "id": "vn-200d-1951-A",
    "name": "200 đồng (VNDCCH)",
    "year": 1951,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh bộ đội và nông dân. Thuộc bộ tiền Ngân hàng Quốc gia Việt Nam (VNDCCH) phát hành 1951.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "12/05/1951",
    "withdrawalDate": "28/02/1959",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418815/Screenshot_2025-11-06_150415_ifyeae.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418792/Screenshot_2025-11-06_150421_o9u3hw.png"
  },
  {
    "id": "vn-100d-1951-A",
    "name": "100 đồng (VNDCCH)",
    "year": 1951,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh nông dân gặt lúa và công nhân. Thuộc bộ tiền Ngân hàng Quốc gia Việt Nam (VNDCCH) phát hành 1951.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "12/05/1951",
    "withdrawalDate": "28/02/1959",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418789/Screenshot_2025-11-06_150440_cqkklh.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418789/Screenshot_2025-11-06_150446_bn4csb.png"
  },
  {
    "id": "vn-50d-1951-A",
    "name": "50 đồng (VNDCCH)",
    "year": 1951,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là cảnh nhà máy. Thuộc bộ tiền Ngân hàng Quốc gia Việt Nam (VNDCCH) phát hành 1951.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "12/05/1951",
    "withdrawalDate": "28/02/1959",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418788/Screenshot_2025-11-06_150501_fugqa0.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418788/Screenshot_2025-11-06_150506_osu8ul.png"
  },
  {
    "id": "vn-20d-1951-A",
    "name": "20 đồng (VNDCCH)",
    "year": 1951,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là cảnh nông dân cày ruộng. Thuộc bộ tiền Ngân hàng Quốc gia Việt Nam (VNDCCH) phát hành 1951.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "12/05/1951",
    "withdrawalDate": "28/02/1959",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418787/Screenshot_2025-11-06_150521_ehtg3o.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418764/Screenshot_2025-11-06_150525_gxkhcu.png"
  },
  {
    "id": "vn-10d-1951-A",
    "name": "10 đồng (VNDCCH)",
    "year": 1951,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hoa văn. Thuộc bộ tiền Ngân hàng Quốc gia Việt Nam (VNDCCH) phát hành 1951.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "12/05/1951",
    "withdrawalDate": "28/02/1959",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418763/Screenshot_2025-11-06_150600_hjzvdm.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418763/Screenshot_2025-11-06_150604_pjx7s8.png"
  },
  {
    "id": "vn-1p-1951-A",
    "name": "1 piastre (Đền Angkor)",
    "year": 1951,
    "description": "Mặt trước in hình hai người chèo thuyền. Mặt sau khắc họa hình kiến trúc đền Angkor. Đây là tiền do Ngân hàng Đông Dương (Banque de l'Indochine) phát hành.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1951",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418518/Screenshot_2025-11-06_153058_b2ulzm.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418519/Screenshot_2025-11-06_153102_scnxhs.png"
  },
  {
    "id": "vn-5p-1951-A",
    "name": "5 piastre (Đền Angkor)",
    "year": 1951,
    "description": "Mặt trước mô tả cảnh nông dân gặt lúa và trâu cày. Mặt sau khắc hình đền Angkor. Đây là tiền do Ngân hàng Đông Dương (Banque de l'Indochine) phát hành.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1951",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418519/Screenshot_2025-11-06_153108_kuuwmp.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418518/Screenshot_2025-11-06_153113_aykcvq.png"
  },
  {
    "id": "vn-1000p-1951-A",
    "name": "1.000 piastre",
    "year": 1951,
    "description": "Mặt trước thể hiện tượng voi và mặt nạ đá Khmer. Mặt sau in hình cửa đền cổ Angkor Wat. Đây là tiền do Ngân hàng Đông Dương (Banque de l'Indochine) phát hành, mệnh giá cao.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1951",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418501/Screenshot_2025-11-06_153450_lgjihv.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418501/Screenshot_2025-11-06_153455_kxqfoq.png"
  },
  {
    "id": "vn-1p-1949-A",
    "name": "1 piastre (Nông dân và trâu)",
    "year": 1949,
    "description": "Mặt trước khắc họa hình ảnh người nông dân Việt Nam đội nón lá và con trâu. Mặt sau mô tả ba thiếu niên (Việt, Lào, Campuchia). Phát hành bởi Viện Phát hành Liên quốc gia.",
    "issuer": "Viện Phát hành Liên quốc gia Cămpuchia, Lào và Việt Nam",
    "issueDate": "1949",
    "withdrawalDate": "31/10/1955",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418518/Screenshot_2025-11-06_153120_eudxuf.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418518/Screenshot_2025-11-06_153126_p5nmpd.png"
  },
  {
    "id": "vn-1p-1949-B",
    "name": "1 piastre (Phụ nữ Bắc)",
    "year": 1949,
    "description": "Mặt trước thể hiện chân dung một phụ nữ miền Bắc trong trang phục truyền thống. Mặt sau mô tả người đàn ông gánh hàng rong. Phát hành bởi Viện Phát hành Liên quốc gia.",
    "issuer": "Viện Phát hành Liên quốc gia Cămpuchia, Lào và Việt Nam",
    "issueDate": "1949",
    "withdrawalDate": "31/10/1955",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418486/Screenshot_2025-11-06_153608_wqin7b.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418486/Screenshot_2025-11-06_153612_tqx1na.png"
  },
  {
    "id": "vnmb-500d-1948",
    "name": "500 đồng (Tiền Tài chính)",
    "year": 1948,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau mô tả cảnh sản xuất và chiến đấu. Đây là mệnh giá cao nhất trong bộ tiền Tài chính 1948 của Việt Nam Dân chủ Cộng hòa.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "1948",
    "withdrawalDate": "12/05/1951",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418650/Screenshot_2025-11-06_151420_u9j6sd.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418650/Screenshot_2025-11-06_151427_m2tevq.png"
  },
  {
    "id": "vnmb-200d-1948",
    "name": "200 đồng (Tiền Tài chính)",
    "year": 1948,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau mô tả cảnh sinh hoạt sản xuất của nông dân và chiến sĩ. Thuộc bộ tiền Tài chính 1948 của Việt Nam Dân chủ Cộng hòa.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "1948",
    "withdrawalDate": "12/05/1951",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418649/Screenshot_2025-11-06_151438_aa7o4j.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418649/Screenshot_2025-11-06_151442_r2vzee.png"
  },
  {
    "id": "vnmb-100d-1948",
    "name": "100 đồng (Tiền Tài chính)",
    "year": 1948,
    "description": "Mặt trước thể hiện chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh nông dân mặc áo lính (tay cầm cuốc, vai vác súng) và thợ mỏ. Biểu tượng 'vừa kháng chiến vừa kiến quốc'.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "1948",
    "withdrawalDate": "12/05/1951",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418649/Screenshot_2025-11-06_151458_u4g69i.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418637/Screenshot_2025-11-06_151503_i8t7du.png"
  },
  {
    "id": "vnmb-50d-1948",
    "name": "50 đồng (Tiền Tài chính)",
    "year": 1948,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh đại diện cho Công, Nông, Binh. Thuộc bộ tiền Tài chính 1948 của Việt Nam Dân chủ Cộng hòa.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "1948",
    "withdrawalDate": "12/05/1951",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418636/Screenshot_2025-11-06_151521_ybimjs.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418636/Screenshot_2025-11-06_151529_mvsxdv.png"
  },
  {
    "id": "vnmb-20d-1948",
    "name": "20 đồng (Tiền Tài chính)",
    "year": 1948,
    "description": "Mặt trước là chân dung Chủ tịch Hồ Chí Minh. Mặt sau khắc họa hình ảnh liên minh Công - Nông - Binh (công nhân, nông dân, bộ đội). Thuộc bộ tiền Tài chính 1948.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "1948",
    "withdrawalDate": "12/05/1951",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418635/Screenshot_2025-11-06_151552_hmbd7t.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418635/Screenshot_2025-11-06_151556_ybm826.png"
  },
  {
    "id": "vnmb-10d-1948",
    "name": "10 đồng (Tiền Tài chính)",
    "year": 1948,
    "description": "Mặt trước nổi bật với chân dung Chủ tịch Hồ Chí Minh và hình ảnh hai chiến sĩ Vệ quốc đoàn. Mặt sau là hoa văn. Thuộc bộ tiền Tài chính 1948.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "1948",
    "withdrawalDate": "12/05/1951",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418634/Screenshot_2025-11-06_151620_nqzsm4.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418634/Screenshot_2025-11-06_151625_mxrcnp.png"
  },
  {
    "id": "vnmb-5d-1948",
    "name": "5 đồng (Tiền Tài chính)",
    "year": 1948,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau khắc họa hình ảnh một người công nhân tay cầm búa trong khung cảnh nhà máy. Thuộc bộ tiền Tài chính 1948.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "1948",
    "withdrawalDate": "12/05/1951",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418620/Screenshot_2025-11-06_151647_ybz0by.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418620/Screenshot_2025-11-06_151651_lhoofj.png"
  },
  {
    "id": "vnmb-1d-1948",
    "name": "1 đồng (Tiền Tài chính)",
    "year": 1948,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau khắc họa hình ảnh nông dân dùng trâu cày ruộng. Thuộc bộ tiền Tài chính 1948.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "1948",
    "withdrawalDate": "12/05/1951",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418619/Screenshot_2025-11-06_151657_lactd4.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418619/Screenshot_2025-11-06_151703_n4ruej.png"
  },
  {
    "id": "vnmb-50x-1948",
    "name": "50 xu (Tiền Tài chính)",
    "year": 1948,
    "description": "Mặt trước in chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hoa văn với mệnh giá \"NĂM MƯƠI XU\". Thuộc bộ tiền Tài chính 1948, dùng cho giao dịch lẻ.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "1948",
    "withdrawalDate": "12/05/1951",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418619/Screenshot_2025-11-06_151711_jscgiy.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418619/Screenshot_2025-11-06_151715_vrqvwn.png"
  },
  {
    "id": "vnmb-20x-1948",
    "name": "20 xu (Tiền Tài chính)",
    "year": 1948,
    "description": "Mặt trước là chân dung Chủ tịch Hồ Chí Minh. Mặt sau là hình ảnh liên minh \"Nông-Binh\": một nữ nông dân và một anh bộ đội. Thuộc bộ tiền Tài chính 1948.",
    "issuer": "Việt Nam Dân chủ Cộng hòa",
    "issueDate": "1948",
    "withdrawalDate": "12/05/1951",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418618/Screenshot_2025-11-06_151727_kfp4v0.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418618/Screenshot_2025-11-06_151741_qrsoln.png"
  },
  {
    "id": "vn-10d-1947",
    "name": "10 piastres (Angkor Wat)",
    "year": 1947,
    "description": "Mặt trước in hình ảnh đền Angkor Wat (Campuchia). Mặt sau (màu hồng) khắc họa một người nông dân trên đồng ruộng. Đây là tiền do Ngân hàng Đông Dương (Banque de l'Indochine) phát hành.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1947",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418521/Screenshot_2025-11-06_153015_krt3up.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418520/Screenshot_2025-11-06_153022_fu4gac.png"
  },
  {
    "id": "vn-100pi-1946",
    "name": "100 piastres (1946)",
    "year": 1946,
    "description": "Mặt trước nổi bật với hình ảnh tòa nhà chính của Ngân hàng Đông Dương tại Sài Gòn. Mặt sau khắc họa những chiếc thuyền buồm (ghe) truyền thống trên biển. Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1946",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418521/Screenshot_2025-11-06_153005_uorwdy.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418522/Screenshot_2025-11-06_153008_qzhjmk.png"
  },
  {
    "id": "vn-100pi-1945",
    "name": "100 piastres (Nông dân)",
    "year": 1945,
    "description": "Mặt trước mô tả cảnh sinh hoạt nông thôn với một phụ nữ và túp lều. Mặt sau là hình ảnh những người nông dân đang cấy lúa. Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1945",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418520/Screenshot_2025-11-06_153029_uep4qi.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418520/Screenshot_2025-11-06_153032_p9qwih.png"
  },
  {
    "id": "vn-50pi-1945",
    "name": "50 piastres (Nón lá)",
    "year": 1945,
    "description": "Mặt trước nổi bật với hình ảnh một người phụ nữ Việt Nam đội nón lá đang gánh hàng. Mặt sau là hoa văn hình cành tre. Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1945",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418519/Screenshot_2025-11-06_153038_e1clmk.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418520/Screenshot_2025-11-06_153048_mxuv5t.png"
  },
  {
    "id": "vn-500pi-1943",
    "name": "500 piastres (Lạc đà)",
    "year": 1943,
    "description": "Mặt trước khắc họa một khung cảnh sa mạc với lạc đà, ám chỉ thuộc địa Pháp ở Châu Phi. Mặt sau mang đậm nét Á Đông với hình ảnh phượng hoàng và rồng. Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1943",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418512/Screenshot_2025-11-06_153132_qvdpz8.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418513/Screenshot_2025-11-06_153136_cqpjt1.png"
  },
  {
    "id": "vn-100pi-1943",
    "name": "100 piastres (Dupleix)",
    "year": 1943,
    "description": "Mặt trước mô tả cảnh sinh hoạt đa sắc tộc, phía sau là tượng đài Đô đốc Dupleix. Mặt sau in hình Dinh Toàn quyền. Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1943",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418512/Screenshot_2025-11-06_153154_czgyvu.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418511/Screenshot_2025-11-06_153158_u1f87t.png"
  },
  {
    "id": "vn-20pi-1943",
    "name": "20 piastres (Thần Vishnu)",
    "year": 1943,
    "description": "Mặt trước in hình một công trình kiến trúc cổ. Mặt sau là hình ảnh một vị thần ngồi (thường là thần Vishnu). Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1943",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418511/Screenshot_2025-11-06_153207_vfemwp.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418511/Screenshot_2025-11-06_153212_vqigbr.png"
  },
  {
    "id": "vn-5pi-1943",
    "name": "5 piastres (Vòng nguyệt quế)",
    "year": 1943,
    "description": "Mặt trước có thiết kế tập trung vào mệnh giá \"5\" được bao bọc bởi một vòng nguyệt quế lớn. Mặt sau là hoa văn. Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1943",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418511/Screenshot_2025-11-06_153227_pu0rug.png",
    "imageDetailUrl": ""
  },
  {
    "id": "vn-1pi-1943",
    "name": "1 piastre (Thuyền buồm)",
    "year": 1943,
    "description": "Mặt trước khắc họa hình ảnh những chiếc thuyền buồm (ghe) truyền thống trên biển. Mặt sau là hình thần Brahma bốn mặt. Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1943",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418510/Screenshot_2025-11-06_153239_ggutcd.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418511/Screenshot_2025-11-06_153243_fndein.png"
  },
  {
    "id": "vn-50c-1942",
    "name": "50 cent (Tiền giấy con)",
    "year": 1942,
    "description": "Mặt trước có hoa văn với mệnh giá \"50 CENTS\" và hình đầu rồng. Mặt sau in hình các cành lúa và mệnh giá \"NĂM HÀO\". Phát hành bởi Chính phủ Toàn quyền Đông Dương.",
    "issuer": "Chính phủ Toàn quyền Đông Dương",
    "issueDate": "1942",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418509/Screenshot_2025-11-06_153253_topuwp.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418504/Screenshot_2025-11-06_153300_bxuwvk.png"
  },
  {
    "id": "vn-20c-1942",
    "name": "20 cent (Tiền giấy con)",
    "year": 1942,
    "description": "Mặt trước có hoa văn với hình hai con rồng đối xứng. Mặt sau là hình ảnh các cành lá nhiệt đới và mệnh giá \"HAI HÀO\". Phát hành bởi Chính phủ Toàn quyền Đông Dương.",
    "issuer": "Chính phủ Toàn quyền Đông Dương",
    "issueDate": "1942",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418505/Screenshot_2025-11-06_153308_maelik.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418504/Screenshot_2025-11-06_153313_wephlj.png"
  },
  {
    "id": "vn-10c-1942",
    "name": "10 cent (Tiền giấy con)",
    "year": 1942,
    "description": "Mặt trước in hình ảnh đại bàng và các biểu tượng của Pháp. Mặt sau là các cành lá và mệnh giá \"MỘT HÀO\". Phát hành bởi Chính phủ Toàn quyền Đông Dương.",
    "issuer": "Chính phủ Toàn quyền Đông Dương",
    "issueDate": "1942",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418503/Screenshot_2025-11-06_153318_tml7nh.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418503/Screenshot_2025-11-06_153322_qffolw.png"
  },
  {
    "id": "vn-5c-1942",
    "name": "5 cent (Tiền giấy con)",
    "year": 1942,
    "description": "Mặt trước có thiết kế đơn giản với mệnh giá \"5 CENTS\". Mặt sau in mệnh giá \"NĂM XU\". Mệnh giá nhỏ nhất, phát hành bởi Chính phủ Toàn quyền Đông Dương.",
    "issuer": "Chính phủ Toàn quyền Đông Dương",
    "issueDate": "1942",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762931026/Screenshot_2025-11-12_140331_qzm308.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418503/Screenshot_2025-11-06_153338_nmyfza.png"
  },
  {
    "id": "vn-50c-1939",
    "name": "50 cent (1939)",
    "year": 1939,
    "description": "Mặt trước in hình hai con rồng. Mặt sau là hoa văn và mệnh giá \"NĂM HÀO\". Phát hành bởi Chính phủ Toàn quyền Đông Dương.",
    "issuer": "Chính phủ Toàn quyền Đông Dương",
    "issueDate": "1939",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418504/Screenshot_2025-11-06_153350_bxdx77.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418503/Screenshot_2025-11-06_153356_wszwfp.png"
  },
  {
    "id": "vn-20c-1939",
    "name": "20 cent (1939)",
    "year": 1939,
    "description": "Mặt trước in hình hai con rồng. Mặt sau là hoa văn và mệnh giá \"HAI HÀO\". Phát hành bởi Chính phủ Toàn quyền Đông Dương.",
    "issuer": "Chính phủ Toàn quyền Đông Dương",
    "issueDate": "1939",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418502/Screenshot_2025-11-06_153407_rvnboc.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418501/Screenshot_2025-11-06_153416_mtdrzs.png"
  },
  {
    "id": "vn-10c-1939",
    "name": "10 cent (1939)",
    "year": 1939,
    "description": "Mặt trước in hình hai con rồng. Mặt sau là hoa văn và mệnh giá \"MỘT HÀO\". Phát hành bởi Chính phủ Toàn quyền Đông Dương.",
    "issuer": "Chính phủ Toàn quyền Đông Dương",
    "issueDate": "1939",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418501/Screenshot_2025-11-06_153430_pkpmef.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418502/Screenshot_2025-11-06_153435_szp6qm.png"
  },
  {
    "id": "vn-500pi-1939",
    "name": "500 piastres (1939)",
    "year": 1939,
    "description": "Mặt trước in hình các vị thần La Mã (biểu tượng của Pháp). Mặt sau là hình ảnh rồng và phượng, biểu tượng Á Đông. Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1939",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418495/Screenshot_2025-11-06_153459_ukhsom.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418495/Screenshot_2025-11-06_153507_hryuf0.png"
  },
  {
    "id": "vn-20pi-1936",
    "name": "20 piastres (1936)",
    "year": 1936,
    "description": "Mặt trước là chân dung một phụ nữ Pháp cầm chùm nho. Mặt sau là hình ảnh cô ngồi bên một con sư tử, phía xa là bến cảng. Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1936",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418493/Screenshot_2025-11-06_153538_lcggxd.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418493/Screenshot_2025-11-06_153543_psmkgf.png"
  },
  {
    "id": "vn-5pi-1932",
    "name": "5 piastres (1932)",
    "year": 1932,
    "description": "Mặt trước là hình ảnh một phụ nữ Pháp đội vòng nguyệt quế. Mặt sau thể hiện hình ảnh một phụ nữ bản địa bên cạnh một ngôi đền. Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1932",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418493/Screenshot_2025-11-06_153554_ikqsyt.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418494/Screenshot_2025-11-06_153558_ugcbzg.png"
  },
  {
    "id": "vn-20pi-1928",
    "name": "20 piastres (Đền Bayon)",
    "year": 1928,
    "description": "Mặt trước là hình ảnh một phụ nữ Pháp (biểu tượng trù phú). Mặt sau khắc họa hình ảnh các ngọn tháp đá tại đền Bayon (Angkor, Campuchia). Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1928",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418485/Screenshot_2025-11-06_153640_jovktr.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418486/Screenshot_2025-11-06_153645_dlktva.png"
  },
  {
    "id": "vn-5pi-1928",
    "name": "5 piastres (Chim công)",
    "year": 1928,
    "description": "Mặt trước in chân dung một phụ nữ Pháp cổ điển. Mặt sau là hình ảnh một con công (chim khổng tước) đang xòe đuôi. Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1928",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418485/Screenshot_2025-11-06_153651_rvtw3k.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418485/Screenshot_2025-11-06_153655_yd4mzq.png"
  },
  {
    "id": "vn-1pi-1928",
    "name": "1 piastre (Marianne)",
    "year": 1928,
    "description": "Mặt trước nổi bật với hình ảnh Marianne, biểu tượng của Cộng hòa Pháp, đội mũ giáp. Mặt sau ghi mệnh giá bằng nhiều ngôn ngữ. Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1928",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418484/Screenshot_2025-11-06_153702_auozio.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418483/Screenshot_2025-11-06_153706_xcd4yp.png"
  },
  {
    "id": "vn-1pi-1921",
    "name": "1 piastre (Marianne)",
    "year": 1921,
    "description": "Mặt trước nổi bật với hình ảnh Marianne, biểu tượng của Cộng hòa Pháp, đội mũ giáp. Mặt sau ghi mệnh giá bằng nhiều ngôn ngữ. Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1921",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418484/Screenshot_2025-11-06_153702_auozio.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418483/Screenshot_2025-11-06_153706_xcd4yp.png"
  },
  {
    "id": "vn-100pi-1920",
    "name": "100 piastres (1920)",
    "year": 1920,
    "description": "Mặt trước thể hiện hình ảnh một nữ thần Pháp và một phụ nữ Việt Nam áo tứ thân. Mặt sau thiết kế theo phong cách Á Đông với Hán tự. Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1920",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418483/Screenshot_2025-11-06_153744_fgtwvz.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418484/Screenshot_2025-11-06_153751_t4ak8b.png"
  },
  {
    "id": "vn-20pi-1917",
    "name": "20 piastres (1917)",
    "year": 1917,
    "description": "Mặt trước thể hiện hình ảnh Marianne (biểu tượng Pháp) và một người lính Pháp. Mặt sau (màu đỏ) nổi bật với hình ảnh hai con rồng đối xứng và Hán tự. Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1917",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418482/Screenshot_2025-11-06_153757_ulxogq.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418483/Screenshot_2025-11-06_153804_hoersk.png"
  },
  {
    "id": "vn-100pi-1914",
    "name": "100 piastres (1914)",
    "year": 1914,
    "description": "Mặt trước in hình một phụ nữ mặc áo dài truyền thống. Mặt sau (màu đỏ son) thiết kế hoàn toàn theo phong cách Á Đông với Hán tự. Phát hành bởi Ngân hàng Đông Dương.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1914",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418483/Screenshot_2025-11-06_153732_rkm0yy.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418485/Screenshot_2025-11-06_153738_aeio6b.png"
  },
  {
    "id": "vn-100pi-1903",
    "name": "100 piastres (1903)",
    "year": 1903,
    "description": "Mặt trước thể hiện quyền lực Pháp qua hình tượng chiến binh La Mã và thần Mercury. Mặt sau giữ nguyên thiết kế Hán tự \"東方滙理銀行\". Tái phát hành mẫu 100 dollar 1897.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1903",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418481/Screenshot_2025-11-06_153839_upafji.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418480/Screenshot_2025-11-06_153901_ri9enx.png"
  },
  {
    "id": "vn-20pi-1903",
    "name": "20 piastres (1903)",
    "year": 1903,
    "description": "Mặt trước là bức tranh ngụ ngôn về thương mại. Mặt sau in Hán tự \"東方滙理銀行\". Tái phát hành mẫu 20 dollar 1897.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1903",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418481/Screenshot_2025-11-06_153909_ycc6c4.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418481/Screenshot_2025-11-06_153914_k3k4wp.png"
  },
  {
    "id": "vn-5pi-1903",
    "name": "5 piastres (1903)",
    "year": 1903,
    "description": "Mặt trước là cảnh ngụ ngôn nữ thần Pháp và các dân tộc Đông Dương. Mặt sau là thiết kế Hán tự \"東方滙理銀行\". Tái phát hành mẫu 5 dollar 1897.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1903",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418479/Screenshot_2025-11-06_153920_i78dzx.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418479/Screenshot_2025-11-06_153925_uh3wuh.png"
  },
  {
    "id": "vn-1pi-1903",
    "name": "1 piastre (1903)",
    "year": 1903,
    "description": "Mặt trước in hình nữ thần Pháp (biểu tượng thương mại) ngồi bên một người bản địa. Mặt sau giữ nguyên thiết kế Hán tự \"東方滙理銀行\". Tái phát hành mẫu 1 dollar 1897.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1903",
    "withdrawalDate": "~1954",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418479/Screenshot_2025-11-06_153933_jhkvmc.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418478/Screenshot_2025-11-06_153942_llcd0j.png"
  },

  {
    "id": "vn-1d-1897",
    "name": "1 dollar",
    "year": 1897,
    "description": "Tờ 1 dollar (1 piastre) 1897 mang tông màu hồng đỏ, là một trong những tờ tiền giấy sớm nhất do Ngân hàng Đông Dương (Banque de l'Indo-Chine) phát hành tại Sài Gòn. Mặt trước in hình một nữ thần Pháp (biểu tượng cho thương mại, tay cầm gậy buôn) ngồi bên một người bản địa. Mặt sau được thiết kế hoàn toàn bằng Hán tự \"東方滙理銀行\" (Đông phương hối lý ngân hàng - tên Hán tự của Ngân hàng Đông Dương) cùng hoa văn rồng, phục vụ giao thương trong khu vực.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1897",
    "withdrawalDate": "",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418477/Screenshot_2025-11-06_154039_gbin2v.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418478/Screenshot_2025-11-06_154045_rp83hj.png"
  },
  {
    "id": "vn-5d-1897",
    "name": "5 dollar",
    "year": 1897,
    "description": "Tờ 5 dollar (5 piastres) 1897 có màu xanh lam, thuộc bộ tiền đầu tiên của Ngân hàng Đông Dương. Mặt trước khắc họa một cảnh ngụ ngôn, với hình tượng nữ thần Pháp (Marianne) ngồi bên các nhân vật đại diện cho các dân tộc Đông Dương. Mặt sau mang thiết kế Á Đông đặc trưng với Hán tự \"伍元\" (Ngũ nguyên) và \"東方滙理銀行\" (Đông phương hối lý ngân hàng) cùng hoa văn rồng tinh xảo.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1897",
    "withdrawalDate": "",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418478/Screenshot_2025-11-06_154026_sodk31.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418479/Screenshot_2025-11-06_153925_uh3wuh.png"
  },
  {
    "id": "vn-20d-1897",
    "name": "20 dollar",
    "year": 1897,
    "description": "Tờ 20 dollar (20 piastres) 1897 mang tông màu xanh xám. Mặt trước là một bức tranh ngụ ngôn phức tạp, mô tả các nhân vật Pháp và bản địa trong một khung cảnh nhiệt đới, tượng trưng cho sự trù phú và thương mại. Mặt sau in dày đặc Hán tự \"貳拾元\" (Nhị thập nguyên) và \"東方滙理銀行\" (Đông phương hối lý ngân hàng), thể hiện vai trò của ngân hàng trong giao thương Á Đông thời kỳ đầu.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1897",
    "withdrawalDate": "",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418478/Screenshot_2025-11-06_154013_hl6xh1.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418480/Screenshot_2025-11-06_154019_otyqqd.png"
  },
  {
    "id": "vn-100d-1897",
    "name": "100 dollar",
    "year": 1897,
    "description": "Tờ 100 dollar (100 piastres) 1897 có màu đỏ, là mệnh giá cao nhất trong bộ tiền đầu tiên của Ngân hàng Đông Dương. Mặt trước thể hiện sức mạnh và thương mại của Pháp qua hình ảnh một chiến binh La Mã (trái) và thần Mercury (phải). Mặt sau được thiết kế hoàn toàn bằng Hán tự, nổi bật với \"壹佰元\" (Nhất bách nguyên) và \"東方滙理銀行\" (Đông phương hối lý ngân hàng), phục vụ các giao dịch tài chính lớn.",
    "issuer": "Ngân hàng Đông Dương",
    "issueDate": "1897",
    "withdrawalDate": "",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418477/Screenshot_2025-11-06_153951_i8rai3.png",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762418480/Screenshot_2025-11-06_153958_u2evaa.png"
  },
  {
    "id": "vn-temphieu-1972-1",
    "name": "Tem phiếu 1972",
    "year": 1972,
    "description": "Đây là tem lương thực 50 gam, một hiện vật đặc trưng của thời kỳ bao cấp tại miền Bắc Việt Nam. Mặt trước in Quốc huy Việt Nam Dân chủ Cộng hòa và mệnh giá. Loại tem này được dùng kèm sổ gạo để mua lương thực theo định lượng tại cửa hàng mậu dịch, phản ánh cơ chế phân phối kế hoạch hóa chi tiết trong giai đoạn chiến tranh.",
    "issuer": "Nhà nước Việt Nam Dân chủ Cộng hòa",
    "issueDate": "1972",
    "withdrawalDate": "",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762536482/1434414722-165100-10_ng3ly3.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762536482/1434414722-165100-10_ng3ly3.jpg"
  },
  {
    "id": "vn-temphieu-1972-2",
    "name": "Tem phiếu 1972 (loại 2)",
    "year": 1972,
    "description": "Đây là tem lương thực 100 gam, phát hành năm 1972 tại miền Bắc. Mặt trước in Quốc huy và mệnh giá \"100 GAM\" trên nền hoa văn. Tem được sử dụng kèm theo sổ gạo để nhận lương thực theo tiêu chuẩn tại các cửa hàng mậu dịch quốc doanh, là biểu tượng của nền kinh tế kế hoạch hóa thời bao cấp.",
    "issuer": "Nhà nước Việt Nam Dân chủ Cộng hòa",
    "issueDate": "1972",
    "withdrawalDate": "",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762536483/312268053ecc7ceb7b0b779e97bca054_kqxlvy.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762536483/312268053ecc7ceb7b0b779e97bca054_kqxlvy.jpg"
  },
  {
    "id": "vn-temphieu-1972-3",
    "name": "Tem thịt 1972",
    "year": 1972,
    "description": "Đây là phiếu cung cấp thịt, một hiện vật quan trọng của thời kỳ bao cấp ở miền Bắc. Mặt trước ghi rõ định lượng (ví dụ: 2 kilôgam thịt) và năm sử dụng 1972. Phiếu này dùng để phân phối thịt theo tiêu chuẩn cho từng nhóm đối tượng, phản ánh sự kiểm soát chặt chẽ của nhà nước đối với các nhu yếu phẩm.",
    "issuer": "Nhà nước Việt Nam Dân chủ Cộng hòa",
    "issueDate": "1972",
    "withdrawalDate": "",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762536483/tem_thit_loc_1_u1h60e.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762536483/tem_thit_loc_1_u1h60e.jpg"
  },
  {
    "id": "vn-temphieu-1979",
    "name": "Tem phiếu 1979",
    "year": 1979,
    "description": "Đây là hiện vật đặc trưng của thời kỳ bao cấp (1976-1986), không phải tiền tệ. Tấm \"Phiếu Sữa Trẻ Em\" này được phát hành tại Lai Châu năm 1979 để phân phối sữa theo định lượng, do tình trạng thiếu hụt hàng hóa. Người dân phải dùng tem phiếu (cùng với tiền) để mua các mặt hàng thiết yếu. Hình ảnh phản ánh nền kinh tế kế hoạch hóa tập trung trước thời kỳ Đổi Mới.",
    "issuer": "Nhà nước Cộng hòa Xã hội Chủ nghĩa Việt Nam",
    "issueDate": "1979",
    "withdrawalDate": "",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762536483/Tem-phieu-thoi-bao-cap-09_uuh5ep.jpg",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762536483/Tem-phieu-thoi-bao-cap-09_uuh5ep.jpg"
  },
  {
    "id": "vn-temphieu-1981",
    "name": "Tem phiếu 1981",
    "year": 1981,
    "description": "Đây là một tập tem phiếu điển hình của thời kỳ bao cấp, phát hành năm 1981. Các tem phiếu này quy định định lượng mua các mặt hàng thiết yếu như vải, đường, nước mắm... Chúng phản ánh cơ chế phân phối kế hoạch hóa tập trung của Nhà nước Việt Nam trước khi công cuộc Đổi Mới bắt đầu, khi mọi hàng hóa đều được kiểm soát chặt chẽ.",
    "issuer": "Nhà nước Cộng hòa Xã hội Chủ nghĩa Việt Nam",
    "issueDate": "1981",
    "withdrawalDate": "",
    "imageUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762536483/photo-1-15413203930142127986118_j4vlu6.webp",
    "imageDetailUrl": "https://res.cloudinary.com/do7ul09eo/image/upload/v1762536483/photo-1-15413203930142127986118_j4vlu6.webp"
  }

];

const YearIndicator = ({ year, currentEpoch, isVisible }: { year: number; currentEpoch: TimeEpoch | null; isVisible: boolean }) => {
  const displayYear = year < 0 ? `${Math.abs(year)} TCN` : year.toString();

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-3/4 left-0 right-0 z-50">
      <div className="w-full">
        <div className="relative">
          <div
            className="h-1 shadow-lg"
            style={{
              background: '#ffffff',
              backgroundImage: 'repeating-linear-gradient(90deg, #ffffff 0, #ffffff 20px, transparent 20px, transparent 35px)',
              opacity: 0.9
            }}
          />

          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <div className="bg-background/95 backdrop-blur-sm border-2 border-white px-6 py-2 rounded-lg shadow-xl">
              <div className="text-2xl font-bold text-yellow-900 font-mono text-center">
                Năm {displayYear}
              </div>
            </div>
          </div>

          {currentEpoch && (
            <div className="absolute top-4 left-8 text-left">
              <div className="text-base font-bold text-yellow-900 whitespace-nowrap bg-background/80 backdrop-blur-sm px-3 py-1 rounded">
                {currentEpoch.name}
              </div>
            </div>
          )}

          {currentEpoch && (
            <div className="absolute top-4 right-8 text-right">
              <div className="text-base text-yellow-900 whitespace-nowrap bg-background/80 backdrop-blur-sm px-3 py-1 rounded">
                {currentEpoch.description}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CurrencyItem = ({ item, isVisible, opacity }: { item: CurrencyItem; isVisible: boolean; opacity: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const displayYear = item.year < 0 ? `${Math.abs(item.year)} TCN` : item.year.toString();
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <div
        className="transition-all duration-700"
        style={{
          opacity: opacity,
          transform: `scale(${0.8 + opacity * 0.2})`,
          pointerEvents: opacity > 0.3 ? 'auto' : 'none'
        }}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-lg group-hover:bg-yellow-500/40 transition-all duration-300" />
          <img
            src={item.imageUrl}
            alt={item.name}
            className="relative w-[14rem] h-26 md:w-[20rem] md:h-36 object-contain bg-gradient-to-b from-yellow-100 to-yellow-50 rounded-xl cursor-pointer hover:shadow-2xl transition-transform duration-300 border border-yellow-600/40 shadow-md"
            onClick={() => setIsOpen(true)}
          />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-sm px-4 py-1.5 rounded-full border-2 border-yellow-600/40 text-sm font-bold text-yellow-700 whitespace-nowrap shadow-lg">
            {displayYear}
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-600/40 max-w-4xl shadow-2xl">
          <DialogHeader className="space-y-4 pb-4">
            <div className="flex items-start justify-between gap-4">
              <DialogTitle className="text-3xl md:text-4xl font-bold text-yellow-900 leading-tight flex-1">
                {item.name}
              </DialogTitle>
              <span className="text-lg font-mono text-yellow-700 bg-yellow-200/60 px-4 py-2 rounded-full border border-yellow-600/30 shadow-sm flex-shrink-0">
                {displayYear}
              </span>
            </div>
            <DialogDescription className="text-base md:text-lg text-yellow-900/80 leading-relaxed">
              {item.description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {/* Image Container với khung đẹp hơn */}
            <div
              onClick={() => setIsFullscreen(true)}
              className="cursor-zoom-in group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-400/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white rounded-xl p-4 border-2 border-yellow-600/30 shadow-xl max-h-[30vh] flex items-center justify-center overflow-hidden">
                <img
                  src={item.imageDetailUrl}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
                <div className="absolute bottom-6 right-6 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  🔍 Nhấn để phóng to
                </div>
              </div>
            </div>

            <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
              <DialogContent className="p-0 bg-black/95 border-none max-w-full w-full h-full flex items-center justify-center">
                <img
                  src={item.imageDetailUrl}
                  alt={item.name}
                  className="max-w-full max-h-full object-contain cursor-zoom-out"
                  onClick={() => setIsFullscreen(false)}
                />
              </DialogContent>
            </Dialog>

            {/* Info Cards với layout đẹp hơn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-yellow-600/20 shadow-md">
                <div className="flex items-start gap-3">
                  <div className="text-2xl flex-shrink-0">🏛️</div>
                  <div>
                    <div className="text-sm font-semibold text-yellow-700 uppercase tracking-wide mb-1">
                      Phát hành
                    </div>
                    <div className="text-base text-yellow-900 font-medium">
                      {item.issuer}
                    </div>
                  </div>
                </div>
              </div>

              {item.issueDate && (
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-yellow-600/20 shadow-md">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">📅</div>
                    <div>
                      <div className="text-sm font-semibold text-yellow-700 uppercase tracking-wide mb-1">
                        Thời gian phát hành
                      </div>
                      <div className="text-base text-yellow-900 font-medium">
                        {item.issueDate}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {item.withdrawalDate && (
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-yellow-600/20 shadow-md md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">🔄</div>
                    <div>
                      <div className="text-sm font-semibold text-yellow-700 uppercase tracking-wide mb-1">
                        Thời gian thu hồi
                      </div>
                      <div className="text-base text-yellow-900 font-medium">
                        {item.withdrawalDate}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default function App() {
  const [currentYear, setCurrentYear] = useState(2015);
  const [currentEpoch, setCurrentEpoch] = useState<TimeEpoch | null>(epochs[0]);
  const [showYearIndicator, setShowYearIndicator] = useState(false);
  const [introOpacity, setIntroOpacity] = useState(1);
  const timelineRef = useRef<HTMLDivElement>(null);

  const totalScrollHeight = epochs.reduce((sum, epoch) => sum + epoch.scrollHeight, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineTop = timelineRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // YearIndicator ở vị trí 2/3 màn hình
      const indicatorPosition = windowHeight * (2 / 3);

      // Tính opacity cho intro (mất dần khi scroll)
      const introFadeStart = windowHeight * 0.3;
      const introFadeEnd = windowHeight * 0.7;
      const scrollProgress = windowHeight - timelineTop;

      if (scrollProgress < introFadeStart) {
        setIntroOpacity(1);
      } else if (scrollProgress > introFadeEnd) {
        setIntroOpacity(0);
      } else {
        setIntroOpacity(1 - (scrollProgress - introFadeStart) / (introFadeEnd - introFadeStart));
      }

      // Kiểm tra xem đã scroll qua intro chưa
      if (timelineTop > 0) {
        setShowYearIndicator(false);
        setCurrentYear(epochs[0].endYear);
        setCurrentEpoch(epochs[0]);
        return;
      }

      setShowYearIndicator(true);



      // Tính scroll trong timeline (từ khi YearIndicator chạm timeline)
      const scrollInTimeline = indicatorPosition - timelineTop;

      let accumulatedScroll = 0;
      let year = epochs[0].endYear;
      let foundEpoch = epochs[0];

      for (const epoch of epochs) {
        const epochEnd = accumulatedScroll + epoch.scrollHeight;
        if (scrollInTimeline <= epochEnd) {
          const epochProgress = (scrollInTimeline - accumulatedScroll) / epoch.scrollHeight;
          year = epoch.endYear - epochProgress * (epoch.endYear - epoch.startYear);
          foundEpoch = epoch;
          break;
        }
        accumulatedScroll = epochEnd;
      }

      setCurrentYear(Math.round(year));
      setCurrentEpoch(foundEpoch);

      if (scrollInTimeline >= totalScrollHeight) {
        setShowYearIndicator(false);
        return;
      }
    };


    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBackgroundStyle = () => {
    if (!currentEpoch) return { background: "hsl(45, 70%, 85%)" };

    if (currentEpoch.backgroundImage) {
      return {
        background: currentEpoch.color,
        backgroundImage: currentEpoch.backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',

      };
    }

    return { background: currentEpoch.color };
  };

  const getCurrencyPosition = (item: CurrencyItem) => {
    let accumulatedScroll = 0;

    for (const epoch of epochs) {
      if (item.year >= epoch.startYear && item.year <= epoch.endYear) {
        const yearProgress = (epoch.endYear - item.year) / (epoch.endYear - epoch.startYear);
        return accumulatedScroll + yearProgress * epoch.scrollHeight;
      }
      accumulatedScroll += epoch.scrollHeight;
    }

    return accumulatedScroll;
  };

  return (
    <div
      className="relative min-h-screen transition-all duration-700"
      style={getBackgroundStyle()}
    >
      <YearIndicator year={currentYear} currentEpoch={currentEpoch} isVisible={showYearIndicator} />

      {/* Intro Section - fade out khi scroll */}
      <div
        className="h-screen fixed top-0 left-0 right-0 flex items-center justify-center 
  pointer-events-none transition-opacity duration-500 font-inter"
        style={{ opacity: introOpacity }}
      >
        <div className="text-center px-4 max-w-5xl mx-auto">
          <div className="animate-in fade-in slide-in-from-top-4 duration-1000">

            {/* Main Card Container */}
            <div className="bg-yellow-50/90 backdrop-blur-sm border-2 border-yellow-600/30 rounded-3xl p-8 md:p-12 shadow-2xl">

              {/* Main Title */}
              <h1 className="font-dancing text-5xl md:text-7xl lg:text-8xl font-bold text-cyan-600 mb-4 drop-shadow-lg leading-tight">
                LỊCH SỬ TIỀN GIẤY
                <br />
                XUẤT HIỆN TẠI
              </h1>

              {/* Country Name */}
              <h2 className="font-momo-display font-bold text-3xl md:text-5xl lg:text-6xl text-red-600 mb-6">
                VIỆT NAM
              </h2>

              {/* Decorative Line */}
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mb-6"></div>

              {/* Subtitle/Description */}
              <p className="text-lg md:text-xl lg:text-2xl text-yellow-900/85 max-w-2xl mx-auto font-inter leading-relaxed">
                Hành trình xuyên thời gian của các đồng tiền giấy
                <br />
                <span className="text-base md:text-lg text-yellow-900/70">
                  Từ thời thuộc địa đến hiện đại
                </span>
              </p>

              {/* Scroll Indicator */}
              <div className="mt-10 flex flex-col items-center gap-2">
                <span className="text-sm md:text-base text-yellow-900/70 font-medium">
                  Cuộn xuống để khám phá
                </span>
                <div className="text-yellow-900/70 animate-bounce text-4xl">
                  ↓
                </div>
              </div>

            </div>

            {/* Additional Info Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <div className="bg-yellow-100/80 backdrop-blur-sm border border-yellow-600/20 rounded-full px-4 py-2 text-sm md:text-base text-yellow-900/80">
                📅 1894 - 2010
              </div>
              <div className="bg-yellow-100/80 backdrop-blur-sm border border-yellow-600/20 rounded-full px-4 py-2 text-sm md:text-base text-yellow-900/80">
                💵 100+ loại tiền
              </div>
              <div className="bg-yellow-100/80 backdrop-blur-sm border border-yellow-600/20 rounded-full px-4 py-2 text-sm md:text-base text-yellow-900/80">
                🏛️ 31 thời kỳ
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* Spacer để tạo không gian cho intro */}
      <div className="h-screen" />

      {/* Timeline Section - bắt đầu tính scroll từ đây */}
      <div
        ref={timelineRef}
        className="relative"
        style={{ height: `${totalScrollHeight + 1000}px` }}
      >
        <div className="relative pt-32">
          {currencyData.map((item) => {
            const itemPosition = getCurrencyPosition(item);
            const itemYearDiff = Math.abs(currentYear - item.year);
            const isVisible = itemYearDiff < 50;
            const opacity = isVisible ? Math.max(0, 1 - itemYearDiff / 50) : 0;

            const itemsByYear = currencyData.filter(i => i.year === item.year);
            const indexInYear = itemsByYear.indexOf(item);
            const totalInYear = itemsByYear.length;

            const itemsPerRow = 4;
            const rowIndex = Math.floor(indexInYear / itemsPerRow);
            const colIndex = indexInYear % itemsPerRow;

            const itemsInCurrentRow = Math.min(itemsPerRow, totalInYear - rowIndex * itemsPerRow);

            const itemSpacing =
              totalInYear <= 2
                ? 650
                : totalInYear === 3
                  ? 400
                  : totalInYear === 4
                    ? 340
                    : 340;

            const rowWidth = itemsInCurrentRow * itemSpacing;
            const horizontalOffset = colIndex * itemSpacing - rowWidth / 2 + itemSpacing / 2;
            const baseSpacing = totalInYear > 8 ? 170 : totalInYear > 4 ? 170 : 200;
            const verticalOffset = rowIndex * baseSpacing;

            return (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  top: `${itemPosition + verticalOffset}px`,
                  left: '50%',
                  transform: `translateX(calc(-50% + ${horizontalOffset}px))`
                }}
              >
                <CurrencyItem
                  item={item}
                  isVisible={isVisible}
                  opacity={opacity}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* OUTRO SECTION – Hiện ra khi scroll hết timeline */}
      <div
        className="min-h-screen flex items-center justify-center pointer-events-none transition-opacity duration-700 py-20"
        style={{
          opacity: !showYearIndicator ? 1 : 0
        }}
      >
        <div className="text-center space-y-8 px-6 max-w-4xl mx-auto">

          {/* Tiêu đề outro với background card */}
          <div className="bg-yellow-50/90 backdrop-blur-sm border-2 border-yellow-600/30 rounded-2xl p-8 md:p-12 shadow-2xl">

            <h1 className="text-4xl md:text-6xl font-bold text-yellow-900 drop-shadow-lg mb-4 leading-tight">
              BẠN ĐÃ KHÁM PHÁ HẾT
            </h1>

            <h2 className="text-3xl md:text-5xl font-bold text-yellow-800 drop-shadow-md mb-6">
              LỊCH SỬ TIỀN GIẤY TẠI VIỆT NAM
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mb-6"></div>

            <p className="text-lg md:text-xl text-yellow-900/90 leading-relaxed">
              Hành trình xuyên suốt qua các thời kỳ, biến động, cải cách<br className="hidden md:block" />
              và câu chuyện của đồng tiền giấy trên đất Việt.
            </p>
          </div>

          {/* Disclaimer Card */}
          <div className="bg-yellow-100/80 backdrop-blur-sm border border-yellow-600/20 rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-3 text-left">
              <div className="text-2xl flex-shrink-0">ℹ️</div>
              <p className="text-base md:text-lg text-yellow-900/90 leading-relaxed">
                Trong quá trình tổng hợp còn nhiều sai sót và thiếu sót, rất mong nhận được sự đóng góp từ cộng đồng để hoàn thiện hơn nữa bộ sưu tập này.
              </p>
            </div>
          </div>

          {/* Triết học Card */}
          <div className="bg-gradient-to-br from-yellow-50/90 to-amber-50/90 backdrop-blur-sm border border-yellow-600/25 rounded-xl p-8 shadow-xl">
            <div className="text-3xl mb-4">💭</div>
            <p className="text-base md:text-lg text-yellow-900/95 leading-relaxed italic">
              Dù tồn tại với vô số hình dạng và giá trị, tiền tệ không chỉ là phương tiện trao đổi,
              mà còn là lời khẳng định của <span className="font-bold text-yellow-900 not-italic">niềm tin</span>.
              <br /><br />
              Mỗi đồng tiền là một ký ức tập thể, nó phản ánh lựa chọn, biến động và khát vọng của từng thời đại.
              Khi nhìn lại hành trình của tiền, chúng ta cũng đang nhìn lại hành trình của chính mình trong lịch sử.
            </p>
          </div>
        </div>
      </div>



    </div>
  );
}
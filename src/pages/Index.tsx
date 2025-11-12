import { useEffect, useState } from "react";
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
  details?: string;
  imageUrl: string;
}

interface TimeEpoch {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  scrollHeight: number;
  color: string;
  description: string;
}

const epochs: TimeEpoch[] = [
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

const currencyData: CurrencyItem[] = [
  {
    id: "polymer-2024",
    name: "Tiền Polymer VND",
    year: 2024,
    description: "Tiền polymer với công nghệ bảo mật hiện đại",
    issuer: "Ngân hàng Nhà nước Việt Nam",
    details: "Chống giả mạo, bền hơn tiền giấy cotton",
    imageUrl: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&h=300&fit=crop"
  },
  {
    id: "vnd-2003",
    name: "VND Hiện Đại",
    year: 2003,
    description: "Hệ thống tiền tệ ổn định, thanh toán điện tử phát triển",
    issuer: "Ngân hàng Nhà nước",
    details: "Mệnh giá 500đ - 500,000đ",
    imageUrl: "https://images.unsplash.com/photo-1624364268473-7f2bb4b69ef9?w=400&h=300&fit=crop"
  },
  {
    id: "vnd-1985",
    name: "Đổi Tiền 1985",
    year: 1985,
    description: "Cải cách tiền tệ thời Đổi Mới",
    issuer: "NHNN Việt Nam",
    details: "Đổi tiền tỷ lệ 10:1 để kiểm soát lạm phát",
    imageUrl: "https://images.unsplash.com/photo-1628863353691-0071c8c1874c?w=400&h=300&fit=crop"
  },
  {
    id: "reunification-1978",
    name: "Đồng Thống Nhất",
    year: 1978,
    description: "Thống nhất tiền tệ sau giải phóng miền Nam",
    issuer: "Chính phủ CHXHCN Việt Nam",
    details: "Hợp nhất hệ thống tiền tệ hai miền",
    imageUrl: "https://images.unsplash.com/photo-1589666564459-93cdd3ab856a?w=400&h=300&fit=crop"
  },
  {
    id: "south-dong",
    name: "Đồng Việt Nam Cộng Hòa",
    year: 1963,
    description: "Tiền của miền Nam Việt Nam",
    issuer: "Chính quyền Việt Nam Cộng hòa",
    details: "Lưu hành song song với USD",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop"
  },
  {
    id: "viet-minh",
    name: "Đồng Việt Minh",
    year: 1946,
    description: "Tiền độc lập đầu tiên sau Cách mạng Tháng Tám",
    issuer: "Việt Nam Dân chủ Cộng hòa",
    details: "Phục vụ kháng chiến chống Pháp",
    imageUrl: "https://images.unsplash.com/photo-1634896941598-b6b500a502a7?w=400&h=300&fit=crop"
  },
  {
    id: "piastre",
    name: "Piastre Đông Dương",
    year: 1885,
    description: "Tiền thuộc địa của Pháp",
    issuer: "Banque de l'Indochine",
    details: "Lưu hành trên toàn Đông Dương",
    imageUrl: "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?w=400&h=300&fit=crop"
  },
  {
    id: "nguyen-dynasty",
    name: "Tiền Triều Nguyễn",
    year: 1802,
    description: "Tiền đồng mang niên hiệu triều đại",
    issuer: "Triều đình nhà Nguyễn",
    details: "Đồng tiền và bạc tael",
    imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&h=300&fit=crop"
  },
  {
    id: "tay-son",
    name: "Tiền Tây Sơn",
    year: 1788,
    description: "Tiền đúc thời Tây Sơn",
    issuer: "Triều đình Tây Sơn",
    details: "Cải cách tiền tệ thời Quang Trung",
    imageUrl: "https://images.unsplash.com/photo-1580983559367-0dc2f8934365?w=400&h=300&fit=crop"
  },
  {
    id: "le-trung-hung",
    name: "Tiền Lê Trung Hưng",
    year: 1533,
    description: "Tiền đồng thời Lê trung hưng",
    issuer: "Triều Lê trung hưng",
    details: "Thông bảo các loại",
    imageUrl: "https://images.unsplash.com/photo-1592808152519-2d2c0b4e1ed0?w=400&h=300&fit=crop"
  },
  {
    id: "tran-dynasty",
    name: "Tiền Triều Trần",
    year: 1225,
    description: "Tiền đúc thời nhà Trần",
    issuer: "Triều đình nhà Trần",
    details: "Đồng tiền hình tròn lỗ vuông",
    imageUrl: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400&h=300&fit=crop"
  },
  {
    id: "ly-dynasty",
    name: "Tiền Triều Lý",
    year: 1010,
    description: "Tiền đúc đầu tiên của Việt Nam độc lập",
    issuer: "Triều đình nhà Lý",
    details: "Thiên Cảm Thông Bảo, Thiên Phúc Trấn Bảo",
    imageUrl: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400&h=300&fit=crop"
  },
  {
    id: "chinese-cash",
    name: "Tiền Trung Hoa",
    year: 200,
    description: "Tiền đồng của các triều đại Trung Quốc",
    issuer: "Các triều đại Trung Hoa",
    details: "Ảnh hưởng lâu dài lên tiền Việt",
    imageUrl: "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=400&h=300&fit=crop"
  },
  {
    id: "dong-son",
    name: "Đồ Đồng Đông Sơn",
    year: -500,
    description: "Đồ đồng, công cụ làm phương tiện trao đổi",
    issuer: "Cộng đồng bản địa",
    details: "Trống đồng, vũ khí, trang sức",
    imageUrl: "https://images.unsplash.com/photo-1582719201952-c97530f8f6ae?w=400&h=300&fit=crop"
  }
];

const YearIndicator = ({ year, currentEpoch, scrollProgress }: { year: number; currentEpoch: TimeEpoch | null; scrollProgress: number }) => {
  const displayYear = year < 0 ? `${Math.abs(year)} TCN` : year.toString();
  
  // Chỉ hiển thị khi đã scroll qua phần intro
  if (scrollProgress < 0.02) {
    return null;
  }
  
  return (
    <div className="fixed top-2/3 left-0 right-0 z-50">
      <div className="w-full">
        <div className="relative">
          {/* Thanh kẻ dạng nét đứt màu trắng đậm */}
          <div 
            className="h-1 shadow-lg"
            style={{ 
              background: '#ffffff',
              backgroundImage: 'repeating-linear-gradient(90deg, #ffffff 0, #ffffff 20px, transparent 20px, transparent 35px)',
              opacity: 0.9
            }}
          />
          
          {/* Năm hiển thị phía trên thanh kẻ */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <div className="bg-background/95 backdrop-blur-sm border-2 border-white px-6 py-2 rounded-lg shadow-xl">
              <div className="text-2xl font-bold text-yellow-900 font-mono text-center">
                Năm {displayYear}
              </div>
            </div>
          </div>
          
          {/* Tên epoch bên trái */}
          {currentEpoch && (
            <div className="absolute top-4 left-8 text-left">
              <div className="text-base font-bold text-yellow-900 whitespace-nowrap bg-background/80 backdrop-blur-sm px-3 py-1 rounded">
                {currentEpoch.name}
              </div>
            </div>
          )}
          
          {/* Mô tả epoch bên phải */}
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

  return (
    <>
      <div
        className="absolute left-1/2 -translate-x-1/2 transition-all duration-700"
        style={{ 
          opacity: opacity,
          transform: `translate(-50%, 0) scale(${0.8 + opacity * 0.2})`,
          pointerEvents: opacity > 0.3 ? 'auto' : 'none'
        }}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-lg group-hover:bg-yellow-500/40 transition-all duration-300" />
          <img
            src={item.imageUrl}
            alt={item.name}
            className="relative w-44 h-32 md:w-64 md:h-44 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 shadow-2xl border-2 border-yellow-600/40"
            onClick={() => setIsOpen(true)}
          />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-sm px-4 py-1.5 rounded-full border-2 border-yellow-600/40 text-sm font-bold text-yellow-700 whitespace-nowrap shadow-lg">
            {displayYear}
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-card border-yellow-600/30 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center justify-between">
              {item.name}
              <span className="text-sm font-mono text-yellow-600 bg-yellow-600/10 px-3 py-1 rounded-full">
                {displayYear}
              </span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground pt-2">
              {item.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg mb-4 border border-yellow-600/20"
            />
            
            <div className="space-y-3 pt-3 border-t border-yellow-600/20">
              <div className="text-sm">
                <span className="font-semibold text-foreground">Phát hành:</span>{" "}
                <span className="text-muted-foreground">{item.issuer}</span>
              </div>
              {item.details && (
                <div className="text-sm">
                  <span className="font-semibold text-foreground">Chi tiết:</span>{" "}
                  <span className="text-muted-foreground">{item.details}</span>
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentEpoch, setCurrentEpoch] = useState<TimeEpoch | null>(epochs[0]);

  const totalScrollHeight = epochs.reduce((sum, epoch) => sum + epoch.scrollHeight, 0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      const maxScroll = docHeight - windowHeight;
      const progress = Math.min(1, scrollTop / maxScroll);
      setScrollProgress(progress);

      // Chỉ tính toán năm khi đã scroll qua intro
      if (progress < 0.02) {
        setCurrentYear(2025);
        setCurrentEpoch(epochs[0]);
        return;
      }

      // Điều chỉnh scrollTop để bắt đầu từ năm 2025 khi vừa scroll qua intro
      const introHeight = maxScroll * 0.02;
      const adjustedScrollTop = Math.max(0, scrollTop - introHeight);

      let accumulatedScroll = 0;
      let year = 2025;
      let foundEpoch = epochs[0];

      for (const epoch of epochs) {
        const epochEnd = accumulatedScroll + epoch.scrollHeight;
        if (adjustedScrollTop <= epochEnd) {
          const epochProgress = (adjustedScrollTop - accumulatedScroll) / epoch.scrollHeight;
          year = epoch.endYear - epochProgress * (epoch.endYear - epoch.startYear);
          foundEpoch = epoch;
          break;
        }
        accumulatedScroll = epochEnd;
      }

      setCurrentYear(Math.round(year));
      setCurrentEpoch(foundEpoch);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBackgroundColor = () => {
    if (!currentEpoch) return "hsl(45, 70%, 85%)";
    return currentEpoch.color;
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
      className="relative min-h-screen transition-colors duration-700"
      style={{
        height: `${totalScrollHeight + 1000}px`,
        background: getBackgroundColor(),
      }}
    >
      <YearIndicator year={currentYear} currentEpoch={currentEpoch} scrollProgress={scrollProgress} />
      
      <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-6 px-4 -mt-20">
          {scrollProgress < 0.02 && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
              <h1 className="text-6xl md:text-8xl font-bold text-yellow-900 mb-4 drop-shadow-lg">
                LỊCH SỬ TIỀN TỆ
              </h1>
              <h2 className="text-4xl md:text-5xl font-bold text-yellow-800 mb-6">
                VIỆT NAM
              </h2>
              <p className="text-xl md:text-2xl text-yellow-900/80 max-w-2xl mx-auto">
                Hành trình 4000 năm của đồng tiền Việt
              </p>
              <div className="mt-8 text-yellow-900/60 animate-bounce text-3xl">
                ↓
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative pt-32">
        {currencyData.map((item) => {
          const itemPosition = getCurrencyPosition(item);
          const itemYearDiff = Math.abs(currentYear - item.year);
          const isVisible = itemYearDiff < 200;
          const opacity = isVisible ? Math.max(0, 1 - itemYearDiff / 200) : 0;

          return (
            <div
              key={item.id}
              style={{ position: 'absolute', top: `${itemPosition}px`, left: 0, right: 0 }}
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

      {scrollProgress > 0.95 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-center text-yellow-900/80 text-sm animate-in fade-in duration-1000 bg-background/90 backdrop-blur-sm px-6 py-3 rounded-lg border-2 border-yellow-600/40 shadow-xl">
          Bạn đã khám phá hết lịch sử tiền tệ Việt Nam
        </div>
      )}
    </div>
  );
}
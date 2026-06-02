import React, { useState } from "react";
import {
  Hammer,
  Truck,
  User,
  Layers,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TreePine,
  Flame,
  Brush,
  Mail,
  ArrowRight,
  Star,
  Phone,
  Clock,
  MapPin,
  Award,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag
} from "lucide-react";

// Reusable Gradient Border Button
interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({ children, fullWidth = false, className = "", ...props }) => {
  return (
    <button
      className={`group relative p-[2px] inline-flex items-center justify-center overflow-hidden transition-all duration-300 active:scale-95 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      style={{
        borderRadius: "var(--radius)",
        background: "linear-gradient(to right, #84a9fa, #fb6fec, #fba69e, #fdd4a3, #fb6fec, #84a9fa)",
        backgroundSize: "200% 100%",
      }}
      {...props}
    >
      {/* Shifting Gradient Overlay on Hover */}
      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-hover:animate-gradient-shift bg-gradient-to-r from-[#84a9fa] via-[#fb6fec] via-[#fba69e] via-[#fdd4a3] via-[#fb6fec] to-[#84a9fa] bg-[length:200%_100%]" />
      
      {/* Inner Button Content */}
      <span
        className="relative px-6 py-3 w-full text-center text-sm font-semibold transition-colors duration-300 bg-white text-zinc-900 group-hover:bg-opacity-90 inline-flex items-center justify-center gap-2"
        style={{ borderRadius: "calc(var(--radius) - 2px)" }}
      >
        {children}
      </span>
    </button>
  );
};

export default function App() {
  // Navigation Routing State
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  // Cart Notification State
  const [cartNotification, setCartNotification] = useState<string | null>(null);

  // Product page configs & states
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  // FAQ accordion open states
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Product configurations (used in the product page details)
  const [tableConfig, setTableConfig] = useState({
    material: "aluminum", // aluminum | wood
    size: "2m" // 2m | 3m
  });

  const [plywoodConfig, setPlywoodConfig] = useState({
    wood: "linden", // linden | poplar
    thickness: "2mm", // 2mm | 3mm | 4mm | 6mm | 8mm | 10mm
    size: "A4" // A5 | A4 | A3 | A2 | 1000x600
  });

  const [calendarConfig, setCalendarConfig] = useState({
    stand: "on-stand" // on-stand | standard
  });

  // Review Submissions
  const [reviews, setReviews] = useState<Array<{ name: string; rating: number; text: string; date: string }>>([
    { name: "Иван П.", rating: 5, text: "Изключително качество на дървесината! Сгъваемата маса е стабилна и се разпъва за секунди.", date: "15.05.2026" },
    { name: "Мария К.", rating: 5, text: "Вечният календар стана страхотен подарък за рожден ден. Гравирането е изпипано до детайл.", date: "22.05.2026" },
    { name: "Георги Д.", rating: 4, text: "Шперплатът от 2 мм е перфектен за лазерно рязане. Силно препоръчвам за хоби проекти.", date: "28.05.2026" }
  ]);
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 5 });

  const triggerAddToCart = (productName: string) => {
    setCartNotification(`Успешно добавихте "${productName}" (Количество: ${quantity}) в количката!`);
    setTimeout(() => setCartNotification(null), 4000);
  };

  // Carousel items
  const carouselProducts = [
    {
      price: "70.02 лв.",
      title: "Алуминиева маса FAVO 2S ALU PRO (2 метра)",
      image: "/images/favo_table.png",
      label: "Собствено производство",
      handle: "folding-table"
    },
    {
      price: "92.12 лв.",
      title: "Алуминиева маса FAVO 3S ALU PRO (+ подарък)",
      image: "/images/favo_table.png",
      label: "Топ избор",
      handle: "folding-table"
    },
    {
      price: "50.07 лв.",
      title: "Дървена маса FAVO 2S PRO (-17%)",
      image: "/images/favo_table.png",
      label: "Промоция",
      handle: "folding-table"
    },
    {
      price: "62.00 лв.",
      title: "Дървена маса FAVO 3S PRO (-14%)",
      image: "/images/favo_table.png",
      label: "С подарък",
      handle: "folding-table"
    }
  ];

  const [carouselIndex, setCarouselIndex] = useState(0);

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % (carouselProducts.length - 1));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + (carouselProducts.length - 1)) % (carouselProducts.length - 1));
  };

  // Auto-scrolling image marquee items
  const marqueeImages = [
    "/images/favo_table.png",
    "/images/favo_plywood.png",
    "/images/favo_calendar.png",
    "/images/favo_crate.png"
  ];

  // Dynamic price calculatons based on product configurator
  const getTablePrice = () => {
    if (tableConfig.material === "aluminum") {
      return tableConfig.size === "2m" ? "70.02 лв." : "92.12 лв.";
    } else {
      return tableConfig.size === "2m" ? "50.07 лв." : "62.00 лв.";
    }
  };

  const getPlywoodPrice = () => {
    let base = 0.50;
    if (plywoodConfig.wood === "linden") base += 0.30;
    
    // Thickness modifier
    if (plywoodConfig.thickness === "3mm") base += 0.50;
    else if (plywoodConfig.thickness === "4mm") base += 1.20;
    else if (plywoodConfig.thickness === "6mm") base += 2.50;
    else if (plywoodConfig.thickness === "8mm") base += 3.80;
    else if (plywoodConfig.thickness === "10mm") base += 5.00;

    // Size modifier
    if (plywoodConfig.size === "A4") base *= 1.8;
    else if (plywoodConfig.size === "A3") base *= 3.2;
    else if (plywoodConfig.size === "A2") base *= 5.5;
    else if (plywoodConfig.size === "1000x600") base *= 9.0;

    return `${base.toFixed(2)} лв.`;
  };

  const getCalendarPrice = () => {
    return calendarConfig.stand === "on-stand" ? "29.34 лв." : "39.12 лв.";
  };

  // Render Product Page Detail
  const renderProductDetail = (handle: string) => {
    let productDetails = {
      title: "",
      price: "",
      image: "",
      desc: "",
      specifications: {} as Record<string, string>,
      features: [] as string[]
    };

    if (handle === "folding-table") {
      productDetails = {
        title: tableConfig.material === "aluminum" ? `Алуминиева сгъваема маса FAVO ${tableConfig.size === "2m" ? "2S" : "3S"} ALU PRO` : `Дървена сгъваема маса FAVO ${tableConfig.size === "2m" ? "2S" : "3S"} PRO`,
        price: getTablePrice(),
        image: "/images/favo_table.png",
        desc: "Сгъваемата маса на FAVO е перфектното решение както за бита, градината и къмпинга, така и за улични продажби. Сгъваема, изключително мобилна, лека и в същото време стабилна. Изработена е от висококачествени материали с прахово боядисана метална конструкция.",
        specifications: {
          "Производител": "ФАВО АД, България",
          "Материал на плота": tableConfig.material === "aluminum" ? "Алуминиеви ламели" : "Естествена иглолистна дървесина",
          "Размери (Д/Ш/В)": tableConfig.size === "2m" ? "200 x 60 x 78 см" : "300 x 60 x 78 см",
          "Тегло": tableConfig.material === "aluminum" ? "8.5 кг" : "12 кг",
          "Товароносимост": "До 90 кг разпределен товар",
          "Конструкция": "Сгъваем тръбен профил с покритие",
        },
        features: [
          "Бързо разпъване за под 30 секунди",
          "Удобна дръжка за лесно пренасяне",
          "Устойчивост на атмосферни влияния",
          "Оптимален баланс между здравина и тегло"
        ]
      };
    } else if (handle === "plywood-material") {
      productDetails = {
        title: `Технически шперплат от ${plywoodConfig.wood === "linden" ? "Липа" : "Топола"} (${plywoodConfig.thickness})`,
        price: getPlywoodPrice(),
        image: "/images/favo_plywood.png",
        desc: "Професионален сертифициран шперплат, идеален за лазерно изрязване, гравиране, декупаж и моделизъм. Ние сме единственият производител в България на технически шперплат с дебелина 2 мм и 3 мм, гарантиращ изключително гладка повърхност без дефекти.",
        specifications: {
          "Материал": plywoodConfig.wood === "linden" ? "Естествена Липа" : "Естествена Топола",
          "Дебелина": plywoodConfig.thickness,
          "Размер на листа": plywoodConfig.size === "1000x600" ? "1000 х 600 мм" : `Формат ${plywoodConfig.size}`,
          "Влажност": "8% - 10%",
          "Клас на лепилото": "Е1 (безопасно за интериорна употреба и детски играчки)",
          "Произход": "100% сертифицирана българска дървесина",
        },
        features: [
          "Идеално гладка, шлайфана повърхност",
          "Минимална деформация при лазерно рязане",
          "Без вътрешни празнини и чепове",
          "Екологично чист продукт"
        ]
      };
    } else if (handle === "eternal-calendar") {
      productDetails = {
        title: `Вечен дървен календар ${calendarConfig.stand === "on-stand" ? "на стойка" : "стандартен"}`,
        price: getCalendarPrice(),
        image: "/images/favo_calendar.png",
        desc: "Луксозен вечен календар, изработен по метода на лазерното изрязване от сертифициран брезов шперплат. Прекрасен интерактивен подарък за офис, рожден ден или юбилей. Механичните зъбни колела ви позволяват да настроите деня, датата и месеца.",
        specifications: {
          "Материал": "Висококачествен технически шперплат 3 мм",
          "Тип сглобка": "Механични зъбни колела",
          "Размери": calendarConfig.stand === "on-stand" ? "20 х 20 х 8 см" : "25 х 25 х 4 см",
          "Покритие": "Натурално еко масло за дърво",
          "Време за сглобяване": "Доставя се напълно готов и сглобен",
        },
        features: [
          "Интерактивен дизайн със зъбни колела",
          "Възможност за персонално гравиране на име или лого",
          "Уникален декоративен акцент за дома или офиса",
          "Произведено от 100% възобновяеми ресурси"
        ]
      };
    }

    const submitReview = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newReview.name || !newReview.text) return;
      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`;
      setReviews([{ ...newReview, date: formattedDate }, ...reviews]);
      setNewReview({ name: "", text: "", rating: 5 });
    };

    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumbs & Back */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button
            onClick={() => { setActiveProduct(null); window.scrollTo(0, 0); }}
            className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-950 font-semibold transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Назад към каталога</span>
          </button>
          
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Начало / Продукти / <span className="text-zinc-800">{productDetails.title}</span>
          </div>
        </div>

        {/* Product Overview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Image Zoom Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="w-full aspect-square rounded-3xl overflow-hidden bg-white border border-zinc-200 shadow-premium group relative">
              <img
                src={productDetails.image}
                alt={productDetails.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Налично на склад
              </span>
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[productDetails.image, "/images/favo_table.png", "/images/favo_plywood.png", "/images/favo_calendar.png"].map((thumb, idx) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-zinc-200 cursor-pointer hover:border-zinc-800 transition-colors bg-white">
                  <img src={thumb} alt="thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Details & Configurator */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
                100% Българско производство
              </span>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 mt-4 leading-tight">
                {productDetails.title}
              </h1>

              {/* Rating stars */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-zinc-500">({reviews.length} отзива)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200/40">
              <div className="text-3xl font-bold text-zinc-950">{productDetails.price}</div>
              <p className="text-xs text-zinc-500 font-medium mt-1">Цените са с включен ДДС. Доставка със Speedy в рамките на 2 работни дни.</p>
            </div>

            <p className="text-base text-zinc-700 font-medium leading-relaxed">
              {productDetails.desc}
            </p>

            {/* CONFIGURATORS */}
            {handle === "folding-table" && (
              <div className="flex flex-col gap-4 border-y border-zinc-200 py-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2">Материал на плота</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setTableConfig({ ...tableConfig, material: "aluminum" })}
                      className={`px-5 py-2.5 text-xs font-bold border transition-all ${
                        tableConfig.material === "aluminum" ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white hover:border-zinc-900 text-zinc-800"
                      }`}
                      style={{ borderRadius: "var(--radius)" }}
                    >
                      Алуминий
                    </button>
                    <button
                      onClick={() => setTableConfig({ ...tableConfig, material: "wood" })}
                      className={`px-5 py-2.5 text-xs font-bold border transition-all ${
                        tableConfig.material === "wood" ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white hover:border-zinc-900 text-zinc-800"
                      }`}
                      style={{ borderRadius: "var(--radius)" }}
                    >
                      Дърво (Иглолистна дървесина)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2">Дължина на масата</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setTableConfig({ ...tableConfig, size: "2m" })}
                      className={`px-5 py-2.5 text-xs font-bold border transition-all ${
                        tableConfig.size === "2m" ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white hover:border-zinc-900 text-zinc-800"
                      }`}
                      style={{ borderRadius: "var(--radius)" }}
                    >
                      2 метра плот
                    </button>
                    <button
                      onClick={() => setTableConfig({ ...tableConfig, size: "3m" })}
                      className={`px-5 py-2.5 text-xs font-bold border transition-all ${
                        tableConfig.size === "3m" ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white hover:border-zinc-900 text-zinc-800"
                      }`}
                      style={{ borderRadius: "var(--radius)" }}
                    >
                      3 метра плот (+ отвертки подарък)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {handle === "plywood-material" && (
              <div className="flex flex-col gap-4 border-y border-zinc-200 py-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2">Вид дървесина</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPlywoodConfig({ ...plywoodConfig, wood: "linden" })}
                      className={`px-5 py-2.5 text-xs font-bold border transition-all ${
                        plywoodConfig.wood === "linden" ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white hover:border-zinc-900 text-zinc-800"
                      }`}
                      style={{ borderRadius: "var(--radius)" }}
                    >
                      Липа (Препоръчва се за лазерно гравиране)
                    </button>
                    <button
                      onClick={() => setPlywoodConfig({ ...plywoodConfig, wood: "poplar" })}
                      className={`px-5 py-2.5 text-xs font-bold border transition-all ${
                        plywoodConfig.wood === "poplar" ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white hover:border-zinc-900 text-zinc-800"
                      }`}
                      style={{ borderRadius: "var(--radius)" }}
                    >
                      Топола
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2">Дебелина на листа</label>
                  <div className="flex flex-wrap items-center gap-2">
                    {["2mm", "3mm", "4mm", "6mm", "8mm", "10mm"].map((thick) => (
                      <button
                        key={thick}
                        onClick={() => setPlywoodConfig({ ...plywoodConfig, thickness: thick })}
                        className={`px-4 py-2 text-xs font-bold border transition-all ${
                          plywoodConfig.thickness === thick ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white hover:border-zinc-900 text-zinc-800"
                        }`}
                        style={{ borderRadius: "var(--radius)" }}
                      >
                        {thick}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2">Размер (Формат)</label>
                  <div className="flex flex-wrap items-center gap-2">
                    {["A5", "A4", "A3", "A2", "1000x600"].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setPlywoodConfig({ ...plywoodConfig, size: sz })}
                        className={`px-4 py-2 text-xs font-bold border transition-all ${
                          plywoodConfig.size === sz ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white hover:border-zinc-900 text-zinc-800"
                        }`}
                        style={{ borderRadius: "var(--radius)" }}
                      >
                        {sz === "1000x600" ? "1000 х 600 мм" : `Формат ${sz}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {handle === "eternal-calendar" && (
              <div className="flex flex-col gap-4 border-y border-zinc-200 py-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2">Дизайн & Стойка</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCalendarConfig({ ...calendarConfig, stand: "on-stand" })}
                      className={`px-5 py-2.5 text-xs font-bold border transition-all ${
                        calendarConfig.stand === "on-stand" ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white hover:border-zinc-900 text-zinc-800"
                      }`}
                      style={{ borderRadius: "var(--radius)" }}
                    >
                      Календар на стойка (29.34 лв.)
                    </button>
                    <button
                      onClick={() => setCalendarConfig({ ...calendarConfig, stand: "standard" })}
                      className={`px-5 py-2.5 text-xs font-bold border transition-all ${
                        calendarConfig.stand === "standard" ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white hover:border-zinc-900 text-zinc-800"
                      }`}
                      style={{ borderRadius: "var(--radius)" }}
                    >
                      Стандартен Вечен календар (39.12 лв.)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity and Cart Controls */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center border border-zinc-200 rounded-full p-1 bg-white">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-zinc-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1">
                <GradientButton fullWidth onClick={() => triggerAddToCart(productDetails.title)}>
                  <ShoppingBag className="w-4.5 h-4.5" />
                  <span>Добави в Количката</span>
                </GradientButton>
              </div>
            </div>

            {/* Speedy Courier and Insurence indicators */}
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-150 pt-6 mt-2">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-zinc-800 shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-zinc-900">Бърза доставка</h5>
                  <p className="text-[10px] text-zinc-500 font-semibold">До 2 работни дни със Speedy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-zinc-800 shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-zinc-900">Транспортна застраховка</h5>
                  <p className="text-[10px] text-zinc-500 font-semibold">Сигурност за всяка пратка</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Panel */}
        <div className="border-t border-zinc-200 pt-12 mb-16">
          <div className="flex border-b border-zinc-200 mb-8">
            {[
              { id: "description", label: "Описание & Характеристики" },
              { id: "delivery", label: "Доставка и Условия" },
              { id: "reviews", label: `Отзиви (${reviews.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-6 text-sm font-semibold border-b-2 transition-colors -mb-[2px] ${
                  activeTab === tab.id ? "border-zinc-950 text-zinc-950 font-bold" : "border-transparent text-zinc-400 hover:text-zinc-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "description" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 flex flex-col gap-6">
                <h3 className="text-2xl font-semibold tracking-tight text-zinc-950">Детайли за продукта</h3>
                <p className="text-base text-zinc-700 leading-relaxed font-medium">
                  {productDetails.desc} Продуктът е създаден с високи стандарти за качество в нашата фабрика в град Свищов, притежаваща над 30-годишна история. Ние следим всяка сглобка, шлайфане и обработка на материала.
                </p>
                <div className="flex flex-col gap-2.5">
                  <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Предимства:</h4>
                  <ul className="list-disc pl-5 text-base text-zinc-700 font-medium flex flex-col gap-1.5">
                    {productDetails.features.map((feat, index) => (
                      <li key={index}>{feat}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="lg:col-span-4 bg-zinc-50 p-6 rounded-2xl border border-zinc-200/40">
                <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-4">Технически характеристики</h4>
                <div className="flex flex-col gap-3">
                  {Object.entries(productDetails.specifications).map(([key, val]) => (
                    <div key={key} className="flex justify-between gap-4 text-xs font-semibold border-b border-zinc-200/40 pb-2">
                      <span className="text-zinc-500">{key}:</span>
                      <span className="text-zinc-950 text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "delivery" && (
            <div className="max-w-3xl flex flex-col gap-6 text-base text-zinc-700 font-medium leading-relaxed">
              <h3 className="text-2xl font-semibold tracking-tight text-zinc-950">Условия за доставка и плащане</h3>
              <p>Всички поръчки се обработват експресно. Доставката се извършва до адрес на клиента или до избран офис на Speedy в срок до 2 работни дни. Всички пакети се изпращат в специални здрави опаковки, които предпазват дървесината от увреждане.</p>
              
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li><strong>Преглед и тест:</strong> Имате право да прегледате и тествате продуктите преди заплащане на наложения платеж.</li>
                <li><strong>Връщане:</strong> Съгласно ЗЗП имате 14-дневен срок за връщане на стоката, в случай че не отговаря на Вашите очаквания.</li>
                <li><strong>Транспортна застраховка:</strong> При повреда от куриера, FAVO поема ангажимент за незабавна подмяна на продукта.</li>
              </ul>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Reviews List */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <h3 className="text-2xl font-semibold tracking-tight text-zinc-950">Отзиви от купувачи</h3>
                
                <div className="flex flex-col gap-6">
                  {reviews.map((rev, index) => (
                    <div key={index} className="border-b border-zinc-200/60 pb-6 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-bold text-zinc-900">{rev.name}</span>
                        <span className="text-xs text-zinc-400 font-medium">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-zinc-600 font-medium leading-relaxed mt-1">
                        {rev.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leave Review Form */}
              <div className="lg:col-span-5 bg-white border border-zinc-200 p-8 rounded-3xl shadow-premium flex flex-col gap-4">
                <h4 className="text-lg font-bold text-zinc-950">Напишете отзив</h4>
                
                <form onSubmit={submitReview} className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Вашето Име</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-50 border border-zinc-200 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-zinc-800"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Оценка</label>
                    <select
                      className="w-full bg-zinc-50 border border-zinc-200 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-zinc-800 font-semibold text-zinc-800"
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    >
                      <option value="5">5 Звезди (Отлично)</option>
                      <option value="4">4 Звезди (Много добро)</option>
                      <option value="3">3 Звезди (Добро)</option>
                      <option value="2">2 Звезди (Задоволително)</option>
                      <option value="1">1 Звезда (Лошо)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Вашият коментар</label>
                    <textarea
                      rows={4}
                      className="w-full bg-zinc-50 border border-zinc-200 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-zinc-800 resize-none"
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                      required
                    />
                  </div>

                  <GradientButton type="submit" fullWidth>
                    Изпрати Коментар
                  </GradientButton>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* RELATED PRODUCTS */}
        <div className="border-t border-zinc-200 pt-16">
          <h3 className="text-3xl font-semibold tracking-tight text-zinc-950 mb-8">Други продукти от FAVO</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Алуминиева сгъваема маса FAVO 2S PRO (2м)",
                price: "70.02 лв.",
                img: "/images/favo_table.png",
                handle: "folding-table"
              },
              {
                title: "Технически шперплат (2 мм - 10 мм)",
                price: "От 4.11 лв.",
                img: "/images/favo_plywood.png",
                handle: "plywood-material"
              },
              {
                title: "Вечен дървен календар на стойка",
                price: "29.34 лв.",
                img: "/images/favo_calendar.png",
                handle: "eternal-calendar"
              }
            ]
              .filter(p => p.handle !== handle)
              .map((prod, idx) => (
                <div key={idx} className="group bg-white rounded-3xl p-6 border border-zinc-200/40 shadow-premium transition-all duration-300 hover:shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="w-full aspect-square rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 shadow-sm">
                      <img src={prod.img} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h4 className="text-xl font-semibold text-zinc-950 mt-6 tracking-tight leading-snug">{prod.title}</h4>
                    <div className="text-lg font-bold text-zinc-900 mt-2">{prod.price}</div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => { setActiveProduct(prod.handle); setQuantity(1); window.scrollTo(0, 0); }}
                      className="w-full py-3 border border-zinc-200 rounded-full hover:border-zinc-950 hover:bg-zinc-950 hover:text-white transition-all text-xs font-bold uppercase tracking-wider"
                    >
                      Преглед на Продукта
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased select-none pb-0">
      
      {/* Dynamic Add to Cart Alert Notification */}
      {cartNotification && (
        <div className="fixed bottom-6 right-6 z-[100] bg-zinc-950 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border border-zinc-800/80 animate-bounce">
          <ShoppingBag className="w-5 h-5 text-emerald-400 shrink-0 animate-pulse" />
          <span className="text-sm font-semibold">{cartNotification}</span>
        </div>
      )}

      {/* 1. Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-gray-50/90 backdrop-blur-md border-b border-zinc-200/80 px-6 py-4 flex items-center justify-between transition-all duration-300">
        {/* Left Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveProduct(null); window.scrollTo(0, 0); }}>
          <img src="/images/favo_logo.png" alt="FAVO Logo" className="h-10 w-10 object-contain rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)]" />
          <span className="text-xl font-bold tracking-tight text-zinc-950">FAVO-SHOP</span>
        </div>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Сгъваеми маси", href: "#folding-tables" },
            { label: "Шперплат", href: "#plywood" },
            { label: "Лазерно рязане", href: "#laser-crafts" },
            { label: "Бояджийски инструменти", href: "#painting-tools" },
            { label: "Горивни материали", href: "#fuel" },
            { label: "Едро", href: "https://sklad.favo-shop.com" }
          ].map((link) => (
            <a
              key={link.label}
              href={activeProduct ? "#" : link.href}
              onClick={() => {
                if (activeProduct) {
                  setActiveProduct(null);
                }
              }}
              className="text-sm font-medium text-zinc-800 hover:text-zinc-950 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <a
            href="https://sklad.favo-shop.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-zinc-900 text-white hover:bg-zinc-800 text-sm font-semibold transition-all duration-300"
            style={{ borderRadius: "var(--radius)" }}
          >
            Вход Едро
          </a>
          
          <GradientButton onClick={() => window.open("https://favo-shop.com", "_blank")}>
            <User className="w-4 h-4 text-zinc-800" />
            <span>Вход</span>
          </GradientButton>
        </div>
      </nav>

      {/* Main Container Switch */}
      {activeProduct ? (
        renderProductDetail(activeProduct)
      ) : (
        <>
          {/* 2. Hero Section */}
          <section className="relative px-6 py-12 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden">
            {/* Left Column Info */}
            <div className="flex flex-col gap-6">
              {/* Rating Badge */}
              <div className="inline-flex items-center self-start gap-2 bg-white px-4 py-2 border border-zinc-200/50 shadow-sm transition-all duration-300 hover:shadow-md" style={{ borderRadius: "var(--radius)" }}>
                <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                </span>
                <span className="text-xs font-semibold text-zinc-700 tracking-wide">30+ години качество • Основано през 1993 г.</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-950 leading-[1.1]">
                Лидер в производството на дървени изделия и маси
              </h1>

              {/* Features */}
              <div className="flex flex-col gap-4 mt-2">
                {[
                  { icon: Hammer, text: "Най-големият производител на сгъваеми маси в Европа." },
                  { icon: Layers, text: "Единственият производител в България на технически шперплат 2 и 3 мм." },
                  { icon: Truck, text: "Бърза доставка до 2 работни дни с транспортна застраховка." }
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                      <feat.icon className="w-5 h-5 text-zinc-800" />
                    </div>
                    <span className="text-base text-zinc-700 font-medium">{feat.text}</span>
                  </div>
                ))}
              </div>

              {/* Mobile Horizontal Marquee (Visible only on Mobile) */}
              <div className="lg:hidden w-full relative overflow-hidden py-4 mt-4 pointer-events-none">
                {/* Fade Gradients for horizontal scrolling */}
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-10" />

                <div className="flex gap-4 animate-marquee-horizontal w-max">
                  {[...marqueeImages, ...marqueeImages, ...marqueeImages].map((img, index) => (
                    <div key={`mobile-marquee-${index}`} className="w-36 h-24 bg-white rounded-2xl overflow-hidden shadow-sm shrink-0 border border-zinc-200/50 p-1">
                      <img src={img} alt="Mobile Woodcraft" className="w-full h-full object-cover rounded-xl" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <hr className="border-zinc-200 my-2" />

              {/* Promo Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-zinc-50 p-6 rounded-3xl border border-zinc-200/40 shadow-[2px_4px_12px_rgba(0,0,0,0.02)]">
                <div>
                  <div className="text-3xl font-bold text-zinc-950">До -32% Намаление</div>
                  <div className="text-xs text-zinc-500 font-medium mt-0.5">*Дневни лимитирани промоции</div>
                </div>
                <button
                  onClick={() => window.open("https://favo-shop.com", "_blank")}
                  className="px-8 py-3.5 bg-zinc-900 text-white hover:bg-zinc-800 text-sm font-semibold transition-all duration-300 shadow-sm"
                  style={{ borderRadius: "var(--radius)" }}
                >
                  Към Промоциите
                </button>
              </div>

              {/* Info Card */}
              <a href="#custom-orders" className="group flex items-center justify-between p-4 bg-white border border-zinc-200/60 rounded-2xl transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-4">
                  <img src="/images/favo_calendar.png" alt="Wood Crafting" className="w-12 h-12 object-cover rounded-xl" />
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900">Индивидуален проект?</h4>
                    <p className="text-xs text-zinc-500 font-medium">Изработка изцяло по Ваш собствен дизайн</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center border border-zinc-200 transition-colors group-hover:bg-zinc-900 group-hover:text-white">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </a>
            </div>

            {/* Right Column: Scrolling Marquees (Hidden on Mobile) */}
            <div className="hidden lg:grid grid-cols-2 gap-4 h-[34rem] relative overflow-hidden pointer-events-none rounded-3xl">
              {/* Top/Bottom Fade Gradients */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

              {/* Column 1: Scrolling Normal */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 animate-marquee">
                  {[...marqueeImages, ...marqueeImages].map((img, index) => (
                    <div key={`col1-${index}`} className="w-full h-48 bg-zinc-100 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-zinc-200/50">
                      <img src={img} alt="Woodcraft Product" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Scrolling Reverse */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 animate-marquee-reverse">
                  {[...marqueeImages, ...marqueeImages].map((img, index) => (
                    <div key={`col2-${index}`} className="w-full h-48 bg-zinc-100 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-zinc-200/50">
                      <img src={img} alt="Woodcraft Product" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 3. Products Grid Section */}
          <section className="px-6 py-20 max-w-7xl mx-auto border-t border-zinc-200/50">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Каталог</span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 mt-3 leading-tight">
                Специализирани Дървени Изделия и Материали
              </h2>
            </div>

            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Алуминиева сгъваема маса FAVO 2S PRO (2м)",
                  price: "70.02 лв.",
                  img: "/images/favo_table.png",
                  handle: "folding-table"
                },
                {
                  title: "Технически шперплат (2 мм - 10 мм)",
                  price: "От 4.11 лв.",
                  img: "/images/favo_plywood.png",
                  handle: "plywood-material"
                },
                {
                  title: "Вечен дървен календар на стойка",
                  price: "29.34 лв.",
                  img: "/images/favo_calendar.png",
                  handle: "eternal-calendar"
                }
              ].map((prod, idx) => (
                <div
                  key={idx}
                  onClick={() => { setActiveProduct(prod.handle); setQuantity(1); window.scrollTo(0, 0); }}
                  className="group bg-white rounded-3xl p-6 border border-zinc-200/40 shadow-premium transition-all duration-300 hover:shadow-xl flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="w-full aspect-square rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 shadow-sm">
                      <img src={prod.img} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="text-2xl font-semibold text-zinc-950 mt-6 tracking-tight leading-snug">{prod.title}</h3>
                    <div className="flex items-baseline gap-1 mt-2 text-zinc-900">
                      <span className="text-2xl font-bold">{prod.price}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <GradientButton fullWidth>
                      Преглед на Продукта
                    </GradientButton>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Weight Loss Section -> Custom Crafts & Design */}
          <section className="bg-gray-50 px-6 py-20 border-y border-zinc-200/50" id="custom-orders">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column Content */}
              <div className="flex flex-col gap-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-950 leading-[1.1]">
                  Сувенири и подаръци по Ваш индивидуален дизайн.
                </h2>
                
                {/* Features */}
                <div className="flex flex-col gap-4 mt-2">
                  {[
                    { icon: Sparkles, text: "Лазерно изрязване с изключителна точност." },
                    { icon: TreePine, text: "Екологично чисти материали - липа и топола." },
                    { icon: CheckCircle, text: "Подходящи за подаръци, юбилеи, сватби и брандиране." }
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-zinc-100 shrink-0">
                        <feat.icon className="w-5 h-5 text-zinc-800" />
                      </div>
                      <span className="text-base text-zinc-700 font-medium">{feat.text}</span>
                    </div>
                  ))}
                </div>

                {/* Buttons Row */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <button
                    onClick={() => { setActiveProduct("eternal-calendar"); setQuantity(1); window.scrollTo(0, 0); }}
                    className="px-8 py-3.5 bg-zinc-900 text-white hover:bg-zinc-800 text-sm font-semibold transition-all duration-300"
                    style={{ borderRadius: "var(--radius)" }}
                  >
                    Изпрати Дизайн
                  </button>
                  <GradientButton onClick={() => { setActiveProduct("eternal-calendar"); setQuantity(1); window.scrollTo(0, 0); }}>
                    <span>Разгледай Каталога</span>
                  </GradientButton>
                </div>

                <p className="text-xs text-zinc-400 font-medium leading-relaxed max-w-md mt-2">
                  *Минимални количества за лазерно гравиране не са задължителни. Работим с крайни клиенти и дистрибутори на едро.
                </p>
              </div>

              {/* Right Column Product Image */}
              <div className="w-full aspect-[4/3] lg:aspect-square bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-premium">
                <img src="/images/favo_crate.png" alt="Custom Laser Cut Wooden Box" className="w-full h-full object-cover" />
              </div>
            </div>
          </section>

          {/* 5. Product Carousel Section */}
          <section className="bg-gray-100 px-6 py-20" id="folding-tables">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left: Static full-height card */}
              <div className="lg:col-span-5 h-[32rem] sm:h-[40rem] md:h-[48rem] rounded-3xl overflow-hidden relative group shadow-premium border border-zinc-200/50">
                <div className="absolute inset-0 z-0">
                  <img src="/images/favo_table.png" alt="FAVO Foldable Tables" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>
                
                <div className="absolute bottom-10 left-10 right-10 z-10 flex flex-col items-start gap-4">
                  <span className="bg-white/25 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5" style={{ borderRadius: "var(--radius)" }}>
                    Собствено производство
                  </span>
                  <div className="text-3xl font-semibold text-white tracking-tight">Сгъваеми Маси</div>
                  <div className="text-lg text-white/90 font-medium">Леки, мобилни и изключително стабилни за бита и бизнеса</div>
                  <GradientButton className="mt-2" onClick={() => { setActiveProduct("folding-table"); setQuantity(1); window.scrollTo(0, 0); }}>
                    <span>Виж Спецификации</span>
                  </GradientButton>
                </div>
              </div>

              {/* Right: Horizontal Carousel */}
              <div className="lg:col-span-7 flex flex-col justify-between py-6">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl font-semibold tracking-tight text-zinc-950">Популярни Модели</h3>
                    {/* Arrow navigation buttons */}
                    <div className="flex items-center gap-3">
                      <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-neutral-100/80 hover:bg-neutral-200/80 flex items-center justify-center transition-colors border border-zinc-200/40">
                        <ChevronLeft className="w-5 h-5 text-zinc-800" />
                      </button>
                      <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-neutral-100/80 hover:bg-neutral-200/80 flex items-center justify-center transition-colors border border-zinc-200/40">
                        <ChevronRight className="w-5 h-5 text-zinc-800" />
                      </button>
                    </div>
                  </div>

                  {/* Slider wrapper */}
                  <div className="overflow-hidden h-[30rem] relative">
                    <div
                      className="flex gap-6 transition-transform duration-500 ease-out h-full"
                      style={{ transform: `translateX(-${carouselIndex * 50}%)` }}
                    >
                      {carouselProducts.map((prod, index) => (
                        <div
                          key={index}
                          className="w-[85%] sm:w-[47%] shrink-0 h-full rounded-3xl overflow-hidden relative group shadow-premium border border-zinc-200/50"
                        >
                          <div className="absolute inset-0 z-0">
                            <img src={prod.image} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                          </div>
                          
                          <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col items-start gap-3">
                            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1" style={{ borderRadius: "var(--radius)" }}>
                              {prod.label}
                            </span>
                            <div className="text-xl font-bold text-white tracking-tight leading-tight">{prod.title}</div>
                            <div className="text-sm text-zinc-200 font-bold">{prod.price}</div>
                            <GradientButton className="w-full mt-1" onClick={() => { setActiveProduct(prod.handle); setQuantity(1); window.scrollTo(0, 0); }}>
                              <span>Купи Маса</span>
                            </GradientButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center items-center gap-2 mt-6">
                  {[0, 1, 2].map((dot) => (
                    <button
                      key={dot}
                      onClick={() => setCarouselIndex(dot)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        carouselIndex === dot ? "w-8 bg-zinc-950" : "w-2.5 bg-zinc-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 6. Craftsmanship & Materials Section */}
          <section className="bg-gray-50 py-28 px-6 border-y border-zinc-200/50">
            <div className="max-w-7xl mx-auto">
              {/* Centered Heading + Buttons */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-6 mb-16">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 leading-tight">
                  Открийте традицията в българското дървообработване
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => { setActiveProduct("folding-table"); setQuantity(1); window.scrollTo(0, 0); }}
                    className="px-6 py-2.5 bg-zinc-900 text-white hover:bg-zinc-800 text-sm font-semibold transition-all duration-300"
                    style={{ borderRadius: "var(--radius)" }}
                  >
                    Производствен Процес
                  </button>
                  <button
                    onClick={() => { setActiveProduct("plywood-material"); setQuantity(1); window.scrollTo(0, 0); }}
                    className="px-6 py-2.5 bg-white text-zinc-800 hover:bg-zinc-100 text-sm font-semibold transition-all duration-300 border border-zinc-200"
                    style={{ borderRadius: "var(--radius)" }}
                  >
                    Сертификати
                  </button>
                </div>
              </div>

              {/* 6-Column Grid of Feature Badges */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                  { icon: TreePine, label: "Естествена Дървесина\n(Липа и Топола)" },
                  { icon: Hammer, label: "Собствено\nПроизводство" },
                  { icon: Award, label: "Лидер в\nЕвропа" },
                  { icon: Sparkles, label: "Лазерно\nГравиране" },
                  { icon: Brush, label: "Професионални\nИнструменти" },
                  { icon: Flame, label: "Горивни Еко\nПелети & Разпалки" }
                ].map((badge, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-8 shadow-premium border border-zinc-100 flex flex-col items-center text-center justify-between gap-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="w-20 h-20 rounded-full bg-amber-50/50 flex items-center justify-center text-amber-700">
                      <badge.icon className="w-12 h-12 stroke-[1.25]" />
                    </div>
                    <div className="text-sm font-semibold text-zinc-900 leading-snug whitespace-pre-line">
                      {badge.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. FAQ Section */}
          <section className="bg-gray-50 py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950">Често Задавани Въпроси</h2>
                <p className="text-sm text-zinc-500 font-medium mt-2">Всичко, което трябва да знаете за доставките и материалите</p>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-4">
                {[
                  {
                    q: "Кога и как ще бъде доставена пратката ми?",
                    a: "Всички доставки в България се извършват с куриерска фирма Speedy в рамките на 2 работни дни. В някои случаи срокът може да бъде удължен до 7 работни дни."
                  },
                  {
                    q: "Какви са начините на плащане?",
                    a: "Можете да заплатите Вашата поръчка с наложен платеж (в брой или с карта при получаване от куриера) или по банков път по фирмената ни сметка."
                  },
                  {
                    q: "Има ли застраховка на изпратените продукти?",
                    a: "Да, абсолютно всички пратки се опаковат сигурно в здрави кашони и пътуват с пълна транспортна застраховка за наша сметка."
                  },
                  {
                    q: "Мога ли да върна продукт, ако не ми хареса?",
                    a: "Да. Съгласно чл. 55 от ЗЗП имате законово право на отказ и връщане на стоката в рамките на 14 работни дни от деня на получаването й."
                  },
                  {
                    q: "Предлагате ли цени на едро и дистрибуторски схеми?",
                    a: "Да! Разполагаме с отделен портал за партньори на склад (sklad.favo-shop.com). Предлагаме програма „Възможност за доходи“ за препродажба и изгодни търговски пакети."
                  }
                ].map((faq, i) => (
                  <div key={i} className="bg-white rounded-3xl shadow-premium border border-zinc-100 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left px-8 sm:px-14 py-8 flex items-center justify-between transition-colors hover:bg-zinc-50/50"
                    >
                      <span className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950">{faq.q}</span>
                      <div className="shrink-0 w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-800">
                        {openFaq === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </div>
                    </button>
                    
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        openFaq === i ? "max-h-[300px] border-t border-zinc-100" : "max-h-0"
                      } overflow-hidden`}
                    >
                      <p className="px-8 sm:px-14 py-8 text-base sm:text-lg text-zinc-600 leading-relaxed font-medium">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 8. Woodwork Guides & Articles */}
          <section className="bg-gray-50 py-28 px-6 border-t border-zinc-200/50">
            <div className="max-w-7xl mx-auto">
              {/* Centered Heading + Buttons */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-6 mb-16">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 leading-tight">
                  Вашият наръчник за дървообработване и хоби творчество.
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => { setActiveProduct("plywood-material"); setQuantity(1); window.scrollTo(0, 0); }}
                    className="px-6 py-2.5 bg-zinc-900 text-white hover:bg-zinc-800 text-sm font-semibold transition-all duration-300"
                    style={{ borderRadius: "var(--radius)" }}
                  >
                    Прочети Статиите
                  </button>
                  <button
                    onClick={() => { setActiveProduct("eternal-calendar"); setQuantity(1); window.scrollTo(0, 0); }}
                    className="px-6 py-2.5 bg-white text-zinc-800 hover:bg-zinc-100 text-sm font-semibold transition-all duration-300 border border-zinc-200"
                    style={{ borderRadius: "var(--radius)" }}
                  >
                    Виж Хоби Идеи
                  </button>
                </div>
              </div>

              {/* 4-Column Grid of Guide Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "Как да изберем правилния размер технически шперплат за моделизъм.",
                    img: "/images/favo_plywood.png",
                    cat: "Шперплат",
                    handle: "plywood-material"
                  },
                  {
                    title: "Поддръжка и съхранение на градински и къмпинг сгъваеми маси.",
                    img: "/images/favo_table.png",
                    cat: "Сгъваеми маси",
                    handle: "folding-table"
                  },
                  {
                    title: "Идеи за декупаж и декорация на персонализирани дървени кутии.",
                    img: "/images/favo_crate.png",
                    cat: "Хоби и Декупаж",
                    handle: "eternal-calendar"
                  },
                  {
                    title: "Изкуството на лазерното гравиране върху липова дървесина.",
                    img: "/images/favo_calendar.png",
                    cat: "Лазерно рязане",
                    handle: "eternal-calendar"
                  }
                ].map((guide, idx) => (
                  <div key={idx} className="group bg-white rounded-3xl p-5 border border-zinc-100 shadow-premium flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                    <div>
                      <div className="h-48 overflow-hidden rounded-3xl border border-zinc-100">
                        <img src={guide.img} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <p className="text-lg font-semibold text-zinc-900 mt-6 tracking-tight leading-snug">
                        {guide.title}
                      </p>
                    </div>
                    
                    <div className="mt-6 flex justify-start">
                      <button
                        onClick={() => { setActiveProduct(guide.handle); setQuantity(1); window.scrollTo(0, 0); }}
                        className="inline-flex items-center gap-2 px-4 py-2 border-2 border-zinc-900/[0.13] hover:border-zinc-900/40 text-xs font-bold text-zinc-800 transition-colors uppercase tracking-wider"
                        style={{ borderRadius: "var(--radius)" }}
                      >
                        <span>{guide.cat}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* 9. Footer */}
      <footer className="bg-zinc-950 text-zinc-200 px-6 py-20 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact and Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveProduct(null); window.scrollTo(0, 0); }}>
              <img src="/images/favo_logo.png" alt="FAVO Logo" className="h-12 w-12 object-contain bg-white rounded-full p-1" />
              <span className="text-2xl font-bold tracking-tight text-white">FAVO-SHOP</span>
            </div>
            <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-sm">
              Най-големият производител в Европа на сгъваеми дървени и алуминиеви маси.
            </p>
            
            {/* Contacts Info */}
            <div className="flex flex-col gap-2.5 text-zinc-400 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white" />
                <span>0889 500 937</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white" />
                <span>За облекла: 0885 933 339</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white" />
                <span>sales@favo-shop.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-white shrink-0" />
                <span>гр. Свищов, Западна Индустриална Зона, ул. Петър Парчевич 5, 5250</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white" />
                <span>Пон - Пет: 08:00 - 17:00 / Съб - Нед: Почивен ден</span>
              </div>
            </div>

            {/* Newsletter */}
            <form className="flex items-center gap-2 max-w-sm bg-zinc-900 p-1.5 rounded-full border border-zinc-800">
              <input
                type="email"
                placeholder="Имейл за новини"
                className="bg-transparent border-none outline-none text-sm text-white px-4 py-2 w-full placeholder-zinc-500 font-medium"
                required
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-white text-zinc-950 flex items-center justify-center hover:bg-zinc-150 transition-colors duration-200 shrink-0"
              >
                <Mail className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Column: Sitemap */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-8">
            {[
              {
                title: "Категории",
                links: ["Сгъваеми маси", "Технически шперплат", "Бояджийски четки", "Горивни пелети"]
              },
              {
                title: "Полезно",
                links: ["За Фирмата", "Индивидуални поръчки", "Условия за доставка", "Вход на едро"]
              },
              {
                title: "Контакти & Социални",
                links: ["Facebook страница", "Instagram профил", "WebDreams.bg", "Портал склад"]
              }
            ].map((section, sIdx) => (
              <div key={sIdx} className="flex flex-col gap-4">
                <h4 className="text-sm font-bold text-white tracking-widest uppercase">{section.title}</h4>
                <ul className="flex flex-col gap-2.5 text-sm text-zinc-400 font-medium">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a href="#favo-shop" className="hover:text-white transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-zinc-800 my-12 max-w-7xl mx-auto" />

        {/* Bottom Socials & Disclaimer */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <a href="https://www.facebook.com/Favotrade" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              Facebook
            </a>
            <a href="https://www.instagram.com/favoshopbg/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              Instagram
            </a>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 text-[10px] font-bold uppercase text-zinc-400 rounded-lg tracking-wider">
              Сглобено в България
            </div>
            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 text-[10px] font-bold uppercase text-zinc-400 rounded-lg tracking-wider">
              OpenCart 2.3 / BurnEngine
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 text-[11px] leading-relaxed text-zinc-600 font-medium text-center md:text-left">
          © 1993-{new Date().getFullYear()} ФАВО АД. Всички права запазени. Разработен от WebDreams.bg. Всички пратки се изпращат с опция за преглед и транспортна застраховка през куриерска мрежа Speedy. Право на връщане до 14 работни дни.
        </div>
      </footer>
      
    </div>
  );
}

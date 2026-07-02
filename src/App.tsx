import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, ShieldCheck, HeartPulse, ShieldAlert, Sparkles, 
  Award, Heart, Phone, ArrowLeft, Menu, X, FileText
} from "lucide-react";

// Import modular sub-components
import MainTab from "./components/MainTab";
import PreventionTab from "./components/PreventionTab";
import FirstAidTab from "./components/FirstAidTab";
import DiseasesTab from "./components/DiseasesTab";
import QuizTab from "./components/QuizTab";
import PosterGenerator from "./components/PosterGenerator";
import EmergencyContacts from "./components/EmergencyContacts";

type TabId = "main" | "prevention" | "firstaid" | "diseases" | "quiz" | "poster" | "contacts";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("main");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  // Auto-scrolling campaign ticker for awareness tips
  const awarenessTips = [
    "الوقاية خير من العلاج: سد الفتحات بالأرضية والجوانب كفيل بحمايتك.",
    "حافظ على النظافة العامة للتخلص من عوامل جذب القوارض بالمخيم.",
    "السرعة تنقذ الحياة: لا تتردد في إسعاف عضة القوارض بالماء والصابون.",
    "إذا ابتلع طفل سماً بالخطأ، خذ عبوة السم وتوجه فوراً للمشفى دون إجباره على التقيؤ.",
    "ارفع الملابس والأغطية والأمتعة عن الأرض بمقدار 30 سم لتمنع تعشيش الفئران."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % awarenessTips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "main", label: "الرئيسية", icon: Home },
    { id: "prevention", label: "الوقاية والتعريف", icon: ShieldCheck },
    { id: "firstaid", label: "الإسعافات الأولية", icon: HeartPulse },
    { id: "diseases", label: "الأمراض المنقولة", icon: ShieldAlert },
    { id: "quiz", label: "اختبار الوعي", icon: Award },
    { id: "poster", label: "صانع الملصقات", icon: FileText },
    { id: "contacts", label: "الطوارئ والمراكز", icon: Phone }
  ] as const;

  const renderActiveTab = () => {
    switch (activeTab) {
      case "main":
        return <MainTab onNavigate={(id) => setActiveTab(id as TabId)} />;
      case "prevention":
        return <PreventionTab onNavigate={(id) => setActiveTab(id as TabId)} />;
      case "firstaid":
        return <FirstAidTab onNavigate={(id) => setActiveTab(id as TabId)} />;
      case "diseases":
        return <DiseasesTab />;
      case "quiz":
        return <QuizTab />;
      case "poster":
        return <PosterGenerator />;
      case "contacts":
        return <EmergencyContacts />;
      default:
        return <MainTab onNavigate={(id) => setActiveTab(id as TabId)} />;
    }
  };

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#002045] font-sans flex flex-col antialiased selection:bg-emerald-500 selection:text-white" dir="rtl">
      
      {/* Top Warning Marquee / Ticker Bar */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-2 px-4 shadow-inner relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-right gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="font-cairo font-black text-xs uppercase tracking-wider">تنبيـه وقائي عاجل:</span>
          </div>
          
          <div className="flex-1 overflow-hidden relative h-5 flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={tickerIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="font-tajawal text-xs md:text-sm font-semibold truncate absolute w-full text-right"
              >
                {awarenessTips[tickerIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
          
          <div className="hidden md:flex items-center gap-1 text-[11px] font-tajawal bg-red-950/40 px-2.5 py-0.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>حملة حماية العائلات من مخاطر القوارض</span>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 z-20 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVZKVtHtUIdQb2Uh0tAB_o7QKHhEATGPaeTAPMzcUPvRqxmzf4k_ukFDy1UBeoPmJwwHM7jFo1tigt4friFq35vvqDiK5rs_j_f3p3vW-pO-QUl7Ce5GKhHSY0ZCKWqO814AoCxJF4DBpuuTlSN_ZyYktG_b3l2zGGA4mWOZ6K5g0X7FMdpnv-SxJmPEgNKtX4Pua5kYIsbWSGwpu0qQV9j4gSFmGMjSxt6p_ypjkDnKbIafYs_XGG3aazdzP08AXLl9k"
                alt="شعار حملة حماية العائلات"
                className="w-12 h-12 object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => handleTabChange("main")}
                referrerPolicy="no-referrer"
              />
              <div className="text-right">
                <h1 className="font-cairo font-extrabold text-base sm:text-lg text-[#002045] tracking-tight leading-tight cursor-pointer" onClick={() => handleTabChange("main")}>
                  حماية العائلات بمخيمات النزوح
                </h1>
                <p className="font-tajawal text-[10px] sm:text-xs text-emerald-700 font-semibold tracking-wide">
                  الوقاية من القوارض والحد من انتشار الأمراض والأوبئة
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-cairo font-bold transition-all flex items-center gap-2 ${
                      isActive
                        ? "bg-[#002045] text-white shadow-sm"
                        : "text-slate-600 hover:text-[#002045] hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-[#002045] hover:bg-slate-50 border border-slate-100 transition-colors focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-slate-100 bg-white overflow-hidden shadow-lg"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      className={`w-full px-4 py-3 rounded-xl text-xs font-cairo font-bold transition-all flex items-center gap-3 ${
                        isActive
                          ? "bg-[#002045] text-white"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-emerald-500" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container / Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {renderActiveTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Area */}
      <footer className="bg-slate-900 border-t border-slate-800 text-white py-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-right">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVZKVtHtUIdQb2Uh0tAB_o7QKHhEATGPaeTAPMzcUPvRqxmzf4k_ukFDy1UBeoPmJwwHM7jFo1tigt4friFq35vvqDiK5rs_j_f3p3vW-pO-QUl7Ce5GKhHSY0ZCKWqO814AoCxJF4DBpuuTlSN_ZyYktG_b3l2zGGA4mWOZ6K5g0X7FMdpnv-SxJmPEgNKtX4Pua5kYIsbWSGwpu0qQV9j4gSFmGMjSxt6p_ypjkDnKbIafYs_XGG3aazdzP08AXLl9k"
                alt="شعار حملة حماية العائلات"
                className="w-10 h-10 object-contain invert brightness-0"
                referrerPolicy="no-referrer"
              />
              <span className="font-cairo font-bold text-base">حملة حماية العائلات - التوعية الصحية الميدانية</span>
            </div>
            
            <p className="font-tajawal text-slate-400 text-xs leading-relaxed max-w-md">
              الوقاية تبدأ من خطوة بسيطة: حفظ الأطعمة وسد الشقوق والتخلص الآمن من النفايات اليومية بعيداً عن منطقة النوم. لا تتردد في نشر المعرفة وحماية جيرانك في مجتمع المخيم.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-cairo font-bold text-sm text-emerald-400">روابط التصفح السريع</h4>
            <div className="grid grid-cols-1 gap-2 font-tajawal text-xs text-slate-300">
              <button onClick={() => handleTabChange("main")} className="text-right hover:text-white transition-colors">الرئيسية والدليل</button>
              <button onClick={() => handleTabChange("prevention")} className="text-right hover:text-white transition-colors">قواعد الوقاية الذهبية</button>
              <button onClick={() => handleTabChange("firstaid")} className="text-right hover:text-white transition-colors">دليل الإسعاف الأولي</button>
              <button onClick={() => handleTabChange("quiz")} className="text-right hover:text-white transition-colors">اختبر وعيك الصحي</button>
            </div>
          </div>

          {/* Emergency support badge */}
          <div className="md:col-span-4 bg-slate-950/40 border border-slate-800 p-5 rounded-2xl flex items-start gap-3.5">
            <Phone className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
            <div className="space-y-1">
              <h4 className="font-cairo font-bold text-sm">خطوط المساعدة والتبليغ</h4>
              <p className="font-tajawal text-xs text-slate-400 leading-relaxed">
                في حالات الطوارئ الطبية أو التسمم بمبيدات الفئران والجرذان، اتصل فوراً بخط الإسعاف السريع الموحد.
              </p>
              <a 
                href="tel:101" 
                className="inline-flex items-center gap-1.5 text-xs font-bold font-cairo text-emerald-400 hover:underline pt-2"
              >
                رقم الإسعاف العام: 101
              </a>
            </div>
          </div>

        </div>

        {/* Bottom footer bar */}
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="font-tajawal text-[11px] text-slate-500">
            جميع الحقوق محفوظة © {new Date().getFullYear()} - حملة حماية العائلات من مخاطر القوارض والأوبئة في المخيمات.
          </p>
          <div className="flex gap-2 items-center text-xs text-slate-400">
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span className="font-tajawal text-[11px]">معاً لحماية الطفولة وعائلاتنا الكريمة</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

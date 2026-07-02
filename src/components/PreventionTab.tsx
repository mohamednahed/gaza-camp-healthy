import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldAlert, EyeOff, Bug, Sparkles, Check, CheckSquare, 
  Square, ShieldCheck, HelpCircle, RefreshCw, AlertTriangle, Trash2 
} from "lucide-react";
import { SafetyChecklist } from "../types";
import { initialChecklist } from "../data";

interface PreventionTabProps {
  onNavigate: (tabId: string) => void;
}

export default function PreventionTab({ onNavigate }: PreventionTabProps) {
  // Checklist state initialized from local storage or static data
  const [checklist, setChecklist] = useState<SafetyChecklist[]>(() => {
    const saved = localStorage.getItem("rodent_safety_checklist");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialChecklist;
      }
    }
    return initialChecklist;
  });

  // Hotspot interactive tent state
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("rodent_safety_checklist", JSON.stringify(checklist));
  }, [checklist]);

  const toggleCheck = (id: string) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const resetChecklist = () => {
    setChecklist(initialChecklist.map(item => ({ ...item, checked: false })));
  };

  const checkedCount = checklist.filter(item => item.checked).length;
  const totalCount = checklist.length;
  const safetyPercentage = Math.round((checkedCount / totalCount) * 100);

  // Get dynamic feedback message based on score
  const getSafetyStatus = () => {
    if (safetyPercentage === 0) {
      return {
        label: "خطر مرتفع جداً",
        color: "text-red-600 bg-red-50 border-red-100",
        desc: "الخيمة غير محمية تماماً ضد تسلل القوارض والأمراض. يرجى البدء باتخاذ التدابير الآن لحماية أطفالك.",
        icon: AlertTriangle
      };
    } else if (safetyPercentage <= 40) {
      return {
        label: "حماية ضعيفة",
        color: "text-orange-600 bg-orange-50 border-orange-100",
        desc: "تم اتخاذ بعض التدابير، ولكن الثغرات الأساسية ما زالت قائمة. يرجى التركيز على سد الفتحات وحفظ الطعام.",
        icon: AlertTriangle
      };
    } else if (safetyPercentage <= 70) {
      return {
        label: "حماية متوسطة (مقبولة)",
        color: "text-blue-600 bg-blue-50 border-blue-100",
        desc: "خيمتك محمية بشكل جزئي. ننصحك برفع الأمتعة وتغطية خزانات المياه لرفع معدل الأمان.",
        icon: ShieldAlert
      };
    } else {
      return {
        label: "خيمة محمية ومثالية",
        color: "text-emerald-700 bg-emerald-50 border-emerald-100",
        desc: "رائع! لقد قمت بتطبيق معظم التدابير الوقائية الذهبية. خيمتك الآن تمثل بيئة آمنة وصحية لأطفالك وعائلتك.",
        icon: ShieldCheck
      };
    }
  };

  const status = getSafetyStatus();
  const StatusIcon = status.icon;

  // Visual hotspots on the camp/tent layout
  const hotspots = [
    {
      id: "food",
      title: "أواني الطعام المكشوفة",
      position: { top: "65%", right: "32%" },
      desc: "الطعام المكشوف أو فتات الخبز على الأرض يجذب القوارض من مسافات بعيدة. احفظ طعامك دائماً في علب بلاستيكية صلبة مغلقة.",
      recommendation: "احفظ جميع الأطعمة في عبوات بلاستيكية أو زجاجية صلبة ومحكمة الغلق."
    },
    {
      id: "cracks",
      title: "الشقوق الجانبية وأسفل القماش",
      position: { top: "82%", right: "48%" },
      desc: "القوارض مرنة جداً وتستطيع التسلل عبر فتحة بحجم قلم رصاص فقط. تأكد من تثبيت حواف الخيمة السفلية ودفنها بالتربة أو تثبيتها بالحجارة.",
      recommendation: "ثبت الحواف السفلية للخيمة بالأرض واغلق أي فتحات صغيرة."
    },
    {
      id: "baggage",
      title: "تراكم الملابس والأمتعة على الأرض",
      position: { top: "55%", right: "72%" },
      desc: "الملابس والفرش المكوم على الأرض يمثل المأوى والملجأ الدافئ المفضل للفئران للتعشيش والتكاثر بعيداً عن الأنظار.",
      recommendation: "ارفع الملابس والأغطية على حوامل أو صناديق ترتفع 30 سم عن مستوى الأرض."
    },
    {
      id: "water",
      title: "مصادر الشرب المكشوفة",
      position: { top: "42%", right: "12%" },
      desc: "تبحث الفئران دوماً عن مصادر للمياه العذبة لتشرب منها. إذا تبرزت أو شربت من وعاء مائي مكشوف، فإنها تنقل داء الملتويات والسالمونيلا الخطير للعائلة.",
      recommendation: "غطِّ خزانات المياه وجالونات الشرب بإحكام طوال اليوم."
    }
  ];

  return (
    <div className="space-y-12">
      {/* Intro Section - Silent Danger */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="font-cairo text-3xl font-bold text-[#002045]">لماذا سمي بالخطر الصامت؟</h2>
        <p className="font-tajawal text-gray-600 leading-relaxed text-base">
          تعد القوارض من أخطر المهددات في البيئات السكنية المؤقتة والمخيمات. يطلق عليها "الخطر الصامت" لقدرتها الفائقة على التسلل والتخفي، حيث تهاجم دون سابق إنذار وفي أوقات لا تتوقعها، مما يجعل الوقاية منها تحدياً مستمراً يتطلب يقظة تامة.
        </p>
      </div>

      {/* Main 3 Risk Cards (Page 2 layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h3 className="font-cairo font-bold text-xl text-[#002045]">السموم المتخفية</h3>
          <p className="font-tajawal text-gray-500 text-sm leading-relaxed">
            تمثل سموم القوارض وبقاياها خطراً كبيراً على الأطفال، فكثيراً ما تشبه هذه السموم قطع الحلوى الملونة أو الحبوب الغذائية، مما قد يدفع الطفل لتناولها دون وعي بمخاطرها القاتلة.
          </p>
          <div className="pt-2 text-xs font-semibold text-red-600 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> تأكد من إبقاء السموم بعيداً عن الأطفال
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-[#002045]" />
          <div className="w-16 h-16 bg-blue-50 text-blue-950 rounded-full flex items-center justify-center">
            <EyeOff className="w-8 h-8" />
          </div>
          <h3 className="font-cairo font-bold text-xl text-[#002045]">العضات اللامرئية</h3>
          <p className="font-tajawal text-gray-500 text-sm leading-relaxed">
            تهاجم القوارض غالباً أثناء النوم العميق. قد لا يشعر المصاب بعضة خفيفة أو خدش أثناء نومه، لكن الجروح الصغيرة التي تتركها قد تنقل بكتيريا وفيروسات خطيرة تتسلل مباشرة إلى مجرى الدم.
          </p>
          <div className="pt-2 text-xs font-semibold text-blue-700 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> افحص أطراف الأطفال يومياً
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-[#006d40]" />
          <div className="w-16 h-16 bg-emerald-50 text-[#006d40] rounded-full flex items-center justify-center">
            <Bug className="w-8 h-8" />
          </div>
          <h3 className="font-cairo font-bold text-xl text-[#002045]">الأمراض المستترة</h3>
          <p className="font-tajawal text-gray-500 text-sm leading-relaxed">
            تكمن الخطورة الكبرى في فضلات القوارض وبولها؛ فهي تلوث خزانات المياه والأواني المكشوفة بميكروبات لا ترى بالعين المجردة، مما يسبب أوبئة معوية وتسمماً حاداً دون معرفة المصدر.
          </p>
          <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> غطِّ مصادر المياه والأواني دائماً
          </div>
        </motion.div>
      </div>

      {/* Interactive Visual Tent Hotspots Explorer */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 text-right">
            <h3 className="font-cairo text-2xl font-bold text-[#002045] flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-600" />
              المخطط التفاعلي لنقاط التسلل والتعشيش في الخيمة
            </h3>
            <p className="font-tajawal text-sm text-gray-500">
              اضغط على النقاط المضيئة لاستكشاف مواطن الخطر في الخيمة والحلول الموصى بها.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive Graphic Container */}
          <div className="lg:col-span-7 relative bg-slate-50 border border-slate-100 rounded-2xl p-4 overflow-hidden shadow-inner flex justify-center items-center h-[320px] sm:h-[400px]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoi7qIlWdQP0kz0HQnFDmSUyjFrPZtwqkfswzH3APhLjaLu4H3f9hE6oS9osokqjjSLi3aaqodzlUYVxEaTwaBgEX91Brd0Kcg_IyVIbf60ZPU_I4Bmi2C-zTFIsonxvMX8KKh2LmHWZppskz7QV6mRimzAvyOuGjLIyQiTOz1tbLVeD8-Ladilr79_LxZV7HNKOUxnIM0HGQYMTILIX_Jp0l2ldMV8HebqCCM4gYgh7pzEGowXO6rgA"
              alt="تخطيط مخيم الإيواء"
              className="w-full h-full object-cover rounded-xl opacity-80"
              referrerPolicy="no-referrer"
            />
            {/* Dark glass backdrop layout overlay */}
            <div className="absolute inset-0 bg-[#002045]/10 rounded-xl" />

            {/* Glowing Hotspots */}
            {hotspots.map(hs => {
              const isSelected = selectedHotspot === hs.id;
              return (
                <button
                  key={hs.id}
                  onClick={() => setSelectedHotspot(isSelected ? null : hs.id)}
                  style={{ top: hs.position.top, left: hs.position.right }}
                  className="absolute z-20 group -translate-x-1/2 -translate-y-1/2"
                >
                  <span className="relative flex h-8 w-8">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSelected ? 'bg-amber-400' : 'bg-red-500'}`}></span>
                    <span className={`relative inline-flex rounded-full h-8 w-8 items-center justify-center text-white font-bold text-xs shadow-md transition-colors ${isSelected ? 'bg-amber-500' : 'bg-red-600 hover:bg-red-700'}`}>
                      !
                    </span>
                  </span>
                  <span className="absolute hidden group-hover:block bg-slate-900/90 text-white text-[11px] px-2 py-1 rounded shadow-lg whitespace-nowrap -bottom-8 left-1/2 -translate-x-1/2 font-tajawal">
                    {hs.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Hotspot details sidebar */}
          <div className="lg:col-span-5 h-full flex flex-col justify-center min-h-[220px]">
            <AnimatePresence mode="wait">
              {selectedHotspot ? (
                (() => {
                  const hs = hotspots.find(h => h.id === selectedHotspot)!;
                  return (
                    <motion.div
                      key={hs.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 space-y-4"
                    >
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full font-cairo">
                        بؤرة خطر مستهدفة
                      </span>
                      <h4 className="font-cairo text-xl font-bold text-[#002045]">{hs.title}</h4>
                      <p className="font-tajawal text-gray-600 text-sm leading-relaxed">{hs.desc}</p>
                      <div className="p-4 bg-white rounded-xl border border-emerald-100 shadow-sm space-y-2">
                        <span className="font-cairo text-xs font-semibold text-[#006d40] flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4" /> الإجراء الموصى به:
                        </span>
                        <p className="font-tajawal text-gray-700 text-sm font-medium">{hs.recommendation}</p>
                      </div>
                    </motion.div>
                  );
                })()
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center space-y-4 flex flex-col items-center"
                >
                  <HelpCircle className="w-12 h-12 text-slate-400 stroke-1" />
                  <div className="space-y-1">
                    <h4 className="font-cairo font-bold text-lg text-slate-700">توجيه وقائي تفاعلي</h4>
                    <p className="font-tajawal text-slate-500 text-sm max-w-sm">
                      قم بالضغط على أي من العلامات الحمراء الوامضة في مخطط الخيمة الأيسر لمعرفة تفاصيل الخطر وكيفية تأمين هذه الزاوية.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Dynamic Safety Checklist & Assessment Section */}
      <div className="bg-slate-900 text-white rounded-[2rem] p-6 md:p-10 shadow-xl space-y-8 relative overflow-hidden">
        {/* Background gradient graphics */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-950/20 via-transparent to-slate-950 -z-0" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2 text-right">
            <span className="text-emerald-400 text-xs font-bold font-cairo tracking-wider uppercase">أداة القياس والتقييم الذاتي</span>
            <h3 className="font-cairo text-2xl md:text-3xl font-bold">مقياس درجة أمان الخيمة اليومي</h3>
            <p className="font-tajawal text-slate-400 text-sm">
              قم بفحص بنود القائمة الذهبية لسلامة خيمتك وحدث تقدمك يومياً لحماية عائلتك.
            </p>
          </div>
          
          <button
            onClick={resetChecklist}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-tajawal text-sm px-4 py-2 rounded-xl transition-colors border border-slate-700"
          >
            <RefreshCw className="w-4 h-4" />
            إعادة تصفير المقياس
          </button>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Progress gauge dial */}
          <div className="lg:col-span-4 bg-slate-950/50 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-6 text-center">
            <h4 className="font-cairo font-bold text-sm text-slate-400">معدل سلامة خيمتك حالياً</h4>
            
            <div className="relative flex items-center justify-center">
              {/* Simple beautiful circular SVG progress indicator */}
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  className="stroke-slate-800 fill-none"
                  strokeWidth="10"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  className="stroke-emerald-500 fill-none transition-all duration-500"
                  strokeWidth="10"
                  strokeDasharray={389}
                  strokeDashoffset={389 - (389 * safetyPercentage) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold font-cairo text-white">{safetyPercentage}%</span>
                <span className="text-[11px] text-slate-400 font-tajawal mt-1">
                  ({checkedCount} من {totalCount} بنود)
                </span>
              </div>
            </div>

            <div className={`w-full p-4 rounded-xl border font-tajawal text-sm text-right space-y-2 transition-all duration-500 ${status.color}`}>
              <div className="flex items-center gap-2 font-bold font-cairo">
                <StatusIcon className="w-4 h-4 flex-shrink-0" />
                <span>حالة الخيمة: {status.label}</span>
              </div>
              <p className="text-[12px] opacity-90 leading-relaxed">{status.desc}</p>
            </div>
          </div>

          {/* Interactive list items */}
          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checklist.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`w-full p-4 rounded-xl text-right transition-all border flex items-start gap-3.5 group relative overflow-hidden ${
                    item.checked
                      ? "bg-slate-950/40 border-emerald-500/30 text-white"
                      : "bg-slate-950/20 border-slate-800 text-slate-300 hover:bg-slate-950/40 hover:border-slate-700"
                  }`}
                >
                  {/* Category small badge */}
                  <div className="absolute top-2 left-2 text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-tajawal">
                    {item.category}
                  </div>
                  
                  <div className="mt-1 flex-shrink-0">
                    {item.checked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-500 group-hover:text-slate-400" />
                    )}
                  </div>
                  
                  <div className="space-y-1 pr-1 pl-8">
                    <h4 className="font-cairo font-bold text-sm leading-tight text-slate-100">
                      {item.title}
                    </h4>
                    <p className="font-tajawal text-[11px] text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom Alert bar */}
            <div className="bg-emerald-950/50 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3 text-slate-300">
              <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="font-tajawal text-xs leading-relaxed">
                <span className="font-bold text-white">نصيحة ميدانية:</span> مراجعة وتعديل هذه القائمة كل صباح بمساعدة أفراد العائلة ينشئ ثقافة وقائية جماعية لدى الأطفال ويحميهم بشكل كبير من المخاطر الصامتة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

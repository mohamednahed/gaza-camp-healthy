import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, AlertTriangle, ShieldAlert, CheckCircle, FlameKindling, 
  Clock, RotateCcw, Play, Pause, PhoneCall, ArrowRight, Stethoscope, Skull
} from "lucide-react";

interface FirstAidTabProps {
  onNavigate: (tabId: string) => void;
}

export default function FirstAidTab({ onNavigate }: FirstAidTabProps) {
  const [activeTab, setActiveTab] = useState<"bites" | "poison">("bites");
  
  // Emergency simulator states
  const [selectedEmergency, setSelectedEmergency] = useState<"bite" | "poison" | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  // Timer states for the "5-minute washing" simulator
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setTimeLeft(300);
    setIsTimerRunning(false);
  };

  const firstAidSteps = [
    {
      id: 1,
      title: "غسل الجرح جيداً بالماء والصابون",
      desc: "اغسل المنطقة المصابة فوراً بمياه جارية نظيفة وصابون عادي لمدة لا تقل عن 5 دقائق. يساعد هذا الإجراء الفوري في التخلص من لعاب الحيوان الحامل للبكتيريا والفيروسات.",
      details: "لا تستخدم مواد حارقة أو خلطات عشبية مكشوفة لأنها قد تعمق الالتهاب وتدخل جراثيم جديدة."
    },
    {
      id: 2,
      title: "وقف النزيف بالضغط اللطيف",
      desc: "إذا كان الجرح ينزف، اضغط عليه برفق باستخدام قطعة شاش معقمة أو قطعة قماش نظيفة تماماً حتى يتوقف النزيف.",
      details: "إذا استمر النزيف الشديد لأكثر من 10 دقائق دون توقف، توجه فوراً إلى أقرب مستشفى."
    },
    {
      id: 3,
      title: "تغطية الجرح بضمادة نظيفة",
      desc: "قم بتجفيف المنطقة المحيطة برفق، وضع مسحوقاً مطهراً أو مرهم مضاد حيوي (إذا توفر)، ثم غطِّ مكان العضة بضمادة معقمة أو شاش لحمايتها من الغبار والتلوث الخارجي.",
      details: "احرص على ألا تكون الضمادة ضيقة جداً تعيق الدورة الدموية."
    },
    {
      id: 4,
      title: "زيارة المركز الصحي فوراً",
      desc: "يجب زيارة أقرب عيادة أو نقطة طبية بأسرع وقت للحصول على المشورة الطبية الاحترافية وتلقي جرعة وقائية من طعم الكزاز (التيتانوس) والمضادات الحيوية المناسبة.",
      details: "لا تتأخر في زيارة الطبيب حتى وإن كانت العضة تبدو صغيرة وبدون أعراض ملموسة."
    }
  ];

  const poisonSteps = [
    {
      id: 1,
      title: "التوجه فوراً للمركز الصحي",
      desc: "الوقت هو العامل الحاسم والمنقذ للحياة. لا تنتظر ظهور الأعراض أو تدهور الحالة الصحية للطفل؛ توجه فوراً لأقرب قسم طوارئ بمستشفى.",
      warning: "كل دقيقة تؤخرها تزيد من نسبة امتصاص الجسم للمادة السامة."
    },
    {
      id: 2,
      title: "إحضار عبوة أو ملصق السم",
      desc: "خذ معك فوراً عبوة مبيد القوارض أو السم الذي تناوله الطفل، أو التقط له صورة بالهاتف إن تعذر جلبه. يساعد هذا الأطباء في معرفة نوع المادة الفعالة واختيار الترياق (المضاد) المناسب.",
      warning: "تتعدد أنواع سموم القوارض (مثل مسيلات الدم، فوسفيد الزنك)، ولكل نوع علاج وترياق مختلف تماماً."
    },
    {
      id: 3,
      title: "عدم إجبار المصاب على التقيؤ",
      desc: "تحذير قطعي: لا تحاول أبداً إجبار الطفل على التقيؤ أو وضع إصبعك في حلقه، كما تجنب إعطائه مياهاً مالحة أو خلطات منزلية بغرض حثه على التقيؤ.",
      warning: "التقيؤ القسري قد يتسبب في استنشاق المواد الكيميائية إلى الرئتين، مما يؤدي إلى اختناق حاد وتلف خلايا الرئة."
    }
  ];

  return (
    <div className="space-y-12">
      {/* Tab Selector Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-4">
        <div className="space-y-1 text-right">
          <h2 className="font-cairo text-3xl font-bold text-[#002045]">دليل الإسعافات الأولية السريعة</h2>
          <p className="font-tajawal text-gray-500 text-sm">
            خطوات عملية واضحة للتعامل مع عضات القوارض وحالات تسمم الأطفال العرضية بمبيدات الفئران.
          </p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          <button
            onClick={() => { setActiveTab("bites"); setSelectedEmergency(null); }}
            className={`px-6 py-2.5 rounded-xl font-cairo font-semibold text-sm transition-all ${
              activeTab === "bites"
                ? "bg-white text-[#002045] shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            عضّات القوارض
          </button>
          <button
            onClick={() => { setActiveTab("poison"); setSelectedEmergency(null); }}
            className={`px-6 py-2.5 rounded-xl font-cairo font-semibold text-sm transition-all ${
              activeTab === "poison"
                ? "bg-white text-red-700 shadow-sm"
                : "text-gray-500 hover:text-red-600"
            }`}
          >
            تسمم مبيدات القوارض
          </button>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step-by-Step Lists (Left column) */}
        <div className="lg:col-span-8 space-y-6">
          {activeTab === "bites" ? (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-[#006d40] rounded-full" />
                  <h3 className="font-cairo text-xl font-bold text-[#002045]">
                    الخطوات الأربع الفورية للتعامل مع عضة الفأر
                  </h3>
                </div>

                <div className="space-y-6">
                  {firstAidSteps.map((step, idx) => (
                    <div key={step.id} className="flex gap-4 items-start text-right">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-cairo font-bold flex items-center justify-center flex-shrink-0 border border-emerald-100">
                        {step.id}
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-cairo font-bold text-base text-[#002045]">
                          {step.title}
                        </h4>
                        <p className="font-tajawal text-gray-600 text-sm leading-relaxed">
                          {step.desc}
                        </p>
                        <p className="font-tajawal text-xs text-gray-400 italic">
                          💡 معلومة إضافية: {step.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crucial Bite Alarm warning banner */}
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1 animate-bounce" />
                <div className="space-y-1.5">
                  <h4 className="font-cairo font-bold text-base text-amber-800">تحذير طارئ وقطعي!</h4>
                  <p className="font-tajawal text-sm text-amber-900 leading-relaxed">
                    لا تتجاهل أبداً عضة القوارض أو خدشها حتى وإن كانت صغيرة وتكاد لا تُرى بالعين. لعاب القوارض مشبع ببكتيريا عنيفة قد تسبب الوفاة أو التسمم الدموي في حال لم تعالج بجرعات مضادات حيوية متخصصة تحت إشراف طبيب عاجل.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-red-600 rounded-full" />
                  <h3 className="font-cairo text-xl font-bold text-[#002045]">
                    إذا ابتلع طفل سماً أو لامس مبيداً كيميائياً بالخطأ
                  </h3>
                </div>

                {/* Common poisoning symptoms block */}
                <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 space-y-4">
                  <span className="text-xs font-bold font-cairo text-red-700 bg-red-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    أعراض تسمم القوارض الشائعة
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="bg-white p-3 rounded-xl border border-red-100">
                      <p className="font-cairo font-bold text-sm text-red-700">الغثيان المستمر</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-red-100">
                      <p className="font-cairo font-bold text-sm text-red-700">آلام شديدة بالبطن</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-red-100">
                      <p className="font-cairo font-bold text-sm text-red-700">دوار وغباش بالرؤية</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-red-100">
                      <p className="font-cairo font-bold text-sm text-red-700">نزيف الأنف أو اللثة</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-2">
                  {poisonSteps.map(step => (
                    <div key={step.id} className="flex gap-4 items-start text-right">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 font-cairo font-bold flex items-center justify-center flex-shrink-0 border border-red-100">
                        {step.id}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-cairo font-bold text-base text-[#002045]">
                          {step.title}
                        </h4>
                        <p className="font-tajawal text-gray-600 text-sm leading-relaxed">
                          {step.desc}
                        </p>
                        <p className="font-tajawal text-xs text-red-500 font-semibold">
                          ⚠️ خطورة: {step.warning}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Emergency Simulator (Right Column) */}
        <div className="lg:col-span-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <div className="space-y-1.5 text-right">
            <span className="text-emerald-400 text-xs font-bold font-cairo tracking-wide">أداة المساعدة التفاعلية</span>
            <h3 className="font-cairo text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              مساعد الطوارئ التفاعلي
            </h3>
            <p className="font-tajawal text-slate-400 text-xs">
              حدد نوع المشكلة الطارئة الآن لتوجيهك خطوة بخطوة بالصوت والعداد الزمني الميداني.
            </p>
          </div>

          {!selectedEmergency ? (
            <div className="space-y-4 pt-2">
              <button
                onClick={() => { setSelectedEmergency("bite"); setCurrentStep(0); setTimeLeft(300); }}
                className="w-full p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-500/30 text-right transition-all flex items-center justify-between"
              >
                <div className="space-y-1 pr-1">
                  <h4 className="font-cairo font-bold text-sm text-slate-100">حادثة عضة فـأر</h4>
                  <p className="font-tajawal text-[11px] text-slate-400">توجيه زمني وميداني لغسيل الجرح وتعقيمه</p>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-400 rtl:rotate-180" />
              </button>

              <button
                onClick={() => { setSelectedEmergency("poison"); setCurrentStep(0); }}
                className="w-full p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-red-500/30 text-right transition-all flex items-center justify-between"
              >
                <div className="space-y-1 pr-1">
                  <h4 className="font-cairo font-bold text-sm text-slate-100">اشتباه ابتلاع سم</h4>
                  <p className="font-tajawal text-[11px] text-slate-400">فحص فوري وأسئلة تشخيصية سريعة</p>
                </div>
                <ArrowRight className="w-5 h-5 text-red-400 rtl:rotate-180" />
              </button>
            </div>
          ) : (
            <div className="space-y-6 pt-2 text-right">
              {/* Emergency active header */}
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 font-tajawal">حالة الطوارئ نشطة</span>
                <button
                  onClick={() => { setSelectedEmergency(null); setIsTimerRunning(false); }}
                  className="text-xs text-red-400 underline font-cairo"
                >
                  إلغاء الخروج
                </button>
              </div>

              {selectedEmergency === "bite" ? (
                <div className="space-y-6">
                  {/* Bite step 1: Timer */}
                  <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-4">
                    <span className="text-xs text-slate-400 font-tajawal">مؤقت غسيل الجرح الفوري</span>
                    
                    <div className="text-4xl font-extrabold font-mono text-emerald-400 tracking-wider">
                      {formatTime(timeLeft)}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold font-cairo flex items-center gap-1.5 transition-colors ${
                          isTimerRunning 
                            ? "bg-amber-500 text-slate-950 hover:bg-amber-400" 
                            : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                        }`}
                      >
                        {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        {isTimerRunning ? "إيقاف مؤقت" : "ابدأ العداد"}
                      </button>
                      <button
                        onClick={resetTimer}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="font-tajawal text-[11px] text-slate-400 text-center leading-relaxed max-w-xs">
                      {timeLeft > 0 
                        ? "اغسل الجرح بلطف تحت الماء الجاري البارد واستخدم الصابون ببطء دون توقف لحين انتهاء العداد."
                        : "ممتاز! تم الغسيل للمدة الكافية. الآن قم بتجفيف الجرح برفق بشاش معقم وضغط خفيف لوقف أي نزيف."
                      }
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800 space-y-2">
                    <span className="font-cairo text-xs text-slate-300 font-bold flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-emerald-400" /> الخطوة القادمة:
                    </span>
                    <p className="font-tajawal text-[11px] text-slate-400 leading-relaxed">
                      توجه مباشرة لقسم الطوارئ لطلب لقاح الكزاز ومضاد حيوي وقائي لمنع تسمم بكتيريا عضة الفأر.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="p-4 bg-red-950/40 border border-red-500/20 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2">
                      <Skull className="w-5 h-5 text-red-400" />
                      <h4 className="font-cairo font-bold text-sm text-white">أسئلة التشخيص الحرجة لطبيبك</h4>
                    </div>
                    
                    <ul className="space-y-3 font-tajawal text-[11px] text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>كم تبلغ كمية السم التقريبية التي ابتلعها الطفل؟</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>منذ كم دقيقة تمت حادثة الابتلاع؟</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>هل يتقيأ الطفل بشكل طبيعي أو يشعر بالغثيان؟</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>هل الطفل بكامل وعيه وقدرته على البلع؟</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/20 text-center space-y-3">
                    <p className="font-tajawal text-slate-300 text-xs leading-relaxed">
                      اتصل فوراً بخط الإسعاف والطوارئ المركزي أو توجه فوراً للمستشفى دون تأجيل لإنقاذ حياة الطفل!
                    </p>
                    <a
                      href="tel:101"
                      className="inline-flex items-center gap-2 bg-[#006d40] text-white px-5 py-2 rounded-xl text-xs font-bold font-cairo shadow hover:bg-emerald-700"
                    >
                      <PhoneCall className="w-4 h-4 animate-bounce" />
                      اتصل بالإسعاف (101)
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

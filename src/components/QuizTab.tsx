import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, CheckCircle2, AlertCircle, ArrowLeft, RefreshCw, 
  ChevronLeft, Sparkles, BookOpen, Star, Share2, Printer
} from "lucide-react";
import { quizQuestions } from "../data";

export default function QuizTab() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [isCertificateClaimed, setIsCertificateClaimed] = useState<boolean>(false);

  const currentQuestion = quizQuestions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswerConfirmed) return;
    setSelectedIdx(idx);
  };

  const handleConfirm = () => {
    if (selectedIdx === null || isAnswerConfirmed) return;
    
    if (selectedIdx === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
    setIsAnswerConfirmed(true);
  };

  const handleNext = () => {
    setSelectedIdx(null);
    setIsAnswerConfirmed(false);
    
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setIsAnswerConfirmed(false);
    setScore(0);
    setIsFinished(false);
    setIsCertificateClaimed(false);
    setUserName("");
  };

  const printCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-12">
      {/* Header text */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="font-cairo text-3xl font-bold text-[#002045]">اختبار الوعي الصحي التفاعلي</h2>
        <p className="font-tajawal text-gray-600 leading-relaxed text-base">
          اختبر مدى معرفتك ومعرفة عائلتك بسبل الوقاية الذهبية وإجراءات الإسعاف الأولية الميدانية ضد مخاطر القوارض.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-8 text-right relative overflow-hidden"
            >
              {/* Top status header */}
              <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                <span className="font-tajawal text-xs text-gray-400 font-semibold">
                  السؤال {currentIdx + 1} من {quizQuestions.length}
                </span>
                
                {/* Progress bar */}
                <div className="w-32 bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#006d40] h-full transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-cairo bg-emerald-50 text-[#006d40] border border-emerald-100">
                  <BookOpen className="w-3.5 h-3.5" /> الوعي الوقائي
                </span>
                <h3 className="font-cairo text-lg md:text-xl font-bold text-[#002045] leading-snug">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Choices list */}
              <div className="space-y-3">
                {currentQuestion.choices.map((choice, idx) => {
                  let btnStyle = "bg-slate-50 border-gray-100 text-[#002045] hover:bg-slate-100";
                  
                  if (selectedIdx === idx && !isAnswerConfirmed) {
                    btnStyle = "bg-slate-100 border-[#002045] text-[#002045] font-semibold ring-1 ring-[#002045]";
                  } else if (isAnswerConfirmed) {
                    if (idx === currentQuestion.correctAnswerIndex) {
                      btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-800 font-bold";
                    } else if (selectedIdx === idx) {
                      btnStyle = "bg-red-50 border-red-400 text-red-800";
                    } else {
                      btnStyle = "bg-slate-50/50 border-gray-100 text-gray-400";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerConfirmed}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-xl text-right transition-all border flex items-center justify-between group ${btnStyle}`}
                    >
                      <span className="font-tajawal text-sm md:text-base leading-relaxed">{choice}</span>
                      
                      <div className="flex-shrink-0 mr-3">
                        {isAnswerConfirmed ? (
                          idx === currentQuestion.correctAnswerIndex ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : selectedIdx === idx ? (
                            <AlertCircle className="w-5 h-5 text-red-600" />
                          ) : null
                        ) : (
                          <div className={`w-5 h-5 rounded-full border transition-all ${
                            selectedIdx === idx 
                              ? "border-[#002045] bg-[#002045]" 
                              : "border-gray-300 group-hover:border-gray-400"
                          }`} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons & Explanation */}
              <div className="space-y-6 pt-2">
                {isAnswerConfirmed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2"
                  >
                    <span className="font-cairo text-xs font-bold text-emerald-800 flex items-center gap-1">
                      💡 التفسير العلمي والوقائي:
                    </span>
                    <p className="font-tajawal text-[13px] text-gray-700 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </motion.div>
                )}

                <div className="flex justify-end">
                  {!isAnswerConfirmed ? (
                    <button
                      disabled={selectedIdx === null}
                      onClick={handleConfirm}
                      className={`px-8 py-3 rounded-full font-cairo font-bold text-sm shadow transition-all ${
                        selectedIdx === null
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-[#002045] text-white hover:bg-[#001025]"
                      }`}
                    >
                      تأكيد الإجابة
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="bg-[#006d40] text-white px-8 py-3 rounded-full font-cairo font-bold text-sm shadow hover:bg-emerald-800 transition-colors flex items-center gap-2"
                    >
                      <span>السؤال التالي</span>
                      <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center space-y-8"
            >
              {/* Award Badge Graphics */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-amber-500/10 rounded-full blur-xl animate-pulse" />
                  <div className="w-24 h-24 bg-amber-50 rounded-full border-2 border-amber-200 flex items-center justify-center text-amber-500 relative z-10">
                    <Award className="w-12 h-12" />
                  </div>
                  {score >= 4 && (
                    <div className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-1.5 z-20 shadow">
                      <Star className="w-4 h-4 fill-white text-white" />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-cairo text-2xl font-bold text-[#002045]">
                    {score >= 4 ? "أحسنت! أنت سفير للوعي الصحي" : "جيد جداً! استمر بالتعلم"}
                  </h3>
                  <p className="font-tajawal text-sm text-gray-500">
                    لقد أجبت بشكل صحيح على {score} من أصل {quizQuestions.length} أسئلة صحية.
                  </p>
                </div>
              </div>

              {/* Custom dynamic certificate claim card */}
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl max-w-md mx-auto space-y-4 text-right">
                <span className="text-xs font-bold font-cairo text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                  احصل على شهادة سفير التوعية
                </span>
                
                <p className="font-tajawal text-xs text-gray-500 leading-relaxed">
                  بصفتك سفير وعي مجتمعي، اكتب اسمك الثلاثي بالأسفل لتوليد شهادة التقدير الرقمية المعتمدة لحفظها أو طباعتها ومشاركتها مع مجتمع خيمتك.
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="اكتب اسمك هنا (مثلاً: أحمد محمد علي)"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-tajawal text-right text-gray-800 placeholder-gray-400 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    disabled={!userName.trim()}
                    onClick={() => setIsCertificateClaimed(true)}
                    className={`px-5 py-2 rounded-xl font-cairo font-semibold text-xs transition-colors ${
                      userName.trim()
                        ? "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    إصدار الشهادة
                  </button>
                </div>
              </div>

              {/* Dynamic Certificate Display */}
              {isCertificateClaimed && userName && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 border-4 border-double border-amber-600 bg-amber-50/20 rounded-2xl relative text-center max-w-xl mx-auto space-y-6 shadow-inner print:shadow-none print:border-amber-700 print:bg-white"
                  id="certificate-print-area"
                >
                  <div className="absolute top-4 left-4 w-12 h-12 text-amber-500/20 opacity-40">
                    <Award className="w-full h-full" />
                  </div>
                  
                  <div className="space-y-1">
                    <span className="font-cairo text-[11px] font-bold text-amber-800 tracking-wider">شهادة إتمام وتفوق وقائي</span>
                    <h4 className="font-cairo text-xl font-black text-amber-900 leading-tight">
                      شهادة سفير الوعي الصحي بمخاطر القوارض
                    </h4>
                  </div>

                  <p className="font-tajawal text-xs text-gray-600">تمنح هذه الشهادة الفخرية تقديراً للالتزام بالتوعية وحماية العائلة والآخرين لـ:</p>
                  
                  <h2 className="font-cairo text-2xl font-bold text-[#002045] underline decoration-amber-500 decoration-2 underline-offset-8">
                    {userName}
                  </h2>

                  <p className="font-tajawal text-xs text-gray-500 leading-relaxed max-w-md mx-auto">
                    لاجتيازه الاختبار الشامل للوقاية من القوارض والأوبئة المنقولة في مخيمات الإيواء بنجاح بنسبة تميز بلغت <span className="font-bold text-emerald-700">{(score / quizQuestions.length) * 100}%</span> وتعهده بنشر ثقافة النظافة وسد الفتحات.
                  </p>

                  <div className="pt-4 flex justify-between items-center text-right border-t border-amber-600/10">
                    <div className="space-y-0.5">
                      <p className="font-cairo text-[9px] text-gray-400">التوقيع والاعتماد</p>
                      <p className="font-cairo text-[10px] font-bold text-[#006d40]">لجنة التوعية الصحية الميدانية</p>
                    </div>
                    <div className="space-y-0.5 text-left">
                      <p className="font-cairo text-[9px] text-gray-400">تاريخ الإصدار</p>
                      <p className="font-mono text-[10px] text-gray-500">2026/07/02</p>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-center pt-2 print:hidden">
                    <button
                      onClick={printCertificate}
                      className="bg-[#002045] text-white px-4 py-2 rounded-lg font-cairo font-semibold text-xs flex items-center gap-1.5 shadow hover:bg-slate-900 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      طباعة الشهادة الفخرية
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Footer Restart buttons */}
              <div className="flex justify-center gap-4 border-t border-gray-50 pt-6">
                <button
                  onClick={restartQuiz}
                  className="bg-slate-100 hover:bg-slate-200 text-gray-600 font-cairo font-bold text-sm px-6 py-2.5 rounded-xl transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  إعادة المحاولة
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

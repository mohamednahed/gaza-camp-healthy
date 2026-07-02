import { motion } from "motion/react";
import { Shield, Sparkles, AlertTriangle, ArrowLeft, Heart, CheckCircle2 } from "lucide-react";

interface MainTabProps {
  onNavigate: (tabId: string) => void;
}

export default function MainTab({ onNavigate }: MainTabProps) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center space-y-8 py-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full relative"
        >
          {/* Decorative glowing backdrops */}
          <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute inset-10 bg-blue-500/10 rounded-full blur-3xl -z-10" />

          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVZKVtHtUIdQb2Uh0tAB_o7QKHhEATGPaeTAPMzcUPvRqxmzf4k_ukFDy1UBeoPmJwwHM7jFo1tigt4friFq35vvqDiK5rs_j_f3p3vW-pO-QUl7Ce5GKhHSY0ZCKWqO814AoCxJF4DBpuuTlSN_ZyYktG_b3l2zGGA4mWOZ6K5g0X7FMdpnv-SxJmPEgNKtX4Pua5kYIsbWSGwpu0qQV9j4gSFmGMjSxt6p_ypjkDnKbIafYs_XGG3aazdzP08AXLl9k"
            alt="شعار حملة حماية العائلات"
            className="w-80 h-auto mx-auto drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4 max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-100 font-tajawal">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            حملة الوعي الإنساني والوقاية من المخاطر
          </span>
          <h1 className="font-cairo text-4xl md:text-5xl font-bold text-[#002045] leading-tight tracking-tight">
            الوعي والوقاية هما خط الدفاع الأول
          </h1>
          <p className="font-tajawal text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            دليل عائلي تفاعلي وشامل لحماية أحبائنا وأطفالنا من مخاطر القوارض والحد من انتشار الأوبئة والأمراض في أماكن النزوح والمخيمات المؤقتة.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
        >
          <button
            onClick={() => onNavigate("prevention")}
            className="w-full sm:w-auto bg-[#006d40] text-white px-10 py-4 rounded-full font-cairo font-semibold text-lg shadow-lg hover:bg-[#00522f] hover:shadow-emerald-900/10 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span>ابدأ استعراض الدليل</span>
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-2" />
          </button>
          
          <button
            onClick={() => onNavigate("quiz")}
            className="w-full sm:w-auto border-2 border-[#002045] text-[#002045] px-8 py-3.5 rounded-full font-cairo font-semibold text-base hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>اختبر معلوماتك الصحية</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Quick Campaign Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4"
        >
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="font-cairo font-bold text-lg text-[#002045]">رصد المخاطر الصامتة</h3>
          <p className="font-tajawal text-gray-500 text-sm leading-relaxed">
            تنشط القوارض خفية تحت جنح الظلام لتلويث الأطعمة والمياه ونشر الأمراض المعوية والرئوية في خيمتك.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4"
        >
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-cairo font-bold text-lg text-[#002045]">إجراءات وقائية بسيطة</h3>
          <p className="font-tajawal text-gray-500 text-sm leading-relaxed">
            خطوات غير مكلفة مثل رفع الأمتعة 30 سم، سد شقوق الخيام وحفظ الأطعمة كفيلة بحمايتك بشكل كامل.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4"
        >
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-cairo font-bold text-lg text-[#002045]">الاستجابة الإسعافية العاجلة</h3>
          <p className="font-tajawal text-gray-500 text-sm leading-relaxed">
            خطوات غسيل الجرح وتغطيتها وإجراءات حالات التسمم العرضية تنقذ الأرواح فوراً ولا يجب تأجيلها.
          </p>
        </motion.div>
      </div>

      {/* Quote Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-xl"
      >
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-teal-700/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl text-right space-y-4">
          <h2 className="font-cairo text-2xl md:text-3xl font-bold leading-tight">
            سلامة المخيم تبدأ من سلوكك اليومي
          </h2>
          <p className="font-tajawal text-emerald-100 leading-relaxed text-base md:text-lg">
            "القوارض تبحث عن مأوى وطعام مكشوف. بحفظ طعامك وسد شقوق خيمتك، تمنعها من الدخول، وتحمي عائلتك وجيرانك في المخيم."
          </p>
          <div className="pt-2 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-[#8ef5b5] rounded-full" />
            <span className="font-cairo font-semibold text-emerald-200 text-sm">حملة الوعي الصحي الميداني - حماية العائلات</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Download, Paintbrush, FileText, CheckCircle2, ShieldAlert, ArrowLeft } from "lucide-react";

export default function PosterGenerator() {
  const [familyName, setFamilyName] = useState<string>("");
  const [tentNumber, setTentNumber] = useState<string>("");
  const [selectedTip, setSelectedTip] = useState<string>(
    "سد جميع شقوق الخيمة السفلية لمنع تسلل الفئران."
  );
  const [themeColor, setThemeColor] = useState<"emerald" | "blue" | "dark">("emerald");

  const tips = [
    "سد جميع شقوق الخيمة السفلية لمنع تسلل الفئران.",
    "حفظ وتغطية الأطعمة في أوانٍ بلاستيكية محكمة الإغلاق.",
    "رفع الأمتعة والملابس عن الأرض بمقدار 30 سم على الأقل.",
    "التخلص اليومي والسليم من أكياس النفايات بعيداً عن منطقة النوم.",
    "غسل اليدين بالماء الجاري والصابون بانتظام وقبل كل وجبة.",
    "تغطية وحفظ جالونات وخزانات مياه الشرب بإحكام شديد."
  ];

  const getThemeClasses = () => {
    switch (themeColor) {
      case "emerald":
        return {
          banner: "bg-[#006d40] text-white",
          border: "border-[#006d40]",
          accent: "text-emerald-600",
          bg: "bg-emerald-50/10"
        };
      case "blue":
        return {
          banner: "bg-blue-800 text-white",
          border: "border-blue-800",
          accent: "text-blue-600",
          bg: "bg-blue-50/10"
        };
      case "dark":
        return {
          banner: "bg-[#002045] text-white",
          border: "border-[#002045]",
          accent: "text-[#002045]",
          bg: "bg-slate-50/20"
        };
    }
  };

  const theme = getThemeClasses();

  const printPoster = () => {
    window.print();
  };

  return (
    <div className="space-y-12">
      {/* Header texts */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="font-cairo text-3xl font-bold text-[#002045]">صانع ملصقات التذكير العائلية</h2>
        <p className="font-tajawal text-gray-600 leading-relaxed text-base">
          صمم ملصق تذكير عائلي مخصص يحمل اسمك ورقم خيمتك ونصيحتك المفضلة، وقم بتعليقه داخل الخيمة لتذكير أفراد عائلتك وزائريك دوماً بقواعد النظافة والسلامة.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Poster Editor Control (Left) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-right">
          <h3 className="font-cairo font-bold text-lg text-[#002045] flex items-center gap-2 border-r-4 border-emerald-600 pr-2">
            <Paintbrush className="w-5 h-5 text-[#006d40]" /> خيارات تخصيص التصميم
          </h3>

          {/* Family Name Input */}
          <div className="space-y-2">
            <label className="block font-cairo font-semibold text-xs text-gray-500">اسم العائلة</label>
            <input
              type="text"
              placeholder="مثلاً: عائلة أبو أحمد"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-gray-100 rounded-xl text-sm font-tajawal text-right text-gray-800 focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Tent Number Input */}
          <div className="space-y-2">
            <label className="block font-cairo font-semibold text-xs text-gray-500">رقم الخيمة أو اسم المنطقة (اختياري)</label>
            <input
              type="text"
              placeholder="مثلاً: خيمة رقم 104 - مواصي خان يونس"
              value={tentNumber}
              onChange={(e) => setTentNumber(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-gray-100 rounded-xl text-sm font-tajawal text-right text-gray-800 focus:outline-none focus:border-emerald-600"
            />
          </div>

          {/* Selected Tip radio/list */}
          <div className="space-y-2.5">
            <label className="block font-cairo font-semibold text-xs text-gray-500">اختر القاعدة الذهبية للملصق</label>
            <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
              {tips.map((tip, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTip(tip)}
                  className={`w-full p-2.5 rounded-lg text-right text-xs font-tajawal border transition-all ${
                    selectedTip === tip
                      ? "bg-emerald-50 border-emerald-400 text-emerald-800 font-medium"
                      : "bg-white border-gray-100 text-gray-500 hover:bg-slate-50"
                  }`}
                >
                  {tip}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Color selectors */}
          <div className="space-y-2">
            <label className="block font-cairo font-semibold text-xs text-gray-500">لون المظهر</label>
            <div className="flex gap-2">
              <button
                onClick={() => setThemeColor("emerald")}
                className={`flex-1 py-2 rounded-xl text-xs font-cairo font-bold border transition-all ${
                  themeColor === "emerald"
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                    : "bg-white text-emerald-700 border-gray-100 hover:bg-slate-50"
                }`}
              >
                زمردي
              </button>
              <button
                onClick={() => setThemeColor("blue")}
                className={`flex-1 py-2 rounded-xl text-xs font-cairo font-bold border transition-all ${
                  themeColor === "blue"
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-blue-700 border-gray-100 hover:bg-slate-50"
                }`}
              >
                أزرق داكن
              </button>
              <button
                onClick={() => setThemeColor("dark")}
                className={`flex-1 py-2 rounded-xl text-xs font-cairo font-bold border transition-all ${
                  themeColor === "dark"
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-white text-slate-800 border-gray-100 hover:bg-slate-50"
                }`}
              >
                كحلي وقائي
              </button>
            </div>
          </div>
        </div>

        {/* Poster Mockup Preview Card (Right) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-cairo font-bold text-lg text-[#002045]">معاينة الملصق الجاهز للطباعة</h3>
            <button
              onClick={printPoster}
              className="bg-[#002045] text-white px-5 py-2 rounded-xl font-cairo font-semibold text-xs flex items-center gap-1.5 shadow hover:bg-slate-900 transition-colors"
            >
              <Download className="w-4 h-4" />
              حفظ أو طباعة الملصق
            </button>
          </div>

          {/* Interactive Poster Component */}
          <div 
            className={`border-4 ${theme.border} ${theme.bg} rounded-3xl p-8 space-y-8 text-center shadow-lg relative overflow-hidden max-w-lg mx-auto print:shadow-none print:border-6`}
            id="campaign-poster-area"
          >
            {/* Top campaign logo strip */}
            <div className="flex justify-between items-center pb-6 border-b border-gray-100">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVZKVtHtUIdQb2Uh0tAB_o7QKHhEATGPaeTAPMzcUPvRqxmzf4k_ukFDy1UBeoPmJwwHM7jFo1tigt4friFq35vvqDiK5rs_j_f3p3vW-pO-QUl7Ce5GKhHSY0ZCKWqO814AoCxJF4DBpuuTlSN_ZyYktG_b3l2zGGA4mWOZ6K5g0X7FMdpnv-SxJmPEgNKtX4Pua5kYIsbWSGwpu0qQV9j4gSFmGMjSxt6p_ypjkDnKbIafYs_XGG3aazdzP08AXLl9k"
                alt="شعار الحملة"
                className="w-16 h-auto drop-shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div className="text-right space-y-0.5">
                <p className="font-cairo font-black text-xs text-slate-800">حملة حماية العائلات</p>
                <p className="font-tajawal text-[10px] text-gray-500">الوقاية من القوارض والأمراض</p>
              </div>
            </div>

            {/* Custom greeting section */}
            <div className="space-y-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold font-cairo ${theme.banner}`}>
                <CheckCircle2 className="w-3.5 h-3.5" /> خيمة آمنة ونظيفة
              </span>
              
              <h2 className="font-cairo text-2xl md:text-3xl font-bold text-[#002045]">
                {familyName ? `${familyName}` : "عائلتنا الحبيبة"}
              </h2>
              
              {tentNumber && (
                <p className="font-tajawal text-xs text-gray-500 font-semibold">{tentNumber}</p>
              )}
            </div>

            {/* Visual Call-out Quote */}
            <div className="py-6 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm relative space-y-3">
              <div className="absolute top-2 right-2 text-3xl font-serif text-gray-100 select-none">“</div>
              <p className={`font-cairo text-base md:text-lg font-bold ${theme.accent} leading-relaxed`}>
                {selectedTip}
              </p>
              <p className="font-tajawal text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                الحرص على تطبيق هذا السلوك اليومي البسيط كفيل بقطع سبل الغذاء والمأوى عن القوارض ويحمي صحة عائلتنا بشكل دائم.
              </p>
            </div>

            {/* Footer warning text */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <p className="font-cairo text-[11px] font-bold text-gray-500">
                القوارض... خطر صامت، والوقاية درعنا الواقي.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

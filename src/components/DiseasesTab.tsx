import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AlertOctagon, Info, ShieldAlert, ArrowLeft, Heart, 
  Dna, Flame, Wind, MessageSquareWarning, PlusCircle 
} from "lucide-react";
import { Disease } from "../types";
import { diseasesData } from "../data";

export default function DiseasesTab() {
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string | null>("hantavirus");

  const getDangerBadge = (level: Disease["dangerLevel"]) => {
    switch (level) {
      case "critical":
        return {
          label: "خطورة حرجة جداً",
          color: "bg-red-100 text-red-800 border-red-200",
          dotColor: "bg-red-500"
        };
      case "high":
        return {
          label: "خطورة عالية",
          color: "bg-orange-100 text-orange-800 border-orange-200",
          dotColor: "bg-orange-500"
        };
      case "moderate":
        return {
          label: "خطورة متوسطة",
          color: "bg-amber-100 text-amber-800 border-amber-200",
          dotColor: "bg-amber-500"
        };
    }
  };

  const selectedDisease = diseasesData.find(d => d.id === selectedDiseaseId);

  return (
    <div className="space-y-12">
      {/* Header section */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="font-cairo text-3xl font-bold text-[#002045]">الأمراض والأوبئة المنقولة</h2>
        <p className="font-tajawal text-gray-600 leading-relaxed text-base">
          تنقل القوارض أكثر من 35 مرضاً وبائياً بشكل مباشر أو غير مباشر. تعرف على تفاصيل هذه الأمراض، أعراضها، سبل انتقالها، وكيف تقي عائلتك منها.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Disease List Grid */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-cairo font-bold text-lg text-[#002045] pr-2">حدد نوع المرض للاستكشاف</h3>
          
          <div className="space-y-3">
            {diseasesData.map(disease => {
              const badge = getDangerBadge(disease.dangerLevel);
              const isSelected = disease.id === selectedDiseaseId;
              
              return (
                <button
                  key={disease.id}
                  onClick={() => setSelectedDiseaseId(disease.id)}
                  className={`w-full p-5 rounded-2xl text-right transition-all border flex flex-col gap-3 relative overflow-hidden ${
                    isSelected
                      ? "bg-white border-[#002045] shadow-md ring-1 ring-[#002045]"
                      : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
                  }`}
                >
                  {/* Decorative indicator block */}
                  {isSelected && (
                    <div className="absolute top-0 right-0 h-full w-1.5 bg-[#002045]" />
                  )}

                  <div className="flex justify-between items-start w-full gap-4">
                    <div className="space-y-1">
                      <h4 className="font-cairo font-bold text-base text-[#002045]">{disease.name}</h4>
                      {disease.scientificName && (
                        <p className="font-mono text-[10px] text-gray-400 font-medium tracking-wide">
                          {disease.scientificName}
                        </p>
                      )}
                    </div>

                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold font-cairo border ${badge.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dotColor} animate-pulse`} />
                      {badge.label}
                    </span>
                  </div>

                  <p className="font-tajawal text-[12px] text-gray-500 leading-relaxed line-clamp-2">
                    {disease.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Disease Panel */}
        <div className="lg:col-span-7 h-full">
          <AnimatePresence mode="wait">
            {selectedDisease ? (
              <motion.div
                key={selectedDisease.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-8 text-right"
              >
                {/* Header detail */}
                <div className="border-b border-gray-100 pb-5 space-y-3">
                  <div className="flex justify-between items-center flex-wrap gap-3">
                    <h3 className="font-cairo text-2xl font-bold text-[#002045]">
                      {selectedDisease.name}
                    </h3>
                    
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-cairo border ${
                      getDangerBadge(selectedDisease.dangerLevel).color
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        getDangerBadge(selectedDisease.dangerLevel).dotColor
                      } animate-pulse`} />
                      {getDangerBadge(selectedDisease.dangerLevel).label}
                    </span>
                  </div>
                  
                  {selectedDisease.scientificName && (
                    <p className="font-mono text-xs text-gray-400 font-semibold flex items-center gap-1.5">
                      <Dna className="w-4 h-4 text-gray-300" /> الاسم العلمي: {selectedDisease.scientificName}
                    </p>
                  )}
                  
                  <p className="font-tajawal text-gray-600 text-sm leading-relaxed pt-2">
                    {selectedDisease.description}
                  </p>
                </div>

                {/* Grid blocks for transmission and symptoms */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Transmission Routes */}
                  <div className="space-y-4">
                    <h4 className="font-cairo font-bold text-base text-[#002045] flex items-center gap-2 border-r-4 border-amber-500 pr-2">
                      <Wind className="w-4.5 h-4.5 text-amber-500" /> طرق انتقال العدوى
                    </h4>
                    
                    <ul className="space-y-3">
                      {selectedDisease.transmission.map((item, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start text-right">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                          <span className="font-tajawal text-xs text-gray-600 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Symptoms list */}
                  <div className="space-y-4">
                    <h4 className="font-cairo font-bold text-base text-[#002045] flex items-center gap-2 border-r-4 border-red-500 pr-2">
                      <MessageSquareWarning className="w-4.5 h-4.5 text-red-500" /> الأعراض المرضية
                    </h4>
                    
                    <ul className="space-y-3">
                      {selectedDisease.symptoms.map((item, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start text-right">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                          <span className="font-tajawal text-xs text-gray-600 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Targeted Prevention block */}
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 space-y-2">
                  <h4 className="font-cairo text-sm font-semibold text-[#006d40] flex items-center gap-1.5">
                    <Heart className="w-4 h-4" /> سبل الوقاية والحد من انتشار هذا المرض:
                  </h4>
                  <p className="font-tajawal text-gray-700 text-xs leading-relaxed">
                    {selectedDisease.prevention}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center text-slate-400 font-tajawal min-h-[400px] flex flex-col items-center justify-center space-y-4">
                <AlertOctagon className="w-12 h-12 text-slate-300 stroke-1" />
                <p className="text-sm font-medium">لم يتم تحديد مرض للتفصيل.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, Search, MapPin, Clock, ShieldCheck, Heart, 
  PhoneCall, Map, RefreshCw, X, AlertTriangle 
} from "lucide-react";
import { HealthCenter } from "../types";
import { healthCentersData } from "../data";

export default function EmergencyContacts() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [activeCallSim, setActiveCallSim] = useState<HealthCenter | null>(null);
  const [callStatus, setCallStatus] = useState<"dialing" | "connected" | "ended">("dialing");

  const filteredCenters = healthCentersData.filter(center => {
    const matchesSearch = 
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === "all" || center.type === selectedType;

    return matchesSearch && matchesType;
  });

  const startCallSimulation = (center: HealthCenter) => {
    setActiveCallSim(center);
    setCallStatus("dialing");
    
    // Simulate connection after 1.5 seconds
    setTimeout(() => {
      setCallStatus("connected");
    }, 1500);
  };

  const endCallSimulation = () => {
    setCallStatus("ended");
    setTimeout(() => {
      setActiveCallSim(null);
    }, 500);
  };

  return (
    <div className="space-y-12">
      {/* Header Info */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="font-cairo text-3xl font-bold text-[#002045]">دليل المراكز الصحية وهواتف الطوارئ</h2>
        <p className="font-tajawal text-gray-600 leading-relaxed text-base">
          قائمة متكاملة ومحدثة بنقاط الإسعاف وعيادات الطوارئ المتخصصة في تقديم علاج عضة القوارض، وتطعيمات الكزاز، وإسعاف حالات التسمم العرضية بمناطق النزوح.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        {/* Search input */}
        <div className="w-full md:flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none" />
          <input
            type="text"
            placeholder="ابحث باسم المركز، المنطقة، أو الخدمة الطبية (مثال: كزاز، دير البلح)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2.5 pr-11 pl-4 bg-slate-50 border border-gray-100 rounded-xl text-sm font-tajawal text-right text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-600"
          />
        </div>

        {/* Type select */}
        <div className="w-full md:w-auto flex gap-2">
          {["all", "مستشفى", "مركز صحي", "عيادة متنقلة"].map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl text-xs font-cairo font-semibold border transition-all ${
                selectedType === type
                  ? "bg-[#002045] text-white border-[#002045] shadow-sm"
                  : "bg-white text-gray-600 border-gray-100 hover:bg-slate-50"
              }`}
            >
              {type === "all" ? "الكل" : type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of centers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCenters.map(center => (
            <motion.div
              key={center.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between space-y-6 text-right hover:shadow-md transition-all relative overflow-hidden"
            >
              {/* Center info header */}
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-3">
                  <span className="text-[10px] font-bold font-cairo text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                    {center.type}
                  </span>
                  
                  <h3 className="font-cairo font-bold text-base text-[#002045] leading-snug">
                    {center.name}
                  </h3>
                </div>

                <div className="space-y-1.5 pt-1">
                  <p className="font-tajawal text-xs text-gray-500 flex items-center gap-1.5 justify-end">
                    <span>{center.region}</span>
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  </p>
                  <p className="font-tajawal text-xs text-gray-400 flex items-center gap-1.5 justify-end">
                    <span>{center.hours}</span>
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                  </p>
                </div>
              </div>

              {/* Services block */}
              <div className="border-t border-gray-50 pt-4 space-y-2">
                <span className="font-cairo text-[10px] text-gray-400 font-bold">الخدمات المتوفرة للحالة:</span>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {center.services.map((srv, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-tajawal bg-slate-50 border border-slate-100 text-gray-600 px-2 py-0.5 rounded"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick dial Button */}
              <div className="border-t border-gray-50 pt-4 flex gap-2">
                <a
                  href={`tel:${center.phone}`}
                  onClick={(e) => {
                    // Simulate call instead of default action inside sandboxed iframe
                    e.preventDefault();
                    startCallSimulation(center);
                  }}
                  className="flex-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-[#006d40] py-2 rounded-xl text-xs font-cairo font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  اتصال طوارئ ({center.phone})
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* If search list is empty */}
      {filteredCenters.length === 0 && (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-12 text-center text-gray-400 font-tajawal space-y-3 flex flex-col items-center">
          <Map className="w-12 h-12 text-gray-300 stroke-1" />
          <h4 className="font-cairo font-bold text-slate-700">لم نجد أي مركز مطابق لطلبك</h4>
          <p className="text-xs max-w-xs leading-relaxed">
            تأكد من كتابة الكلمة بشكل صحيح، أو ابحث باسم عام مثل "مستشفى" أو "عيادة" لاستعراض الخيارات.
          </p>
        </div>
      )}

      {/* Call Dialer Simulator Modal */}
      <AnimatePresence>
        {activeCallSim && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#002045]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 max-w-sm w-full text-center space-y-6 shadow-2xl relative border border-slate-800"
            >
              {/* Call signal waves */}
              <div className="flex justify-center pt-4">
                <div className="relative flex items-center justify-center">
                  <span className={`absolute inline-flex h-20 w-20 rounded-full bg-emerald-500/20 ${callStatus === "dialing" || callStatus === "connected" ? "animate-ping" : ""}`} />
                  <div className="w-16 h-16 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center relative z-10 shadow-lg">
                    <Phone className="w-8 h-8 fill-slate-950 stroke-none" />
                  </div>
                </div>
              </div>

              {/* Call info names */}
              <div className="space-y-1">
                <p className="font-tajawal text-slate-400 text-xs">جاري الاتصال الطارئ بالشبكة الميدانية...</p>
                <h3 className="font-cairo text-lg font-bold text-white">{activeCallSim.name}</h3>
                <p className="font-mono text-emerald-400 font-bold text-sm tracking-widest">{activeCallSim.phone}</p>
              </div>

              {/* Connected simulator info dialog */}
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl text-right text-xs font-tajawal text-slate-300 leading-relaxed space-y-2">
                {callStatus === "dialing" ? (
                  <p className="text-center text-slate-400 font-medium">الرجاء الانتظار للربط بنقطة الإسعاف...</p>
                ) : callStatus === "connected" ? (
                  <>
                    <p className="text-emerald-400 font-bold font-cairo text-center pb-1">● تم الاتصال الهاتفي التجريبي بنجاح</p>
                    <p>هذا النموذج التفاعلي يحاكي الاتصال المباشر بغرفة الطوارئ الطبية.</p>
                    <p className="text-[11px] text-slate-400">تذكر دائماً تزويد الممرض بـ:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-400 pr-2">
                      <li>نوع الحادث (عضة قارض أو ابتلاع سم)</li>
                      <li>اسم المصاب وعمره التقريبي</li>
                      <li>موقع الخيمة بدقة واسم المخيم</li>
                    </ul>
                  </>
                ) : (
                  <p className="text-center text-red-400">انتهت المكالمة.</p>
                )}
              </div>

              {/* End call button */}
              <button
                onClick={endCallSimulation}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-cairo font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                إنهاء الاتصال
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

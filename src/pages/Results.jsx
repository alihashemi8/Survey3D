import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EvaModel from "../components/EvaModel";


export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || [];

  // تحلیل ساده بر اساس مرحله آخر
  const resultText = (() => {
    const final = answers[3];
    if (final === "ادامه تحصیل (ارشد/دکترا)")
      return "🎓 به نظر می‌رسه مسیر آکادمیک برات مناسب‌تره. ادامه تحصیل در مقاطع بالاتر می‌تونه درهای جدیدی به روت باز کنه.";
    if (final === "ورود به بازار کار")
      return "💼 مسیر کاری برای تو انتخاب بهتریه. تمرکزت رو روی یادگیری عملی، ساخت رزومه و ورود به تیم‌های فنی بذار.";
    if (final === "استارتاپ")
      return "🚀 روحیه استارتاپی داری! بهتره روی مهارت‌های کار تیمی، مدیریت زمان و نوآوری تمرکز کنی.";
    if (final === "مهاجرت تحصیلی")
      return "✈️ مسیر بین‌المللی می‌تونه برات جذاب باشه. زبان، تحقیق درباره کشورها و دانشگاه‌ها رو جدی بگیر.";
    return "🔍 نتیجه‌ای یافت نشد!";
  })();

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-black via-gray-800 to-black text-white flex flex-col md:flex-row-reverse items-center justify-center gap-6 p-6 md:p-12">
      
      {/* مدل سه‌بعدی EVA */}
      <div className="w-full md:w-1/2 h-[300px] md:h-[500px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} />
          <pointLight position={[-2, -2, 3]} intensity={90} color="purple" />
          <Suspense fallback={null}>
            <EvaModel />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* متن تحلیل و پاسخ‌ها */}
      <div className="w-full md:w-1/2 space-y-6 text-center md:text-right px-4 md:px-10">
        <h1 className="text-3xl md:text-4xl font-bold">نتیجه انتخاب‌های شما</h1>
        
        <div className="bg-white/5 backdrop-blur-lg border border-white/20 p-5 rounded-xl text-sm md:text-base leading-loose text-gray-300 space-y-2">
          {answers.map((answer, idx) => (
            <div key={idx}>
              <strong>✅ {steps[idx]?.title}:</strong> {answer}
            </div>
          ))}
        </div>

        <p className="text-lg mt-4 text-gray-200">{resultText}</p>

        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-white text-black px-6 py-3 rounded-lg hover:scale-105 transition"
          >
            بازگشت به خانه
          </button>
        </div>
      </div>
    </div>
  );
}

// عناوین مراحل برای نمایش در خلاصه
const steps = [
  { title: "مرحله ۱: علایق فردی" },
  { title: "مرحله ۲: مهارت و تجربه" },
  { title: "مرحله ۳: اولویت‌گذاری" },
  { title: "مرحله ۴: هدف نهایی" },
];

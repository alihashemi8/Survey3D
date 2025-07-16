import { useState, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../components/GlassButton.css";

const models = ["laptop", "keyboard", "case", "computer"];

const modelConfigs = {
  laptop: { scale: 1.7, position: [0, 0.2, 0] },
  keyboard: { scale: 0.8, position: [0, 0, 0] },
  case: { scale: 0.8, position: [0, -1.8, 0] },
  computer: { scale: 1.8, position: [0, 0.3, 0] },
};

function Model3D({ name }) {
  const { scene } = useGLTF(`/models/${name}.glb`);
  const ref = useRef();
  const config = modelConfigs[name] || { scale: 2.5, position: [0, -1.5, 0] };

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
      ref.current.position.y =
        Math.sin(state.clock.elapsedTime) * 0.2 + config.position[1];
    }
  });

  return <primitive ref={ref} object={scene} scale={config.scale} />;
}

const steps = [
  {
    title: "مرحله ۱: علایق فردی",
    question: "به کدام یک علاقه‌مندتری؟",
    options: [
      "برنامه‌نویسی",
      "هوش مصنوعی",
      "تحقیق و پژوهش",
      "کار تیمی و پروژه",
    ],
  },
  {
    title: "مرحله ۲: مهارت و تجربه",
    question: "سطح مهارت فعلی‌ات در برنامه‌نویسی چقدره؟",
    options: ["مبتدی", "متوسط", "پیشرفته", "کار نکردم"],
  },
  {
    title: "مرحله ۳: اولویت‌گذاری",
    question: "در تصمیم‌گیری برای آینده، کدوم برات مهم‌تره؟",
    options: ["درآمد بالا", "تحصیلات عالی", "امنیت شغلی", "آزادی شغلی"],
  },
  {
    title: "مرحله ۴: هدف نهایی",
    question: "به کدوم مسیر بیشتر فکر می‌کنی؟",
    options: [
      "ادامه تحصیل (ارشد/دکترا)",
      "ورود به بازار کار",
      "استارتاپ",
      "مهاجرت تحصیلی",
    ],
  },
];

export default function Survey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const current = steps[step];
  const modelName = models[step];
  const navigate = useNavigate();

  const handleAnswer = (option) => {
    const updated = [...answers];
    updated[step] = option;
    setAnswers(updated);

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/result", { state: { answers: updated } });
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-800 to-black text-white flex flex-col md:flex-row-reverse items-center justify-center p-6 gap-6 md:gap-10">
      
      {/* مدل سه‌بعدی */}
      <div className="w-full md:w-1/2 h-[300px] md:h-[500px] relative z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[3, 3, 3]} intensity={1.5} />
          <pointLight position={[-2, -2, 3]} intensity={60} color="gold" />
          <Suspense fallback={null}>
            <Model3D name={modelName} />
          </Suspense>
        </Canvas>
      </div>

      {/* فرم مرحله‌ای */}
      <div className="w-full md:w-1/2 z-10 backdrop-blur-lg bg-white/5 border border-amber-500/60 rounded-xl p-6 md:p-10 shadow-2xl space-y-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">
            سؤال {step + 1} از {steps.length}
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-right">{current.title}</h2>
        <p className="text-sm md:text-base text-right text-gray-200">
          {current.question}
        </p>

        <div className="space-y-4">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className="option-button"
            >
              {opt}
            </button>
          ))}
        </div>

        {step > 0 && (
          <div className="pt-4 flex justify-start">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 border border-amber-500/60 text-white  rounded-lg hover:scale-105 transition font-medium shadow-md"
            >
              <ArrowLeft className="w-5 h-5" />
              بازگشت
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, Suspense, useRef, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../components/GlassButton.css";

const models = ["laptop", "keyboard", "case", "computer", "laptop", "keyboard" , "case"];

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
    title: "علاقه‌ات بیشتر به کدام حوزه‌هاست؟",
    type: "multiple",
    options: [
      "هوش مصنوعی و تحلیل داده",
      "(UI/UX) طراحی وب و رابط کاربری",
      "سخت‌افزار و رباتیک",
      "امنیت سایبری و هک",
      "(android/ios/windows)توسعه اپلیکیشن",
      "بازی‌سازی",
      "شبکه",
      "تدریس و پژوهش دانشگاهی",
      "نمی دونم",
    ],
    key: "interests",
  },
  {
    title: "سطح مهارت و تجربه‌ات در برنامه‌نویسی و کار مورد علاقه ات چقدره؟",
    type: "single",
    options: ["شروع نکردم", "مبتدی", "متوسط", "پیشرفته"],
    key: "experience",
  },
  {
    title: "چه مهارت‌هایی داری یا تا الان تجربه کردی؟",
    type: "multiple",
    options: [
      "طراحی وب",
      "تحلیل داده",
      "هوش مصنوعی",
      "امنیت",
      "توسعه موبایل",
      "ساخت بازی",
      "شبکه",
      "تجربه‌ای ندارم",
    ],
    key: "skills",
  },
  {
    title: "با کدام زبان برنامه نویسی یا نشانه گذاری بیشتر کار کردی؟",
    type: "multiple",
    options: [
      "C , C++",
      "Java",
      "JavaScript",
      "Python",
      "php",
      "C#",
      "Kotlin , Swift",
      "GO",
      "HTML , CSS",
      "موارد دیگر"
    ],
    key: "language",
  },
  {
    title: "برنامه‌ات برای ادامه مسیر چیه؟",
    type: "single",
    options: [
      "ورود سریع به بازار کار",
      "ادامه تحصیل در ایران",
      "ادامه تحصیل در خارج از کشور",
      "کار و ادامه تحصیل در ایران",
      "کار و ادامه تحصیل در خارج",
    ],
    key: "plan",
  },
  {
    title: "چه مدل کاری برای آینده برات جذاب‌تره؟",
    type: "multiple",
    options: [
      "پژوهشی",
      "فریلنسری",
      "شرکت یا گروه",
      "ادامه تحصیل",
      "استارتاپ",
    ],
    key: "goal",
  },
  {
    title: "کدوم مورد برات اولویت بیشتری داره؟",
    type: "multiple",
    options: [
      "درآمد بالا",
      "یادگیری عمیق",
      "پایداری شغلی",
      "امکان مهاجرت",
      "آزادی و خلاقیت",
    ],
    key: "priority",
  },
];

export default function Survey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const current = steps[step];
  const modelName = models[step];
  const currentAnswer =
    answers[current.key] || (current.type === "multiple" ? [] : "");

  const toggleOption = useCallback(
    (option) => {
      if (current.type === "multiple") {
        const alreadySelected = currentAnswer.includes(option);
        let updated;

        // اگر گزینه "تجربه‌ای ندارم" انتخاب شده، همه گزینه‌ها غیر از اون حذف بشن
        if (option === "تجربه‌ای ندارم") {
          updated = alreadySelected ? [] : [option];
        } else {
          // اگه "تجربه‌ای ندارم" قبلا انتخاب شده بود، حذفش کنیم
          const withoutNoExperience = currentAnswer.filter(
            (item) => item !== "تجربه‌ای ندارم"
          );
          updated = alreadySelected
            ? withoutNoExperience.filter((item) => item !== option)
            : [...withoutNoExperience, option];
        }
        setAnswers({ ...answers, [current.key]: updated });
      } else {
        setAnswers({ ...answers, [current.key]: option });
      }
    },
    [answers, current.key, current.type, currentAnswer]
  );

  const handleNext = () => {
    const answer = answers[current.key];
    if (current.type === "multiple" && (!answer || answer.length === 0)) {
      alert("حداقل یک گزینه را انتخاب کن");
      return;
    }
    if (current.type === "single" && !answer) {
      alert("لطفاً یک گزینه انتخاب کن");
      return;
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem("answers", JSON.stringify(answers));
      navigate("/result", { state: { answers } });
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

      {/* فرم سوال */}
      <div className="w-full md:w-1/2 z-10 backdrop-blur-lg bg-white/5 border border-amber-500/60 rounded-xl p-6 md:p-10 shadow-2xl space-y-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">
            سؤال {step + 1} از {steps.length}
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-right">
          {current.title}
        </h2>

        <div className="space-y-4">
          {current.options.map((opt) => {
            const selected =
              current.type === "multiple"
                ? currentAnswer.includes(opt)
                : currentAnswer === opt;

            return (
              <button
                key={opt}
                onClick={() => toggleOption(opt)}
                aria-pressed={selected}
                className={`option-button ${selected ? "selected" : ""}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between pt-6">
          {step > 0 ? (
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 border border-amber-500/60 text-white rounded-lg hover:scale-105 transition font-medium shadow-md"
            >
              <ArrowLeft className="w-5 h-5" />
              بازگشت
            </button>
          ) : (
            <span />
          )}

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 border border-amber-500/60 text-white rounded-lg hover:scale-105 transition font-medium shadow-md"
          >
            {step === steps.length - 1 ? "مشاهده نتیجه" : "ادامه"}
          </button>
        </div>
      </div>
    </div>
  );
}

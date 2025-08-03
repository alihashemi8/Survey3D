import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useLocation, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useRef ,useState } from "react";
import axios from "axios";

import ResultSummary from "../components/ResultSummary";
import { analyzePath } from "../utils/analyzePath";
import { pathInfo } from "../utils/pathInfo";

function EvaModel() {
  const { scene } = useGLTF("/models/eva.glb");
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
      const baseY = -0.5;
      ref.current.position.set(0, Math.sin(state.clock.elapsedTime) * 0.2 + baseY, 0);
    }
  });

  
  return <primitive ref={ref} object={scene} scale={1} />;
}

function PathDetailInline({ pathKey }) {
  const info = pathInfo[pathKey];
  if (!info) return null;

  return (
    <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 text-gray-300">
      <h2 className="text-2xl font-bold text-cyan-300 mb-3">{info.title}</h2>
      <p className="mb-4">{info.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-cyan-200 mb-2">مهارت‌های پیشنهادی</h3>
          <ul className="list-disc list-inside">
            {info.skills.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-cyan-200 mb-2">مزایا و معایب</h3>
          <ul className="text-green-400 mb-2">
            {info.pros.map((p, i) => <li key={i}>✅ {p}</li>)}
          </ul>
          <ul className="text-red-400">
            {info.cons.map((c, i) => <li key={i}>⚠️ {c}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

      // ✅ دارک مود: مدیریت وضعیت تم
      const [isDark, setIsDark] = useState(false);
    
      useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
    
        if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
          document.documentElement.classList.add("dark");
          setIsDark(true);
        } else {
          document.documentElement.classList.remove("dark");
          setIsDark(false);
        }
      }, []);
    
      const toggleTheme = () => {
        const newTheme = isDark ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
    
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
    
        setIsDark(!isDark);
      };

  // 🔐 بازیابی جواب‌ها از state یا localStorage
  const answers =
    location.state?.answers ||
    JSON.parse(localStorage.getItem("answers") || "{}");

  const analysis = analyzePath(answers || {});

  // 🚀 ارسال به بک‌اند
  useEffect(() => {
    if (!answers || Object.keys(answers).length === 0) {
      console.warn("❗ داده‌ای برای ارسال به بک‌اند وجود ندارد");
      return;
    }

    const sendToBackend = async () => {
      try {
        console.log("در حال ارسال به بک‌اند:", answers);
        const response = await axios.post("http://localhost:8000/api/submit/", answers);
        console.log("✅ Backend response:", response.data);
      } catch (err) {
        console.error("❌ Error sending data:", err.message);
      }
    };

    sendToBackend();
  }, [answers]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br  from-amber-400 via-blue-100 to-amber-500 dark:from-black dark:via-gray-800 dark:to-black text-white flex flex-col md:flex-row-reverse items-center justify-center gap-6 p-6 md:p-12">
      <div className="w-full md:w-1/2 h-[300px] md:h-[500px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} />
          <pointLight position={[-2, -2, 3]} intensity={100} color="gold" />
          <Suspense fallback={null}>
            <EvaModel />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
            {/* ✅ دکمه دارک مود بالا چپ */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-slate-600 dark:border-amber-500 bg-white/60 dark:bg-black/50 backdrop-blur hover:scale-105 transition"
          aria-label="تغییر تم"
        >
          {isDark ? (
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.03a1 1 0 011.42 0l.71.71a1 1 0 01-1.42 1.42l-.71-.71a1 1 0 010-1.42zM17 9a1 1 0 110 2h-1a1 1 0 110-2h1zM4.22 4.03a1 1 0 000 1.42l.71.71a1 1 0 001.42-1.42l-.71-.71a1 1 0 00-1.42 0zM3 9a1 1 0 100 2H2a1 1 0 100-2h1zm3.05 6.95a1 1 0 010-1.42l.71-.71a1 1 0 111.42 1.42l-.71.71a1 1 0 01-1.42 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm6.36-1.05a1 1 0 01-1.42 0l-.71-.71a1 1 0 011.42-1.42l.71.71a1 1 0 010 1.42z" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-slate-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8 8 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>

      <div className="w-full md:w-1/2 space-y-6 text-center md:text-right px-4 md:px-10">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-black to-gray-700 dark:from-white dark:via-sky-50 dark:to-amber-300">
          نتیجه انتخاب‌های شما
        </h1>

        <ResultSummary answers={answers || {}} />

        <p className="text-lg mt-8 bg-clip-text text-transparent bg-gradient-to-l from-black to-gray-500 dark:from-white dark:via-amber-200 dark:to-amber-500 md:mt-15">
          {analysis.mainResultText}
        </p>

        <PathDetailInline pathKey={analysis.mainPathKey} />

        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-center mt-6">
          <button
            onClick={() =>
              navigate("/pathDetails", {
                state: {
                  answers,
                  analysis,
                },
              })
            }
            className="bg-white/40 dark:bg-white/20 border-b-2 border-l-2  border border-l-gray-600 border-b-gray-600 border-r-gray-600 dark:border-l-amber-300 dark:border-b-amber-300 dark:border-r-amber-300 shadow-md/80 shadow-md hover:shadow-lg shadow-blue-300 hover:shadow-blue-400 dark:hover:shadow-amber-400 dark:shadow-amber-300 text-gray-900 dark:text-white px-6 py-3 rounded-lg hover:bg-white/2 dark:hover:bg-white/30 hover:scale-102 transition"
          >
            توضیحات کامل + نقشه راه
          </button>
        </div>
      </div>
    </div>
  );
}

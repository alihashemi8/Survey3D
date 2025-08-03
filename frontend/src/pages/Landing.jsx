import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import GlassButton from "../components/GlassButton";
import "../components/GlassButton.css";

// مدل سه‌بعدی وال‌-ای
function WallEModel() {
  const { scene } = useGLTF("/models/wall_e.glb");
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
      const baseY = -1.3;
      const posX = 0.5;
      ref.current.position.set(
        posX,
        Math.sin(state.clock.elapsedTime) * 0.2 + baseY,
        0
      );
    }
  });

  return <primitive ref={ref} object={scene} scale={2.8} />;
}

// مدل لوگو گوشه صفحه
function LogoModel() {
  const { scene } = useGLTF("/models/Logo.glb");
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive ref={ref} object={scene} scale={0.02} position={[0, -2, 0]} />
  );
}

export default function Landing() {
  const navigate = useNavigate();
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

  return (
    <>
      <div
        className="relative min-h-screen w-full 
        bg-gradient-to-br from-amber-400 via-blue-100 to-amber-500
        dark:bg-gradient-to-br dark:from-black dark:via-gray-800 dark:to-black dark:text-white 
        flex flex-col-reverse md:flex-row items-center px-6 md:px-20 py-12 gap-12 md:gap-24"
      >
        {/* دکمه دارک مود بالا چپ */}
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

        {/* متن و دکمه سمت راست */}
        <motion.div
          dir="rtl"
          className="w-full md:w-1/2 space-y-8 text-center md:text-right"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-slate-800 dark:text-amber-500/90 tracking-tight min-h-[90px]">
            <Typewriter
              options={{
                strings: [
                  "آینده‌ات رو انتخاب کن!",
                  "ادامه تحصیل یا بازار کار؟",
                  "چند کلیک تا کشف مسیرت!",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
                pauseFor: 2000,
              }}
            />
          </h1>

          <motion.p
            className="text-base md:text-lg dark:text-amber-500/90 leading-relaxed max-w-xl mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            با چند سؤال ساده مشخص کن که ادامه تحصیل برات مناسبه یا ورود به بازار
            کار. فقط چند کلیک تا روشن شدن مسیرت فاصله داری.
          </motion.p>

          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <GlassButton
              text="شروع نظرسنجی"
              className="bg-white/40 dark:bg-white/10 border text-gray-800 dark:text-amber-500 border-blue-200 dark:border-amber-500 hover:bg-blue-100 shadow-xl hover:shadow-blue-200 dark:hover:shadow-amber-500 dark:hover:bg-amber-400/10"
              rippleColor="bg-white/30"
              onClick={() => navigate("/survey")}
            />
          </motion.div>
        </motion.div>

        {/* مدل سه‌بعدی سمت چپ */}
        <motion.div
          className="w-full md:w-1/2 h-[300px] md:h-[500px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[3, 3, 3]} intensity={1.5} />
            <pointLight
              position={[-2, -2, 3]}
              intensity={90}
              color={isDark ? "gold" : "#ADF0FF"} 
            />
            <Suspense fallback={null}>
              <WallEModel />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </motion.div>
      </div>

      {/* ✅ فوتر */}


    </>
  );
}

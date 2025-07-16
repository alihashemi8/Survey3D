import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import GlassButton from "../components/GlassButton";

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

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={ref} object={scene} scale={0.035} position={[0, 0, 0]} />;
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-gray-800 to-black text-white flex flex-col-reverse md:flex-row items-center px-6 md:px-20 py-12 gap-12 md:gap-24">

      {/* لوگوی سه‌بعدی بالا راست */}
      <div className="absolute top-4 right-4 w-20 h-20 z-50">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} />
          <Suspense fallback={null}>
            <LogoModel />
          </Suspense>
        </Canvas>
      </div>

      {/* متن و دکمه سمت راست */}
      <motion.div
        dir="rtl"
        className="w-full md:w-1/2 space-y-8 text-center md:text-right"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-amber-500/90 tracking-tight min-h-[90px]">
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
          className="text-base md:text-lg text-amber-500/90 leading-relaxed max-w-xl mx-auto md:mx-0"
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
          <pointLight position={[-2, -2, 3]} intensity={90} color="gold" />
          <Suspense fallback={null}>
            <WallEModel />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </motion.div>
    </div>
  );
}

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useNavigate } from "react-router-dom";

function WallEModel() {
  const { scene } = useGLTF("/models/wall_e.glb");
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;


      const baseY = -1.3;  
      const posX = 0.5;   
      ref.current.position.set(posX, Math.sin(state.clock.elapsedTime) * 0.2 + baseY, 0);
    }
  });

  return <primitive ref={ref} object={scene} scale={2.8} />;
}


export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-800 to-black text-white flex flex-col-reverse md:flex-row items-center px-6 md:px-16 py-10 gap-6 md:gap-16">
      
      <div dir="rtl" className="w-full md:w-1/2 space-y-6 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-snug text-balance text-white">
          آینده‌ات رو انتخاب کن!
        </h1>

        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          با چند سؤال ساده، مشخص کن که ادامه تحصیل برات مناسبه یا ورود به بازار کار. فقط چند کلیک تا روشن شدن مسیرت فاصله داری.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/survey")}
            className="bg-white text-black px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            شروع نظرسنجی
          </button>
        </div>
      </div>

      {/* مدل سه‌بعدی سمت چپ */}
      <div className="w-full md:w-1/2 h-[300px] md:h-[500px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[3, 3, 3]} intensity={1.5} />
          <Suspense fallback={null}>
            <WallEModel />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
    </div>
  );
}

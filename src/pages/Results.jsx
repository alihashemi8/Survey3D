import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, Suspense } from "react";

const modelConfig = {
  eva: { scale: 0.9, position: [0, -0.5, 0] },
};

function EvaModel() {
  const { scene } = useGLTF("/models/eva.glb");
  const ref = useRef();
  const { scale, position } = modelConfig.eva;

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2 + position[1];
    }
  });

  return <primitive ref={ref} object={scene} scale={scale} />;
}

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || [];

  const resultText = (() => {
    const final = answers[3];
    if (final === "ادامه تحصیل (ارشد/دکترا)") return "به نظر می‌رسه مسیر آکادمیک برات مناسب‌تره!";
    if (final === "ورود به بازار کار") return "شروع تجربه در بازار کار برات اولویت داره!";
    if (final === "استارتاپ") return "به دنبال مسیر مستقل و خلاقانه‌ای هستی!";
    if (final === "مهاجرت تحصیلی") return "مسیر بین‌المللی برات جذابه!";
    return "نتیجه‌ای یافت نشد!";
  })();

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-black to-gray-700 text-white flex flex-col md:flex-row-reverse items-center justify-center gap-6 p-6 md:p-12">
      
      {/* مدل سمت چپ در لپ‌تاپ و تبلت / بالا در موبایل */}
      <div className="w-full md:w-1/2 h-[300px] md:h-[500px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[3, 3, 3]} intensity={1.5} />
          <Suspense fallback={null}>
            <EvaModel />
          </Suspense>
        </Canvas>
      </div>

      {/* متن سمت راست */}
      <div className="w-full md:w-1/2 space-y-6 text-center md:text-right px-4 md:px-10">
        <h1 className="text-3xl md:text-4xl font-bold">نتیجه انتخاب شما</h1>
        <p className="text-lg text-gray-300">{resultText}</p>

        <button
          onClick={() => navigate("/")}
          className="bg-white text-black px-6 py-3 rounded-xl hover:scale-105 transition"
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
}

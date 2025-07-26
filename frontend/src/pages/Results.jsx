import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useLocation, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useRef } from "react";
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
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-800 to-black text-white flex flex-col md:flex-row-reverse items-center justify-center gap-6 p-6 md:p-12">
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

      <div className="w-full md:w-1/2 space-y-6 text-center md:text-right px-4 md:px-10">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-white via-sky-50 to-amber-300">
          نتیجه انتخاب‌های شما
        </h1>

        <ResultSummary answers={answers || {}} />

        <p className="text-lg mt-8 bg-clip-text text-transparent bg-gradient-to-l from-white via-amber-200 to-amber-500 md:mt-15">
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
            className="bg-white/20 border-b-2 border-l-2 border border-l-amber-300 border-b-amber-300 border-r-amber-300 shadow-md/80 shadow-amber-300 text-white px-6 py-3 rounded-lg hover:bg-white/30 hover:scale-102 transition"
          >
            توضیحات کامل + نقشه راه
          </button>
        </div>
      </div>
    </div>
  );
}

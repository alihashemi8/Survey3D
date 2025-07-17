import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";

import PathMenu from "../components/PathMenu";
import PathDetails from "../components/PathDetails";

const paths = [
  {
    key: "ai",
    title: "هوش مصنوعی و یادگیری ماشین",
    description:
      "هوش مصنوعی زمینه‌ای پررونق و رو به رشد است که فرصت‌های شغلی متنوعی دارد.",
    advantages: [
      "درآمد بالا",
      "بازار کار رو به رشد",
      "امکان کار در حوزه‌های پیشرفته",
    ],
    disadvantages: [
      "نیاز به دانش ریاضی قوی",
      "رقابت بالا",
      "پیچیدگی مفاهیم",
    ],
    steps: [
      "مطالعه ریاضیات پایه (آمار، جبر خطی)",
      "یادگیری زبان برنامه‌نویسی Python",
      "آشنایی با کتابخانه‌های TensorFlow و PyTorch",
      "انجام پروژه‌های عملی",
    ],
  },
  {
    key: "web",
    title: "توسعه وب",
    description:
      "توسعه وب یک حوزه گسترده است که به سرعت در حال رشد بوده و فرصت‌های شغلی فراوانی دارد.",
    advantages: [
      "شروع آسان",
      "بازار کار گسترده",
      "جامعه کاربری بزرگ و منابع آموزشی زیاد",
    ],
    disadvantages: ["رقابت بالا", "نیاز به یادگیری فریم‌ورک‌های متعدد"],
    steps: [
      "یادگیری HTML، CSS و JavaScript",
      "آشنایی با فریم‌ورک‌های React یا Vue",
      "یادگیری توسعه سمت سرور با Node.js",
      "ساخت پروژه‌های واقعی و نمونه کار",
    ],
  },
  {
    key: "freelance",
    title: "فریلنسری",
    description:
      "فریلنسری به شما امکان می‌دهد پروژه‌های مختلف را به صورت مستقل انجام دهید.",
    advantages: [
      "انعطاف‌پذیری زمانی و مکانی",
      "امکان درآمد بالا",
      "تنوع پروژه‌ها",
    ],
    disadvantages: [
      "نیاز به خودانضباطی بالا",
      "رقابت شدید و نوسانات درآمد",
      "نیاز به مهارت بازاریابی و شبکه‌سازی",
    ],
    steps: [
      "ساخت پروفایل در سایت‌های فریلنسری معتبر",
      "یادگیری مهارت‌های ارتباطی و مذاکره",
      "ایجاد نمونه کار قوی",
      "ارتباط موثر با کارفرماها",
    ],
  },
  {
    key: "migration",
    title: "مهاجرت تحصیلی یا کاری",
    description:
      "مهاجرت فرصت‌های جدیدی برای تحصیل یا کار در کشورهای دیگر فراهم می‌کند.",
    advantages: [
      "دسترسی به آموزش و بازار کار جهانی",
      "فرصت زندگی در محیط‌های پیشرفته",
      "گسترش شبکه ارتباطات",
    ],
    disadvantages: [
      "فرایند پیچیده و زمان‌بر",
      "نیاز به انطباق فرهنگی و زبانی",
      "هزینه‌های مالی بالا",
    ],
    steps: [
      "تحقیق درباره کشور و دانشگاه مورد نظر",
      "آمادگی برای آزمون‌های زبان",
      "تهیه مدارک و ویزا",
      "آمادگی برای زندگی در کشور جدید",
    ],
  },
];

function WalleModel() {
  const gltf = useGLTF("/models/wall_e.glb");
  return <primitive object={gltf.scene} scale={1.5} position={[0, -1, 0]} />;
}

export default function Roadmap() {
  const [selectedPath, setSelectedPath] = useState(paths[0]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-800 to-black text-white flex flex-col md:flex-row p-6 gap-6">
      <div className="w-full md:w-1/4">
        <PathMenu
          paths={paths}
          selectedKey={selectedPath.key}
          onSelect={(key) => {
            const path = paths.find((p) => p.key === key);
            if (path) setSelectedPath(path);
          }}
        />
      </div>

      <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/2 h-[300px] md:h-[500px]">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[3, 3, 3]} intensity={1.2} />
            <pointLight position={[-2, -2, 3]} intensity={100} color="gold" />
            <Suspense fallback={null}>
              <WalleModel />
            </Suspense>
          </Canvas>
        </div>

        <div className="w-full md:w-1/2 overflow-y-auto max-h-[500px] p-4 bg-white/10 rounded-xl backdrop-blur-lg">
          <PathDetails path={selectedPath} />
        </div>
      </div>
    </div>
  );
}

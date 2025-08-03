import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import GlassButton from "../components/GlassButton";
function PathDetails() {
  const location = useLocation();
  const answers = location.state?.answers;
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
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!answers) return;

      setLoading(true);
      setError(null);

      try {
        console.log("🔍 در حال ارسال به بک‌اند:", answers);
        const response = await axios.post("http://127.0.0.1:8000/api/chatgpt_analysis/", { answers });
        console.log("✅ تحلیل دریافت شد:", response.data);
        setAnalysis(response.data);
      } catch (err) {
        setError(err.message || "خطا در دریافت داده");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [answers]);

 if (loading) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br 
      from-amber-400 via-blue-100 to-amber-500 dark:from-black dark:via-gray-800 dark:to-black text-gray-900 dark:text-white">
      <div className="backdrop-blur-md bg-white/20 dark:bg-white/10 p-6 rounded-2xl border border-gray-600 dark:border-gray-700 shadow-xl shadow-blue-300 dark:shadow-amber-400">
        <svg
          className="animate-spin h-10 w-10 text-amber-500 dark:text-amber-400 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        <p className="text-lg font-medium">در حال پردازش پاسخ‌های شما...</p>
      </div>
    </div>
  );
}

  if (error) return <div className="p-6 text-red-400 text-center">خطا: {error}</div>;
  if (!analysis) return <div className="p-6 text-white text-center">تحلیلی دریافت نشد</div>;

  const renderList = (items, textColor = "text-white") => {
    if (!items || items.length === 0) return <p className="text-gray-400">موردی یافت نشد.</p>;
    return (
      <ul className={`list-disc list-inside ${textColor} space-y-1`}>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    );
  };

  const renderTextOrList = (data) => {
    if (!data) return <p className="text-gray-400">موردی یافت نشد.</p>;
    if (Array.isArray(data)) return renderList(data);
    return <p>{data}</p>;
  };

  return (
<div className="min-h-screen w-full from-amber-400 via-blue-100 to-amber-500 
  bg-gradient-to-br dark:from-black dark:via-gray-800 dark:to-black text-gray-800 dark:text-white 
  flex flex-col xl:flex-row-reverse items-center justify-center p-6 gap-6 xl:gap-10 font-sans">

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
  {/* ✅ عنوان صفحه */}
  <h1 className="text-4xl font-extrabold mt-10 text-gray-900 dark:text-amber-400 mb-6 text-center w-full">تحلیل کامل مسیر شغلی</h1>

  {/* ✅ باکس‌های محتوایی */}
  <div className="flex flex-col xl:flex-row-reverse gap-6 w-full max-w-screen-xl">

    {/* سمت راست - یک ستون تکی برای تحلیل کلی */}
    <section dir="rtl" className="bg-white/40 dark:bg-white/10 border dark:border-amber-400 border-gray-400 p-6 rounded-lg shadow-lg dark:shadow-md shadow-blue-400 dark:shadow-amber-400 w-full xl:w-[40%]">
      <h2 className="text-2xl text-black dark:text-amber-300 mb-4 flex items-center gap-2">🧠 تحلیل کلی</h2>
      <p className="leading-relaxed whitespace-pre-wrap ">{analysis.detailed_analysis || "موردی یافت نشد."}</p>
    </section>

    {/* سمت چپ - بقیه باکس‌ها در یک ستون دیگر */}
    <div className="flex flex-col gap-6 w-full xl:w-[60%]">

      <section dir="rtl" className="bg-white/40 dark:bg-white/10 border p-6 rounded-lg shadow-lg dark:shadow-md shadow-blue-400 dark:shadow-amber-400 border-gray-400 dark:border-amber-400">
        <h2 className="text-2xl text-black dark:text-amber-300 mb-4 flex items-center gap-2">📌 نقشه راه مهارتی</h2>
        {renderTextOrList(analysis.skill_roadmap)}
      </section>

      <section dir="rtl" className="bg-white/40 dark:bg-white/10 border p-6 rounded-lg shadow-lg dark:shadow-md shadow-blue-400 dark:shadow-amber-400 border-gray-400 dark:border-amber-400 space-y-6">
        <div>
          <h2 className="text-2xl dark:text-green-500 text-green-700 mb-3 flex items-center gap-2">✅ مزایا</h2>
          {renderList(analysis.pros_and_cons?.pros, "text-green-600 dark:text-green-400")}
        </div>
        <div>
          <h2 className="text-2xl text-red-600 dark:text-red-500 mb-3 flex items-center gap-2">⚠️ معایب</h2>
          {renderList(analysis.pros_and_cons?.cons, "text-red-500 dark:text-red-500")}
        </div>
      </section>

      <section dir="rtl" className="bg-white/40 dark:bg-white/10 border p-6 rounded-lg shadow-lg dark:shadow-md shadow-blue-400 dark:shadow-amber-400 border-gray-400 dark:border-amber-400">
        <h2 className="text-2xl text-black dark:text-amber-300 mb-4 flex items-center gap-2">📚 پیشنهادهای یادگیری</h2>
        {renderTextOrList(analysis.learning_suggestions)}
      </section>

    </div>
  </div>

  {/* دکمه پایان */}
  <GlassButton
    text="شروع دوباره"
    className="bg-white/40 dark:bg-white/10 border text-gray-800 dark:text-white/0 border-blue-200 dark:border-amber-400 hover:bg-white/5 shadow-lg dark:shadow-md shadow-blue-400 dark:shadow-amber-400 hover:shadow-blue-500 dark:hover:shadow-amber-500 dark:hover:bg-amber-400/10 mt-6"
    rippleColor="bg-white/30"
    onClick={() => navigate("/")}
  />

</div>


  );
}

export default PathDetails;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function PathDetails() {
  const location = useLocation();
  const answers = location.state?.answers;

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

  if (loading) return <div className="p-6 text-white text-center">در حال بارگذاری...</div>;
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
    <div className="p-8 max-w-4xl mx-auto text-white space-y-10 font-sans">
      <h1 className="text-4xl font-extrabold text-cyan-400 mb-6 text-center">تحلیل کامل مسیر شغلی</h1>

      <section className="bg-white/10 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-amber-300 mb-4 flex items-center gap-2">🧠 تحلیل کلی</h2>
        <p className="leading-relaxed whitespace-pre-wrap">{analysis.detailed_analysis || "موردی یافت نشد."}</p>
      </section>

      <section className="bg-white/10 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-amber-300 mb-4 flex items-center gap-2">📌 نقشه راه مهارتی</h2>
        {renderTextOrList(analysis.skill_roadmap)}
      </section>

      <section className="bg-white/10 p-6 rounded-lg shadow-md space-y-6">
        <div>
          <h2 className="text-2xl text-green-400 mb-3 flex items-center gap-2">✅ مزایا</h2>
          {renderList(analysis.pros_and_cons?.pros, "text-green-300")}
        </div>
        <div>
          <h2 className="text-2xl text-red-400 mb-3 flex items-center gap-2">⚠️ معایب</h2>
          {renderList(analysis.pros_and_cons?.cons, "text-red-300")}
        </div>
      </section>

      <section className="bg-white/10 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-amber-300 mb-4 flex items-center gap-2">📚 پیشنهادهای یادگیری</h2>
        {renderTextOrList(analysis.learning_suggestions)}
      </section>
    </div>
  );
}

export default PathDetails;

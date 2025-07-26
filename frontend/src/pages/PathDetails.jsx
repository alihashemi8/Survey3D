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

  if (loading) return <div className="p-6 text-white">در حال بارگذاری...</div>;
  if (error) return <div className="p-6 text-red-400">خطا: {error}</div>;
  if (!analysis) return <div className="p-6 text-white">تحلیلی دریافت نشد</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto text-white space-y-8">
      <h1 className="text-3xl font-bold text-cyan-300">تحلیل کامل مسیر شغلی</h1>

      <section>
        <h2 className="text-2xl text-amber-300 mb-2">🧠 تحلیل کلی</h2>
        <p className="bg-white/10 p-4 rounded-lg leading-7">{analysis.detailed_analysis}</p>
      </section>

      <section>
        <h2 className="text-2xl text-amber-300 mb-2">📌 نقشه راه مهارتی</h2>
        <p className="bg-white/10 p-4 rounded-lg leading-7">{analysis.skill_roadmap}</p>
      </section>

      <section>
        <h2 className="text-2xl text-amber-300 mb-2">✅ مزایا</h2>
        <ul className="list-disc list-inside bg-white/10 p-4 rounded-lg text-green-400">
          {analysis.pros_and_cons?.pros.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2 className="text-2xl text-amber-300 mt-6 mb-2">⚠️ معایب</h2>
        <ul className="list-disc list-inside bg-white/10 p-4 rounded-lg text-red-400">
          {analysis.pros_and_cons?.cons.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl text-amber-300 mb-2">📚 پیشنهادهای یادگیری</h2>
        <p className="bg-white/10 p-4 rounded-lg leading-7">{analysis.learning_suggestions}</p>
      </section>
    </div>
  );
}

export default PathDetails;

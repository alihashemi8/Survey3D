import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { analyzePath } from "../utils/analyzePath";
import { getAdvancedSummary } from "../utils/getAdvancedSummary";

export default function PathDetails() {
const location = useLocation();
const answers = location.state?.answers || {};
const analysis = location.state?.analysis || analyzePath(answers);
 

  const details = useMemo(
    () =>
      getAdvancedSummary({
        mainPath: analysis.mainPath,
        top3: analysis.top3,
        priorityList: analysis.priorityList,
        goalList: analysis.goalList,
        planList: analysis.planList,
        details: analysis.details, // حتماً اینجا اضافه شود
      }),
    [analysis]
  );

  if (!details || details.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
        <p>اطلاعات کافی برای نمایش مسیر وجود ندارد.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 md:px-20 bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e] text-white">
      {details.map((item, index) => (
        <div
          key={index}
          className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl max-w-3xl mx-auto mb-8"
        >
          <h2 className="text-amber-300 text-lg font-bold mb-2">
            {item.title}
          </h2>
          <p className="text-white/90 leading-relaxed">{item.content}</p>
        </div>
      ))}
    </div>
  );
}

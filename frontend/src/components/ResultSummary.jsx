export default function ResultSummary({ answers }) {
  // کلیدهای واقعی که در answers استفاده شده‌اند
  const keys = [
    "interests",
    "experience",
    "skills",
    "plan",
    "workStyle",
    "priority",
  ];

  // عناوین مراحل به ترتیب کلیدها
  const steps = [
    "مرحله ۱: علایق فردی",
    "مرحله ۲: مهارت‌ها و تجربه",
    "مرحله ۳: اولویت‌ها",
    "مرحله ۴: اهداف آینده",
    "مرحله ۵: سبک کاری",
    "مرحله ۶: اولویت‌ها",
  ];

  // فرمت کردن جواب‌ها (آرایه یا متن)
  const formatAnswer = (answer) => {
    if (Array.isArray(answer)) {
      return answer.length === 0 ? "—" : answer.map((a) => `• ${a}`).join("  ");
    }
    return answer || "—";
  };

  return (
    <div className="w-full bg-white/5 backdrop-blur-md rounded-xl p-4 md:p-6 text-sm md:text-base text-left space-y-4 border border-white/10">
      {keys.map((key, index) => (
        <div key={key}>
          <h3 className="text-amber-300 font-bold mb-1">{steps[index]}</h3>
          <p className="text-white/90">{formatAnswer(answers[key])}</p>
        </div>
      ))}
    </div>
  );
}

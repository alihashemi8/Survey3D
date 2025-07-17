export function analyzePath(answers) {
  const {
    interests = [],
    skills = [],
    preferences = [],
    goals = [],
    learningStyle = [],
    futureVision = [],
  } = answers;

  const allAnswers = [
    ...interests,
    ...skills,
    ...preferences,
    ...goals,
    ...learningStyle,
    ...futureVision,
  ].map((item) => item.toLowerCase());

  const score = {
    ai: 0,
    web: 0,
    data: 0,
    gamedev: 0,
    freelance: 0,
    academic: 0,
    immigration: 0,
    startup: 0,
  };

  const keywords = {
    ai: ["ai", "machine learning", "هوش مصنوعی", "deep learning", "modeling"],
    web: ["frontend", "react", "backend", "website", "fullstack", "وب"],
    data: ["data", "تحلیل داده", "analysis", "statistics", "پایگاه"],
    gamedev: ["game", "unity", "unreal", "گیم", "بازی", "3d"],
    freelance: ["freelance", "پروژه‌ای", "remote", "دورکاری"],
    academic: ["research", "تحقیق", "پژوهش", "دکترا", "academic", "ارشد"],
    immigration: ["immigration", "مهاجرت", "خارج", "visa", "کشور دیگر"],
    startup: ["startup", "استارتاپ", "business", "کارآفرینی", "risk", "سرمایه"],
  };

  // افزایش امتیاز بر اساس کلمات کلیدی
  allAnswers.forEach((answer) => {
    Object.keys(keywords).forEach((key) => {
      keywords[key].forEach((word) => {
        if (answer.includes(word)) score[key]++;
      });
    });
  });

  // تعیین مسیر اصلی (بیشترین امتیاز)
  const sortedPaths = Object.entries(score)
    .sort((a, b) => b[1] - a[1])
    .filter(([, value]) => value > 0);

  const mainPath = sortedPaths[0]?.[0] || "unknown";

  const alternatives = sortedPaths
    .slice(1, 3)
    .map(([key]) => key);

  return {
    mainPath,
    alternatives,
    scores: score,
  };
}

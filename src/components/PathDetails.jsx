// src/components/PathDetails.jsx
export default function PathDetails({ path }) {
  if (!path) return null;

  return (
    <div className="space-y-6 text-gray-200">
      <h2 className="text-2xl font-bold text-amber-400">{path.title}</h2>
      <p className="leading-relaxed">{path.description}</p>

      <div>
        <h3 className="text-lg font-semibold text-amber-300 mb-2">مزایا</h3>
        <ul className="list-disc list-inside space-y-1">
          {path.advantages.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-amber-300 mb-2">معایب</h3>
        <ul className="list-disc list-inside space-y-1">
          {path.disadvantages.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-amber-300 mb-2">گام‌های پیشنهادی</h3>
        <ol className="list-decimal list-inside space-y-1">
          {path.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

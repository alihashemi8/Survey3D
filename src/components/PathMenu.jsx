export default function PathMenu({ paths, selectedKey, onSelect }) {
  return (
    <nav className="flex flex-col space-y-3 bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20 text-white">
      {paths.map((path) => (
        <button
          key={path.key}
          onClick={() => onSelect(path.key)}
          className={`text-left p-3 rounded-lg transition-colors duration-200 ${
            selectedKey === path.key
              ? "bg-amber-500 text-black font-bold"
              : "hover:bg-white/20"
          }`}
        >
          {path.title}
        </button>
      ))}
    </nav>
  );
}

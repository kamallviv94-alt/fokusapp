// Bir vərdişin 26 həftəlik nümunə xəritəsi. Sabit formula ilə qurulur (təsadüfi deyil),
// ona görə hər render eyni görünür. Zaman keçdikcə boşluqlar azalır.
const WEEKS = 26;
const LEVELS = ["bg-[#f3e8e1]", "bg-[#ffd3c4]", "bg-[#ff9a7e]", "bg-[#ff5c9a]", "bg-[#8b5cf6]"];

function level(w: number, d: number) {
  const h = (((w * 7 + d) * 2654435761) % 1000) / 1000;
  const chance = 0.22 + 0.74 * (w / (WEEKS - 1));
  if (h > chance) return 0;
  return Math.min(4, 1 + Math.floor((((w * 13 + d * 7) % 10) / 10) * 2 + (w / WEEKS) * 2));
}

export default function StreakGrid() {
  return (
    <figure className="min-w-0">
      <div className="overflow-x-auto pb-2">
        <div
          className="grid w-max grid-flow-col grid-rows-7 gap-[3px] sm:gap-1.5"
          role="img"
          aria-label="Nümunə: bir vərdişin 26 həftəsi. Əvvəl boşluqlar çoxdur, sonra demək olar hər gün edilir."
        >
          {Array.from({ length: WEEKS * 7 }, (_, i) => (
            <span key={i} className={`size-2.5 rounded-[3px] sm:size-4 sm:rounded-[4px] lg:size-5 ${LEVELS[level(Math.floor(i / 7), i % 7)]}`} />
          ))}
        </div>
      </div>
      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
        <span>Nümunə: «Səhər idmanı» vərdişinin 6 ayı</span>
        <span className="flex items-center gap-1.5">
          Az
          {LEVELS.map((c) => (
            <span key={c} className={`size-3.5 rounded-[3px] ${c}`} />
          ))}
          Çox
        </span>
      </figcaption>
    </figure>
  );
}

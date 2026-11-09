import StreakGrid from "@/components/streak-grid";
import TodayDemo from "@/components/today-demo";

const COURSE_URL = "https://itcoach.az";

const STEPS = [
  { title: "Yaz", text: "Ağlına gələn işi bir sətirlə əlavə et. Siyahı səliqəli qalır, heç nə yaddan çıxmır." },
  { title: "Et və işarələ", text: "Bitirdiyin tapşırığı bir toxunuşla bağla. Vərdiş üçün bu günün dairəsinə toxun." },
  { title: "Seriyanı qoru", text: "FokusApp neçə gün dalbadal davam etdiyini sayır. Bir günü buraxanda bunu dərhal görürsən." },
];

const FAQ = [
  {
    q: "FokusApp pulsuzdur?",
    a: "Bəli. Bu, ITCoach-un Vibe Coding kursunda addım-addım qurulan açıq nümunə layihədir.",
  },
  {
    q: "Məlumatlarım harada saxlanılır?",
    a: "Tətbiqdə — sənin hesabına bağlı verilənlər bazasında (Supabase). Bu səhifədəki demo isə hər şeyi yalnız brauzerində saxlayır.",
  },
  {
    q: "Telefonda işləyir?",
    a: "Bəli. Səhifə telefon ekranına uyğunlaşır, heç nə yükləmək lazım deyil — brauzerdə açmaq kifayətdir.",
  },
  {
    q: "Bunu özüm qura bilərəm?",
    a: "Bəli. Vibe Coding kursunda bu tətbiqi AI alətləri ilə sıfırdan qurur və öz linkinlə internetə çıxarırsan. Əvvəlcədən proqramlaşdırma bilmək lazım deyil.",
  },
];

function Logo({ gid }: { gid: string }) {
  return (
    <span className="flex items-center gap-2.5 font-display text-lg font-bold">
      <svg viewBox="0 0 64 64" className="size-8" aria-hidden>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF5C39" />
            <stop offset=".55" stopColor="#FF3D8B" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill={`url(#${gid})`} />
        <path d="M19 33l9 9 17-19" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      FokusApp
    </span>
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line/60 bg-paper/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4" aria-label="Əsas menyu">
          <a href="#" aria-label="FokusApp — səhifənin əvvəli">
            <Logo gid="logo-nav" />
          </a>
          <div className="hidden items-center gap-7 text-[15px] text-muted md:flex">
            <a href="#nece-isleyir" className="hover:text-ink">Necə işləyir</a>
            <a href="#imkanlar" className="hover:text-ink">İmkanlar</a>
            <a href="#suallar" className="hover:text-ink">Suallar</a>
          </div>
          <a href="#demo" className="rounded-full bg-ink px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-[#2c1b3b]">
            Demonu sına
          </a>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero: solda vəd, sağda işləyən demo */}
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-20">
          <div className="lg:sticky lg:top-32">
            <h1 className="font-display text-[2.6rem] leading-[1.05] font-bold tracking-[-0.02em] sm:text-6xl lg:text-[4.1rem]">
              Gününü planla. Vərdişini qoru.
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted sm:text-xl">
              FokusApp bu günün tapşırıqlarını və gündəlik vərdişlərini bir ekranda saxlayır. Etdiyin hər gün seriyaya çevrilir — və
              onu qırmaq istəmirsən.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#demo" className="rounded-full bg-ink px-7 py-4 text-lg font-semibold text-white hover:bg-[#2c1b3b]">
                Demonu sına
              </a>
              <a href={COURSE_URL} className="rounded-full px-2 py-4 text-lg font-semibold underline decoration-coral decoration-2 underline-offset-[6px] hover:text-coral">
                Bu tətbiqi özün qur
              </a>
            </div>
            <p className="mt-6 text-[15px] text-faint">Pulsuzdur. Telefonda da, kompüterdə də brauzerdə açılır.</p>
          </div>
          <TodayDemo />
        </section>

        {/* Seriya xəritəsi */}
        <section className="border-y border-line bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl leading-tight font-bold tracking-[-0.01em] sm:text-4xl">Ardıcıllıq görünəndə qorunur</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                Hər xana bir gündür. Əvvəlcə boşluqlar çox olur, sonra azalır. Rəng tündləşdikcə vərdiş artıq səndən güc tələb etmir.
              </p>
            </div>
            <StreakGrid />
          </div>
        </section>

        {/* Ardıcıl addımlar — nömrə burada məna daşıyır */}
        <section id="nece-isleyir" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
          <h2 className="font-display text-3xl font-bold tracking-[-0.01em] sm:text-4xl">Necə işləyir</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="border-t-2 border-ink pt-6">
                <span className="font-display text-5xl font-bold text-coral">{i + 1}</span>
                <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* İmkanlar: hər biri öz kiçik vizualı ilə */}
        <section id="imkanlar" className="scroll-mt-24 bg-paper-2/70">
          <div className="mx-auto max-w-6xl space-y-20 px-5 py-24">
            <h2 className="font-display text-3xl font-bold tracking-[-0.01em] sm:text-4xl">Bir tətbiq, üç rahatlıq</h2>

            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold">Hər cihazda eyni siyahı</h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-muted">
                  Telefonda yazdığın tapşırıq kompüterdə də görünür. Səhifəni yeniləsən də, cihazı dəyişsən də heç nə itmir.
                </p>
              </div>
              <div className="flex items-end justify-center gap-5" aria-hidden>
                <div className="w-[min(100%,340px)] rounded-2xl border border-line bg-white p-4 shadow-sm">
                  <div className="mb-3 flex gap-1.5"><i className="size-2.5 rounded-full bg-[#e3d6cf]" /><i className="size-2.5 rounded-full bg-[#e3d6cf]" /><i className="size-2.5 rounded-full bg-[#e3d6cf]" /></div>
                  {["Hesabatı göndər", "Bazardan meyvə al", "Dərsi bitir"].map((t, i) => (
                    <div key={t} className="mb-2 flex items-center gap-2.5 rounded-lg border border-line px-3 py-2 text-sm">
                      <span className={`size-4 rounded-full ${i === 0 ? "bg-mint" : "border-2 border-faint/50"}`} />
                      <span className={i === 0 ? "text-faint line-through" : ""}>{t}</span>
                    </div>
                  ))}
                </div>
                <div className="w-28 rounded-[22px] border-[5px] border-ink bg-white p-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="mb-1.5 flex items-center gap-1.5 rounded-md border border-line px-1.5 py-1.5">
                      <span className={`size-2.5 shrink-0 rounded-full ${i === 0 ? "bg-mint" : "border border-faint"}`} />
                      <span className="h-1.5 flex-1 rounded-full bg-[#e9dfd9]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="md:order-2">
                <h3 className="text-2xl font-bold">Yalnız sən görürsən</h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-muted">
                  Hər kəs öz hesabı ilə daxil olur. Sənin tapşırıqların və vərdişlərin başqa istifadəçiyə görünmür.
                </p>
              </div>
              <div className="flex justify-center md:order-1" aria-hidden>
                <div className="w-[min(100%,320px)] rounded-2xl border border-line bg-white p-6 shadow-sm">
                  <Logo gid="logo-card" />
                  <p className="mt-1 text-sm text-muted">Hesabına daxil ol</p>
                  <div className="mt-4 rounded-lg border border-line px-3 py-2.5 text-sm">aydin@example.com</div>
                  <div className="mt-2 rounded-lg border border-line px-3 py-2.5 text-sm tracking-widest">••••••••</div>
                  <div className="mt-3 rounded-lg bg-ink py-2.5 text-center text-sm font-semibold text-white">Daxil ol</div>
                </div>
              </div>
            </div>

            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold">Sadə qalır</h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-muted">
                  Bir siyahı, bir neçə vərdiş, bir düymə. Reklam, lazımsız menyu və bildiriş axını yoxdur.
                </p>
              </div>
              <div className="flex justify-center" aria-hidden>
                <div className="flex w-[min(100%,340px)] items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-sm">
                  <span className="flex-1 rounded-lg border border-line px-3 py-2.5 text-sm text-faint">Yeni tapşırıq…</span>
                  <span className="rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white">Əlavə et</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="suallar" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24">
          <h2 className="font-display text-3xl font-bold tracking-[-0.01em] sm:text-4xl">Suallar</h2>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                  {f.q}
                  <span className="text-2xl leading-none text-coral transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="px-5 pb-24">
          <div className="mx-auto max-w-6xl rounded-[32px] bg-ink px-8 py-16 text-white sm:px-14">
            <h2 className="max-w-2xl font-display text-3xl leading-tight font-bold sm:text-5xl">Bu tətbiqi özün qur</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              ITCoach-un Vibe Coding kursunda FokusApp-ı AI ilə sıfırdan qurur, verilənlər bazası və giriş əlavə edir, sonda öz linkinlə
              internetə çıxarırsan.
            </p>
            <a href={COURSE_URL} className="mt-9 inline-block rounded-full bg-white px-7 py-4 text-lg font-semibold text-ink hover:bg-paper-2">
              Kursa bax
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-muted">
          <Logo gid="logo-foot" />
          <p>ITCoach Vibe Coding kursunun nümunə layihəsi. © 2026</p>
        </div>
      </footer>
    </>
  );
}

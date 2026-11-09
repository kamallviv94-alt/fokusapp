# FokusApp — landing səhifəsi

Gündəlik tapşırıqları və vərdişləri bir ekranda izləyən FokusApp tətbiqinin tanıtım səhifəsi.
ITCoach-un **Vibe Coding** kursunun nümunə layihəsidir.

Səhifədə işləyən kiçik demo var: tapşırıq əlavə etmək, bitmiş kimi işarələmək və vərdiş seriyasını artırmaq olur.
Demo məlumatı yalnız brauzerin `localStorage`-ında saxlayır.

## Lokal işə salmaq

```bash
npm install
npm run dev
```

Sonra brauzerdə http://localhost:3000 açın.

## Vercel-ə deploy

1. [vercel.com/new](https://vercel.com/new) səhifəsində bu GitHub repo-nu seçin (**Import**).
2. Framework avtomatik **Next.js** kimi tanınır; heç bir mühit dəyişəni lazım deyil.
3. **Deploy** basın. Hər `git push`-dan sonra Vercel saytı özü yeniləyir.

## Texnologiyalar

- Next.js (App Router) və React
- Tailwind CSS
- Şriftlər: Unbounded (başlıqlar) və Plus Jakarta Sans (mətn) — hər ikisində Azərbaycan hərfləri var

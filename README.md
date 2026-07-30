# Stack samples

Working demos for the libraries wired into this Next.js app.

## Libraries

| Library | Sample | Path |
|---|---|---|
| shadcn/ui | Shared UI primitives | `components/ui/` |
| Font Awesome | Icon buttons | `components/samples/font-awesome-sample.tsx` |
| Framer Motion | Micro interactions | `components/samples/framer-motion-sample.tsx` |
| Three.js + R3F | Orbiting 3D orb | `components/samples/three-scene-sample.tsx` |
| GSAP ScrollTrigger | Scroll reveals | `components/samples/gsap-scroll-sample.tsx` |
| tsParticles | Particle field | `components/samples/particles-sample.tsx` |
| @emailjs/browser | Contact form | `components/samples/emailjs-sample.tsx` |

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## GitHub Pages

This app builds as a static site (`output: "export"`). On push to `main`, [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) publishes the `out/` folder.

1. Create a GitHub repo and push this project (default branch: `main`)
2. Repo → **Settings** → **Pages** → Source: **GitHub Actions**
3. Optional: add EmailJS secrets under **Settings** → **Secrets and variables** → **Actions**:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
4. After the workflow succeeds, the site is at `https://ssachin919.github.io/` (user site from the `ssachin919.github.io` repo). Project-style repos still get `https://<user>.github.io/<repo>/`.

Local static preview:

```bash
pnpm build
pnpm preview
```

For a project-page base path locally: `BASE_PATH=/your-repo-name pnpm build`. The user site build leaves `BASE_PATH` empty.

## EmailJS setup

1. Create an account at [emailjs.com](https://www.emailjs.com/)
2. Copy `.env.example` → `.env.local`
3. Fill in `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
4. Template variables expected: `user_name`, `user_email`, `message`

## Adding more shadcn components

```bash
pnpm dlx shadcn@latest add dialog accordion tabs
```

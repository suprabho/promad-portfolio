import { SERVICES } from "../content"
import { Wrap } from "./Wrap"

export function About() {
  return (
    <section id="about" className="border-t-[1.5px] border-motion-line">
      <Wrap className="grid gap-5 py-[clamp(40px,6vw,80px)] min-[901px]:grid-cols-[280px_1fr] min-[901px]:gap-[clamp(24px,5vw,72px)]">
        <aside className="min-w-0 self-start pt-0.5 min-[901px]:sticky min-[901px]:top-0 print:static">
          <span className="mb-2.5 block font-motion-mono text-[12px] text-motion-muted">01</span>
          <h2 className="text-balance text-[clamp(26px,3vw,36px)] font-extrabold leading-[1.05] tracking-[-0.025em]">
            Hi, we&apos;re Promad
          </h2>
          <span className="mt-3.5 inline-block rounded bg-motion-yellow px-2.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-motion-yellow-foreground">
            Design + Motion
          </span>
        </aside>

        <div className="min-w-0 space-y-7">
          <p className="max-w-[60ch] text-[clamp(18px,1.7vw,22px)] leading-[1.45] tracking-[-0.01em]">
            We&apos;re a small design studio from India. We love to solve problems and make everyone&apos;s
            life a little easier with great experiences. We work across product design, web development,
            branding and motion, which means the video we make for you sits naturally inside the product and
            brand it belongs to.
          </p>
          <p className="max-w-[66ch]">
            Motion has been part of our practice for over seven years, from micro-interaction libraries at
            1mg and ClearTax to launch teasers, course explainers and social series. Here is a cross-section
            of that work, grouped by the kind of motion it is.
          </p>

          {/* The 1.5px gaps let the line colour show through as cell dividers */}
          <div className="grid gap-[1.5px] overflow-hidden rounded-xl border-[1.5px] border-motion-line bg-motion-line min-[641px]:grid-cols-2">
            {SERVICES.map((service) => (
              <div key={service.key} className="bg-motion-surface px-[22px] pb-6 pt-[22px]">
                <h3 className="flex items-baseline gap-2.5 text-balance text-[18px] font-bold tracking-[-0.015em]">
                  <span className="font-motion-mono text-[12px] font-medium text-motion-muted">{service.key}</span>
                  {service.title}
                </h3>
                <p className="mt-2 text-[15px] text-motion-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  )
}

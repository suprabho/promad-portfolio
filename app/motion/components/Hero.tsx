import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr"
import { SerifAccent } from "./SerifAccent"
import { Wrap } from "./Wrap"
import { asset } from "../content"

export function Hero() {
  return (
    <header className="bg-motion-yellow pb-[clamp(36px,6vw,72px)] pt-[clamp(16px,2.5vw,32px)] text-motion-yellow-foreground">
      <Wrap>
        <Link
          href="/#skills"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] opacity-70 transition-opacity hover:opacity-100"
        >
          <ArrowLeftIcon aria-hidden weight="bold" className="size-3.5" />
          promad.design
        </Link>

        <div className="mb-[clamp(40px,8vw,110px)] mt-[clamp(20px,4.5vw,56px)] flex items-center justify-between gap-6">
          <Link href="/" aria-label="Promad home" className="shrink-0">
            <Image
              src={asset("logo.png")}
              alt="Promad"
              width={800}
              height={382}
              priority
              className="h-9 w-auto min-[761px]:h-12"
            />
          </Link>
          <p className="text-[13px] font-semibold uppercase tracking-[0.06em]">
            Video &amp; Motion · Selected work
          </p>
        </div>

        <h1 className="max-w-[14ch] text-balance text-[clamp(40px,7.2vw,96px)] font-extrabold leading-[0.98] tracking-[-0.035em]">
          Video &amp; Motion <SerifAccent className="tracking-[-0.02em]">that moves</SerifAccent> products
          forward.
        </h1>

        <p className="mt-7 max-w-[44ch] text-[clamp(17px,1.6vw,21px)] leading-[1.45]">
          Seven years of motion work from Promad Design Studio: product teasers and explainers, course
          and training video, UI micro-interactions, brand and social motion, and mascot rigs you can
          play with right here on the page.
        </p>
      </Wrap>
    </header>
  )
}

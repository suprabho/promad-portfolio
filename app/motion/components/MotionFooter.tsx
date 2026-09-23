import Link from "next/link"
import { Wrap } from "./Wrap"

export function MotionFooter() {
  return (
    <footer className="bg-motion-ink py-10 text-motion-paper">
      <Wrap className="flex flex-wrap items-center justify-between gap-6">
        <p>
          <span className="font-bold">Promad Design Studio</span> · Gurgaon, India
          <br />
          <a href="mailto:hello@promad.design" className="font-semibold hover:underline">
            hello@promad.design
          </a>{" "}
          ·{" "}
          <Link href="/" className="font-semibold hover:underline">
            promad.design
          </Link>
        </p>
        <p className="font-motion-mono text-[13px] opacity-70">Video &amp; Motion · Selected work · Sept 2026</p>
      </Wrap>
    </footer>
  )
}

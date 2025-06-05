import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import Image from "next/image"
import Spline from "@splinetool/react-spline/next"
import { LogoText } from "@/components/logo-text"

export function HeroSection() {
  return (
    <section className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.webp"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Text Content */}
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <LogoText />
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed">
                A remote - first, global Product Studio. We love to solve problems and make everyone's life a little easier with great experiences. We primarily specialize in UX design, front end development, branding and motion design and are well versed in all aspects of delivering quality and user-friendly products.
              </p>
            </div>

            {/* Spline Scene */}
            <div className="relative w-[500px] h-[500px]">
              <Spline
                scene="/spline/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

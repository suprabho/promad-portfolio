import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import Image from "next/image"
import { LogoText } from "@/components/logo-text"
import Spline from '@splinetool/react-spline'

export function HeroSection() {
  return (
    <section className="relative min-h-screen mt-[-100px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.webp"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={100}
          unoptimized={true}
        />
        {/* Overlay */}
        <div className="absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4 mt-32 w-full">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Text Content */}
            <div className="flex flex-col w-full lg:w-[60%] h-fit bg-[#FAFF00] rounded-tl-[48px] rounded-br-[48px] border-tr-0 border-bl-0 p-8 md:p-12 shadow-2xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <LogoText textColor="text-black" />
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-black leading-relaxed">
                A remote-first, global creative collective. We love to solve problems and make everyone's life a little delightful with great experiences. We primarily specialize in strategizing and crafting excepectional products, brands and web experiences.
              </p>
            </div>
            {/* Spline Scene */}
            <div className="flex w-full lg:w-[40%] max-w-2xl mx-auto">
              <Spline
                scene="/spline/scene.splinecode"
                className="w-full"
                style={{ aspectRatio: '1/1' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

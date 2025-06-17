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
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4 mt-32">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Text Content */}
            <div className="xl:w-2/3 lg:w-1/2 w-full h-full">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <LogoText textColor="text-white" />
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed">
                A remote - first, global Product Studio. We love to solve problems and make everyone's life a little easier with great experiences. We primarily specialize in UX design, front end development, branding and motion design and are well versed in all aspects of delivering quality and user-friendly products.
              </p>
            </div>

            {/* Placeholder for 3D Scene */}
            <div className="xl:w-1/3 lg:w-1/2 w-full">
              <Spline
                scene="/spline/scene.splinecode"
                className="w-full h-full" 
              style={{ aspectRatio: '1/1' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

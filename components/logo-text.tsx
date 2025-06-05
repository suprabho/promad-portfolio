import { useContext, ReactNode } from 'react'

interface LogoTextProps {
  className?: string
  textColor?: string
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  children?: ReactNode
  showPrefix?: boolean
}

const sizeClasses = {
  h1: {
    container: "text-4xl md:text-6xl lg:text-7xl",
    pro: "text-4xl md:text-5xl lg:text-6xl",
  },
  h2: {
    container: "text-3xl md:text-5xl lg:text-6xl",
    pro: "text-3xl md:text-4xl lg:text-5xl",
  },
  h3: {
    container: "text-2xl md:text-4xl lg:text-5xl",
    pro: "text-2xl md:text-3xl lg:text-4xl",
  },
  h4: {
    container: "text-xl md:text-3xl lg:text-4xl",
    pro: "text-xl md:text-2xl lg:text-3xl",
  },
  h5: {
    container: "text-lg md:text-2xl lg:text-3xl",
    pro: "text-lg md:text-xl lg:text-2xl",
  },
  h6: {
    container: "text-base md:text-xl lg:text-2xl",
    pro: "text-base md:text-lg lg:text-xl",
  },
  p: {
    container: "text-sm",
    pro: "text-xs",
  },
}

export function LogoText({ 
  className = "", 
  textColor = "text-white",
  size = "h1",
  children,
  showPrefix = true
}: LogoTextProps) {
  const sizeClass = sizeClasses[size]
  const fullText = `We are Promad`

  return (
    <span 
      className={`${sizeClass.container} ${className} ${textColor}`}
      aria-label={fullText}
    >
      {showPrefix && "We are "}{" "}
      <span className={`${sizeClass.pro} font-sans font-extrabold`}>
        PRO
      </span>
      <span className="font-serif font-bold">
        {children || "mad"}
      </span>
    </span>
  )
} 
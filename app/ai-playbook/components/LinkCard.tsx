import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowSquareOut } from "@phosphor-icons/react"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export function LinkCard({
  title,
  description,
  href,
  icon: Icon,
  iconSource,
  accent = false,
}: {
  title: string
  description: string
  href: string
  icon?: React.ElementType
  iconSource?: string
  accent?: boolean
}) {
  return (
    <motion.div variants={fadeUp}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        <Card
          className={`group h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
            accent ? "border-[#FAFF00]/40 bg-[#FAFF00]/5" : ""
          }`}
        >
          <CardHeader>
            {iconSource ? (
              <Image
                src={iconSource}
                alt={title}
                width={48}
                height={48}
                className="w-12 h-12 rounded-xl mb-3 transition-transform group-hover:scale-110"
              />
            ) : Icon ? (
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${
                  accent ? "bg-[#FAFF00] text-black" : "bg-secondary text-foreground"
                }`}
              >
                <Icon size={24} weight="duotone" />
              </div>
            ) : null}
            <CardTitle className="text-xl flex items-center gap-2">
              {title}
              <ArrowSquareOut
                size={16}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground"
              />
            </CardTitle>
            <CardDescription className="text-base">{description}</CardDescription>
          </CardHeader>
        </Card>
      </a>
    </motion.div>
  )
}

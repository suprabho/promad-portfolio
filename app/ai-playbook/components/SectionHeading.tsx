import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export function SectionHeading({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string
  subtitle?: string
  icon?: React.ElementType
}) {
  return (
    <motion.div variants={fadeUp} className="mb-14 text-center">
      {Icon && (
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAFF00]/20">
          <Icon size={28} weight="duotone" className="text-[#FAFF00] dark:text-[#FAFF00]" />
        </div>
      )}
      <h2 className="font-serif italic font-extrabold text-3xl md:text-5xl mb-3">{title}</h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  )
}

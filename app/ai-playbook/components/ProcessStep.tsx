import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export function ProcessStep({
  number,
  title,
  delay = 0,
}: {
  number: number
  title: string
  delay?: number
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay }}
      className="flex items-start gap-4"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FAFF00] text-black font-bold flex items-center justify-center text-lg font-mono">
        {number}
      </div>
      <p className="text-base md:text-lg pt-1.5">{title}</p>
    </motion.div>
  )
}

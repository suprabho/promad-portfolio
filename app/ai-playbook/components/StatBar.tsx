import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export function StatBar({
  repo,
  commits,
  added,
  removed,
  maxCommits,
}: {
  repo: string
  commits: number
  added: string
  removed: string
  maxCommits: number
}) {
  const percentage = (commits / maxCommits) * 100

  return (
    <motion.div variants={fadeUp} className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="font-mono text-sm font-semibold">{repo}</span>
        <span className="text-sm text-muted-foreground font-mono">{commits} commits</span>
      </div>
      <div className="h-3 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#FAFF00] to-[#FAFF00]/60"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <div className="flex gap-4 text-xs text-muted-foreground font-mono">
        <span className="text-green-500">+{added}</span>
        <span className="text-red-400">-{removed}</span>
      </div>
    </motion.div>
  )
}

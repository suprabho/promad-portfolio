import { useState } from "react"
import { Card } from "./ui/card"
import { Dialog, DialogContent } from "./ui/dialog"
import { CalendarPlus, NotePencil } from "@phosphor-icons/react"

export function ActionSection() {
  const [openDialog1, setOpenDialog1] = useState(false)
  const [openDialog2, setOpenDialog2] = useState(false)

  return (
    <section className="container py-24 mx-auto mb-12 w-full space-y-8 bg-[#FAFF00] rounded-tl-[48px] rounded-br-[48px] border-tr-0 border-bl-0 p-8 md:p-12 shadow-2xl">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in touch</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Schedule a call or share your requirements with us
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card 
          className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer p-6" 
          onClick={() => setOpenDialog1(true)}
        >
          <div className="text-center space-y-4 pt-4">
            <CalendarPlus className="w-10 h-10 mx-auto" weight="bold" />
            <h3 className="font-serif italic font-extrabold text-2xl">Book a call</h3>
            <p className="text-muted-foreground">Book a call with us to discuss your project</p>
            <div className="font-mono text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              Click to expand
            </div>
          </div>
        </Card>

        <Card 
          className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer p-6"
          onClick={() => setOpenDialog2(true)}
        >
          <div className="text-center space-y-4 pt-4">
            <NotePencil className="w-10 h-10 mx-auto" weight="bold" />
            <h3 className="font-serif italic font-extrabold text-2xl">Share your requirements</h3>
            <p className="text-muted-foreground">We will get back to you with a proposal</p>
            <div className="font-mono text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              Click to expand
            </div>
          </div>
        </Card>
      </div>

      <Dialog open={openDialog1} onOpenChange={setOpenDialog1}>
        <DialogContent className="max-w-4xl">
          <iframe 
            src="https://calendar.google.com/calendar/appointments/AcZssZ2qCBIleZaAspRQAI7wGxjegaDvn87d46Bd950=?gv=true" 
            className="w-full aspect-video rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog2} onOpenChange={setOpenDialog2}>
        <DialogContent className="max-w-4xl">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSfPQf3IdIefSkE8ICbWKEgD36crLR1kHWgBbc6OFk95koMuAw/viewform?embedded=true"
            className="w-full aspect-video rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </DialogContent>
      </Dialog>
    </section>
  )
} 
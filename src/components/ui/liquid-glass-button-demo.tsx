"use client"

import { LiquidButton, MetalButton } from "@/components/ui/liquid-glass-button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function LiquidButtonDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-neutral-50 dark:bg-[#06110C] rounded-2xl border border-black/5 dark:border-white/10">
      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
        Takhlees Liquid Glass &amp; Metal CTA Buttons
      </h3>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Emerald Glass Primary CTA */}
        <LiquidButton variant="emerald" size="md">
          <span>Get a Consultation</span>
          <ArrowRight className="h-4 w-4" />
        </LiquidButton>

        {/* Refractive Glass Secondary CTA */}
        <LiquidButton variant="glass" size="md">
          <span>View Our Services</span>
        </LiquidButton>

        {/* Success Metal Button */}
        <MetalButton variant="success">
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#FFF7F0]" />
            Corporate Setup
          </span>
        </MetalButton>

        {/* Gold Metal Button */}
        <MetalButton variant="gold">
          <span>VIP Services</span>
        </MetalButton>
      </div>
    </div>
  )
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "motion/react";

export function HeroBanner() {
  return (
    <section className="px-4 sm:px-6 py-6 max-w-7xl mx-auto" id="phones">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[oklch(0.95_0.03_264)] via-[oklch(0.97_0.02_240)] to-[oklch(0.93_0.05_200)] p-8 md:p-12 lg:p-16 min-h-[360px] flex items-center"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/5" />
          <div className="absolute -bottom-10 right-20 w-64 h-64 rounded-full bg-primary/8" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 w-full">
          {/* Left content */}
          <div className="flex-1 space-y-5">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
              <Star className="w-3 h-3 mr-1 fill-current" /> New Arrivals 2025
            </Badge>

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Find Your
                <span className="text-primary block">Perfect Phone</span>
              </h1>
              <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-md">
                Explore the latest smartphones from top brands. Best prices,
                authentic products, and free delivery.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="gap-2"
                data-ocid="hero.primary_button"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-white/80"
                data-ocid="hero.secondary_button"
              >
                View Deals
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <div>
                <p className="text-2xl font-bold text-foreground">500+</p>
                <p className="text-xs text-muted-foreground">Products</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">50k+</p>
                <p className="text-xs text-muted-foreground">Happy Customers</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">4.9★</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>

          {/* Right: phone image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="shrink-0 w-full md:w-auto flex justify-center"
          >
            <img
              src="/assets/generated/hero-phones.dim_600x500.png"
              alt="Latest smartphones"
              className="w-full max-w-[300px] md:max-w-[340px] lg:max-w-[400px] h-auto object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

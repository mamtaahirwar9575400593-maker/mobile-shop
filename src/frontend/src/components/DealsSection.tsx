import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "../backend";
import {
  PRODUCT_IMAGES,
  SAMPLE_ACCESSORIES,
  formatPrice,
} from "../data/sampleProducts";

interface DealsSectionProps {
  deals: Product[];
  accessories: Product[];
  onAddToCart: (product: Product) => void;
}

export function DealsSection({
  deals,
  accessories,
  onAddToCart,
}: DealsSectionProps) {
  const dealProduct = deals.length > 0 ? deals[0] : null;
  const accessoryList =
    accessories.length > 0 ? accessories : SAMPLE_ACCESSORIES;

  return (
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto" id="deals">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Deals of the Week */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-gradient-to-br from-primary to-[oklch(0.45_0.22_264)] rounded-2xl p-6 text-primary-foreground flex flex-col justify-between min-h-[280px]"
        >
          <div>
            <Badge className="bg-white/20 text-white border-white/30 mb-3">
              <Zap className="w-3 h-3 mr-1" /> Deals of the Week
            </Badge>
            {dealProduct ? (
              <>
                <h3 className="text-2xl font-bold mb-1">{dealProduct.name}</h3>
                <p className="text-primary-foreground/80 text-sm mb-3">
                  {dealProduct.specs}
                </p>
                <p className="text-3xl font-bold">
                  {formatPrice(dealProduct.price)}
                </p>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-1">Google Pixel 8</h3>
                <p className="text-primary-foreground/80 text-sm mb-3">
                  Tensor G3 · 50MP · 128GB · 7yr updates
                </p>
                <p className="text-3xl font-bold">$699</p>
              </>
            )}
          </div>
          <Button
            className="mt-4 bg-white text-primary hover:bg-white/90 w-fit"
            onClick={() => dealProduct && onAddToCart(dealProduct)}
            data-ocid="deals.primary_button"
          >
            <ShoppingCart className="w-4 h-4 mr-2" /> Grab the Deal
          </Button>
        </motion.div>

        {/* Top Accessories */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <h3 className="text-xl font-bold text-foreground mb-4">
            Top Accessories
          </h3>
          <div className="space-y-3" id="accessories">
            {accessoryList.map((acc, i) => {
              const imgUrl =
                PRODUCT_IMAGES[acc.name] ||
                "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=200&h=200&fit=crop";
              return (
                <div
                  key={String(acc.id)}
                  className="flex items-center gap-4 p-3 bg-card border border-border rounded-xl hover:shadow-card transition-shadow"
                  data-ocid={`accessories.item.${i + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt={acc.name}
                    className="w-16 h-16 object-cover rounded-lg shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">
                      {acc.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {acc.specs}
                    </p>
                    <p className="font-bold text-primary mt-1">
                      {formatPrice(acc.price)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAddToCart(acc)}
                    className="shrink-0"
                    data-ocid={`accessories.add_to_cart.${i + 1}`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </Button>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

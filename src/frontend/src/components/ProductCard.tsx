import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "../backend";
import { PRODUCT_IMAGES, formatPrice } from "../data/sampleProducts";

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
  onWishlist: (product: Product) => void;
  isWishlisted?: boolean;
}

const STARS = [0, 1, 2, 3, 4];

export function ProductCard({
  product,
  index,
  onAddToCart,
  onWishlist,
  isWishlisted,
}: ProductCardProps) {
  const imageUrl =
    PRODUCT_IMAGES[product.name] ||
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
      className="group bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
      data-ocid={`products.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.isDeal && (
          <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs">
            Deal
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
        <button
          type="button"
          onClick={() => onWishlist(product)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${
            isWishlisted
              ? "bg-primary text-primary-foreground"
              : "bg-white/90 text-muted-foreground hover:text-primary hover:bg-white"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          data-ocid={`products.wishlist.${index + 1}`}
        >
          <Heart
            className="w-4 h-4"
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-foreground text-sm leading-tight">
            {product.name}
          </h3>
          <Badge variant="outline" className="text-[10px] shrink-0">
            {product.brand}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
          {product.specs}
        </p>

        <div className="flex items-center gap-1 mb-3">
          {STARS.map((s) => (
            <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">(4.8)</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="gap-1.5 text-xs"
            data-ocid={`products.add_to_cart.${index + 1}`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

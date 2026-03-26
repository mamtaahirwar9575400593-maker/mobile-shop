import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "../backend";
import { ProductCard } from "./ProductCard";

interface FeaturedProductsProps {
  products: Product[];
  isLoading: boolean;
  wishlist: bigint[];
  onAddToCart: (product: Product) => void;
  onWishlist: (product: Product) => void;
}

const SKELETON_IDS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];

export function FeaturedProducts({
  products,
  isLoading,
  wishlist,
  onAddToCart,
  onWishlist,
}: FeaturedProductsProps) {
  return (
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto" id="featured">
      <h2 className="text-2xl font-bold text-center text-foreground mb-2">
        Featured Products
      </h2>
      <p className="text-center text-muted-foreground mb-8 text-sm">
        Top picks from the latest collection
      </p>

      {isLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          data-ocid="products.loading_state"
        >
          {SKELETON_IDS.map((id) => (
            <div
              key={id}
              className="rounded-2xl overflow-hidden border border-border"
            >
              <Skeleton className="aspect-square w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="products.empty_state"
        >
          <p>No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, i) => (
            <ProductCard
              key={String(product.id)}
              product={product}
              index={i}
              onAddToCart={onAddToCart}
              onWishlist={onWishlist}
              isWishlisted={wishlist.includes(product.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

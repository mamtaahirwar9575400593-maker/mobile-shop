import { Toaster } from "@/components/ui/sonner";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { Product } from "./backend";
import { AdminPanel } from "./components/AdminPanel";
import { CartDrawer, type CartEntry } from "./components/CartDrawer";
import { CategorySection } from "./components/CategorySection";
import { DealsSection } from "./components/DealsSection";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroBanner } from "./components/HeroBanner";
import { SAMPLE_PRODUCTS } from "./data/sampleProducts";
import {
  useAccessories,
  useDealProducts,
  useFeaturedProducts,
  useIsAdmin,
} from "./hooks/useQueries";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);
  const [wishlist, setWishlist] = useState<bigint[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: featuredProducts, isLoading: featuredLoading } =
    useFeaturedProducts();
  const { data: dealProducts } = useDealProducts();
  const { data: accessories } = useAccessories();
  const { data: isAdmin } = useIsAdmin();

  // Use backend data if available, otherwise fall back to sample data
  const displayedProducts =
    featuredProducts && featuredProducts.length > 0
      ? featuredProducts
      : SAMPLE_PRODUCTS;

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart`);
  }, []);

  const handleRemoveFromCart = useCallback((product: Product) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== product.id),
    );
  }, []);

  const handleQuantityChange = useCallback(
    (product: Product, delta: number) => {
      setCartItems((prev) =>
        prev
          .map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: Math.max(0, item.quantity + delta) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      );
    },
    [],
  );

  const handleClearCart = useCallback(() => {
    setCartItems([]);
    toast.success("Cart cleared");
  }, []);

  const handleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const isIn = prev.includes(product.id);
      if (isIn) {
        toast.success(`${product.name} removed from wishlist`);
        return prev.filter((id) => id !== product.id);
      }
      toast.success(`${product.name} added to wishlist`);
      return [...prev, product.id];
    });
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onCartOpen={() => setCartOpen(true)}
        onAdminOpen={() => setAdminOpen(true)}
        isAdmin={!!isAdmin}
        onSearch={setSearchTerm}
      />

      <main>
        <HeroBanner />
        <CategorySection />
        <FeaturedProducts
          products={
            searchTerm
              ? displayedProducts.filter(
                  (p) =>
                    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.brand.toLowerCase().includes(searchTerm.toLowerCase()),
                )
              : displayedProducts
          }
          isLoading={featuredLoading}
          wishlist={wishlist}
          onAddToCart={handleAddToCart}
          onWishlist={handleWishlist}
        />
        <DealsSection
          deals={dealProducts ?? []}
          accessories={accessories ?? []}
          onAddToCart={handleAddToCart}
        />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onQuantityChange={handleQuantityChange}
        onClear={handleClearCart}
      />

      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />

      <Toaster position="bottom-right" />
    </div>
  );
}

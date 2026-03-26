import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Product } from "../backend";
import { formatPrice } from "../data/sampleProducts";

export interface CartEntry {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartEntry[];
  onRemove: (product: Product) => void;
  onQuantityChange: (product: Product, delta: number) => void;
  onClear: () => void;
}

export function CartDrawer({
  open,
  onClose,
  items,
  onRemove,
  onQuantityChange,
  onClear,
}: CartDrawerProps) {
  const total = items.reduce(
    (sum, { product, quantity }) => sum + Number(product.price) * quantity,
    0,
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
            data-ocid="cart.modal"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
            data-ocid="cart.sheet"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">
                  Shopping Cart
                </h2>
                {items.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ({items.length} items)
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                data-ocid="cart.close_button"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div
                className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8"
                data-ocid="cart.empty_state"
              >
                <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <Button variant="outline" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-4">
                    {items.map(({ product, quantity }, i) => (
                      <div
                        key={String(product.id)}
                        className="flex gap-3 p-3 border border-border rounded-xl"
                        data-ocid={`cart.item.${i + 1}`}
                      >
                        <div className="w-16 h-16 bg-muted rounded-lg shrink-0 overflow-hidden">
                          <img
                            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop"
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.brand}
                          </p>
                          <p className="font-bold text-primary mt-1">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button
                            type="button"
                            onClick={() => onRemove(product)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Remove item"
                            data-ocid={`cart.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => onQuantityChange(product, -1)}
                              className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onQuantityChange(product, 1)}
                              className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="p-5 border-t border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-xl font-bold text-foreground">
                      ${(total / 100).toFixed(0)}
                    </span>
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    data-ocid="cart.submit_button"
                  >
                    Checkout · ${(total / 100).toFixed(0)}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    onClick={onClear}
                    data-ocid="cart.delete_button.all"
                  >
                    Clear Cart
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

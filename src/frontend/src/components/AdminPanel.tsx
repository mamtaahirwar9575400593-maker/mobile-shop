import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Edit2, Loader2, Package, Plus, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import { SAMPLE_PRODUCTS, formatPrice } from "../data/sampleProducts";
import {
  useAllProducts,
  useCreateProduct,
  useDeleteProduct,
} from "../hooks/useQueries";

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
}

const EMPTY_FORM = {
  name: "",
  brand: "",
  category: "",
  description: "",
  specs: "",
  price: "",
  isFeatured: false,
  isDeal: false,
  isAccessory: false,
  inStock: true,
};

export function AdminPanel({ open, onClose }: AdminPanelProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const { data: backendProducts, isLoading } = useAllProducts();
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();

  const products =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : SAMPLE_PRODUCTS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct.mutateAsync({
        id: 0n,
        name: form.name,
        brand: form.brand,
        category: form.category,
        description: form.description,
        specs: form.specs,
        price: BigInt(Math.round(Number.parseFloat(form.price) * 100)),
        isFeatured: form.isFeatured,
        isDeal: form.isDeal,
        isAccessory: form.isAccessory,
        inStock: form.inStock,
        imageId: ExternalBlob.fromURL(""),
      });
      toast.success("Product created!");
      setForm(EMPTY_FORM);
    } catch {
      toast.error("Failed to create product");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-background shadow-2xl z-50 flex flex-col"
            data-ocid="admin.panel"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Admin Panel</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                data-ocid="admin.close_button"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-5 space-y-6">
                {/* Add Product Form */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add New Product
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, name: e.target.value }))
                          }
                          required
                          data-ocid="admin.name.input"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="brand">Brand</Label>
                        <Input
                          id="brand"
                          value={form.brand}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, brand: e.target.value }))
                          }
                          required
                          data-ocid="admin.brand.input"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={form.category}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, category: e.target.value }))
                          }
                          required
                          data-ocid="admin.category.input"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={form.price}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, price: e.target.value }))
                          }
                          required
                          data-ocid="admin.price.input"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="specs">Specs</Label>
                      <Input
                        id="specs"
                        value={form.specs}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, specs: e.target.value }))
                        }
                        placeholder="e.g. Snapdragon 8 · 50MP · 256GB"
                        data-ocid="admin.specs.input"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={form.description}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            description: e.target.value,
                          }))
                        }
                        data-ocid="admin.description.input"
                      />
                    </div>
                    <div className="flex flex-wrap gap-4 pt-1">
                      <div className="flex items-center gap-2">
                        <Switch
                          id="featured"
                          checked={form.isFeatured}
                          onCheckedChange={(v) =>
                            setForm((p) => ({ ...p, isFeatured: v }))
                          }
                          data-ocid="admin.featured.switch"
                        />
                        <Label htmlFor="featured">Featured</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          id="deal"
                          checked={form.isDeal}
                          onCheckedChange={(v) =>
                            setForm((p) => ({ ...p, isDeal: v }))
                          }
                          data-ocid="admin.deal.switch"
                        />
                        <Label htmlFor="deal">Deal</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          id="accessory"
                          checked={form.isAccessory}
                          onCheckedChange={(v) =>
                            setForm((p) => ({ ...p, isAccessory: v }))
                          }
                          data-ocid="admin.accessory.switch"
                        />
                        <Label htmlFor="accessory">Accessory</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          id="instock"
                          checked={form.inStock}
                          onCheckedChange={(v) =>
                            setForm((p) => ({ ...p, inStock: v }))
                          }
                          data-ocid="admin.instock.switch"
                        />
                        <Label htmlFor="instock">In Stock</Label>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={createProduct.isPending}
                      data-ocid="admin.submit_button"
                    >
                      {createProduct.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                          Creating...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" /> Add Product
                        </>
                      )}
                    </Button>
                  </form>
                </div>

                <Separator />

                {/* Product List */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Package className="w-4 h-4" /> All Products
                    {isLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                  </h3>
                  <div className="space-y-2">
                    {products.map((p, i) => (
                      <div
                        key={String(p.id)}
                        className="flex items-center gap-3 p-3 border border-border rounded-xl"
                        data-ocid={`admin.product.item.${i + 1}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">
                            {p.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {p.brand} · {formatPrice(p.price)}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-7 h-7"
                            data-ocid={`admin.edit_button.${i + 1}`}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-7 h-7 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(p.id)}
                            data-ocid={`admin.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

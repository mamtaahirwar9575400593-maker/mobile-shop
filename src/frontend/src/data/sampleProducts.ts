import { ExternalBlob } from "../backend";
import type { Product } from "../backend";

const PLACEHOLDER_BLOB = ExternalBlob.fromURL("");

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "Flagship",
    description:
      "The most powerful iPhone ever with A17 Pro chip, titanium design, and USB-C.",
    specs: "A17 Pro · 48MP · 256GB · Titanium",
    price: 99900n,
    isFeatured: true,
    isDeal: false,
    isAccessory: false,
    inStock: true,
    imageId: PLACEHOLDER_BLOB,
  },
  {
    id: 2n,
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    category: "Flagship",
    description:
      "AI-powered flagship with Galaxy AI features and Snapdragon 8 Gen 3.",
    specs: "Snapdragon 8 Gen 3 · 50MP · 256GB · Galaxy AI",
    price: 84900n,
    isFeatured: true,
    isDeal: false,
    isAccessory: false,
    inStock: true,
    imageId: PLACEHOLDER_BLOB,
  },
  {
    id: 3n,
    name: "Google Pixel 8",
    brand: "Google",
    category: "Flagship",
    description:
      "Pure Android experience with the best computational photography powered by Google Tensor G3.",
    specs: "Tensor G3 · 50MP · 128GB · 7yr updates",
    price: 69900n,
    isFeatured: true,
    isDeal: true,
    isAccessory: false,
    inStock: true,
    imageId: PLACEHOLDER_BLOB,
  },
  {
    id: 4n,
    name: "Xiaomi 14",
    brand: "Xiaomi",
    category: "Flagship",
    description:
      "Leica optics meets flagship performance at a fraction of the price.",
    specs: "Snapdragon 8 Gen 3 · Leica 50MP · 256GB",
    price: 64900n,
    isFeatured: true,
    isDeal: false,
    isAccessory: false,
    inStock: true,
    imageId: PLACEHOLDER_BLOB,
  },
  {
    id: 5n,
    name: "OnePlus 12",
    brand: "OnePlus",
    category: "Flagship",
    description:
      "Hasselblad cameras, 100W fast charging, and flagship performance at mid-range price.",
    specs: "Snapdragon 8 Gen 3 · 50MP · 256GB · 100W",
    price: 59900n,
    isFeatured: true,
    isDeal: false,
    isAccessory: false,
    inStock: true,
    imageId: PLACEHOLDER_BLOB,
  },
  {
    id: 6n,
    name: "iPhone 15",
    brand: "Apple",
    category: "Flagship",
    description:
      "Dynamic Island comes to iPhone 15 with USB-C and 48MP main camera.",
    specs: "A16 Bionic · 48MP · 128GB · USB-C",
    price: 79900n,
    isFeatured: true,
    isDeal: false,
    isAccessory: false,
    inStock: true,
    imageId: PLACEHOLDER_BLOB,
  },
];

export const SAMPLE_ACCESSORIES: Product[] = [
  {
    id: 7n,
    name: "MagSafe Charger",
    brand: "Apple",
    category: "Accessories",
    description: "Wireless MagSafe charging for iPhone.",
    specs: "15W · USB-C · Magnetic",
    price: 3900n,
    isFeatured: false,
    isDeal: false,
    isAccessory: true,
    inStock: true,
    imageId: PLACEHOLDER_BLOB,
  },
  {
    id: 8n,
    name: "Galaxy Buds3 Pro",
    brand: "Samsung",
    category: "Accessories",
    description: "Premium ANC earbuds with Hi-Fi audio and 360 Audio.",
    specs: "ANC · 360 Audio · 6hr battery",
    price: 19900n,
    isFeatured: false,
    isDeal: false,
    isAccessory: true,
    inStock: true,
    imageId: PLACEHOLDER_BLOB,
  },
  {
    id: 9n,
    name: "Anker PowerCore 20K",
    brand: "Anker",
    category: "Accessories",
    description: "High-capacity portable charger with 65W USB-C fast charging.",
    specs: "20000mAh · 65W USB-C · 2 ports",
    price: 4999n,
    isFeatured: false,
    isDeal: true,
    isAccessory: true,
    inStock: true,
    imageId: PLACEHOLDER_BLOB,
  },
];

export const PRODUCT_IMAGES: Record<string, string> = {
  "iPhone 15 Pro":
    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
  "Samsung Galaxy S24":
    "https://images.unsplash.com/photo-1707841194892-b6e7a4ff8aa1?w=400&h=400&fit=crop",
  "Google Pixel 8":
    "https://images.unsplash.com/photo-1698778874982-9e0b6e9b8e67?w=400&h=400&fit=crop",
  "Xiaomi 14":
    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
  "OnePlus 12":
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop",
  "iPhone 15":
    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
  "MagSafe Charger":
    "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=400&h=400&fit=crop",
  "Galaxy Buds3 Pro":
    "https://images.unsplash.com/photo-1610945264803-c22b62831e8b?w=400&h=400&fit=crop",
  "Anker PowerCore 20K":
    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
};

export function formatPrice(priceCents: bigint): string {
  return `$${(Number(priceCents) / 100).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

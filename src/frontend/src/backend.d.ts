import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ShoppingCart {
    items: Array<CartItem>;
}
export interface Product {
    id: bigint;
    inStock: boolean;
    name: string;
    description: string;
    isDeal: boolean;
    specs: string;
    isFeatured: boolean;
    category: string;
    brand: string;
    imageId: ExternalBlob;
    price: bigint;
    isAccessory: boolean;
}
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface UserProfile {
    name: string;
}
export interface WishList {
    productIds: Array<bigint>;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    addToWishlist(productId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    createProduct(product: Product): Promise<bigint>;
    deleteProduct(productId: bigint): Promise<void>;
    getAccessories(): Promise<Array<Product>>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<ShoppingCart>;
    getDealProducts(): Promise<Array<Product>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProductsByBrand(brand: string): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWishlist(user: Principal): Promise<WishList>;
    isCallerAdmin(): Promise<boolean>;
    removeFromCart(productId: bigint): Promise<void>;
    removeFromWishlist(productId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchByName(searchTerm: string): Promise<Array<Product>>;
    updateCartQuantity(productId: bigint, quantity: bigint): Promise<void>;
    updateProduct(productId: bigint, updatedProduct: Product): Promise<void>;
}

import List "mo:core/List";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Array "mo:core/Array";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  // --- Types ---
  public type Product = {
    id : Nat;
    name : Text;
    brand : Text;
    category : Text;
    description : Text;
    specs : Text;
    price : Nat;
    imageId : Storage.ExternalBlob;
    isFeatured : Bool;
    isDeal : Bool;
    isAccessory : Bool;
    inStock : Bool;
  };

  public type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  public type ShoppingCart = {
    items : [CartItem];
  };

  public type WishList = {
    productIds : [Nat];
  };

  public type UserProfile = {
    name : Text;
  };

  // --- State ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  let products = Map.empty<Nat, Product>();
  let shoppingCarts = Map.empty<Principal, ShoppingCart>();
  let wishlists = Map.empty<Principal, WishList>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextProductId = 0;

  // --- Helper Functions ---
  func createDefaultCart() : ShoppingCart {
    {
      items = [];
    };
  };

  // --- User Profile Functions ---
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // --- Admin Functions (CRUD) ---
  public shared ({ caller }) func createProduct(product : Product) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    let newProductId = nextProductId;
    nextProductId += 1;

    let newProduct : Product = {
      product with
      id = newProductId;
    };

    products.add(newProductId, newProduct);
    newProductId;
  };

  public shared ({ caller }) func updateProduct(productId : Nat, updatedProduct : Product) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    if (not products.containsKey(productId)) {
      Runtime.trap("Product not found");
    };
    let updated : Product = {
      updatedProduct with
      id = productId;
    };
    products.add(productId, updated);
  };

  public shared ({ caller }) func deleteProduct(productId : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    if (not products.containsKey(productId)) {
      Runtime.trap("Product not found");
    };
    products.remove(productId);
  };

  // --- Public Product Queries ---
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(func(p) { Text.equal(p.category, category) });
  };

  public query ({ caller }) func getProductsByBrand(brand : Text) : async [Product] {
    products.values().toArray().filter(func(p) { Text.equal(p.brand, brand) });
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().toArray().filter(func(p) { p.isFeatured });
  };

  public query ({ caller }) func getDealProducts() : async [Product] {
    products.values().toArray().filter(func(p) { p.isDeal });
  };

  public query ({ caller }) func getAccessories() : async [Product] {
    products.values().toArray().filter(func(p) { p.isAccessory });
  };

  public query ({ caller }) func searchByName(searchTerm : Text) : async [Product] {
    products.values().toArray().filter(func(p) {
      p.name.contains(#text searchTerm);
    });
  };

  // --- Shopping Cart ---
  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add to cart");
    };

    let currentCart = switch (shoppingCarts.get(caller)) {
      case (null) { createDefaultCart() };
      case (?cart) { cart };
    };

    // Convert cart items to a List for mutability
    let cartItemsList = List.fromArray<CartItem>(currentCart.items);

    var itemUpdated = false;
    let updatedItemsList = cartItemsList.map<CartItem, CartItem>(
      func(item) {
        if (item.productId == productId) {
          itemUpdated := true;
          { item with quantity };
        } else {
          item;
        };
      }
    );

    // If item wasn't updated, add new item
    let finalList = if (not itemUpdated) {
      let newItem : CartItem = {
        productId;
        quantity;
      };
      // Convert updatedItemsList to List and add new item
      let tempList = List.fromArray<CartItem>(updatedItemsList.toArray());
      tempList.add(newItem);
      tempList;
    } else {
      // Convert updatedItemsList to List if already updated
      List.fromArray<CartItem>(updatedItemsList.toArray());
    };

    // Convert back to array for ShoppingCart
    let updatedCart : ShoppingCart = {
      items = finalList.toArray();
    };

    shoppingCarts.add(caller, updatedCart);
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove from cart");
    };

    let currentCart = switch (shoppingCarts.get(caller)) {
      case (null) { createDefaultCart() };
      case (?cart) { cart };
    };

    let cartItemsList = List.fromArray<CartItem>(currentCart.items);
    let filteredItems = cartItemsList.filter(func(item) { item.productId != productId });

    let updatedCart : ShoppingCart = {
      items = filteredItems.toArray();
    };

    shoppingCarts.add(caller, updatedCart);
  };

  public shared ({ caller }) func updateCartQuantity(productId : Nat, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update cart");
    };

    if (quantity == 0) {
      await removeFromCart(productId);
      return;
    };

    await addToCart(productId, quantity);
  };

  public query ({ caller }) func getCart() : async ShoppingCart {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cart");
    };
    switch (shoppingCarts.get(caller)) {
      case (null) { createDefaultCart() };
      case (?cart) { cart };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear cart");
    };
    shoppingCarts.remove(caller);
  };

  // --- Wishlist ---
  public shared ({ caller }) func addToWishlist(productId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add to wishlist");
    };

    let currentWishlist = switch (wishlists.get(caller)) {
      case (null) { { productIds = [] } };
      case (?wishlist) { wishlist };
    };

    let productIdList = List.fromArray<Nat>(currentWishlist.productIds);

    if (not productIdList.contains(productId)) {
      productIdList.add(productId);
      let updatedWishlist : WishList = {
        productIds = productIdList.toArray();
      };

      wishlists.add(caller, updatedWishlist);
    };
  };

  public shared ({ caller }) func removeFromWishlist(productId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove from wishlist");
    };

    let currentWishlist = switch (wishlists.get(caller)) {
      case (null) { { productIds = [] } };
      case (?wishlist) { wishlist };
    };

    let newProductIds = List.fromArray<Nat>(currentWishlist.productIds);

    let filteredProductIdsIter = newProductIds.filter(
      func(pid) { pid != productId }
    );

    let finalProductIds = filteredProductIdsIter.toArray();

    let updatedWishlist : WishList = {
      productIds = finalProductIds;
    };
    wishlists.add(caller, updatedWishlist);
  };

  public query ({ caller }) func getWishlist(user : Principal) : async WishList {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own wishlist");
    };
    switch (wishlists.get(user)) {
      case (null) { { productIds = [] } };
      case (?wishlist) { wishlist };
    };
  };
};

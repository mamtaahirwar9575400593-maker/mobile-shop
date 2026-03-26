# Mobile Shop

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Product catalog with phone listings (name, specs, price, image, brand, category)
- Brand/category navigation (Apple, Samsung, Google, Xiaomi, Budget, Flagship, Accessories, Sale)
- Shopping cart (add/remove items, view cart, quantity)
- Admin panel: add/edit/delete products (with image upload)
- Featured products section
- Deals of the week section
- Top accessories section
- Hero banner section
- Footer with newsletter subscription, links, social icons, payment logos
- Search functionality
- Wishlist (save products)

### Modify
N/A (new project)

### Remove
N/A (new project)

## Implementation Plan
1. Backend (Motoko): Product store with CRUD, cart state per user, wishlist, categories/brands, featured flags
2. Blob storage: product image uploads
3. Authorization: admin vs. guest roles
4. Frontend: hero, category tiles, featured grid, deals + accessories row, footer; cart sidebar; admin product management

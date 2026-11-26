# Restaurant food details - spec for the backend developer

When a customer opens a dish (for example a pizza) the website shows a details window. This file lists
exactly what that window needs, the JSON the frontend expects, and a suggested database layout.
Online ordering is NOT in scope yet (PRD section 14, future), but this structure (sizes + extras) is what
ordering will need later, so it is worth building it this way now.

## 1. What the customer sees for "Margherita Royale" (pizza)

- Photo, name, category, rating and number of reviews, badge (New / Hot / Best Seller / Chef's Pick)
- Price ("From N8,500") and an old price when discounted
- A longer description
- **Sizes & prices**: Small (8") 1 person N8,500 / Medium (12") 2 people N12,500 / Large (16") 3-4 people N16,500
- **Ingredients**: Sourdough base, San Marzano tomato sauce, Buffalo mozzarella, Fresh basil, Truffle oil
- **Optional extras**: Extra mozzarella +N1,000, Mushrooms +N800, Black olives +N600, Grilled chicken +N1,500
- **Good to know**: tags (Vegetarian), preparation time, calories, spice level (0-3)
- **Allergens**: Gluten, Dairy
- "Not available today" when the kitchen has run out

## 2. Endpoints

| Endpoint | Purpose |
|---|---|
| `GET /api/menu` | The list: categories + dishes with SUMMARY fields (see API_CONTRACT.md section 6) |
| `GET /api/menu/{id}` | ONE dish with summary fields + detail fields (below) |

Both are public (no login). Responses use the standard `{ success, message, data }` wrapper.

## 3. `GET /api/menu/2` - example `data`

```json
{
  "id": 2,
  "name": "Margherita Royale",
  "category": "pizza",
  "description": "San Marzano tomatoes, buffalo mozzarella, basil & truffle oil on sourdough",
  "price": 8500,
  "priceFrom": true,
  "oldPrice": 10500,
  "rating": 4.9,
  "reviews": 95,
  "badge": "New",
  "image": "https://example.com/uploads/menu/margherita.jpg",

  "longDescription": "Our signature pizza on a slow-fermented sourdough base: San Marzano tomato sauce, creamy buffalo mozzarella, fresh basil and a light drizzle of truffle oil, baked in a stone oven until the crust is blistered and golden.",
  "images": ["https://example.com/uploads/menu/margherita.jpg"],
  "ingredients": ["Sourdough base", "San Marzano tomato sauce", "Buffalo mozzarella", "Fresh basil", "Truffle oil"],
  "sizes": [
    { "id": "small",  "label": "Small (8\")",  "serves": "1 person",   "price": 8500,  "oldPrice": 10500 },
    { "id": "medium", "label": "Medium (12\")", "serves": "2 people",  "price": 12500, "oldPrice": 14500 },
    { "id": "large",  "label": "Large (16\")",  "serves": "3-4 people", "price": 16500, "oldPrice": 19000 }
  ],
  "extras": [
    { "id": "extra-cheese", "name": "Extra mozzarella", "price": 1000 },
    { "id": "mushrooms",    "name": "Mushrooms",        "price": 800 },
    { "id": "olives",       "name": "Black olives",     "price": 600 },
    { "id": "chicken",      "name": "Grilled chicken",  "price": 1500 }
  ],
  "tags": ["Vegetarian"],
  "allergens": ["Gluten", "Dairy"],
  "spiceLevel": 0,
  "calories": 820,
  "prepTime": "15-20 min",
  "available": true
}
```

## 4. Field rules

| Field | Type | Rules |
|---|---|---|
| `price` | number | Naira, whole number. If the dish has sizes: the SMALLEST size price, and `priceFrom` is `true` |
| `oldPrice` | number or null | Only when discounted |
| `longDescription` | string | Plain text |
| `images` | string[] | Full URLs; the first is the main photo. Empty array is allowed (frontend shows a placeholder) |
| `ingredients` | string[] | Never null; use `[]` |
| `sizes` | object[] | `[]` when the dish has one size. Each size: `id` (string), `label`, `serves` (optional text), `price`, `oldPrice` (or null) |
| `extras` | object[] | `[]` when none. Each: `id`, `name`, `price` |
| `tags` | string[] | e.g. `Vegetarian`, `Vegan`, `Halal`, `Gluten-free` |
| `allergens` | string[] | e.g. `Gluten`, `Dairy`, `Egg`, `Nuts`, `Fish`, `Soy` |
| `spiceLevel` | integer | 0 (not spicy) to 3 (very hot) |
| `calories` | integer or null | Per serving |
| `prepTime` | string or null | e.g. `"15-20 min"` |
| `available` | boolean | `false` -> shown as "Not available today" (do not delete the dish) |

Every key above must always be present (use `[]`, `null` or `false` when empty) so the frontend never has to guess.

## 5. Suggested MySQL tables

```sql
CREATE TABLE menu_categories (
  id            VARCHAR(40) PRIMARY KEY,         -- 'pizza', 'fastfood'
  name          VARCHAR(80) NOT NULL,            -- 'Fast Food'
  pill          VARCHAR(40) NOT NULL,            -- short label for the filter button
  image         VARCHAR(255) NULL,
  hidden        TINYINT(1) NOT NULL DEFAULT 0,
  sort_order    INT NOT NULL DEFAULT 0
);

CREATE TABLE menu_items (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  category_id      VARCHAR(40) NOT NULL,
  name             VARCHAR(120) NOT NULL,
  description      VARCHAR(255) NOT NULL,        -- short text on the card
  long_description TEXT NULL,
  base_price       INT NOT NULL,                 -- Naira; smallest size when sizes exist
  old_price        INT NULL,
  badge            VARCHAR(30) NULL,
  spice_level      TINYINT NOT NULL DEFAULT 0,   -- 0..3
  calories         INT NULL,
  prep_time        VARCHAR(30) NULL,
  tags             JSON NOT NULL,                -- ["Vegetarian"]
  allergens        JSON NOT NULL,                -- ["Gluten","Dairy"]
  ingredients      JSON NOT NULL,                -- ["Sourdough base", ...]
  available        TINYINT(1) NOT NULL DEFAULT 1,
  sort_order       INT NOT NULL DEFAULT 0,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES menu_categories(id)
);

CREATE TABLE menu_item_images (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  item_id    INT NOT NULL,
  url        VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,             -- 0 = main photo
  FOREIGN KEY (item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

CREATE TABLE menu_item_sizes (
  id        VARCHAR(40) NOT NULL,                -- 'small' (unique per item)
  item_id   INT NOT NULL,
  label     VARCHAR(60) NOT NULL,                -- 'Small (8")'
  serves    VARCHAR(40) NULL,                    -- '1 person'
  price     INT NOT NULL,
  old_price INT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (item_id, id),
  FOREIGN KEY (item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

CREATE TABLE menu_item_extras (
  id        VARCHAR(40) NOT NULL,                -- 'extra-cheese'
  item_id   INT NOT NULL,
  name      VARCHAR(80) NOT NULL,
  price     INT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (item_id, id),
  FOREIGN KEY (item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);
```
`rating` and `reviews` on a dish can be calculated from a future reviews table, or stored as two columns for now.

## 6. What the admin dashboard must manage (PRD section 6.1 A)

Create / edit / hide a dish; upload and reorder photos; edit short and long descriptions; set base price, old price and badge;
add / edit / remove sizes and extras; choose tags, allergens, spice level, prep time; switch "available" on and off;
manage categories (name, filter label, image, hidden, order).

## 7. Image uploads

JPG/PNG/WebP, max 2 MB, resize to about 1200px wide on upload, store the full URL in the database.

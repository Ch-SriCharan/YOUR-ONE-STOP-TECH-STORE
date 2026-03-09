# TECH-STORE

A frontend-only e-commerce website for tech products, built with HTML, CSS, and JavaScript.

## Project Structure

```
html project/
├── frontend/               # All website files
│   ├── index.html          # Main storefront page
│   ├── style.css           # Global styles + cart UI styles
│   ├── script.js           # Filter logic + cart (imports Stack from dsa/)
│   ├── compare.html        # Phone comparison page
│   ├── compare.css         # Styles specific to the compare page
│   ├── form.html           # Student registration form
│   └── assets/             # Product images (iphone.png, macbook.png, etc.)
│
├── dsa/
│   └── stack.js            # Stack class (ES6) — push, pop, peek, isEmpty, getItems
│
└── README.md
```

## How to Run

> **Important:** `script.js` uses ES6 `import/export` modules.
> Browsers block module imports on `file://` URLs for security reasons.
> You **must** serve the site via a local HTTP server.

### Option 1 — VS Code Live Server (recommended)
1. Install the **Live Server** extension in VS Code
2. Right-click `frontend/index.html`
3. Select **"Open with Live Server"**

### Option 2 — Python HTTP Server
```bash
cd "html project/frontend"
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

---

## Stack Data Structure (dsa/stack.js)

The cart uses a **LIFO Stack** implemented as an ES6 class.

| Method | Description |
|--------|-------------|
| `push(item)` | Add item to top of stack |
| `pop()` | Remove & return top item |
| `peek()` | Read top item without removing |
| `isEmpty()` | Returns `true` if stack is empty |
| `size()` | Returns number of items |
| `getItems()` | Returns a shallow copy of all items |
| `clear()` | Empties the stack |

### Cart Usage

```js
import Stack from '../dsa/stack.js';

const cartStack    = new Stack();  // main cart (LIFO)
const removedStack = new Stack();  // undo history

// Add to cart
cartStack.push({ name: 'iPhone 16 Pro Max', price: 1199 });

// Remove last added
const item = cartStack.pop();
removedStack.push(item);   // save for undo

// Undo remove
const restored = removedStack.pop();
cartStack.push(restored);

// Peek at top
console.log(cartStack.peek());   // most recently added item
```

## Features

- Product grid with category filter (All / Mobile / Earphones / Desktop Parts / Laptops)
- Stack-based Add to Cart (LIFO)
- Remove Last Item (pop)
- Undo Remove (re-push)
- Live peek display — always shows the top of the stack
- Animated slide-in cart panel
- Running price total
- Phone comparison page

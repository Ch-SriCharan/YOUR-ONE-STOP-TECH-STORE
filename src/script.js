/**
 * frontend/script.js
 * ─────────────────────────────────────────────────────────────
 * Site interactions + Stack-based Add to Cart
 *
 * Stack class is inlined below so this script works when opened
 * directly from the file system (no web server / ES6 modules needed).
 * ─────────────────────────────────────────────────────────────
 */

// ── Stack Data Structure (inlined from dsa/stack.js) ───────────
// LIFO — the END of the array is the TOP of the stack.
class Stack {
    constructor() {
        this._items = [];
    }

    push(item) {
        this._items.push(item);
    }

    pop() {
        if (this.isEmpty()) return undefined;
        return this._items.pop();
    }

    peek() {
        if (this.isEmpty()) return null;
        return this._items[this._items.length - 1];
    }

    isEmpty() {
        return this._items.length === 0;
    }

    size() {
        return this._items.length;
    }

    getItems() {
        return [...this._items];
    }

    clear() {
        this._items = [];
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // Product Filter Buttons
    // =========================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card-wrap');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            productCards.forEach(card => {
                card.style.display =
                    (filterValue === 'all' || card.getAttribute('data-category') === filterValue)
                        ? 'block' : 'none';
            });
        });
    });

    // =========================================================
    // STACK INSTANCES
    // =========================================================

    // Main cart — items are pushed/popped LIFO
    const cartStack = new Stack();

    // Undo history — holds items removed via "Remove Last"
    const removedStack = new Stack();

    // ── DOM References ──────────────────────────────────────
    const cartPanel = document.getElementById('cart-panel');
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const removeLastBtn = document.getElementById('remove-last-btn');
    const undoRemoveBtn = document.getElementById('undo-remove-btn');
    const cartEmpty = document.getElementById('cart-empty');
    const peekDisplay = document.getElementById('peek-display');
    const cartOverlay = document.getElementById('cart-overlay');

    // ── Open / Close Cart ───────────────────────────────────
    cartToggleBtn.addEventListener('click', () => cartPanel.classList.toggle('cart-open'));
    cartCloseBtn.addEventListener('click', () => cartPanel.classList.remove('cart-open'));
    cartOverlay.addEventListener('click', () => cartPanel.classList.remove('cart-open'));

    // Keep overlay in sync with panel open/close state
    const overlayObserver = new MutationObserver(() => {
        cartOverlay.classList.toggle('cart-overlay--active', cartPanel.classList.contains('cart-open'));
    });
    overlayObserver.observe(cartPanel, { attributes: true, attributeFilter: ['class'] });

    // =========================================================
    // PUSH — Add item to the top of the cart stack
    // =========================================================
    function pushToCart(name, price, imgSrc) {
        const item = { id: Date.now(), name, price, imgSrc };
        cartStack.push(item);
        removedStack.clear();
        renderCart();
        cartPanel.classList.add('cart-open');

        // Bounce animation on cart icon
        cartToggleBtn.classList.add('cart-bounce');
        setTimeout(() => cartToggleBtn.classList.remove('cart-bounce'), 400);
    }

    // =========================================================
    // POP — Remove the top item from the cart stack
    // =========================================================
    removeLastBtn.addEventListener('click', () => {
        if (cartStack.isEmpty()) return;
        const removed = cartStack.pop();
        removedStack.push(removed);
        renderCart();
    });

    // =========================================================
    // UNDO REMOVE — Re-push the last removed item
    // =========================================================
    undoRemoveBtn.addEventListener('click', () => {
        if (removedStack.isEmpty()) return;
        const restored = removedStack.pop();
        cartStack.push(restored);
        renderCart();
    });

    // =========================================================
    // RENDER — Rebuild cart UI from current stack state
    // =========================================================
    function renderCart() {
        cartItemsList.innerHTML = '';

        if (cartStack.isEmpty()) {
            cartEmpty.style.display = 'block';
            removeLastBtn.disabled = true;
        } else {
            cartEmpty.style.display = 'none';
            removeLastBtn.disabled = false;
        }

        undoRemoveBtn.disabled = removedStack.isEmpty();

        const items = cartStack.getItems();

        // Update badge
        cartCount.textContent = items.length;
        cartCount.style.display = items.length > 0 ? 'flex' : 'none';

        // Running total
        const total = items.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

        // Render items top → bottom (iterate reversed so TOP appears first)
        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];
            const isTop = (i === items.length - 1);

            const li = document.createElement('li');
            li.classList.add('cart-item');
            if (isTop) li.classList.add('cart-item--top');

            li.innerHTML = `
                <div class="cart-item-img-wrap">
                    <img src="${item.imgSrc}" alt="${item.name}" class="cart-item-img"
                         onerror="this.style.display='none'">
                </div>
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                ${isTop
                    ? '<span class="stack-top-badge">TOP</span>'
                    : `<span class="stack-pos">#${items.length - i}</span>`
                }
            `;
            cartItemsList.appendChild(li);
        }

        // Stack.peek() → view TOP item without removing
        const topItem = cartStack.peek();
        if (topItem) {
            peekDisplay.textContent = `Top of Stack: ${topItem.name}`;
            peekDisplay.style.display = 'block';
        } else {
            peekDisplay.style.display = 'none';
        }
    }

    // ── Wire up "Add to Cart" buttons ───────────────────────
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            pushToCart(
                btn.getAttribute('data-name'),
                parseFloat(btn.getAttribute('data-price')),
                btn.getAttribute('data-img')
            );
        });
    });

    // Initialise to empty state
    renderCart();
});

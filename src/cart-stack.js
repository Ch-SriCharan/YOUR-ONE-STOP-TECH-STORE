/**
 * cart-stack.js
 * ─────────────────────────────────────────────────────────────
 * Stack Data Structure (LIFO) — Add to Cart Implementation
 *
 * Stack operations used:
 *   push()  → array.push()  — add item to the TOP of the stack
 *   pop()   → array.pop()   — remove item from the TOP of the stack
 *   peek()  → array[length-1] — read TOP item without removing it
 * ─────────────────────────────────────────────────────────────
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // STACK STATE
    // =========================================================

    // Primary cart stack — stores cart item objects (LIFO)
    const cartStack = [];

    // Secondary "undo" stack — holds recently popped items so
    // the user can restore the last removed item
    const removedStack = [];

    // ---- Helper: Peek at the top of a stack ----
    function peek(stack) {
        // Returns the last element (top of stack) without removing it,
        // or null if the stack is empty
        return stack.length > 0 ? stack[stack.length - 1] : null;
    }

    // =========================================================
    // DOM REFERENCES
    // =========================================================
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

    // =========================================================
    // OPEN / CLOSE CART PANEL
    // =========================================================
    cartToggleBtn.addEventListener('click', () => {
        cartPanel.classList.toggle('cart-open');
    });

    cartCloseBtn.addEventListener('click', () => {
        cartPanel.classList.remove('cart-open');
    });

    // =========================================================
    // PUSH — Add item to the cart stack
    // =========================================================
    function pushToCart(name, price, imgSrc) {
        // Build a cart item object with a unique timestamp id
        const item = {
            id: Date.now(),
            name,
            price,
            imgSrc
        };

        // STACK PUSH: add item to the top (end of array)
        cartStack.push(item);

        // Reset undo stack on every new push to keep UX intuitive
        removedStack.length = 0;

        renderCart();

        // Open the cart panel for immediate visual feedback
        cartPanel.classList.add('cart-open');

        // Bounce animation on the cart icon
        cartToggleBtn.classList.add('cart-bounce');
        setTimeout(() => cartToggleBtn.classList.remove('cart-bounce'), 400);
    }

    // =========================================================
    // POP — Remove the most recently added item (top of stack)
    // =========================================================
    removeLastBtn.addEventListener('click', () => {
        if (cartStack.length === 0) return;
        // STACK POP: remove from the top (last element)
        const removed = cartStack.pop();
        // Store it in removedStack so Undo can restore it
        removedStack.push(removed);
        renderCart();
    });
    // =========================================================
    // UNDO REMOVE — Re-push the last popped item back onto the stack
    // =========================================================
    undoRemoveBtn.addEventListener('click', () => {
        if (removedStack.length === 0) return;
        // Pop from removedStack → push back onto cartStack
        const restored = removedStack.pop();
        cartStack.push(restored);
        renderCart();
    });
    // =========================================================
    // RENDER — Rebuild the cart UI from current stack state
    // =========================================================
    function renderCart() {
        // Clear the displayed list
        cartItemsList.innerHTML = '';

        // Toggle empty-state message and Remove button
        if (cartStack.length === 0) {
            cartEmpty.style.display = 'block';
            removeLastBtn.disabled = true;
        } else {
            cartEmpty.style.display = 'none';
            removeLastBtn.disabled = false;
        }

        // Enable/disable Undo button
        undoRemoveBtn.disabled = removedStack.length === 0;

        // Update item count badge
        cartCount.textContent = cartStack.length;
        cartCount.style.display = cartStack.length > 0 ? 'flex' : 'none';

        // Compute and display running total
        const total = cartStack.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

        // Render items top → bottom (iterate in reverse so top of stack is first)
        for (let i = cartStack.length - 1; i >= 0; i--) {
            const item = cartStack[i];
            const isTop = (i === cartStack.length - 1);

            const li = document.createElement('li');
            li.classList.add('cart-item');
            if (isTop) li.classList.add('cart-item--top'); // visually highlight stack top

            li.innerHTML = `
                <div class="cart-item-img-wrap">
                    <img src="${item.imgSrc}" alt="${item.name}" class="cart-item-img" onerror="this.style.display='none'">
                </div>
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                ${isTop
                    ? '<span class="stack-top-badge">TOP</span>'
                    : `<span class="stack-pos">#${cartStack.length - i}</span>`
                }
            `;
            cartItemsList.appendChild(li);
        }

        // PEEK — show the current top-of-stack item in the info bar
        const topItem = peek(cartStack);
        if (topItem) {
            peekDisplay.textContent = `Top of Stack: ${topItem.name}`;
            peekDisplay.style.display = 'block';
        } else {
            peekDisplay.style.display = 'none';
        }
    }

    // =========================================================
    // WIRE UP "ADD TO CART" BUTTONS
    // =========================================================
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Prevent the parent <a> tag from navigating
            e.preventDefault();
            e.stopPropagation();

            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));
            const img = btn.getAttribute('data-img');

            pushToCart(name, price, img);
        });
    });

    // Initial render to set up empty-state correctly
    renderCart();
});

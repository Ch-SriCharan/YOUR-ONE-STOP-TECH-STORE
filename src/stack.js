/**
 * dsa/stack.js
 * ─────────────────────────────────────────────────────────────
 * Stack Data Structure — LIFO (Last In, First Out)
 *
 * Implemented as an ES6 class wrapping a plain JS array.
 * The END of the array is treated as the TOP of the stack.
 *
 *   push()     → Array.push()   : add to TOP  (O(1))
 *   pop()      → Array.pop()    : remove from TOP  (O(1))
 *   peek()     → arr[last]      : read TOP without removing  (O(1))
 *   isEmpty()  → length === 0   : check if stack has no items (O(1))
 *   getItems() → [...arr]       : safe copy of all items  (O(n))
 * ─────────────────────────────────────────────────────────────
 */

export default class Stack {
    constructor() {
        // Internal storage — private by convention
        this._items = [];
    }

    // ── PUSH ─────────────────────────────────────────────────
    // Adds `item` to the TOP of the stack.
    push(item) {
        this._items.push(item);
    }

    // ── POP ──────────────────────────────────────────────────
    // Removes and returns the TOP item.
    // Returns undefined if the stack is empty.
    pop() {
        if (this.isEmpty()) return undefined;
        return this._items.pop();
    }

    // ── PEEK ─────────────────────────────────────────────────
    // Returns the TOP item WITHOUT removing it.
    // Returns null if the stack is empty.
    peek() {
        if (this.isEmpty()) return null;
        return this._items[this._items.length - 1];
    }

    // ── IS EMPTY ─────────────────────────────────────────────
    // Returns true when the stack contains no items.
    isEmpty() {
        return this._items.length === 0;
    }

    // ── SIZE ─────────────────────────────────────────────────
    // Returns the number of items currently in the stack.
    size() {
        return this._items.length;
    }

    // ── GET ITEMS ────────────────────────────────────────────
    // Returns a shallow copy of all items (bottom → top order).
    // We return a copy so callers cannot mutate internal state.
    getItems() {
        return [...this._items];
    }

    // ── CLEAR ────────────────────────────────────────────────
    // Empties the stack.
    clear() {
        this._items = [];
    }
}

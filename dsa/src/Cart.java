import java.util.LinkedList;

public class Cart {
    // LinkedList -> to implement the shopping cart allowing fast insertions/removals
    private LinkedList<Product> cartItems;

    public Cart() {
        cartItems = new LinkedList<>();
    }

    public void addProduct(Product product) {
        if (product.getStock() > 0) {
            cartItems.add(product);
            product.setStock(product.getStock() - 1);
            System.out.println(product.getName() + " added to cart.");
        } else {
            System.out.println("Sorry, " + product.getName() + " is out of stock.");
        }
    }

    public void removeProduct(Product product) {
        if (cartItems.remove(product)) {
            product.setStock(product.getStock() + 1);
            System.out.println(product.getName() + " removed from cart.");
        } else {
            System.out.println("Product not found in cart.");
        }
    }

    public void viewCart() {
        System.out.println("\nYour Cart:");
        if (cartItems.isEmpty()) {
            System.out.println("Cart is empty.");
        } else {
            for (Product p : cartItems) {
                System.out.println("- " + p.getName() + " | Rs." + p.getPrice());
            }
            System.out.printf("Total Items: %d\n", cartItems.size());
            System.out.printf("Total Bill : Rs.%.2f\n", calculateTotal());
        }
    }

    public double calculateTotal() {
        double total = 0;
        for (Product p : cartItems) {
            total += p.getPrice();
        }
        return total;
    }

    public LinkedList<Product> getCheckoutItems() {
        // Return a copy so we can clear the cart safely afterwards
        LinkedList<Product> itemsToCheckout = new LinkedList<>(cartItems);
        return itemsToCheckout;
    }
    
    public void clear() {
        cartItems.clear();
    }
    
    public boolean isEmpty() {
        return cartItems.isEmpty();
    }
}

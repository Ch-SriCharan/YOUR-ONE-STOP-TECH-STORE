import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Store store = new Store();
        Cart cart = new Cart();
        OrderQueue orderQueue = new OrderQueue();

        System.out.println("Welcome to CLI Store");

        boolean running = true;
        while (running) {
            System.out.println("\n--- Main Menu ---");
            System.out.println("1. Browse Categories");
            System.out.println("2. Search Product");
            System.out.println("3. View Cart");
            System.out.println("4. Checkout");
            System.out.println("5. Exit");
            System.out.print("Select option: ");

            int choice = -1;
            try {
                choice = Integer.parseInt(scanner.nextLine().trim());
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a number.");
                continue;
            }

            switch (choice) {
                case 1:
                    browseCategories(scanner, store, cart);
                    break;
                case 2:
                    searchMenu(scanner, store, cart);
                    break;
                case 3:
                    manageCart(scanner, cart, store);
                    break;
                case 4:
                    checkout(scanner, cart, orderQueue);
                    break;
                case 5:
                    System.out.println("Exiting the CLI Store. Goodbye!");
                    running = false;
                    break;
                default:
                    System.out.println("Invalid option. Please select between 1 and 5.");
            }
        }
        
        scanner.close();
    }

    private static void browseCategories(Scanner scanner, Store store, Cart cart) {
        store.displayCategories();
        System.out.print("Select category: ");
        int catChoice;
        try {
            catChoice = Integer.parseInt(scanner.nextLine().trim());
        } catch (NumberFormatException e) {
            System.out.println("Invalid category selection.");
            return;
        }

        store.displayProductsByCategory(catChoice);
        System.out.print("\nEnter Product ID to add to cart (or press Enter to return): ");
        String pId = scanner.nextLine().trim();
        
        if (!pId.isEmpty()) {
            Product product = store.getProductById(pId);
            if (product != null) {
                cart.addProduct(product);
            } else {
                System.out.println("Product ID not found.");
            }
        }
    }

    private static void searchMenu(Scanner scanner, Store store, Cart cart) {
        System.out.println("\n--- Search & Sort ---");
        System.out.println("1. Search by Name (Linear Search)");
        System.out.println("2. Display All Products Sorted by Price (Bubble Sort)");
        System.out.println("3. Display All Products Sorted by Name (Bubble Sort)");
        System.out.print("Select option: ");
        
        int choice;
        try {
            choice = Integer.parseInt(scanner.nextLine().trim());
        } catch (NumberFormatException e) {
            System.out.println("Invalid input.");
            return;
        }
        
        List<Product> allProducts = store.getAllProducts();

        switch (choice) {
            case 1:
                System.out.print("Enter product name to search: ");
                String name = scanner.nextLine().trim();
                Product found = SearchSortUtils.linearSearchByName(allProducts, name);
                if (found != null) {
                    System.out.println("Product found: " + found);
                    System.out.print("Add to cart? (y/n): ");
                    if (scanner.nextLine().trim().equalsIgnoreCase("y")) {
                        cart.addProduct(found);
                    }
                } else {
                    System.out.println("Product not found.");
                }
                break;
            case 2:
                SearchSortUtils.bubbleSortByPrice(allProducts);
                System.out.println("\nProducts Sorted by Price:");
                for (Product p : allProducts) System.out.println(p);
                break;
            case 3:
                SearchSortUtils.bubbleSortByName(allProducts);
                System.out.println("\nProducts Sorted by Name:");
                for (Product p : allProducts) System.out.println(p);
                break;
            default:
                System.out.println("Invalid option.");
        }
    }

    private static void manageCart(Scanner scanner, Cart cart, Store store) {
        cart.viewCart();
        if (!cart.isEmpty()) {
            System.out.println("\n1. Remove item");
            System.out.println("2. Return to Main Menu");
            System.out.print("Select option: ");
            String input = scanner.nextLine().trim();
            if (input.equals("1")) {
                System.out.print("Enter Product ID to remove: ");
                String pId = scanner.nextLine().trim();
                Product p = store.getProductById(pId);
                if (p != null) {
                    cart.removeProduct(p);
                } else {
                    System.out.println("Product ID not found.");
                }
            }
        }
    }

    private static void checkout(Scanner scanner, Cart cart, OrderQueue orderQueue) {
        if (cart.isEmpty()) {
            System.out.println("Your cart is empty. Please add items before checking out.");
            return;
        } 
        
        System.out.println("\n--- Checkout ---");
        cart.viewCart();
        System.out.print("Confirm purchase? (y/n): ");
        String confirm = scanner.nextLine().trim();
        
        if (confirm.equalsIgnoreCase("y")) {
            orderQueue.addOrder(cart.getCheckoutItems());
            cart.clear();
            orderQueue.processOrders();
        } else {
            System.out.println("Checkout cancelled.");
        }
    }
}

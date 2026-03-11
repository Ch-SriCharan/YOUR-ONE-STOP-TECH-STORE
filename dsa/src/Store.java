import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Store {
    // ArrayList -> to store all products sequentially
    private List<Product> products;
    
    // HashMap<String, Product> -> to efficiently search products by productId (O(1) lookup)
    private Map<String, Product> productMap;
    
    // Using an Array to define categories for quick indexing
    private String[] categories = {"Groceries", "Electronics", "Clothes", "Stationery"};

    public Store() {
        products = new ArrayList<>();
        productMap = new HashMap<>();
        initializeProducts();
    }

    private void initializeProducts() {
        addProduct(new Product("P101", "Laptop", 50000, "Electronics", 10));
        addProduct(new Product("P102", "Phone", 20000, "Electronics", 15));
        addProduct(new Product("P201", "Apple", 150, "Groceries", 100));
        addProduct(new Product("P202", "Bread", 40, "Groceries", 50));
        addProduct(new Product("P301", "T-Shirt", 500, "Clothes", 30));
        addProduct(new Product("P302", "Jeans", 1200, "Clothes", 20));
        addProduct(new Product("P401", "Notebook", 100, "Stationery", 40));
        addProduct(new Product("P402", "Pen", 20, "Stationery", 200));
    }

    private void addProduct(Product product) {
        products.add(product);
        productMap.put(product.getProductId(), product);
    }

    public void displayCategories() {
        System.out.println("\nCategories:");
        for (int i = 0; i < categories.length; i++) {
            System.out.println((i + 1) + ". " + categories[i]);
        }
    }

    public void displayProductsByCategory(int categoryIndex) {
        if (categoryIndex < 1 || categoryIndex > categories.length) {
            System.out.println("Invalid category selected.");
            return;
        }
        
        String category = categories[categoryIndex - 1];
        System.out.println("\nProducts in " + category + ":");
        boolean found = false;
        
        for (Product p : products) {
            if (p.getCategory().equalsIgnoreCase(category)) {
                System.out.println(p);
                found = true;
            }
        }
        
        if (!found) {
            System.out.println("No products found in this category.");
        }
    }

    public Product getProductById(String productId) {
        // Fast retrieval using HashMap
        return productMap.get(productId.toUpperCase());
    }

    public List<Product> getAllProducts() {
        return products;
    }
}

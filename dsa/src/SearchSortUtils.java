import java.util.List;

public class SearchSortUtils {
    
    // Linear Search Data Structure: Array/List iteration to find object
    public static Product linearSearchByName(List<Product> products, String targetName) {
        for (Product p : products) {
            if (p.getName().equalsIgnoreCase(targetName)) {
                return p;
            }
        }
        return null; // Handle not found
    }

    // Bubble Sort to sort products by price (Ascending)
    public static void bubbleSortByPrice(List<Product> products) {
        int n = products.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (products.get(j).getPrice() > products.get(j + 1).getPrice()) {
                    // swap
                    Product temp = products.get(j);
                    products.set(j, products.get(j + 1));
                    products.set(j + 1, temp);
                }
            }
        }
    }

    // Bubble Sort to sort products by name (Alphabetical)
    public static void bubbleSortByName(List<Product> products) {
        int n = products.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (products.get(j).getName().compareToIgnoreCase(products.get(j + 1).getName()) > 0) {
                    // swap
                    Product temp = products.get(j);
                    products.set(j, products.get(j + 1));
                    products.set(j + 1, temp);
                }
            }
        }
    }
}

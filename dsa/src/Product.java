public class Product {
    private String productId;
    private String name;
    private double price;
    private String category;
    private int stock;

    public Product(String productId, String name, double price, String category, int stock) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.category = category;
        this.stock = stock;
    }

    public String getProductId() { return productId; }
    public String getName() { return name; }
    public double getPrice() { return price; }
    public String getCategory() { return category; }
    public int getStock() { return stock; }
    
    public void setStock(int stock) { this.stock = stock; }

    @Override
    public String toString() {
        return String.format("ID: %s | Name: %s | Price: Rs.%.2f | Category: %s | Stock: %d", 
                             productId, name, price, category, stock);
    }
}

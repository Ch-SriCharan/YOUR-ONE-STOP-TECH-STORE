import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class OrderQueue {
    // Queue -> to simulate order processing (FIFO - First In First Out)
    private Queue<List<Product>> orders;

    public OrderQueue() {
        // Queue implemented using LinkedList
        orders = new LinkedList<>();
    }

    public void addOrder(List<Product> orderItems) {
        orders.add(orderItems);
        System.out.println("Order added to processing queue. You are number " + orders.size() + " in line.");
    }

    public void processOrders() {
        System.out.println("\nProcessing Orders...");
        while (!orders.isEmpty()) {
            List<Product> order = orders.poll();
            System.out.println("Processing order with " + order.size() + " items...");
            try {
                // Simulate processing time
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.err.println("Order processing interrupted.");
            }
            System.out.println("Order Completed Successfully!");
        }
        System.out.println("All orders processed.");
    }
}

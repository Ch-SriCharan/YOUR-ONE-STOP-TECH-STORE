const readline = require("readline");

class PriorityQueue {
    constructor() {
        this.tasks = [];
    }

    addTask(name, priority) {
        this.tasks.push({ name, priority });

        // sort by priority (highest first)
        this.tasks.sort((a, b) => b.priority - a.priority);
    }

    runTask() {
        if (this.tasks.length === 0) {
            console.log("No tasks to run");
            return;
        }

        const task = this.tasks.shift();
        console.log("Running task:", task.name, "| Priority:", task.priority);
    }

    showTasks() {
        if (this.tasks.length === 0) {
            console.log("No tasks in queue");
            return;
        }

        console.log("\nPending Tasks:");
        this.tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.name} (Priority: ${task.priority})`);
        });
    }
}

const scheduler = new PriorityQueue();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    console.log("\nTask Scheduler");
    console.log("1. Add Task");
    console.log("2. Run Next Task");
    console.log("3. Show Tasks");
    console.log("4. Exit");

    rl.question("Choose option: ", (choice) => {

        if (choice === "1") {
            rl.question("Task name: ", (name) => {
                rl.question("Priority number: ", (priority) => {
                    scheduler.addTask(name, parseInt(priority));
                    console.log("Task added");
                    menu();
                });
            });
        }

        else if (choice === "2") {
            scheduler.runTask();
            menu();
        }

        else if (choice === "3") {
            scheduler.showTasks();
            menu();
        }

        else if (choice === "4") {
            rl.close();
        }

        else {
            console.log("Invalid choice");
            menu();
        }
    });
}

menu();
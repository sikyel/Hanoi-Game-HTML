public class TowerOfHanoi {

    // Recursive method to solve Tower of Hanoi
    public static void solveHanoi(int n, String source, String auxiliary, String target) {
        if (n == 0) {
            return; // Base case: no disk to move
        }

        // Move n-1 disks from source to auxiliary
        solveHanoi(n - 1, source, target, auxiliary);

        // Move the nth disk from source to target
        System.out.println("Move disk " + n + " from " + source + " to " + target);

        // Move n-1 disks from auxiliary to target
        solveHanoi(n - 1, auxiliary, source, target);
    }

    public static void main(String[] args) {
        int numDisks = 3; // Number of disks
        solveHanoi(numDisks, "Tower1", "Tower2", "Tower3");
    }
}

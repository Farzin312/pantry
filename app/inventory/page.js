import ProtectedRoute from "../components/ProtectedRoute";
import Inventory from "../components/Inventory";

export default function InventoryPage() {
    return (
        <ProtectedRoute>
            <Inventory/>
        </ProtectedRoute>
    );
}
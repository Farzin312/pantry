import ProtectedRoute from "../components/ProtectedRoute";
import RecipeGenerator from "../components/recgen";

export default function InventoryPage() {
  return (
    <ProtectedRoute>
      <RecipeGenerator/>
    </ProtectedRoute>
  );
}
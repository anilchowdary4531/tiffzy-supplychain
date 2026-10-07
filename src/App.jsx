import { Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import SupplierProtectedRoute from "./routes/SupplierProtectedRoute";
import SupplyChainLayout from "./components/SupplyChainLayout";

import SupplierLogin from "./pages/supplier/SupplierLogin";
import SupplierDashboard from "./pages/supplier/SupplierDashboard";

import OwnerSupplyChainIntelligence from "./pages/admin/OwnerSupplyChainIntelligence";
import OwnerSupplyChainInventory from "./pages/admin/OwnerSupplyChainInventory";
import OwnerSupplyChainInventoryDetail from "./pages/admin/OwnerSupplyChainInventoryDetail";
import OwnerSupplyChainLowStock from "./pages/admin/OwnerSupplyChainLowStock";
import OwnerSupplyChainExpiry from "./pages/admin/OwnerSupplyChainExpiry";
import OwnerSupplyChainMovements from "./pages/admin/OwnerSupplyChainMovements";
import OwnerSupplyChainAdjustments from "./pages/admin/OwnerSupplyChainAdjustments";
import OwnerSupplyChainValuation from "./pages/admin/OwnerSupplyChainValuation";
import OwnerSupplyChainSuppliers from "./pages/admin/OwnerSupplyChainSuppliers";
import OwnerSupplyChainPurchaseRequests from "./pages/admin/OwnerSupplyChainPurchaseRequests";
import OwnerSupplyChainPurchaseOrders from "./pages/admin/OwnerSupplyChainPurchaseOrders";
import OwnerSupplyChainReceiving from "./pages/admin/OwnerSupplyChainReceiving";
import OwnerSupplyChainPurchaseReturns from "./pages/admin/OwnerSupplyChainPurchaseReturns";
import OwnerSupplyChainInvoices from "./pages/admin/OwnerSupplyChainInvoices";
import OwnerSupplyChainWarehouse from "./pages/admin/OwnerSupplyChainWarehouse";
import OwnerSupplyChainTransfers from "./pages/admin/OwnerSupplyChainTransfers";
import OwnerSupplyChainStockCounts from "./pages/admin/OwnerSupplyChainStockCounts";
import OwnerSupplyChainRecipes from "./pages/admin/OwnerSupplyChainRecipes";
import OwnerSupplyChainConsumption from "./pages/admin/OwnerSupplyChainConsumption";
import OwnerSupplyChainWastage from "./pages/admin/OwnerSupplyChainWastage";
import OwnerSupplyChainMarketplace from "./pages/admin/OwnerSupplyChainMarketplace";
import OwnerSupplyChainNegotiations from "./pages/admin/OwnerSupplyChainNegotiations";
import OwnerSupplyChainPayments from "./pages/admin/OwnerSupplyChainPayments";
import OwnerSupplyChainReports from "./pages/admin/OwnerSupplyChainReports";
import OwnerSupplyChainSettings from "./pages/admin/OwnerSupplyChainSettings";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                {/* SUPPLIER PORTAL */}
                <Route path="/supplier/login" element={<SupplierLogin />} />
                <Route path="/supplier/register" element={<SupplierLogin />} />
                <Route
                    path="/supplier"
                    element={
                        <SupplierProtectedRoute>
                            <SupplierDashboard />
                        </SupplierProtectedRoute>
                    }
                />

                {/* SUPPLY CHAIN DASHBOARD */}
                <Route path="/supply-chain" element={<SupplyChainLayout />}>
                    <Route index element={<OwnerSupplyChainIntelligence />} />
                    <Route path="inventory" element={<OwnerSupplyChainInventory />} />
                    <Route path="inventory/low-stock" element={<OwnerSupplyChainLowStock />} />
                    <Route path="inventory/expiry" element={<OwnerSupplyChainExpiry />} />
                    <Route path="inventory/movements" element={<OwnerSupplyChainMovements />} />
                    <Route path="inventory/adjustments" element={<OwnerSupplyChainAdjustments />} />
                    <Route path="inventory/valuation" element={<OwnerSupplyChainValuation />} />
                    <Route path="inventory/:itemId" element={<OwnerSupplyChainInventoryDetail />} />
                    <Route path="suppliers" element={<OwnerSupplyChainSuppliers />} />
                    <Route path="purchasing/requests" element={<OwnerSupplyChainPurchaseRequests />} />
                    <Route path="purchasing/orders" element={<OwnerSupplyChainPurchaseOrders />} />
                    <Route path="purchasing/receiving" element={<OwnerSupplyChainReceiving />} />
                    <Route path="purchasing/returns" element={<OwnerSupplyChainPurchaseReturns />} />
                    <Route path="purchasing/invoices" element={<OwnerSupplyChainInvoices />} />
                    <Route path="warehouse" element={<OwnerSupplyChainWarehouse />} />
                    <Route path="warehouse/transfers" element={<OwnerSupplyChainTransfers />} />
                    <Route path="warehouse/stock-counts" element={<OwnerSupplyChainStockCounts />} />
                    <Route path="recipes" element={<OwnerSupplyChainRecipes />} />
                    <Route path="recipes/consumption" element={<OwnerSupplyChainConsumption />} />
                    <Route path="wastage" element={<OwnerSupplyChainWastage />} />
                    <Route path="marketplace" element={<OwnerSupplyChainMarketplace />} />
                    <Route path="negotiations" element={<OwnerSupplyChainNegotiations />} />
                    <Route path="payments" element={<OwnerSupplyChainPayments />} />
                    <Route path="reports" element={<OwnerSupplyChainReports />} />
                    <Route path="intelligence" element={<OwnerSupplyChainIntelligence />} />
                    <Route path="settings" element={<OwnerSupplyChainSettings />} />
                    <Route path="notifications" element={<SupplierDashboard />} />
                </Route>

                {/* ALIAS REDIRECTS */}
                <Route path="/owner/supply-chain/*" element={<Navigate to="/supply-chain" replace />} />
                <Route path="/" element={<Navigate to="/supply-chain" replace />} />
                <Route path="*" element={<Navigate to="/supply-chain" replace />} />
            </Routes>
        </AuthProvider>
    );
}

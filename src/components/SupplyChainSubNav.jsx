import { useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    Warehouse,
    ChefHat,
    Trash2,
    Store,
    Handshake,
    CreditCard,
    BarChart3,
    Settings,
    AlertTriangle,
    Clock,
    Activity,
    SlidersHorizontal,
    IndianRupee,
    ClipboardPlus,
    PackageCheck,
    Undo2,
    Receipt,
    ArrowLeftRight,
    ClipboardCheck
} from "lucide-react";

export const SUPPLY_CHAIN_MAIN_NAV = [
    { id: "overview", label: "Overview", path: "/supply-chain", icon: LayoutDashboard },
    { id: "inventory", label: "Inventory", path: "/supply-chain/inventory", icon: Package, matchPrefixes: ["/supply-chain/inventory"] },
    { id: "purchasing", label: "Purchasing", path: "/supply-chain/purchasing/orders", icon: ShoppingBag, matchPrefixes: ["/supply-chain/purchasing"] },
    { id: "suppliers", label: "Suppliers", path: "/supply-chain/suppliers", icon: Users },
    { id: "warehouse", label: "Warehouse", path: "/supply-chain/warehouse", icon: Warehouse, matchPrefixes: ["/supply-chain/warehouse"] },
    { id: "recipes", label: "Recipes", path: "/supply-chain/recipes", icon: ChefHat, matchPrefixes: ["/supply-chain/recipes"] },
    { id: "wastage", label: "Wastage", path: "/supply-chain/wastage", icon: Trash2 },
    { id: "marketplace", label: "Marketplace", path: "/supply-chain/marketplace", icon: Store },
    { id: "negotiations", label: "Negotiations", path: "/supply-chain/negotiations", icon: Handshake },
    { id: "payments", label: "Payments", path: "/supply-chain/payments", icon: CreditCard },
    { id: "intelligence", label: "Intelligence", path: "/supply-chain/reports", icon: BarChart3 },
    { id: "settings", label: "Settings", path: "/supply-chain/settings", icon: Settings }
];

export const INVENTORY_SUB_NAV = [
    { id: "all", label: "All Items", path: "/supply-chain/inventory", icon: Package, exact: true },
    { id: "low-stock", label: "Low Stock", path: "/supply-chain/inventory/low-stock", icon: AlertTriangle },
    { id: "expiry", label: "Expiry & Batches", path: "/supply-chain/inventory/expiry", icon: Clock },
    { id: "movements", label: "Movements", path: "/supply-chain/inventory/movements", icon: Activity },
    { id: "adjustments", label: "Adjustments", path: "/supply-chain/inventory/adjustments", icon: SlidersHorizontal },
    { id: "valuation", label: "Valuation", path: "/supply-chain/inventory/valuation", icon: IndianRupee },
];

export const PURCHASING_SUB_NAV = [
    { id: "po", label: "Purchase Orders", path: "/supply-chain/purchasing/orders", icon: ShoppingBag },
    { id: "pr", label: "Purchase Requests", path: "/supply-chain/purchasing/requests", icon: ClipboardPlus },
    { id: "grn", label: "Receiving (GRN)", path: "/supply-chain/purchasing/receiving", icon: PackageCheck },
    { id: "returns", label: "Returns", path: "/supply-chain/purchasing/returns", icon: Undo2 },
    { id: "invoices", label: "Invoices", path: "/supply-chain/purchasing/invoices", icon: Receipt },
];

export const WAREHOUSE_SUB_NAV = [
    { id: "locations", label: "Locations", path: "/supply-chain/warehouse", icon: Warehouse, exact: true },
    { id: "transfers", label: "Transfers", path: "/supply-chain/warehouse/transfers", icon: ArrowLeftRight },
    { id: "counts", label: "Stock Counts", path: "/supply-chain/warehouse/stock-counts", icon: ClipboardCheck },
];

export const RECIPES_SUB_NAV = [
    { id: "all-recipes", label: "All Recipes", path: "/supply-chain/recipes", icon: ChefHat, exact: true },
    { id: "consumption", label: "Consumption", path: "/supply-chain/recipes/consumption", icon: Activity },
];

export default function SupplyChainSubNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    // Per design requirements: Keep full top nav/subnav on Dashboard ONLY.
    // Hide top subnav on all other supply chain pages.
    const isDashboard = currentPath === "/supply-chain" || currentPath === "/supply-chain/";
    if (!isDashboard) {
        return null;
    }

    let activeSubNav = null;
    if (currentPath.startsWith("/supply-chain/inventory")) {
        activeSubNav = INVENTORY_SUB_NAV;
    } else if (currentPath.startsWith("/supply-chain/purchasing")) {
        activeSubNav = PURCHASING_SUB_NAV;
    } else if (currentPath.startsWith("/supply-chain/warehouse")) {
        activeSubNav = WAREHOUSE_SUB_NAV;
    } else if (currentPath.startsWith("/supply-chain/recipes")) {
        activeSubNav = RECIPES_SUB_NAV;
    }

    return (
        <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 mb-5 shadow-xs transition-colors">
            <div className="max-w-7xl mx-auto px-2 sm:px-4">
                <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
                    {SUPPLY_CHAIN_MAIN_NAV.map((item) => {
                        const Icon = item.icon;
                        const isOverview = item.path === "/supply-chain";
                        const isMainActive = isOverview
                            ? currentPath === "/supply-chain" || currentPath === "/supply-chain/"
                            : item.matchPrefixes
                            ? item.matchPrefixes.some((prefix) => currentPath.startsWith(prefix))
                            : currentPath.startsWith(item.path);

                        return (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                                    isMainActive
                                        ? "bg-orange-500 text-white font-bold shadow-xs"
                                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                                }`}
                            >
                                <Icon size={14} className={isMainActive ? "text-white" : "text-slate-400"} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {activeSubNav && (
                <div className="bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200/80 dark:border-slate-800/80 px-2 sm:px-4 py-1.5">
                    <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                        {activeSubNav.map((subItem) => {
                            const SubIcon = subItem.icon;
                            const isSubActive = subItem.exact
                                ? currentPath === subItem.path
                                : currentPath.startsWith(subItem.path);

                            return (
                                <button
                                    key={subItem.id}
                                    onClick={() => navigate(subItem.path)}
                                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                                        isSubActive
                                            ? "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200 font-bold border border-amber-300 dark:border-amber-700/50"
                                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100"
                                    }`}
                                >
                                    <SubIcon size={12} className={isSubActive ? "text-amber-700 dark:text-amber-300" : "text-slate-400"} />
                                    <span>{subItem.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

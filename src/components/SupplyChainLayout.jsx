import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Bell, LogOut, Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";
import SupplyChainSubNav, { SUPPLY_CHAIN_MAIN_NAV } from "./SupplyChainSubNav";
import ToastHost from "./ToastHost";
import { api } from "../utils/apiClient";
import io from "socket.io-client";
import { API_BASE_URL } from "../config";

export default function SupplyChainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [unreadNotifCount, setUnreadNotifCount] = useState(0);
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const isDashboard = location.pathname === "/supply-chain" || location.pathname === "/supply-chain/";

    const fetchUnreadCount = async () => {
        try {
            const res = await api.get("/notifications/unread-count");
            if (typeof res?.data?.count === "number") setUnreadNotifCount(res.data.count);
            else if (typeof res?.data?.unreadCount === "number") setUnreadNotifCount(res.data.unreadCount);
        } catch (err) {
            // ignore
        }
    };

    useEffect(() => {
        fetchUnreadCount();

        const token = localStorage.getItem("token");
        if (!token) return;

        const socket = io(API_BASE_URL || window.location.origin, {
            transports: ["websocket", "polling"],
            auth: { token },
        });

        socket.on("connect", () => {
            if (user?.restaurantId) {
                socket.emit("join_user_room", { recipientType: "RESTAURANT", recipientId: user.restaurantId });
            }
        });

        socket.on("notification:new", () => {
            setUnreadNotifCount((prev) => prev + 1);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/supplier/login");
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
            <ToastHost />

            {/* TOP HEADER BAR — DASHBOARD PAGE ONLY */}
            {isDashboard && (
                <header className="sticky top-0 z-40 px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
                    <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500 hover:bg-orange-600 text-white shadow-md transition active:scale-95 cursor-pointer shrink-0"
                                title="Toggle menu"
                                aria-label="Toggle menu"
                            >
                                {sidebarOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white stroke-[2.5]" />}
                            </button>

                            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/supply-chain")}>
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20">
                                    <BrandLogo className="h-6 w-6" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-black tracking-tight text-orange-500 leading-none">
                                        Tiffzy
                                    </h1>
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mt-0.5">
                                        SUPPLY CHAIN
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* NOTIFICATION BELL */}
                            <button
                                type="button"
                                onClick={() => navigate("/supply-chain/notifications")}
                                className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 hover:bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:hover:bg-orange-900/50 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60 shadow-2xs transition active:scale-95 cursor-pointer"
                                title="Notifications"
                                aria-label="Notifications"
                            >
                                <Bell size={20} className="stroke-[2.2]" />
                                {unreadNotifCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] px-1.5 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white border-2 border-white dark:border-slate-900 shadow-xs animate-pulse">
                                        {unreadNotifCount > 99 ? "99+" : unreadNotifCount}
                                    </span>
                                )}
                            </button>

                            {/* LOGOUT */}
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                            >
                                <LogOut size={14} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </header>
            )}

            {/* SIDEBAR OVERLAY DRAWER — REUSED ACROSS ALL SUPPLY CHAIN PAGES */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex">
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-2xs transition-opacity"
                        onClick={() => setSidebarOpen(false)}
                        aria-hidden="true"
                    />
                    <aside
                        aria-label="Supply navigation sidebar"
                        className="relative z-10 w-64 sm:w-72 h-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-r border-slate-200 dark:border-slate-800 shadow-2xl p-4 flex flex-col justify-between animate-in slide-in-from-left duration-200"
                    >
                        <div className="flex-1 flex flex-col min-h-0">
                            {/* BRANDING HEADER */}
                            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-2.5">
                                    <BrandLogo className="h-8 w-8" />
                                    <div>
                                        <h1 className="text-xl font-black text-orange-500 leading-none">Tiffzy</h1>
                                        <span className="text-[10px] font-extrabold uppercase tracking-wider block mt-0.5">SUPPLY CHAIN</span>
                                    </div>
                                </div>
                                <button type="button" onClick={() => setSidebarOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* NAVIGATION ITEMS LIST */}
                            <nav className="space-y-1 overflow-y-auto flex-1 pr-1">
                                {SUPPLY_CHAIN_MAIN_NAV.map((navItem) => {
                                    const Icon = navItem.icon;
                                    const isOverview = navItem.path === "/supply-chain";
                                    const isActive = isOverview
                                        ? location.pathname === "/supply-chain" || location.pathname === "/supply-chain/"
                                        : location.pathname.startsWith(navItem.path);

                                    return (
                                        <button
                                            key={navItem.id}
                                            type="button"
                                            onClick={() => {
                                                navigate(navItem.path);
                                                setSidebarOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-sm font-medium cursor-pointer ${
                                                isActive
                                                    ? "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-bold border-l-4 border-orange-500 shadow-2xs"
                                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
                                            }`}
                                        >
                                            <Icon size={18} className={isActive ? "text-orange-500" : "text-slate-500 dark:text-slate-400"} />
                                            <span>{navItem.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>
                </div>
            )}

            {/* SECONDARY NAVIGATION BAR — DASHBOARD PAGE ONLY */}
            {isDashboard && <SupplyChainSubNav />}

            {/* MAIN ROUTE CONTENT */}
            <main className={`flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pb-12 ${!isDashboard ? "pt-4 sm:pt-6" : ""}`}>
                <Outlet context={{ setSidebarOpen, unreadNotifCount, fetchUnreadCount, isDashboard }} />
            </main>
        </div>
    );
}

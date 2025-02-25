// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
export default function ProtectedRoute({ element: Component, ...rest }) {
    const isAuthenticated = localStorage.getItem("user");
    const user = isAuthenticated ? JSON.parse(localStorage.getItem("user")) : null;
    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Please Login First");
        } else if (user?.role === "user") {
            toast.error("Users can`t access the dashboard");
            <Navigate to={'/'} />
        }
    }, [isAuthenticated, user]);
    return isAuthenticated && user?.role !== "user" ? (
        <Component {...rest} />
    ) : (
        <Navigate to={user?.role === "user" ? `/` : `/zakatcare/login`} replace />
    );
}

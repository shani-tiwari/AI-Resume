import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";


/**
 * @name Protected - component for protecting routes
 * @description Protects routes from unauthorized access
 * @param {React.ReactNode} children - The component to render if the user is authenticated
 * @returns {React.ReactNode} The component to render if the user is authenticated
 */
export default function Protected({children}) {

    const { loading, user } = useAuth();

    if(loading){
        return <h1>Loading...</h1>
    }

    if(!user){
        return <Navigate to="/login" replace />
    }

    return children;
}

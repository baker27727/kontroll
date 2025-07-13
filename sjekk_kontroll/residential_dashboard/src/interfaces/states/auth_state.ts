import ApiInterface from "../ApiInterface";
import Dashboard from "../Dashboard";

interface AuthState extends ApiInterface{
    isAuthenticated: boolean;
    token: string | null;

    dashboard: Dashboard | null
}

export default AuthState
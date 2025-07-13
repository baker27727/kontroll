import ApiInterface from "../ApiInterface";
import Manager from "../Manager";

interface AuthState extends ApiInterface{
    isAuthenticated: boolean;
    token: string | null;

    manager: Manager | null
}

export default AuthState
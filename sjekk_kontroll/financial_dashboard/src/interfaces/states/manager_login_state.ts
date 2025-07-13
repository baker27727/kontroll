import ApiInterface from "../ApiInterface";
import ManagerLogin from "../ManagerLogin";

interface ManagerLoginState extends ApiInterface{
    logins: ManagerLogin[]
}

export default ManagerLoginState
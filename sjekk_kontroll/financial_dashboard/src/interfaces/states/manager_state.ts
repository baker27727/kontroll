import ApiInterface from "../ApiInterface";
import Manager from "../Manager";

interface ManagerState extends ApiInterface{
    managers: Manager[],
    current_manager: Manager | null
}

export default ManagerState
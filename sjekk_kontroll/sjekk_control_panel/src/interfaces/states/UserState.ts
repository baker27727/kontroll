import User from "../User";
import ApiInterface from "../shared/ApiInterface";

interface GetUsersState extends ApiInterface{
    users: Array<User>
    deleted_users: Array<User>
    currentUser: User
}

export default GetUsersState
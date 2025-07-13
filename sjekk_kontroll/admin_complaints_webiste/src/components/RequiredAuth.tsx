import { FC} from "react";
import { Navigate } from "react-router-dom";
import { checkAuthentication } from "../utils/authentication";

const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }) => {
  // const userIsLogged = useLoginStatus(); // Your hook to get login status
  const userIsLogged = checkAuthentication();

  
  

  if (!userIsLogged) {
     return <Navigate  to='/login' replace={true}/>;
  }
  return children;
};


export default RequireAuth
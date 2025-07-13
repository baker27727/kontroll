import { FC} from "react";
import { Navigate } from "react-router-dom";
import { checkAuthentication } from "../utils/authentication";

const PrivateRoute: FC<{ children: React.ReactElement }> = ({ children }) => {
  const userIsLogged = checkAuthentication();
  

  if (!userIsLogged) {
     return <Navigate  to={`/login?redirect=${location.pathname}`} replace={true}/>;
  }
  return children;
};


export default PrivateRoute
import { Navigate } from 'react-router-dom'
import Routes from '../constants/routes'

const RequireAuth = ({ children }) => {
    const token = localStorage.getItem('token')
  
    if(!token) {
        return (
            <Navigate to={Routes.AUTH.LOGIN} />
        )
    }

    return children
}

export default RequireAuth
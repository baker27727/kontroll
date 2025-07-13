import PlaceDashboard from "../PlaceDashboard"

interface LoginResponse{
    token: string
    place_dashboard: PlaceDashboard
}

export default LoginResponse
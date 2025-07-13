import PlaceDashboard from "../PlaceDashboard"

interface AuthState{
    token: string | null
    place_dashboard: PlaceDashboard | null
    loading: boolean
    error: string | null
}

export default AuthState
import Partner from "../Partner"

interface AuthState{
    token: string | null
    partner: Partner | null
    loading: boolean
    error: string | null
}

export default AuthState
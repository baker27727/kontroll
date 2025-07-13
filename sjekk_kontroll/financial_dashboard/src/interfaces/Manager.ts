interface Manager {
    id: number
    name: string
    username: string
    linked_email: string
    last_login_time: string
    created_at: string,
    role: 'admin' | 'supervisor' | 'reader'
}

export default Manager
export const checkAuthentication = (): boolean => {
    const token = localStorage.getItem('token');
    return token != null;
}

export const provideAuthentication = (token: string): void => {
    localStorage.setItem('token', token)
}

export const getAuthenticationToken = (): string | null => {
    return localStorage.getItem('token')
}


export const removeAuthentication = (): void => {
    if(localStorage.getItem('token') != null){
        localStorage.removeItem('token')
    }

    return;
}
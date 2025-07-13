export const checkAuthentication = (): boolean => {
    const token = localStorage.getItem('token');
    return token != null;
}

export const getAuthenticationToken = (): string => {
    return localStorage.getItem('token')
}

export const provideAuthentication = (token: string): void => {
    localStorage.setItem('token', token)
}

export const removeAuthentication = (): void => {
    if(localStorage.getItem('token') != null){
        localStorage.removeItem('token')
    }

    return;
}
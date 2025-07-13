export const checkAuthentication = (): boolean => {
    const token = localStorage.getItem('token');
    return token != null;
}

import Cookies from 'js-cookie'

export const checkAuthentication = (): boolean => {
    const token = Cookies.get('token');
    return token != null;
}

export const getAuthenticationToken = (): string => {
    return Cookies.get('token');
}

export const saveAuthenticationToken = (token: string): void => {
    Cookies.set('token', token);
}

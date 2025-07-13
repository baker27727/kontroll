import Apartment from "../interfaces/Apartment";

export const checkAuthentication = (): boolean => {
    const token = localStorage.getItem('token');
    return token != null;
}

export const getAuthenticationToken = (): string | null => {
    return localStorage.getItem('token')
}

export const saveAuthenticationToken = (token: string) => {
    localStorage.setItem('token', token)
}

export const saveApartmentData = (apartment: Apartment) => {
    localStorage.setItem('apartment', JSON.stringify(apartment))
}

export const getApartmentData = (): Apartment | null => {
    const apartment = localStorage.getItem('apartment')
    return apartment != null ? JSON.parse(apartment) : null
}

export const removeApartmentData = () => {
    localStorage.removeItem('apartment')
}

export const removeAuthenticationToken = () => {
    localStorage.removeItem('token')
}
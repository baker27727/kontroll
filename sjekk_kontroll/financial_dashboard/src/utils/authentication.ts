import Manager from "../interfaces/Manager";

export const checkAuthentication = (local = true): boolean => {
    if(local){
        return !!localStorage.getItem('token');    
    }else{
        return !!sessionStorage.getItem('token');
    }
}

export const getAuthenticationToken = (local = true): string | null => {
    if(local){
        return localStorage.getItem('token');    
    }else{
        return sessionStorage.getItem('token');
    }
}

export const provideAuthenticationToken = (token: string, local = true) => {
    if(local){
        localStorage.setItem('token', token);
    }else{
        sessionStorage.setItem('token', token);
    }
}

export const saveManager = (manager: Manager, local = true) => {
    if(local){
        localStorage.setItem('manager', JSON.stringify(manager));
    }else{
        sessionStorage.setItem('manager', JSON.stringify(manager));
    }
}
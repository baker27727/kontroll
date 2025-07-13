import Dashboard from "../interfaces/Dashboard";

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

export const saveDashboard = (dashboard: Dashboard, local = true) => {
    if(local){
        localStorage.setItem('dashboard', JSON.stringify(dashboard));
    }else{
        sessionStorage.setItem('dashboard', JSON.stringify(dashboard));
    }
}

export const removeAuthenticationToken = (local = true) => {
    if(local){
        localStorage.removeItem('token');
    }else{
        sessionStorage.removeItem('token');
    }
}


export const removeDashboard = (local = true) => {
    if(local){
        localStorage.removeItem('dashboard');
    }else{
        sessionStorage.removeItem('dashboard');
    }
}

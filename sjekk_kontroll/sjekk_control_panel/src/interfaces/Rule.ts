import Extras from "./Extras"

interface Rule{
    id: number
    name:string,
    charge:number,
    policy_time:number,
    created_at:string
    extras: Extras,
    
}

export default Rule
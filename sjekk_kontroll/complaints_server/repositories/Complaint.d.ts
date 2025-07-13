import { ObjectId } from "mongoose"

declare interface Complaint {
    title: string,
    content: string,
    created_at: string,
    email: string,
    name: string,
    phone: string?
}

declare interface ComplaintUploadData{

}

declare type StatusType = 'pending'| 'completed'| 'rejected'| 'deleted'


declare class ComplaintRepository{
    /**
     * Returns list of all Complaints
     * @type {Array<Complaint>}
     */
    
    static getAllComplaints(): Promise<Array<Complaint>>
    /**
     * Returns Complaint
     * @type {Complaint}
     */
    static getComplaint(id: string): Promise<Complaint>
    static deleteComplaint(id: string): Promise<void>

    static createComplaint(data: ComplaintUploadData): Promise<void>

    static getComplaintsCount(): Promise<number>

    static perfomActionOnComplaint(id:ObjectId ,message: string ,status: StatusType): Promise<boolean>

}

export default ComplaintRepository
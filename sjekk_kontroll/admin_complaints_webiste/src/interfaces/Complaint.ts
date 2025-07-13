import Attachment from "./Attachment";

interface Complaint {
    id: number;
    first_name: string;
    last_name: string;
    address: string;
    postal_code: string;
    city: string;
    country: string;
    phone_number: string;
    email: string;
    complaint_text: string;
    created_at: string;
    status: 'pending' | 'completed' | 'rejected' | 'deleted';
    attachments: Attachment[];
    ticket_number: string
}

export default Complaint

interface Complaint {
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
    attachments: [];
}

export default Complaint
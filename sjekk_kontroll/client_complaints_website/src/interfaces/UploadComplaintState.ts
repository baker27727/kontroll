import Complaint from "./Complaint"

interface UploadComplaintState{
    loading: boolean,
    error: string | null,
    complaint: Complaint | null,
    formData: FormData | null
}

export default UploadComplaintState
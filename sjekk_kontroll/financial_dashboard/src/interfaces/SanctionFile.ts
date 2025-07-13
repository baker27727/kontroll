import Manager from "./Manager"

interface SanctionFile {
    id: number
    file_name: string
    file_type: 'image' | 'document'
    file_extension: string
    file_size: number
    file_path: string
    uploaded_at: string

    manager: Manager
}

export default SanctionFile
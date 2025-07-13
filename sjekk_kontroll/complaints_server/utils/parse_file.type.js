import { BAD_REQUEST } from "../constants/status_codes.js"
import CustomError from "../interfaces/custom_error_class.js"

const parseFileType = (standardType) => {
    if(standardType == 'application/pdf'){
        return 'pdf'
    } else if (standardType.startsWith('image/')) {
        return 'image'
    }

    throw new CustomError('Invalid file type: ' + standardType, BAD_REQUEST)
}

export default parseFileType
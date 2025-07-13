import { notification } from "antd"


export const showSuccessNotification = (message: string) => {
    notification.success({
        message: message,
        style: {
            borderRadius: 'none',
            border: 'none'
        },
        duration: 2
    })
}

export const showErrorNotification = (message: string) => {
    notification.error({
        message: message,
        style: {
            borderRadius: 'none',
            border: 'none'
        },
        duration: 2
    })
}
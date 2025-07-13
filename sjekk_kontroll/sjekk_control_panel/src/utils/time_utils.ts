import moment from "moment"

class TimeHelper{
    static format = 'DD.MM.YYYY HH:mm'
    static getCurrentTime(): string {
        return moment().format('DD.MM.YYYY HH:mm')
    }

    static getCurrentDate(): string {
        return moment().format('DD.MM.YYYY')
    }

    static increaseTimeByHours({ current_time, hours }: { current_time: string, hours: number }) {
        return moment(current_time, 'DD.MM.YYYY HH:mm').add(hours, 'hours').format('DD.MM.YYYY HH:mm')
    }

    static increaseTimeByDays({ current_time, days }: { current_time: string, days: number }) {
        return moment(current_time, 'DD.MM.YYYY HH:mm').add(days, 'days').format('DD.MM.YYYY HH:mm')
    }

    static checkIsBetween({ current_time, start_time, end_time }: { current_time: string, start_time: string, end_time: string }) {
        return moment(current_time, 'DD.MM.YYYY HH:mm').isBetween(start_time, end_time)
    }
}

export default TimeHelper
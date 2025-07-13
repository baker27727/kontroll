import moment from "moment"

class TimeRepository{
    static getCurrentTime(){
        return moment().format('DD.MM.YYYY HH:mm')
    }

    static getCurrentDate(){
        return moment().format('DD.MM.YYYY')
    }

    static increaseTimeByHours({ current_time, hours }) {
        return moment(current_time, 'DD.MM.YYYY HH:mm').add(hours, 'hours').format('DD.MM.YYYY HH:mm')
    }

    static increaseTimeByDays({ current_time, days }) {
        return moment(current_time, 'DD.MM.YYYY HH:mm').add(days, 'days').format('DD.MM.YYYY HH:mm')
    }

    static checkIsBetween({ current_time, start_time, end_time }) {
        return moment(current_time, 'DD.MM.YYYY HH:mm').isBetween(start_time, end_time)
    }
}

export default TimeRepository
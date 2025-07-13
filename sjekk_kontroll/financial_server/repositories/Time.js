import moment from "moment"

class TimeRepository{
    static full_date_format = 'DD.MM.YYYY HH:mm'
    static date_format = 'DD.MM.YYYY'
    static time_format = 'HH:mm'

    static getCurrentDateTime(){
        return moment().format(this.full_date_format)
    }

    static getCurrentDate(){
        return moment().format(this.date_format)
    }

    static increaseTimeByHours({ current_time, hours }) {
        return moment(current_time, this.full_date_format).add(hours, 'hours').format(this.full_date_format)
    }

    static increaseTimeByWeeks({ current_time, weeks }) {
        return moment(current_time, this.full_date_format).add(weeks, 'weeks').format(this.full_date_format)
    }

    static checkIsBetween({ current_time, start_time, end_time }) {
        return moment(current_time, this.full_date_format).isBetween(start_time, end_time)
    }
}

export default TimeRepository
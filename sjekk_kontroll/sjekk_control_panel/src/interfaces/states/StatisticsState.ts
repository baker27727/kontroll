import ApiInterface from "../shared/ApiInterface"

interface StatisticsState extends ApiInterface{
    usersCount: number
    rulesCount: number
    placesCount: number
    brandsCount: number
    colorsCount: number
    carsCount: number
    typesCount: number
    violationsCount: number
    partnersCount: number
}

export default StatisticsState
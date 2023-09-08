export default function validation(value, ticketsTotal){
    const error = {};
    if(value > ticketsTotal ) error['cantTickets'] = '⚠️ no hay suficientes tickets'

    return error
}
export default function validation(value, ticketsTotal){
    if(value > ticketsTotal) return '⚠️ no hay suficientes tickets'
}
export default function validationDate(date){
    if(date.length < 1) return '⚠️ elige la fecha de tu evento.'

    const userDate = new Date(date)
    const currentDate = new Date()

    if(currentDate >= userDate) return '⚠️ elige una fecha superior a la actual.'
 }
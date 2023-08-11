import validationDate from "./validationDate";
import validationLength from "./validationLength";
import isNumber from "./isNumber";

const validation = (event)=>{
    const { name, description, date, hour, cantTickets, adress, country, image, eventType, ticketPrice} = event

    const error = {}
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

    if(!validationLength(name)) error['name'] = '⚠️ el evento debe tener un nombre.'

    if(!validationLength(description)) error['description'] = '⚠️ el evento debe tener una descripcion.'
    
    if(validationDate(date) !== undefined) error['date'] = validationDate(date)

    if(!validationLength(hour)) error['hour'] = '⚠️ elige la hora de tu evento.'

    if(!isNumber(cantTickets)) error['cantTickets'] = '⚠️ elige la cantidad de tickets de tu evento.'

    if(!isNumber(ticketPrice)) error['ticketPrice'] = '⚠️ el evento debe tener un precio por entrada'

    if(!validationLength(adress)) error['adress'] = '⚠️ el evento debe tener una direccion.'

    if(!validationLength(country)) error['country'] = '⚠️ debes escoger un pais.'

    if(!validationLength(eventType)) error['eventType'] = '⚠️ elige algun tipo de evento.'

    if(!urlRegex.test(image)) error['image'] = '⚠️ la imagen debe ser una url.'


    return error
}

export default validation
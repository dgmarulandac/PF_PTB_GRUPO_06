const { Order, Event, Order_Event, Sale } = require("../../db");
const compareMonths = require("../../utils/compareMonths")

const getMySales = async (idSeller) => {
    const events = await Event.findAll({where: {
        idSeller: idSeller
    }});

    if( events.length === 0 ) {
        throw Error("")
    }

    let orders = [];
    let monthYears = [];

    for( let i = 0; i < events.length; i++ ) {
        const date = new Date(events[i].date);
        const myString = `${(''+date.getMonth()).length == 1 ? '0'+String(date.getMonth()) : date.getMonth()}-${date.getFullYear()}`;
        if( monthYears.filter(my => {return my === myString }).length === 0 ) {
            monthYears.push(myString);
        }
        const ordersEvent = await Order_Event.findAll({where: {
            idEvent: events[i].id
        }});
        let arr = [];
        for( let j = 0; j < ordersEvent.length; j++ ) {
            const order = await Order.findByPk( ordersEvent, {
                include: [ {model: Sale, required: true, attributes: ['isSuccesful'] } ]
            } );
            if( order.dataValues.Sale.dataValues.isSuccesful ) {
                arr.push( {sales: ordersEvent[j].dataValues.quantity * ordersEvent[j].dataValues.price, month: myString})
            }
        }
        orders = [...orders, ...arr];
    }

    const sales = [];
    monthYears = monthYears.sort(compareMonths);

    for( let i = 0; i < monthYears.length; i++ ) {
        const objSale = {month: monthYears[i], sales: 0};

        const ordersCheck = orders.filter( order => {return monthYears[i] === order.month } );
        let suma = 0;
        ordersCheck.forEach( order => { suma += order.sales } );

        objSale.sales = suma;
        sales.push(objSale);
    }

    return sales;
};

module.exports = getMySales;

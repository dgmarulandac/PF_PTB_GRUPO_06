const { Sale, Order, Event, User } = require("../../db");

const getMySales = async (idSeller) => {
    const events = await Event.findAll({where: {
        idSeller: idSeller
    }});

    if( events.length === 0 ) {
        throw Error("")
    }

    const orders = [];
    const monthYears = [];

    for( let i = 0; i < events.length; i++ ) {
        const myString = `${events[i].date.getMonth()}-${events[i].date.getYear()}`;
        if( monthYears.filter(my => {return my === myString }).length === 0 ) {
            monthYears.push(myString);
        }
        const ordersEvent = await Order.findAll({where: {
            idEvent: events[i].id
        }});
        ordersEvent.map( order => {return {sales: order.quantity * order.price, month: myString }} );
        orders = [...orders, ...ordersEvent];
    }

    const sales = [];

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

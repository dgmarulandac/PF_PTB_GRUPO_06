const { Sale, Order, Event, User } = require("../../db");

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
        const ordersEvent = await Order.findAll({where: {
            idEvent: events[i].id
        }});
        ordersEvent.map( order => {return {sales: order.quantity * order.price, month: myString }} );
        orders = [...orders, ...ordersEvent];
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

function compareMonths( a,b ) {
    const aMonth = parseInt(a.split('-')[0]);
    const aYear = parseInt(a.split('-')[1]);

    const bMonth = parseInt(b.split('-')[0]);
    const bYear = parseInt(b.split('-')[1]);

    if( aYear < bYear ) {
        return -1;
    } else if ( bYear < aYear ) {
        return 1;
    } else {
        if( aMonth < bMonth ) {
            return -1;
        } else if( bMonth < aMonth ) {
            return 1;
        } else {
            return 0;
        }
    }
}

module.exports = getMySales;

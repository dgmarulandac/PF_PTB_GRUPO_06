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

module.exports = compareMonths;
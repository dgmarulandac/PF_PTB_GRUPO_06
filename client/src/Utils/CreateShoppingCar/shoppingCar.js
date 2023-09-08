export default function findOrCreateShoppingCar(){
    if(localStorage.getItem('shoppingCar') == null){
        const items = []
        localStorage.setItem('shoppingCar', JSON.stringify(items))
    }
}
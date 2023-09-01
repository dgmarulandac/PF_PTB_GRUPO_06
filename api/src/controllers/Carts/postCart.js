const {SECRET} = process.env;
const {Cart, Cart_Event} = require("../../db");
const jwt = require("jsonwebtoken");


const postCart = async (id, items) => {

    
    let cart = null;

    if(id){
        cart = await Cart.create({
            idUser: id,
            token: "123"
        })
    }else{
        cart = await Cart.create({
            token: "123"
        })
    }
    
    const token = jwt.sign({id: cart.id}, SECRET, {
        algorithm: 'HS256',
        allowInsecureKeySizes: false,
        expiresIn: 604800, // 7 days
    });

    cart.token = token;
    cart.save();

    items = items.map(item =>{ return{...item, idCart: cart.id}})
    await Cart_Event.bulkCreate(items)

    return cart;

    
};

module.exports = postCart;
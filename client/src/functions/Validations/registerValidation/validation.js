const numRegex = /-?\d+(\.\d+)?/; // detectar numeros
const sepcialRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;// detectar caracteres especiales
const mailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;// detectar mail
const dirRegex = /^[a-zA-Z0-9\s]+ \d+, [a-zA-Z\s]+, [a-zA-Z\s]+$/;// detectar la direccion que este bien escrita
function registerValidation (user, password, email, dir) {
    const errors = {
        user: [],
        password: [],
        email: [],
        dir: []
    };
    if(user.length === 0){
        errors.user.push('usuario no puede estar vacio');
    }
    if(password.length < 10){
        errors.password.push('La contraseña debe de ser mayor a 10 caracteres');
    }
    if(!numRegex.test(password)){
        errors.password.push('La contraseña debe de tener por lo menos un número');
    }
    if(!sepcialRegex.test(password)){
        errors.password.push('La contraseña debe de tener por lo menos un caracter especial');
    }
    if(!mailRegex.test(email)){
        errors.email.push('Has escrito mal el mail');
    }
};
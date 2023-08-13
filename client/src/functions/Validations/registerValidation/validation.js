import axios from "axios";
const numRegex = /-?\d+(\.\d+)?/; // detectar numeros
const sepcialRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;// detectar caracteres especiales
const mailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;// detectar mail
const dirRegex = /^(?!.*\b[a-zA-Z]+\s+\(\d+\),\s+[a-zA-Z]+,\s+[a-zA-Z]+\b).+$/ // detectar la direccion que este bien escrita
function registerValidation (user, password, dir, email, country) {
    const errors = [];
    axios.get(`/users/check?displayName=${user}&email=${email}`)
        .then(res => res.data)
        .then(data =>{
            if(data){
                errors.push('este usuario ya existe')
            }
        })
    if(user.length < 1){
        errors.push('usuario no puede estar vacio');
    }
    
    if(password[0]?.length < 10){
        errors.push('La contraseña debe de ser mayor a 10 caracteres');
    }
    if(!numRegex.test(password)){
        errors.push('La contraseña debe de tener por lo menos un número');
    }
    if(!sepcialRegex.test(password)){
        errors.push('La contraseña debe de tener por lo menos un caracter especial');
    }
    if(!mailRegex.test(email)){
        errors.push('Has escrito mal el mail');
    }
    if(!dirRegex.test(dir)){
        console.log(dirRegex.test(dir))
        errors.push('La direccion debe de tener la siguiente forma: Calle numero, ciudad, pais')
    }
    return errors
};

export default registerValidation

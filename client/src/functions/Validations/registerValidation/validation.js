import axios from "axios";
const numRegex = /-?\d+(\.\d+)?/; // detectar numeros
const sepcialRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;// detectar caracteres especiales
const mailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;// detectar mail

const dirRegex = /^[a-zA-ZñÑ\s.,]+ \d+, [a-zA-ZñÑ\s.,]+$/ // detectar la direccion que este bien escrita
function registerValidation(user, name, password, dir, email, typeOfUser, numPhone, country) {
    const errors = [];
    axios.get(`/users/check?displayName=${user}&email=${email}`)

        .then(res => res.data)
        .then(data => {
            if (data) {
                errors.push('este usuario ya existe')
            }
        })
    if (user.length < 1) {
        errors.push('usuario no puede estar vacio');
    }

    if (password?.length < 10) {
        errors.push('La contraseña debe de ser mayor a 10 caracteres');
    }
    if (!numRegex.test(password)) {
        errors.push('La contraseña debe de tener por lo menos un número');
    }
    if (!sepcialRegex.test(password)) {
        errors.push('La contraseña debe de tener por lo menos un caracter especial');
    }
    if (!mailRegex.test(email)) {
        errors.push('Has escrito mal el mail');
    }
    // if (!dirRegex.test(dir)) {
    //     console.log(dirRegex.test(dir))
    //     errors.push('La direccion debe de tener la siguiente forma: Calle numero, ciudad')
    // }
    let phoneRegex;
    let isValidPhone = false;
    
    switch (country) {
        case 'Uruguay':
            phoneRegex = /^(0[2-9]|09)\d{7}$/;
            isValidPhone = phoneRegex.test(numPhone);
            break;
        case 'Chile':
            phoneRegex = /^(9\d{8}|[2-8]\d{7})$/;
            isValidPhone = phoneRegex.test(numPhone);
            break;
        case 'Argentina':
            // phoneRegex = /(11|15|911)\d{8}$/;
            // isValidPhone = phoneRegex.test(numPhone);
            isValidPhone = true
            break;
        case 'Venezuela':
            phoneRegex = /^(4\d{9}|[2-3]\d{6})$/;
            isValidPhone = phoneRegex.test(numPhone);
            break;
        case 'Colombia':
            phoneRegex = /^(3\d{9}|[1-2]\d{6})$/;
            isValidPhone = phoneRegex.test(numPhone);
            break;
        default:
            break;
    }
    
    if (!isValidPhone) {
        errors.push(`El número ingresado no es válido para ${country}`);
    }
    return errors
};

export default registerValidation
import axios from "axios"
function userValidations (user, password) {
    const errors = []

    axios.get(`/users/check?displayName=${user}&email=`)
    .then(data =>{
        if(!data.data){
            errors.push('este usuario no existe')
        }
    })
    .catch( reason => {
        console.log(reason);
    });

    axios.get(`/users/check?displayName=${user}&email=&password=${password}`)
    .then(data =>{
        if(!data.data){
            errors.push('contraseña incorrecta')
        }
    })
    .catch( reason => {
        console.log(reason);
    });
    return errors
}

export default userValidations

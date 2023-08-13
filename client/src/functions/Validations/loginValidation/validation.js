import axios from "axios"
function userValidations (user, password) {
    const errors = []
    axios.get(`/users/check?displayName=${user}`)
    .then(res => res.data)
    .then(data =>{
        if(!data){
            errors.push('este usuario no existe')
        }
    })
    axios.get(`/users/check?displayName=${user}&password=${password}`)
    .then(res => res.data)
    .then(data =>{
        if(!data){
            errors.push('contraseña incorrecta')
        }
    })
    return errors
}

export default userValidations

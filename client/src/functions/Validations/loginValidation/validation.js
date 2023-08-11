function userValidations (user, password) {
    const errors = []
    axios.get(`http://localhost:3001/usersCheck?displayName=${user}`)
    .then(res => res.data)
    .then(data =>{
        if(!data){
            errors.push('este usuario no existe')
        }
    })
    axios.get(`http://localhost:3001/usersCheck?displayName=${user}&password=${password}`)
    .then(res => res.data)
    .then(data =>{
        if(!data){
            errors.push('contraseña incorrecta')
        }
    })
    return errors
}
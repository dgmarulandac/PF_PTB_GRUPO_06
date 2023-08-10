function registerValidation (user, password, email, dir) {
    const errors = {
        user: [],
        password: [],
        email: [],
        dir: []
    }
    if(user.length === 0){
        errors.user.push('usuario no puede estar vacio')
    }
    // if()
};
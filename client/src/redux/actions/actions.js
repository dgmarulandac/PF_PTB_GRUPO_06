const USERSESION = 'USERSESION';


const userSecion = (data) =>{
    return{
        type: USERSESION,
        payload: data
    }
};

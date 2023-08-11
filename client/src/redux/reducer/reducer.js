const initialState = {
    userSesion: {
        userId,
        userType
    },

};


const rootReducer = (state = initialState, action) =>{
    switch(action.payload){
        case 'USERSESION':
            return({
                ...state,
                userSesion: action.payload
            })
            break;
    }
};
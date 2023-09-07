export default function localOrBack(local, back, user){
    if(Object.keys(user).length == 0){
        return local.length
    }else{
        return back.length
    }
}
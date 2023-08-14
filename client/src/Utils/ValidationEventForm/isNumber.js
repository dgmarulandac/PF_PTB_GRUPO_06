export default function isNumber(value){
    const v = isNaN(value)
    const VIndex = value.toString().length > 0

    if(v || !VIndex){
        return false
    }else{
        return true
    }
}
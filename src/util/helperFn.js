// import api from "../api/api";

let count = 0;


const requestApi = ()=> {
    if (count > 0) {
        count = 0;
        return true
    } else {
        count++;
        return false;
    }
    
}

export default requestApi;



export function createStringTitle(string) {
    return String(string).charAt(0).toUpperCase()+String(string).slice(1);
}


 
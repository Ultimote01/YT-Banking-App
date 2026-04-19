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


export function setRootBG(className, omitValue){
  const rootLayout = document.getElementsByTagName("html")[0];
  if (omitValue) rootLayout.classList.remove(omitValue);
  rootLayout.classList.add(className)
}
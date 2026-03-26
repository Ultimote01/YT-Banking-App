import api from "../api/api"

export default async function getUserActive() {
   
     try{
      return  await api.get("/auth/isloggedin");
      
     } catch(err){
        return err.response;
     }
} 
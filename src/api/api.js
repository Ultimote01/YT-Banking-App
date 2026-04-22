import axios from "axios";



 export async function handleVerifyEmail(setEmailVerified, setError, searchParams) {
      try{
          const res = await api.get(`/auth//verify?j=${searchParams.get("j")}`)
          setEmailVerified(res?.data.message);
      }
      catch(err) {
          setError(err.response.data)
            
      }
  }
/*https://yt-backend-1-8kek.onrender.com*/ 
// "http://127.0.0.1:3000"
const api = axios.create({
  baseURL: "https://yt-backend-1-8kek.onrender.com",
  withCredentials: true
});


api.interceptors.request.use((config) => {

  let user = localStorage.getItem("user");
  if (user !== 'undefined') {
    user = JSON.parse(user)
    config.headers.Authorization = `Bearer ${user?.token?? user?.tempToken}`;
  }
  return config;
});

export default api;





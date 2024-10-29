import axios from "axios"

export async function Results(payload){
    try{
        return await axios.post("XXXX",{results: payload})
    }catch(error){
        return error.response;
    }
}
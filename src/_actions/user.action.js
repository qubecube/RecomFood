import { Base_API } from "../_constants/matcher";
import axios from "axios";

export const userAction = {
    Regsiter,
    Login
};

function Regsiter(dataForm) {
    return axios.post(`https://qubecube.com/RecommentFood/Backend/api/Register`, dataForm ).then(res => {
        return res.data;
    }).catch(e => {
        console.log("ErrorApi Regsiter", e)
        return "ErrorApi";
    });
}

function Login(dataForm) {
    return axios.post(`https://qubecube.com/RecommentFood/Backend/api/Login`, dataForm ).then(res => {
        return res.data;
    }).catch(e => {
        console.log("ErrorApi Login", e)
        return "ErrorApi";
    });
}


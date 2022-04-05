import { Base_API } from "../_constants/matcher";
import axios from "axios";

export const bandicotaAction = {
    getBandicota,
    createBandicota,
    deleteBandicota,
    UpdateBandicota
};

function getBandicota(user_id) {
    return axios.get(`https://qubecube.com/HamsterLife/Backend/api/Bandicota?user_id=${user_id}` ).then(res => {
        return res.data;
    }).catch(e => {
        console.log("ErrorApi Bandicota", e)
        return "ErrorApi";
    });
}

function createBandicota(dataForm) {
    return axios.post(`https://qubecube.com/HamsterLife/Backend/api/Bandicota`, dataForm).then(res => {
        return res.data;
    }).catch(e => {
        console.log("ErrorApi createBandicota", e)
        return "ErrorApi";
    });
}

function deleteBandicota(dataForm) {
    return axios.post(`https://qubecube.com/HamsterLife/Backend/api/DeleteBandicota`, dataForm).then(res => {
        return res.data;
    }).catch(e => {
        console.log("ErrorApi deleteBandicota", e)
        return "ErrorApi";
    });
}

function UpdateBandicota(dataForm) {
    return axios.post(`https://qubecube.com/HamsterLife/Backend/api/UpdateBandicota`, dataForm).then(res => {
        return res.data;
    }).catch(e => {
        console.log("ErrorApi UpdateBandicota", e)
        return "ErrorApi";
    });
}
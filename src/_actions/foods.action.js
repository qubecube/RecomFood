import { Base_API } from "../_constants/matcher";
import axios from "axios";

export const foodsAction = {
    AllFood,
    GetFavorites,
    Favorites,
    DetailFood,
    Recommend
};

function AllFood() {
    return axios.get(`https://qubecube.com/RecommentFood/Backend/api/AllFood` ).then(res => {
        return res.data;
    }).catch(e => {
        console.log("ErrorApi AllFood", e)
        return "ErrorApi";
    });
}

function DetailFood(food_id) {
    return axios.get(`https://qubecube.com/RecommentFood/Backend/api/DetailFood?food_id=${food_id}`).then(res => {
        return res.data;
    }).catch(e => {
        console.log("ErrorApi DetailFood", e)
        return "ErrorApi";
    });
}

function GetFavorites(user_id) {
    return axios.get(`https://qubecube.com/RecommentFood/Backend/api/GetFavorites?user_id=${user_id}`).then(res => {
        return res.data;
    }).catch(e => {
        console.log("ErrorApi GetFavorites", e)
        return "ErrorApi";
    });
}

function Favorites(dataForm) {
    return axios.post(`https://qubecube.com/RecommentFood/Backend/api/Favorites`, dataForm).then(res => {
        return res.data;
    }).catch(e => {
        console.log("ErrorApi Favorites", e)
        return "ErrorApi";
    });
}

function Recommend() {
    return axios.get(`https://qubecube.com/RecommentFood/Backend/api/Recommend` ).then(res => {
        return res.data;
    }).catch(e => {
        console.log("ErrorApi Recommend", e)
        return "ErrorApi";
    });
}

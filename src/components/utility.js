import { base_url } from "./global";

export const getData = (url) => {
    return fetch(base_url + url, {
        method: "get"
    }).then(function (response) {
        $('#preloader').modal('close')
        return response.json();
    }).catch(function (error) {
        $('#preloader').modal('close')
        return { error: error.message };
    });
}
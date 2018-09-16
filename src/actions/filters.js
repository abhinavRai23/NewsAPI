export function ChooseCountry(value) {
    return {
        type: "ChooseCountry",
        payload: value
    }
}

export function ChooseCategory(value) {
    return {
        type: "ChooseCategory",
        payload: value
    }
}

export function ChooseLanguage(value) {
    return {
        type: "ChooseLanguage",
        payload: value
    }
}

export function AddOptions(obj) {
    return{
        type: "AddOptions",
        payload: obj
    }
}
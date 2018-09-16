const intialState = {
    selected_country:"",
    selected_language:"",
    selected_category:"",
    options : {
        all_countries: [],
        all_languages: [],
        all_categories: []
    }
}
const filters = (state = intialState, action) => {
    switch (action.type) {
        case "ChooseCountry": {
            return { ...state, selected_country: action.payload }
        }
        case "ChooseLanguage": {
            return { ...state, selected_language: action.payload }
        }
        case "ChooseCategory": {
            return { ...state, selected_category:action.payload }
        }
        case "AddOptions":{
            return { ...state, options:{ ...action.payload } }
        }
    }
    return state
}
export default filters;
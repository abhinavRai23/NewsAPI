const intialState = {
    selected_country: "",
    selected_category: "",
    selected_source: "",
    options: {
        all_sources: [],
        all_countries: [],
        all_categories: []
    }
}
const filters = (state = intialState, action) => {
    switch (action.type) {
        case "ChooseCountry": {
            return { ...state, selected_country: action.payload }
        }
        case "ChooseCategory": {
            return { ...state, selected_category: action.payload }
        }
        case "ChooseSource": {
            return { ...state, selected_source: action.payload }
        }
        case "AddOptions": {
            return { ...state, options: { ...state.options, ...action.payload } }
        }
    }
    return state
}
export default filters;
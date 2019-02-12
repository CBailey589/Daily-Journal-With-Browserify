import filterEntriesBySelectedMood from "./filterEntriesBySelectedMood.js"

function filterEntriesBySearchInput() {
    return filterEntriesBySelectedMood()
        .then((entriesFilteredByMood) => {
            let input = document.querySelector("#searchEntriesInput").value.toLowerCase()
            let entriesFilteredBySearchInput = entriesFilteredByMood.filter((object) => {
                return (object.conceptsCovered.toLowerCase().includes(input) || object.textEntry.toLowerCase().includes(input))
            })
            return entriesFilteredBySearchInput
        })
}

export default filterEntriesBySearchInput

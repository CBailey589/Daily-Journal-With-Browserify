import getEntriesFromDatabase from "./getEntriesFromDatabase.js"

function filterEntriesBySelectedMood() {
    return getEntriesFromDatabase()
        .then((parsedEntries) => {
            let moodOptionsArray = [].slice.call(document.querySelectorAll(".radio"))
            let entriesFilteredByMood = []
            if (moodOptionsArray[0].checked === false) {
                let selectedMood = moodOptionsArray.filter(moodOption => {
                    return moodOption.checked === true
                })[0].id
                entriesFilteredByMood = parsedEntries.filter(entry => {
                    return entry.mood === selectedMood
                })
            } else {
                entriesFilteredByMood = parsedEntries
            }
            return entriesFilteredByMood
        })
}

export default filterEntriesBySelectedMood
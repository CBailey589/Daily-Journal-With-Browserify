import filterEntriesBySearchInput from "./filterEntriesBySearchInput.js"

function turnDatabaseEntriesToHTML() {
    return filterEntriesBySearchInput()
        .then((filteredEntries) => {
            let entryHTMLBlocks = []
            filteredEntries.forEach(entry => {
                entryHTMLBlocks.push(`
            <div id="${entry.date}" class="pastEntry">
                <input type="hidden" id="${entry.id}">
                <h1 class="pastEntryTitle">${entry.conceptsCovered}</h1>
                <div class="pastEntryText">${entry.textEntry}</div>
                <div class="pastEntryLink">
                    <a href="${entry.link}">Related Link: ${entry.linkDescription} </a>
                </div>
                <section class="entryBottomBar">
                    <button id="delete--${entry.id}">Delete Entry</button>
                    <button id="edit--${entry.id}">Edit Entry</button>
                    <div class="dateAndMood">
                        <div class="pastEntryDate">${entry.date}</div>
                        <div class="pastEntryMood">${entry.mood}</div>
                    </div>
                </section>
            </div>
            `)
                return entryHTMLBlocks
            })
            return entryHTMLBlocks
        })
}

export default turnDatabaseEntriesToHTML
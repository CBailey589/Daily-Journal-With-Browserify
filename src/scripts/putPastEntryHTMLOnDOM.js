import turnDatabaseEntriesToHTML from "./turnDatabaseEntriesToHTML.js"

function putPastEntryHTMLOnDOM() {
    return turnDatabaseEntriesToHTML()
    .then((entryHTMLBlocks) => {
        entryHTMLBlocks.forEach(block => {
            document.querySelector("#pastEntries").innerHTML += block;
        })
    });
}

export default putPastEntryHTMLOnDOM
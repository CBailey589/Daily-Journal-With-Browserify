import makeNewEntryObject from "./makeNewEntryObject.js"

function postNewEntryToDatabase() {
    let newEntryObject = makeNewEntryObject()
    return fetch("http://localhost:8088/entries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEntryObject)
    })

}


export default postNewEntryToDatabase
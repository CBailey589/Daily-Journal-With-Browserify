import API from "./APIFunctions.js"
import clearDisplayedEntriesFromDOM from "./clearDisplayedEntriesFromDOM.js"
import checkNewEntryForProfanity from "./checkNewEntryForProfanity.js"
import resetJournalEntryForm from "./resetJournalEntryForm.js"

function addEventListeners() {
    document.querySelector("#submitButton").addEventListener("click", () => {
        if (event.target.textContent === "Record Journal Entry") {
            if (checkNewEntryForProfanity()) {
                alert("No Profanity Allowed In Journal")
                resetJournalEntryForm()
            } else {
                clearDisplayedEntriesFromDOM()
                API.POST().then(API.GET)
                resetJournalEntryForm()
            }
        }
        if (event.target.textContent === "Update Journal Entry") {
            // need code here

            document.querySelector("#submitButton").textContent = "Record Journal Entry"
        }
    })

    document.querySelector("#moodRadioSection").addEventListener("click", () => {
        if (event.target.type === "radio") {
            clearDisplayedEntriesFromDOM()
            API.GET()
        }
    })

    document.querySelector("#searchEntriesInput").addEventListener("keyup", () => {
        clearDisplayedEntriesFromDOM()
        API.GET()
    })

    document.querySelector("#pastEntries").addEventListener("click", () => {
        if (event.target.id.startsWith("delete--")) {
            let id = parseInt(event.target.id.split("--")[1])
            return (API.DELETE(id))
                .then(() => clearDisplayedEntriesFromDOM())
                .then(() => API.GET())
        } else if (event.target.id.startsWith("edit--")) {
            let id = parseInt(event.target.id.split("--")[1])
            document.querySelector("#submitButton").textContent = "Update Journal Entry"
            return (API.EDITGET(id))
                .then((entry) => {
                    document.querySelector("#entryCurrentlyInForm").value = entry.id
                    document.querySelector("#journalDate").value = entry.date
                    document.querySelector("#conceptsCovered").value = entry.conceptsCovered
                    document.querySelector("#entry").value = entry.textEntry
                    document.querySelector("#helpfulLink").value = entry.link
                    document.querySelector("#helpfulLinkTitle").value = entry.linkDescription
                    document.querySelector("#mood").value = entry.mood
                    return
                })
        }
    })

}

export default addEventListeners
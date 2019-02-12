function resetJournalEntryForm() {
    document.querySelector("#journalDate").valueAsDate = null
    document.querySelector("#conceptsCovered").value = ""
    document.querySelector("#entry").value = ""
    document.querySelector("#helpfulLink").value = ""
    document.querySelector("#helpfulLink").value = ""
    document.querySelector("#mood").value = "Happy"
}

export default resetJournalEntryForm
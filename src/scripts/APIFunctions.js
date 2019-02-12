import putPastEntryHTMLOnDOM from "./putPastEntryHTMLOnDOM.js"
import postNewEntryToDatabase from "./postNewEntryToDatabase.js"
import deleteEntryFromDatabase from "./deleteEntryFromDatabase.js"
import putPastEntryInFormToEdit from "./putPastEntryInFormToEdit.js"
import submitEditedEntry from "./submitEditedEntry.js"

const API = {
    GET: putPastEntryHTMLOnDOM,
    POST: postNewEntryToDatabase,
    DELETE: deleteEntryFromDatabase,
    EDITGET: putPastEntryInFormToEdit,
    EDITPOST: submitEditedEntry
}

export default API
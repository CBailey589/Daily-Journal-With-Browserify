function putPastEntryInFormToEdit(id) {
    return fetch(`http://localhost:8088/entries/${id}`)
    .then(response => response.json())
}

export default putPastEntryInFormToEdit
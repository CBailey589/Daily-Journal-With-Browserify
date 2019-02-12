function deleteEntryFromDatabase(id) {
    return fetch(`http://127.0.0.1:8088/entries/${id}`, {
        method: "DELETE"
    })
}

export default deleteEntryFromDatabase
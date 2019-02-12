function submitEditedEntry(newEntryObject) {
    let object = newEntryObject
    return fetch(`http://127.0.0.1:8088/entries/${object.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    })
        .then(res => res.json())
}

export default submitEditedEntry
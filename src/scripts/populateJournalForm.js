function populateJournalForm() {
    document.querySelector("#journalEntryForm").innerHTML = `
    <fieldset>
    <input type="hidden" id="entryCurrentlyInForm" value="0">
            <label for="journalDate">Date of entry</label>
            <input type="date" name="journalDate" id="journalDate">
        </fieldset>

        <fieldset>
            <label for="conceptsCovered" class="conceptsCovered">Concepts Covered</label>
            <input type="text" name="conceptsCovered" id="conceptsCovered">
        </fieldset>

        <fieldset>
            <label for="entry">Journal Entry</label>
            <textarea name="entry" id="entry" cols="30" rows="10"></textarea>
        </fieldset>

        <fieldset>
            <label for="helpfulLink" class="helpfulLink">Helpful Link</label>
            <input type="text" name="helpfulLink" id="helpfulLink">
        </fieldset>

        <fieldset>
            <label for="helpfulLinkTitle" class="helpfulLinkTitle">Link Description</label>
            <input type="text" name="helpfulLinkTitle" id="helpfulLinkTitle">
        </fieldset>

        <fieldset>
            <label for="mood">Mood for the day</label>
            <select name="mood" id="mood">
                <option value="Happy">Happy</option>
                <option value="Fine">Fine</option>
                <option value="Confused">Confused</option>
                <option value="Sad">Sad</option>
                <option value="Angry">Angry</option>
            </select>
        </fieldset>

        <button type="button" onclick="" id="submitButton">Record Journal Entry</button>

        <fieldset id="moodFilter">
            <h2 id="moodFilterHeader">Filter Past Entries By Mood:
            </h2>
            <section id="moodRadioSection">
                <div id="moodRadio">
                    <input type="radio" id="All" class="radio" name="moodRadioOption" value="All" checked>
                    <label for="All">All</label>
                </div>
                <div id="moodRadio">
                    <input type="radio" id="Happy" class="radio" name="moodRadioOption" value="Happy">
                    <label for="Happy">Happy</label>
                </div>
                <div id="moodRadio">
                    <input type="radio" id="Fine" class="radio"  name="moodRadioOption" value="Fine">
                    <label for="Fine">Fine</label>
                </div>
                <div id="moodRadio">
                    <input type="radio" id="Confused" class="radio"  name="moodRadioOption" value="Confused">
                    <label for="Confused">Confused</label>
                </div>
                <div id="moodRadio">
                    <input type="radio" id="Sad" class="radio"  name="moodRadioOption" value="Sad">
                    <label for="Sad">Sad</label>
                </div>
                <div id="moodRadio">
                    <input type="radio" id="Angry" class="radio"  name="moodRadioOption" value="Angry">
                    <label for="Angry">Angry</label>
                </div>
            </section>
        </fieldset>

        <fieldset id="searchEntries">
            <label for="searchEntriesInput" class="searchEntriesInput">Search Entries In Mood</label>
            <input type="text" name="searchEntriesInput" id="searchEntriesInput">
        </fieldset>

        <section id="pastEntries"></section>

    `
}

export default populateJournalForm
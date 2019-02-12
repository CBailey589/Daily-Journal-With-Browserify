(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _putPastEntryHTMLOnDOM = _interopRequireDefault(require("./putPastEntryHTMLOnDOM.js"));

var _postNewEntryToDatabase = _interopRequireDefault(require("./postNewEntryToDatabase.js"));

var _deleteEntryFromDatabase = _interopRequireDefault(require("./deleteEntryFromDatabase.js"));

var _putPastEntryInFormToEdit = _interopRequireDefault(require("./putPastEntryInFormToEdit.js"));

var _submitEditedEntry = _interopRequireDefault(require("./submitEditedEntry.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const API = {
  GET: _putPastEntryHTMLOnDOM.default,
  POST: _postNewEntryToDatabase.default,
  DELETE: _deleteEntryFromDatabase.default,
  EDITGET: _putPastEntryInFormToEdit.default,
  EDITPOST: _submitEditedEntry.default
};
var _default = API;
exports.default = _default;

},{"./deleteEntryFromDatabase.js":5,"./postNewEntryToDatabase.js":12,"./putPastEntryHTMLOnDOM.js":13,"./putPastEntryInFormToEdit.js":14,"./submitEditedEntry.js":16}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _APIFunctions = _interopRequireDefault(require("./APIFunctions.js"));

var _clearDisplayedEntriesFromDOM = _interopRequireDefault(require("./clearDisplayedEntriesFromDOM.js"));

var _checkNewEntryForProfanity = _interopRequireDefault(require("./checkNewEntryForProfanity.js"));

var _resetJournalEntryForm = _interopRequireDefault(require("./resetJournalEntryForm.js"));

var _makeNewEntryObject = _interopRequireDefault(require("./makeNewEntryObject.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addEventListeners() {
  document.querySelector("#submitButton").addEventListener("click", () => {
    if (event.target.textContent === "Record Journal Entry") {
      if ((0, _checkNewEntryForProfanity.default)()) {
        alert("No Profanity Allowed In Journal");
        (0, _resetJournalEntryForm.default)();
      } else {
        (0, _clearDisplayedEntriesFromDOM.default)();

        _APIFunctions.default.POST().then(_APIFunctions.default.GET);

        (0, _resetJournalEntryForm.default)();
      }
    }

    if (event.target.textContent === "Update Journal Entry") {
      (0, _clearDisplayedEntriesFromDOM.default)();
      let newEntryObject = (0, _makeNewEntryObject.default)();

      _APIFunctions.default.EDITPOST(newEntryObject).then(_APIFunctions.default.GET);

      (0, _resetJournalEntryForm.default)();
      document.querySelector("#submitButton").textContent = "Record Journal Entry";
    }
  });
  document.querySelector("#moodRadioSection").addEventListener("click", () => {
    if (event.target.type === "radio") {
      (0, _clearDisplayedEntriesFromDOM.default)();

      _APIFunctions.default.GET();
    }
  });
  document.querySelector("#searchEntriesInput").addEventListener("keyup", () => {
    (0, _clearDisplayedEntriesFromDOM.default)();

    _APIFunctions.default.GET();
  });
  document.querySelector("#pastEntries").addEventListener("click", () => {
    if (event.target.id.startsWith("delete--")) {
      let id = parseInt(event.target.id.split("--")[1]);
      return _APIFunctions.default.DELETE(id).then(() => (0, _clearDisplayedEntriesFromDOM.default)()).then(() => _APIFunctions.default.GET());
    } else if (event.target.id.startsWith("edit--")) {
      let id = parseInt(event.target.id.split("--")[1]);
      document.querySelector("#submitButton").textContent = "Update Journal Entry";
      return _APIFunctions.default.EDITGET(id).then(entry => {
        document.querySelector("#entryCurrentlyInForm").value = entry.id;
        document.querySelector("#journalDate").value = entry.date;
        document.querySelector("#conceptsCovered").value = entry.conceptsCovered;
        document.querySelector("#entry").value = entry.textEntry;
        document.querySelector("#helpfulLink").value = entry.link;
        document.querySelector("#helpfulLinkTitle").value = entry.linkDescription;
        document.querySelector("#mood").value = entry.mood;
        return;
      });
    }
  });
}

var _default = addEventListeners;
exports.default = _default;

},{"./APIFunctions.js":1,"./checkNewEntryForProfanity.js":3,"./clearDisplayedEntriesFromDOM.js":4,"./makeNewEntryObject.js":10,"./resetJournalEntryForm.js":15}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _makeNewEntryObject = _interopRequireDefault(require("./makeNewEntryObject.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let profanityRegexArray = ["^[a@][s\$][s\$]$", "[a@][s\$][s\$]h[o0][l1][e3][s\$]?", "b[a@][s\$][t\+][a@]rd", "b[e3][a@][s\$][t\+][i1][a@]?[l1]([i1][t\+]y)?", "b[e3][a@][s\$][t\+][i1][l1][i1][t\+]y", "b[e3][s\$][t\+][i1][a@][l1]([i1][t\+]y)?", "b[i1][t\+]ch[s\$]?", "b[i1][t\+]ch[e3]r[s\$]?", "b[i1][t\+]ch[e3][s\$]", "b[i1][t\+]ch[i1]ng?", "b[l1][o0]wj[o0]b[s\$]?", "c[l1][i1][t\+]", "^(c|k|ck|q)[o0](c|k|ck|q)[s\$]?$", "(c|k|ck|q)[o0](c|k|ck|q)[s\$]u", "(c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[e3]d", "(c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[e3]r", "(c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[i1]ng", "(c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[s\$]", "^cum[s\$]?$", "cumm??[e3]r", "cumm?[i1]ngcock", "(c|k|ck|q)um[s\$]h[o0][t\+]", "(c|k|ck|q)un[i1][l1][i1]ngu[s\$]", "(c|k|ck|q)un[i1][l1][l1][i1]ngu[s\$]", "(c|k|ck|q)unn[i1][l1][i1]ngu[s\$]", "(c|k|ck|q)un[t\+][s\$]?", "(c|k|ck|q)un[t\+][l1][i1](c|k|ck|q)", "(c|k|ck|q)un[t\+][l1][i1](c|k|ck|q)[e3]r", "(c|k|ck|q)un[t\+][l1][i1](c|k|ck|q)[i1]ng", "cyb[e3]r(ph|f)u(c|k|ck|q)", "d[a@]mn", "d[i1]ck", "d[i1][l1]d[o0]", "d[i1][l1]d[o0][s\$]", "d[i1]n(c|k|ck|q)", "d[i1]n(c|k|ck|q)[s\$]", "[e3]j[a@]cu[l1]", "(ph|f)[a@]g[s\$]?", "(ph|f)[a@]gg[i1]ng", "(ph|f)[a@]gg?[o0][t\+][s\$]?", "(ph|f)[a@]gg[s\$]", "(ph|f)[e3][l1][l1]?[a@][t\+][i1][o0]", "(ph|f)u(c|k|ck|q)", "(ph|f)u(c|k|ck|q)[s\$]?", "g[a@]ngb[a@]ng[s\$]?", "g[a@]ngb[a@]ng[e3]d", "g[a@]y", "h[o0]m?m[o0]", "h[o0]rny", "j[a@](c|k|ck|q)\-?[o0](ph|f)(ph|f)?", "j[e3]rk\-?[o0](ph|f)(ph|f)?", "j[i1][s\$z][s\$z]?m?", "[ck][o0]ndum[s\$]?", "mast(e|ur)b(8|ait|ate)", "n[i1]gg?[e3]r[s\$]?", "[o0]rg[a@][s\$][i1]m[s\$]?", "[o0]rg[a@][s\$]m[s\$]?", "p[e3]nn?[i1][s\$]", "p[i1][s\$][s\$]", "p[i1][s\$][s\$][o0](ph|f)(ph|f)", "p[o0]rn", "p[o0]rn[o0][s\$]?", "p[o0]rn[o0]gr[a@]phy", "pr[i1]ck[s\$]?", "pu[s\$][s\$][i1][e3][s\$]", "pu[s\$][s\$]y[s\$]?", "[s\$][e3]x", "[s\$]h[i1][t\+][s\$]?", "[s\$][l1]u[t\+][s\$]?", "[s\$]mu[t\+][s\$]?", "[s\$]punk[s\$]?", "[t\+]w[a@][t\+][s\$]?"];

function checkNewEntryForProfanity() {
  let testScore = Boolean;
  const formObject = (0, _makeNewEntryObject.default)();
  const journalInputsToBeChecked = Object.values(formObject);
  journalInputsToBeChecked.splice(5, 1);
  journalInputsToBeChecked.splice(0, 1);
  const profanityResults = journalInputsToBeChecked.map(currentInput => {
    let resultsForThisInput = profanityRegexArray.map(currentBadWord => {
      let regExConstructor = new RegExp(currentBadWord);
      return regExConstructor.test(currentInput);
    });

    if (resultsForThisInput.includes(true)) {
      return true;
    } else {
      return false;
    }
  });

  if (profanityResults.includes(true)) {
    testScore = true;
  } else {
    testScore = false;
  }

  return testScore;
}

var _default = checkNewEntryForProfanity;
exports.default = _default;

},{"./makeNewEntryObject.js":10}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function clearDisplayedEntriesFromDOM() {
  document.querySelector("#pastEntries").innerHTML = "";
}

var _default = clearDisplayedEntriesFromDOM;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function deleteEntryFromDatabase(id) {
  return fetch(`http://127.0.0.1:8088/entries/${id}`, {
    method: "DELETE"
  });
}

var _default = deleteEntryFromDatabase;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _filterEntriesBySelectedMood = _interopRequireDefault(require("./filterEntriesBySelectedMood.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterEntriesBySearchInput() {
  return (0, _filterEntriesBySelectedMood.default)().then(entriesFilteredByMood => {
    let input = document.querySelector("#searchEntriesInput").value.toLowerCase();
    let entriesFilteredBySearchInput = entriesFilteredByMood.filter(object => {
      return object.conceptsCovered.toLowerCase().includes(input) || object.textEntry.toLowerCase().includes(input);
    });
    return entriesFilteredBySearchInput;
  });
}

var _default = filterEntriesBySearchInput;
exports.default = _default;

},{"./filterEntriesBySelectedMood.js":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getEntriesFromDatabase = _interopRequireDefault(require("./getEntriesFromDatabase.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterEntriesBySelectedMood() {
  return (0, _getEntriesFromDatabase.default)().then(parsedEntries => {
    let moodOptionsArray = [].slice.call(document.querySelectorAll(".radio"));
    let entriesFilteredByMood = [];

    if (moodOptionsArray[0].checked === false) {
      let selectedMood = moodOptionsArray.filter(moodOption => {
        return moodOption.checked === true;
      })[0].id;
      entriesFilteredByMood = parsedEntries.filter(entry => {
        return entry.mood === selectedMood;
      });
    } else {
      entriesFilteredByMood = parsedEntries;
    }

    return entriesFilteredByMood;
  });
}

var _default = filterEntriesBySelectedMood;
exports.default = _default;

},{"./getEntriesFromDatabase.js":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function getEntriesFromDatabase() {
  return fetch("http://localhost:8088/entries").then(response => response.json());
}

var _default = getEntriesFromDatabase;
exports.default = _default;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _populateJournalForm = _interopRequireDefault(require("./populateJournalForm.js"));

var _APIFunctions = _interopRequireDefault(require("./APIFunctions.js"));

var _addEventListeners = _interopRequireDefault(require("./addEventListeners.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _addEventListeners.default;
exports.default = _default;
(0, _populateJournalForm.default)();

_APIFunctions.default.GET().then(() => (0, _addEventListeners.default)());

},{"./APIFunctions.js":1,"./addEventListeners.js":2,"./populateJournalForm.js":11}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function makeNewEntryObject() {
  let newEntryObject = {};
  newEntryObject.id = parseInt(document.querySelector("#entryCurrentlyInForm").value);
  newEntryObject.date = document.querySelector("#journalDate").value;
  newEntryObject.conceptsCovered = document.querySelector("#conceptsCovered").value;
  newEntryObject.textEntry = document.querySelector("#entry").value;
  newEntryObject.link = document.querySelector("#helpfulLink").value;
  newEntryObject.linkDescription = document.querySelector("#helpfulLinkTitle").value;
  newEntryObject.mood = document.querySelector("#mood").value;
  return newEntryObject;
}

var _default = makeNewEntryObject;
exports.default = _default;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

    `;
}

var _default = populateJournalForm;
exports.default = _default;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _makeNewEntryObject = _interopRequireDefault(require("./makeNewEntryObject.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function postNewEntryToDatabase() {
  let newEntryObject = (0, _makeNewEntryObject.default)();
  return fetch("http://localhost:8088/entries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newEntryObject)
  });
}

var _default = postNewEntryToDatabase;
exports.default = _default;

},{"./makeNewEntryObject.js":10}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _turnDatabaseEntriesToHTML = _interopRequireDefault(require("./turnDatabaseEntriesToHTML.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function putPastEntryHTMLOnDOM() {
  return (0, _turnDatabaseEntriesToHTML.default)().then(entryHTMLBlocks => {
    entryHTMLBlocks.forEach(block => {
      document.querySelector("#pastEntries").innerHTML += block;
    });
  });
}

var _default = putPastEntryHTMLOnDOM;
exports.default = _default;

},{"./turnDatabaseEntriesToHTML.js":17}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function putPastEntryInFormToEdit(id) {
  return fetch(`http://localhost:8088/entries/${id}`).then(response => response.json());
}

var _default = putPastEntryInFormToEdit;
exports.default = _default;

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function resetJournalEntryForm() {
  document.querySelector("#journalDate").valueAsDate = null;
  document.querySelector("#conceptsCovered").value = "";
  document.querySelector("#entry").value = "";
  document.querySelector("#helpfulLink").value = "";
  document.querySelector("#helpfulLink").value = "";
  document.querySelector("#mood").value = "Happy";
}

var _default = resetJournalEntryForm;
exports.default = _default;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function submitEditedEntry(newEntryObject) {
  let object = newEntryObject;
  return fetch(`http://127.0.0.1:8088/entries/${object.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
  }).then(res => res.json());
}

var _default = submitEditedEntry;
exports.default = _default;

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _filterEntriesBySearchInput = _interopRequireDefault(require("./filterEntriesBySearchInput.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function turnDatabaseEntriesToHTML() {
  return (0, _filterEntriesBySearchInput.default)().then(filteredEntries => {
    let entryHTMLBlocks = [];
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
            `);
      return entryHTMLBlocks;
    });
    return entryHTMLBlocks;
  });
}

var _default = turnDatabaseEntriesToHTML;
exports.default = _default;

},{"./filterEntriesBySearchInput.js":6}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0FQSUZ1bmN0aW9ucy5qcyIsIi4uL3NjcmlwdHMvYWRkRXZlbnRMaXN0ZW5lcnMuanMiLCIuLi9zY3JpcHRzL2NoZWNrTmV3RW50cnlGb3JQcm9mYW5pdHkuanMiLCIuLi9zY3JpcHRzL2NsZWFyRGlzcGxheWVkRW50cmllc0Zyb21ET00uanMiLCIuLi9zY3JpcHRzL2RlbGV0ZUVudHJ5RnJvbURhdGFiYXNlLmpzIiwiLi4vc2NyaXB0cy9maWx0ZXJFbnRyaWVzQnlTZWFyY2hJbnB1dC5qcyIsIi4uL3NjcmlwdHMvZmlsdGVyRW50cmllc0J5U2VsZWN0ZWRNb29kLmpzIiwiLi4vc2NyaXB0cy9nZXRFbnRyaWVzRnJvbURhdGFiYXNlLmpzIiwiLi4vc2NyaXB0cy9qb3VybmFsLmpzIiwiLi4vc2NyaXB0cy9tYWtlTmV3RW50cnlPYmplY3QuanMiLCIuLi9zY3JpcHRzL3BvcHVsYXRlSm91cm5hbEZvcm0uanMiLCIuLi9zY3JpcHRzL3Bvc3ROZXdFbnRyeVRvRGF0YWJhc2UuanMiLCIuLi9zY3JpcHRzL3B1dFBhc3RFbnRyeUhUTUxPbkRPTS5qcyIsIi4uL3NjcmlwdHMvcHV0UGFzdEVudHJ5SW5Gb3JtVG9FZGl0LmpzIiwiLi4vc2NyaXB0cy9yZXNldEpvdXJuYWxFbnRyeUZvcm0uanMiLCIuLi9zY3JpcHRzL3N1Ym1pdEVkaXRlZEVudHJ5LmpzIiwiLi4vc2NyaXB0cy90dXJuRGF0YWJhc2VFbnRyaWVzVG9IVE1MLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxHQUFHLEdBQUc7QUFDUixFQUFBLEdBQUcsRUFBRSw4QkFERztBQUVSLEVBQUEsSUFBSSxFQUFFLCtCQUZFO0FBR1IsRUFBQSxNQUFNLEVBQUUsZ0NBSEE7QUFJUixFQUFBLE9BQU8sRUFBRSxpQ0FKRDtB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Y0FBM0IsRUFBMkM7QUFDdkMsTUFBSSxNQUFNLEdBQUcsY0FBYjtBQUNBLFNBQU8sS0FBSyxDQUFFLGlDQUFnQyxNQUFNLENBQUMsRUFBRyxFQUE1QyxFQUErQztBQUN2RCxJQUFBLE1BQU0sRUFBRSxLQUQrQztBQUV2RCxJQUFBLE9BQU8sRUFBRTtBQUNMLHNCQUFnQjtBQURYLEtBRjhDO0FBS3ZELElBQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsTUFBZjtBQUxpRCxHQUEvQyxDQUFMLENBT0YsSUFQRSxDQU9HLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSixFQVBWLENBQVA7QUFRSDs7ZUFFYyxpQjs7Ozs7Ozs7Ozs7QUNaZjs7OztBQUVBLFNBQVMseUJBQVQsR0FBcUM7QUFDakMsU0FBTywyQ0FDRixJQURFLENBQ0ksZUFBRCxJQUFxQjtBQUN2QixRQUFJLGVBQWUsR0FBRyxFQUF0QjtBQUNBLElBQUEsZUFBZSxDQUFDLE9BQWhCLENBQXdCLEtBQUssSUFBSTtBQUM3QixNQUFBLGVBQWUsQ0FBQyxJQUFoQixDQUFzQjt1QkFDZixLQUFLLENBQUMsSUFBSzsyQ0FDUyxLQUFLLENBQUMsRUFBRzs2Q0FDUCxLQUFLLENBQUMsZUFBZ0I7NkNBQ3RCLEtBQUssQ0FBQyxTQUFVOzsrQkFFOUIsS0FBSyxDQUFDLElBQUssbUJBQWtCLEtBQUssQ0FBQyxlQUFnQjs7OzBDQUd4QyxLQUFLLENBQUMsRUFBRzt3Q0FDWCxLQUFLLENBQUMsRUFBRzs7cURBRUksS0FBSyxDQUFDLElBQUs7cURBQ1gsS0FBSyxDQUFDLElBQUs7Ozs7YUFiaEQ7QUFrQkEsYUFBTyxlQUFQO0FBQ0gsS0FwQkQ7QUFxQkEsV0FBTyxlQUFQO0FBQ0gsR0F6QkUsQ0FBUDtBQTBCSDs7ZUFFYyx5QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBwdXRQYXN0RW50cnlIVE1MT25ET00gZnJvbSBcIi4vcHV0UGFzdEVudHJ5SFRNTE9uRE9NLmpzXCJcclxuaW1wb3J0IHBvc3ROZXdFbnRyeVRvRGF0YWJhc2UgZnJvbSBcIi4vcG9zdE5ld0VudHJ5VG9EYXRhYmFzZS5qc1wiXHJcbmltcG9ydCBkZWxldGVFbnRyeUZyb21EYXRhYmFzZSBmcm9tIFwiLi9kZWxldGVFbnRyeUZyb21EYXRhYmFzZS5qc1wiXHJcbmltcG9ydCBwdXRQYXN0RW50cnlJbkZvcm1Ub0VkaXQgZnJvbSBcIi4vcHV0UGFzdEVudHJ5SW5Gb3JtVG9FZGl0LmpzXCJcclxuaW1wb3J0IHN1Ym1pdEVkaXRlZEVudHJ5IGZyb20gXCIuL3N1Ym1pdEVkaXRlZEVudHJ5LmpzXCJcclxuXHJcbmNvbnN0IEFQSSA9IHtcclxuICAgIEdFVDogcHV0UGFzdEVudHJ5SFRNTE9uRE9NLFxyXG4gICAgUE9TVDogcG9zdE5ld0VudHJ5VG9EYXRhYmFzZSxcclxuICAgIERFTEVURTogZGVsZXRlRW50cnlGcm9tRGF0YWJhc2UsXHJcbiAgICBFRElUR0VUOiBwdXRQYXN0RW50cnlJbkZvcm1Ub0VkaXQsXHJcbiAgICBFRElUUE9TVDogc3VibWl0RWRpdGVkRW50cnlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQVBJIiwiaW1wb3J0IEFQSSBmcm9tIFwiLi9BUElGdW5jdGlvbnMuanNcIlxyXG5pbXBvcnQgY2xlYXJEaXNwbGF5ZWRFbnRyaWVzRnJvbURPTSBmcm9tIFwiLi9jbGVhckRpc3BsYXllZEVudHJpZXNGcm9tRE9NLmpzXCJcclxuaW1wb3J0IGNoZWNrTmV3RW50cnlGb3JQcm9mYW5pdHkgZnJvbSBcIi4vY2hlY2tOZXdFbnRyeUZvclByb2Zhbml0eS5qc1wiXHJcbmltcG9ydCByZXNldEpvdXJuYWxFbnRyeUZvcm0gZnJvbSBcIi4vcmVzZXRKb3VybmFsRW50cnlGb3JtLmpzXCJcclxuaW1wb3J0IG1ha2VOZXdFbnRyeU9iamVjdCBmcm9tIFwiLi9tYWtlTmV3RW50cnlPYmplY3QuanNcIjtcclxuXHJcbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJtaXRCdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIlJlY29yZCBKb3VybmFsIEVudHJ5XCIpIHtcclxuICAgICAgICAgICAgaWYgKGNoZWNrTmV3RW50cnlGb3JQcm9mYW5pdHkoKSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJObyBQcm9mYW5pdHkgQWxsb3dlZCBJbiBKb3VybmFsXCIpXHJcbiAgICAgICAgICAgICAgICByZXNldEpvdXJuYWxFbnRyeUZvcm0oKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJEaXNwbGF5ZWRFbnRyaWVzRnJvbURPTSgpXHJcbiAgICAgICAgICAgICAgICBBUEkuUE9TVCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihBUEkuR0VUKVxyXG4gICAgICAgICAgICAgICAgcmVzZXRKb3VybmFsRW50cnlGb3JtKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIlVwZGF0ZSBKb3VybmFsIEVudHJ5XCIpIHtcclxuICAgICAgICAgICAgY2xlYXJEaXNwbGF5ZWRFbnRyaWVzRnJvbURPTSgpXHJcbiAgICAgICAgICAgIGxldCBuZXdFbnRyeU9iamVjdCA9IG1ha2VOZXdFbnRyeU9iamVjdCgpXHJcbiAgICAgICAgICAgIEFQSS5FRElUUE9TVChuZXdFbnRyeU9iamVjdClcclxuICAgICAgICAgICAgLnRoZW4oQVBJLkdFVClcclxuICAgICAgICAgICAgcmVzZXRKb3VybmFsRW50cnlGb3JtKClcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJtaXRCdXR0b25cIikudGV4dENvbnRlbnQgPSBcIlJlY29yZCBKb3VybmFsIEVudHJ5XCJcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9vZFJhZGlvU2VjdGlvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQudHlwZSA9PT0gXCJyYWRpb1wiKSB7XHJcbiAgICAgICAgICAgIGNsZWFyRGlzcGxheWVkRW50cmllc0Zyb21ET00oKVxyXG4gICAgICAgICAgICBBUEkuR0VUKClcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoRW50cmllc0lucHV0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoKSA9PiB7XHJcbiAgICAgICAgY2xlYXJEaXNwbGF5ZWRFbnRyaWVzRnJvbURPTSgpXHJcbiAgICAgICAgQVBJLkdFVCgpXHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzdEVudHJpZXNcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkLnN0YXJ0c1dpdGgoXCJkZWxldGUtLVwiKSkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBwYXJzZUludChldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXSlcclxuICAgICAgICAgICAgcmV0dXJuIChBUEkuREVMRVRFKGlkKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGNsZWFyRGlzcGxheWVkRW50cmllc0Zyb21ET00oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IEFQSS5HRVQoKSlcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC5pZC5zdGFydHNXaXRoKFwiZWRpdC0tXCIpKSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1Ym1pdEJ1dHRvblwiKS50ZXh0Q29udGVudCA9IFwiVXBkYXRlIEpvdXJuYWwgRW50cnlcIlxyXG4gICAgICAgICAgICByZXR1cm4gKEFQSS5FRElUR0VUKGlkKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChlbnRyeSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlDdXJyZW50bHlJbkZvcm1cIikudmFsdWUgPSBlbnRyeS5pZFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbERhdGVcIikudmFsdWUgPSBlbnRyeS5kYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25jZXB0c0NvdmVyZWRcIikudmFsdWUgPSBlbnRyeS5jb25jZXB0c0NvdmVyZWRcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5XCIpLnZhbHVlID0gZW50cnkudGV4dEVudHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWxwZnVsTGlua1wiKS52YWx1ZSA9IGVudHJ5LmxpbmtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlbHBmdWxMaW5rVGl0bGVcIikudmFsdWUgPSBlbnRyeS5saW5rRGVzY3JpcHRpb25cclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vb2RcIikudmFsdWUgPSBlbnRyeS5tb29kXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhZGRFdmVudExpc3RlbmVycyIsImltcG9ydCBtYWtlTmV3RW50cnlPYmplY3QgZnJvbSBcIi4vbWFrZU5ld0VudHJ5T2JqZWN0LmpzXCJcclxuXHJcbmxldCBwcm9mYW5pdHlSZWdleEFycmF5ID0gW1xyXG4gICAgXCJeW2FAXVtzXFwkXVtzXFwkXSRcIixcclxuICAgIFwiW2FAXVtzXFwkXVtzXFwkXWhbbzBdW2wxXVtlM11bc1xcJF0/XCIsXHJcbiAgICBcImJbYUBdW3NcXCRdW3RcXCtdW2FAXXJkXCIsXHJcbiAgICBcImJbZTNdW2FAXVtzXFwkXVt0XFwrXVtpMV1bYUBdP1tsMV0oW2kxXVt0XFwrXXkpP1wiLFxyXG4gICAgXCJiW2UzXVthQF1bc1xcJF1bdFxcK11baTFdW2wxXVtpMV1bdFxcK115XCIsXHJcbiAgICBcImJbZTNdW3NcXCRdW3RcXCtdW2kxXVthQF1bbDFdKFtpMV1bdFxcK115KT9cIixcclxuICAgIFwiYltpMV1bdFxcK11jaFtzXFwkXT9cIixcclxuICAgIFwiYltpMV1bdFxcK11jaFtlM11yW3NcXCRdP1wiLFxyXG4gICAgXCJiW2kxXVt0XFwrXWNoW2UzXVtzXFwkXVwiLFxyXG4gICAgXCJiW2kxXVt0XFwrXWNoW2kxXW5nP1wiLFxyXG4gICAgXCJiW2wxXVtvMF13altvMF1iW3NcXCRdP1wiLFxyXG4gICAgXCJjW2wxXVtpMV1bdFxcK11cIixcclxuICAgIFwiXihjfGt8Y2t8cSlbbzBdKGN8a3xja3xxKVtzXFwkXT8kXCIsXHJcbiAgICBcIihjfGt8Y2t8cSlbbzBdKGN8a3xja3xxKVtzXFwkXXVcIixcclxuICAgIFwiKGN8a3xja3xxKVtvMF0oY3xrfGNrfHEpW3NcXCRddShjfGt8Y2t8cSlbZTNdZFwiLFxyXG4gICAgXCIoY3xrfGNrfHEpW28wXShjfGt8Y2t8cSlbc1xcJF11KGN8a3xja3xxKVtlM11yXCIsXHJcbiAgICBcIihjfGt8Y2t8cSlbbzBdKGN8a3xja3xxKVtzXFwkXXUoY3xrfGNrfHEpW2kxXW5nXCIsXHJcbiAgICBcIihjfGt8Y2t8cSlbbzBdKGN8a3xja3xxKVtzXFwkXXUoY3xrfGNrfHEpW3NcXCRdXCIsXHJcbiAgICBcIl5jdW1bc1xcJF0/JFwiLFxyXG4gICAgXCJjdW1tPz9bZTNdclwiLFxyXG4gICAgXCJjdW1tP1tpMV1uZ2NvY2tcIixcclxuICAgIFwiKGN8a3xja3xxKXVtW3NcXCRdaFtvMF1bdFxcK11cIixcclxuICAgIFwiKGN8a3xja3xxKXVuW2kxXVtsMV1baTFdbmd1W3NcXCRdXCIsXHJcbiAgICBcIihjfGt8Y2t8cSl1bltpMV1bbDFdW2wxXVtpMV1uZ3Vbc1xcJF1cIixcclxuICAgIFwiKGN8a3xja3xxKXVubltpMV1bbDFdW2kxXW5ndVtzXFwkXVwiLFxyXG4gICAgXCIoY3xrfGNrfHEpdW5bdFxcK11bc1xcJF0/XCIsXHJcbiAgICBcIihjfGt8Y2t8cSl1blt0XFwrXVtsMV1baTFdKGN8a3xja3xxKVwiLFxyXG4gICAgXCIoY3xrfGNrfHEpdW5bdFxcK11bbDFdW2kxXShjfGt8Y2t8cSlbZTNdclwiLFxyXG4gICAgXCIoY3xrfGNrfHEpdW5bdFxcK11bbDFdW2kxXShjfGt8Y2t8cSlbaTFdbmdcIixcclxuICAgIFwiY3liW2UzXXIocGh8Zil1KGN8a3xja3xxKVwiLFxyXG4gICAgXCJkW2FAXW1uXCIsXHJcbiAgICBcImRbaTFdY2tcIixcclxuICAgIFwiZFtpMV1bbDFdZFtvMF1cIixcclxuICAgIFwiZFtpMV1bbDFdZFtvMF1bc1xcJF1cIixcclxuICAgIFwiZFtpMV1uKGN8a3xja3xxKVwiLFxyXG4gICAgXCJkW2kxXW4oY3xrfGNrfHEpW3NcXCRdXCIsXHJcbiAgICBcIltlM11qW2FAXWN1W2wxXVwiLFxyXG4gICAgXCIocGh8ZilbYUBdZ1tzXFwkXT9cIixcclxuICAgIFwiKHBofGYpW2FAXWdnW2kxXW5nXCIsXHJcbiAgICBcIihwaHxmKVthQF1nZz9bbzBdW3RcXCtdW3NcXCRdP1wiLFxyXG4gICAgXCIocGh8ZilbYUBdZ2dbc1xcJF1cIixcclxuICAgIFwiKHBofGYpW2UzXVtsMV1bbDFdP1thQF1bdFxcK11baTFdW28wXVwiLFxyXG4gICAgXCIocGh8Zil1KGN8a3xja3xxKVwiLFxyXG4gICAgXCIocGh8Zil1KGN8a3xja3xxKVtzXFwkXT9cIixcclxuICAgIFwiZ1thQF1uZ2JbYUBdbmdbc1xcJF0/XCIsXHJcbiAgICBcImdbYUBdbmdiW2FAXW5nW2UzXWRcIixcclxuICAgIFwiZ1thQF15XCIsXHJcbiAgICBcImhbbzBdbT9tW28wXVwiLFxyXG4gICAgXCJoW28wXXJueVwiLFxyXG4gICAgXCJqW2FAXShjfGt8Y2t8cSlcXC0/W28wXShwaHxmKShwaHxmKT9cIixcclxuICAgIFwialtlM11ya1xcLT9bbzBdKHBofGYpKHBofGYpP1wiLFxyXG4gICAgXCJqW2kxXVtzXFwkel1bc1xcJHpdP20/XCIsXHJcbiAgICBcIltja11bbzBdbmR1bVtzXFwkXT9cIixcclxuICAgIFwibWFzdChlfHVyKWIoOHxhaXR8YXRlKVwiLFxyXG4gICAgXCJuW2kxXWdnP1tlM11yW3NcXCRdP1wiLFxyXG4gICAgXCJbbzBdcmdbYUBdW3NcXCRdW2kxXW1bc1xcJF0/XCIsXHJcbiAgICBcIltvMF1yZ1thQF1bc1xcJF1tW3NcXCRdP1wiLFxyXG4gICAgXCJwW2UzXW5uP1tpMV1bc1xcJF1cIixcclxuICAgIFwicFtpMV1bc1xcJF1bc1xcJF1cIixcclxuICAgIFwicFtpMV1bc1xcJF1bc1xcJF1bbzBdKHBofGYpKHBofGYpXCIsXHJcbiAgICBcInBbbzBdcm5cIixcclxuICAgIFwicFtvMF1ybltvMF1bc1xcJF0/XCIsXHJcbiAgICBcInBbbzBdcm5bbzBdZ3JbYUBdcGh5XCIsXHJcbiAgICBcInByW2kxXWNrW3NcXCRdP1wiLFxyXG4gICAgXCJwdVtzXFwkXVtzXFwkXVtpMV1bZTNdW3NcXCRdXCIsXHJcbiAgICBcInB1W3NcXCRdW3NcXCRdeVtzXFwkXT9cIixcclxuICAgIFwiW3NcXCRdW2UzXXhcIixcclxuICAgIFwiW3NcXCRdaFtpMV1bdFxcK11bc1xcJF0/XCIsXHJcbiAgICBcIltzXFwkXVtsMV11W3RcXCtdW3NcXCRdP1wiLFxyXG4gICAgXCJbc1xcJF1tdVt0XFwrXVtzXFwkXT9cIixcclxuICAgIFwiW3NcXCRdcHVua1tzXFwkXT9cIixcclxuICAgIFwiW3RcXCtdd1thQF1bdFxcK11bc1xcJF0/XCJcclxuXVxyXG5cclxuZnVuY3Rpb24gY2hlY2tOZXdFbnRyeUZvclByb2Zhbml0eSgpIHtcclxuICAgIGxldCB0ZXN0U2NvcmUgPSBCb29sZWFuXHJcbiAgICBjb25zdCBmb3JtT2JqZWN0ID0gbWFrZU5ld0VudHJ5T2JqZWN0KCk7XHJcbiAgICBjb25zdCBqb3VybmFsSW5wdXRzVG9CZUNoZWNrZWQgPSBPYmplY3QudmFsdWVzKGZvcm1PYmplY3QpXHJcbiAgICBqb3VybmFsSW5wdXRzVG9CZUNoZWNrZWQuc3BsaWNlKDUsIDEpXHJcbiAgICBqb3VybmFsSW5wdXRzVG9CZUNoZWNrZWQuc3BsaWNlKDAsIDEpXHJcbiAgICBjb25zdCBwcm9mYW5pdHlSZXN1bHRzID0gam91cm5hbElucHV0c1RvQmVDaGVja2VkLm1hcCgoY3VycmVudElucHV0KSA9PiB7XHJcbiAgICAgICAgbGV0IHJlc3VsdHNGb3JUaGlzSW5wdXQgPSBwcm9mYW5pdHlSZWdleEFycmF5Lm1hcCgoY3VycmVudEJhZFdvcmQpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlZ0V4Q29uc3RydWN0b3IgPSBuZXcgUmVnRXhwKGN1cnJlbnRCYWRXb3JkKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVnRXhDb25zdHJ1Y3Rvci50ZXN0KGN1cnJlbnRJbnB1dClcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyZXN1bHRzRm9yVGhpc0lucHV0LmluY2x1ZGVzKHRydWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIGlmIChwcm9mYW5pdHlSZXN1bHRzLmluY2x1ZGVzKHRydWUpKSB7XHJcbiAgICAgICAgdGVzdFNjb3JlID0gdHJ1ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0ZXN0U2NvcmUgPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRlc3RTY29yZVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjaGVja05ld0VudHJ5Rm9yUHJvZmFuaXR5IiwiZnVuY3Rpb24gY2xlYXJEaXNwbGF5ZWRFbnRyaWVzRnJvbURPTSgpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzdEVudHJpZXNcIikuaW5uZXJIVE1MID0gXCJcIlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGVhckRpc3BsYXllZEVudHJpZXNGcm9tRE9NIiwiZnVuY3Rpb24gZGVsZXRlRW50cnlGcm9tRGF0YWJhc2UoaWQpIHtcclxuICAgIHJldHVybiBmZXRjaChgaHR0cDovLzEyNy4wLjAuMTo4MDg4L2VudHJpZXMvJHtpZH1gLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWxldGVFbnRyeUZyb21EYXRhYmFzZSIsImltcG9ydCBmaWx0ZXJFbnRyaWVzQnlTZWxlY3RlZE1vb2QgZnJvbSBcIi4vZmlsdGVyRW50cmllc0J5U2VsZWN0ZWRNb29kLmpzXCJcclxuXHJcbmZ1bmN0aW9uIGZpbHRlckVudHJpZXNCeVNlYXJjaElucHV0KCkge1xyXG4gICAgcmV0dXJuIGZpbHRlckVudHJpZXNCeVNlbGVjdGVkTW9vZCgpXHJcbiAgICAgICAgLnRoZW4oKGVudHJpZXNGaWx0ZXJlZEJ5TW9vZCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaEVudHJpZXNJbnB1dFwiKS52YWx1ZS50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgIGxldCBlbnRyaWVzRmlsdGVyZWRCeVNlYXJjaElucHV0ID0gZW50cmllc0ZpbHRlcmVkQnlNb29kLmZpbHRlcigob2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKG9iamVjdC5jb25jZXB0c0NvdmVyZWQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhpbnB1dCkgfHwgb2JqZWN0LnRleHRFbnRyeS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGlucHV0KSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIGVudHJpZXNGaWx0ZXJlZEJ5U2VhcmNoSW5wdXRcclxuICAgICAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmaWx0ZXJFbnRyaWVzQnlTZWFyY2hJbnB1dFxyXG4iLCJpbXBvcnQgZ2V0RW50cmllc0Zyb21EYXRhYmFzZSBmcm9tIFwiLi9nZXRFbnRyaWVzRnJvbURhdGFiYXNlLmpzXCJcclxuXHJcbmZ1bmN0aW9uIGZpbHRlckVudHJpZXNCeVNlbGVjdGVkTW9vZCgpIHtcclxuICAgIHJldHVybiBnZXRFbnRyaWVzRnJvbURhdGFiYXNlKClcclxuICAgICAgICAudGhlbigocGFyc2VkRW50cmllcykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbW9vZE9wdGlvbnNBcnJheSA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yYWRpb1wiKSlcclxuICAgICAgICAgICAgbGV0IGVudHJpZXNGaWx0ZXJlZEJ5TW9vZCA9IFtdXHJcbiAgICAgICAgICAgIGlmIChtb29kT3B0aW9uc0FycmF5WzBdLmNoZWNrZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRNb29kID0gbW9vZE9wdGlvbnNBcnJheS5maWx0ZXIobW9vZE9wdGlvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vb2RPcHRpb24uY2hlY2tlZCA9PT0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlbMF0uaWRcclxuICAgICAgICAgICAgICAgIGVudHJpZXNGaWx0ZXJlZEJ5TW9vZCA9IHBhcnNlZEVudHJpZXMuZmlsdGVyKGVudHJ5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW50cnkubW9vZCA9PT0gc2VsZWN0ZWRNb29kXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZW50cmllc0ZpbHRlcmVkQnlNb29kID0gcGFyc2VkRW50cmllc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRyaWVzRmlsdGVyZWRCeU1vb2RcclxuICAgICAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmaWx0ZXJFbnRyaWVzQnlTZWxlY3RlZE1vb2QiLCJmdW5jdGlvbiBnZXRFbnRyaWVzRnJvbURhdGFiYXNlKCkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIilcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdldEVudHJpZXNGcm9tRGF0YWJhc2UiLCJpbXBvcnQgcG9wdWxhdGVKb3VybmFsRm9ybSBmcm9tIFwiLi9wb3B1bGF0ZUpvdXJuYWxGb3JtLmpzXCJcclxuaW1wb3J0IEFQSSBmcm9tIFwiLi9BUElGdW5jdGlvbnMuanNcIlxyXG5leHBvcnQgZGVmYXVsdCBhZGRFdmVudExpc3RlbmVyc1xyXG5pbXBvcnQgYWRkRXZlbnRMaXN0ZW5lcnMgZnJvbSBcIi4vYWRkRXZlbnRMaXN0ZW5lcnMuanNcIlxyXG5cclxucG9wdWxhdGVKb3VybmFsRm9ybSgpXHJcbkFQSS5HRVQoKVxyXG4gICAgLnRoZW4oKCkgPT4gYWRkRXZlbnRMaXN0ZW5lcnMoKSlcclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJmdW5jdGlvbiBtYWtlTmV3RW50cnlPYmplY3QoKSB7XHJcbiAgICBsZXQgbmV3RW50cnlPYmplY3QgPSB7fTtcclxuXHJcbiAgICBuZXdFbnRyeU9iamVjdC5pZCA9IHBhcnNlSW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlDdXJyZW50bHlJbkZvcm1cIikudmFsdWUpXHJcbiAgICBuZXdFbnRyeU9iamVjdC5kYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRGF0ZVwiKS52YWx1ZVxyXG4gICAgbmV3RW50cnlPYmplY3QuY29uY2VwdHNDb3ZlcmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25jZXB0c0NvdmVyZWRcIikudmFsdWVcclxuICAgIG5ld0VudHJ5T2JqZWN0LnRleHRFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlcIikudmFsdWVcclxuICAgIG5ld0VudHJ5T2JqZWN0LmxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlbHBmdWxMaW5rXCIpLnZhbHVlXHJcbiAgICBuZXdFbnRyeU9iamVjdC5saW5rRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlbHBmdWxMaW5rVGl0bGVcIikudmFsdWVcclxuICAgIG5ld0VudHJ5T2JqZWN0Lm1vb2QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vb2RcIikudmFsdWVcclxuXHJcbiAgICByZXR1cm4gbmV3RW50cnlPYmplY3RcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFrZU5ld0VudHJ5T2JqZWN0IiwiZnVuY3Rpb24gcG9wdWxhdGVKb3VybmFsRm9ybSgpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbEVudHJ5Rm9ybVwiKS5pbm5lckhUTUwgPSBgXHJcbiAgICA8ZmllbGRzZXQ+XHJcbiAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwiZW50cnlDdXJyZW50bHlJbkZvcm1cIiB2YWx1ZT1cIjBcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImpvdXJuYWxEYXRlXCI+RGF0ZSBvZiBlbnRyeTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIG5hbWU9XCJqb3VybmFsRGF0ZVwiIGlkPVwiam91cm5hbERhdGVcIj5cclxuICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjb25jZXB0c0NvdmVyZWRcIiBjbGFzcz1cImNvbmNlcHRzQ292ZXJlZFwiPkNvbmNlcHRzIENvdmVyZWQ8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiY29uY2VwdHNDb3ZlcmVkXCIgaWQ9XCJjb25jZXB0c0NvdmVyZWRcIj5cclxuICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbnRyeVwiPkpvdXJuYWwgRW50cnk8L2xhYmVsPlxyXG4gICAgICAgICAgICA8dGV4dGFyZWEgbmFtZT1cImVudHJ5XCIgaWQ9XCJlbnRyeVwiIGNvbHM9XCIzMFwiIHJvd3M9XCIxMFwiPjwvdGV4dGFyZWE+XHJcbiAgICAgICAgPC9maWVsZHNldD5cclxuXHJcbiAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiaGVscGZ1bExpbmtcIiBjbGFzcz1cImhlbHBmdWxMaW5rXCI+SGVscGZ1bCBMaW5rPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImhlbHBmdWxMaW5rXCIgaWQ9XCJoZWxwZnVsTGlua1wiPlxyXG4gICAgICAgIDwvZmllbGRzZXQ+XHJcblxyXG4gICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImhlbHBmdWxMaW5rVGl0bGVcIiBjbGFzcz1cImhlbHBmdWxMaW5rVGl0bGVcIj5MaW5rIERlc2NyaXB0aW9uPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImhlbHBmdWxMaW5rVGl0bGVcIiBpZD1cImhlbHBmdWxMaW5rVGl0bGVcIj5cclxuICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJtb29kXCI+TW9vZCBmb3IgdGhlIGRheTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxzZWxlY3QgbmFtZT1cIm1vb2RcIiBpZD1cIm1vb2RcIj5cclxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJIYXBweVwiPkhhcHB5PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRmluZVwiPkZpbmU8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJDb25mdXNlZFwiPkNvbmZ1c2VkPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiU2FkXCI+U2FkPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQW5ncnlcIj5BbmdyeTwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbmNsaWNrPVwiXCIgaWQ9XCJzdWJtaXRCdXR0b25cIj5SZWNvcmQgSm91cm5hbCBFbnRyeTwvYnV0dG9uPlxyXG5cclxuICAgICAgICA8ZmllbGRzZXQgaWQ9XCJtb29kRmlsdGVyXCI+XHJcbiAgICAgICAgICAgIDxoMiBpZD1cIm1vb2RGaWx0ZXJIZWFkZXJcIj5GaWx0ZXIgUGFzdCBFbnRyaWVzIEJ5IE1vb2Q6XHJcbiAgICAgICAgICAgIDwvaDI+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGlkPVwibW9vZFJhZGlvU2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cIm1vb2RSYWRpb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cIkFsbFwiIGNsYXNzPVwicmFkaW9cIiBuYW1lPVwibW9vZFJhZGlvT3B0aW9uXCIgdmFsdWU9XCJBbGxcIiBjaGVja2VkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJBbGxcIj5BbGw8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibW9vZFJhZGlvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwiSGFwcHlcIiBjbGFzcz1cInJhZGlvXCIgbmFtZT1cIm1vb2RSYWRpb09wdGlvblwiIHZhbHVlPVwiSGFwcHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiSGFwcHlcIj5IYXBweTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJtb29kUmFkaW9cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJGaW5lXCIgY2xhc3M9XCJyYWRpb1wiICBuYW1lPVwibW9vZFJhZGlvT3B0aW9uXCIgdmFsdWU9XCJGaW5lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIkZpbmVcIj5GaW5lPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cIm1vb2RSYWRpb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cIkNvbmZ1c2VkXCIgY2xhc3M9XCJyYWRpb1wiICBuYW1lPVwibW9vZFJhZGlvT3B0aW9uXCIgdmFsdWU9XCJDb25mdXNlZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJDb25mdXNlZFwiPkNvbmZ1c2VkPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cIm1vb2RSYWRpb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cIlNhZFwiIGNsYXNzPVwicmFkaW9cIiAgbmFtZT1cIm1vb2RSYWRpb09wdGlvblwiIHZhbHVlPVwiU2FkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIlNhZFwiPlNhZDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJtb29kUmFkaW9cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJBbmdyeVwiIGNsYXNzPVwicmFkaW9cIiAgbmFtZT1cIm1vb2RSYWRpb09wdGlvblwiIHZhbHVlPVwiQW5ncnlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiQW5ncnlcIj5BbmdyeTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgIDwvZmllbGRzZXQ+XHJcblxyXG4gICAgICAgIDxmaWVsZHNldCBpZD1cInNlYXJjaEVudHJpZXNcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInNlYXJjaEVudHJpZXNJbnB1dFwiIGNsYXNzPVwic2VhcmNoRW50cmllc0lucHV0XCI+U2VhcmNoIEVudHJpZXMgSW4gTW9vZDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzZWFyY2hFbnRyaWVzSW5wdXRcIiBpZD1cInNlYXJjaEVudHJpZXNJbnB1dFwiPlxyXG4gICAgICAgIDwvZmllbGRzZXQ+XHJcblxyXG4gICAgICAgIDxzZWN0aW9uIGlkPVwicGFzdEVudHJpZXNcIj48L3NlY3Rpb24+XHJcblxyXG4gICAgYFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwb3B1bGF0ZUpvdXJuYWxGb3JtIiwiaW1wb3J0IG1ha2VOZXdFbnRyeU9iamVjdCBmcm9tIFwiLi9tYWtlTmV3RW50cnlPYmplY3QuanNcIlxyXG5cclxuZnVuY3Rpb24gcG9zdE5ld0VudHJ5VG9EYXRhYmFzZSgpIHtcclxuICAgIGxldCBuZXdFbnRyeU9iamVjdCA9IG1ha2VOZXdFbnRyeU9iamVjdCgpXHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllc1wiLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdFbnRyeU9iamVjdClcclxuICAgIH0pXHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcG9zdE5ld0VudHJ5VG9EYXRhYmFzZSIsImltcG9ydCB0dXJuRGF0YWJhc2VFbnRyaWVzVG9IVE1MIGZyb20gXCIuL3R1cm5EYXRhYmFzZUVudHJpZXNUb0hUTUwuanNcIlxyXG5cclxuZnVuY3Rpb24gcHV0UGFzdEVudHJ5SFRNTE9uRE9NKCkge1xyXG4gICAgcmV0dXJuIHR1cm5EYXRhYmFzZUVudHJpZXNUb0hUTUwoKVxyXG4gICAgLnRoZW4oKGVudHJ5SFRNTEJsb2NrcykgPT4ge1xyXG4gICAgICAgIGVudHJ5SFRNTEJsb2Nrcy5mb3JFYWNoKGJsb2NrID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXN0RW50cmllc1wiKS5pbm5lckhUTUwgKz0gYmxvY2s7XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwdXRQYXN0RW50cnlIVE1MT25ET00iLCJmdW5jdGlvbiBwdXRQYXN0RW50cnlJbkZvcm1Ub0VkaXQoaWQpIHtcclxuICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXMvJHtpZH1gKVxyXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwdXRQYXN0RW50cnlJbkZvcm1Ub0VkaXQiLCJmdW5jdGlvbiByZXNldEpvdXJuYWxFbnRyeUZvcm0oKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxEYXRlXCIpLnZhbHVlQXNEYXRlID0gbnVsbFxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25jZXB0c0NvdmVyZWRcIikudmFsdWUgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5XCIpLnZhbHVlID0gXCJcIlxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWxwZnVsTGlua1wiKS52YWx1ZSA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVscGZ1bExpbmtcIikudmFsdWUgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vb2RcIikudmFsdWUgPSBcIkhhcHB5XCJcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVzZXRKb3VybmFsRW50cnlGb3JtIiwiZnVuY3Rpb24gc3VibWl0RWRpdGVkRW50cnkobmV3RW50cnlPYmplY3QpIHtcclxuICAgIGxldCBvYmplY3QgPSBuZXdFbnRyeU9iamVjdFxyXG4gICAgcmV0dXJuIGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOjgwODgvZW50cmllcy8ke29iamVjdC5pZH1gLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9iamVjdClcclxuICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN1Ym1pdEVkaXRlZEVudHJ5IiwiaW1wb3J0IGZpbHRlckVudHJpZXNCeVNlYXJjaElucHV0IGZyb20gXCIuL2ZpbHRlckVudHJpZXNCeVNlYXJjaElucHV0LmpzXCJcclxuXHJcbmZ1bmN0aW9uIHR1cm5EYXRhYmFzZUVudHJpZXNUb0hUTUwoKSB7XHJcbiAgICByZXR1cm4gZmlsdGVyRW50cmllc0J5U2VhcmNoSW5wdXQoKVxyXG4gICAgICAgIC50aGVuKChmaWx0ZXJlZEVudHJpZXMpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVudHJ5SFRNTEJsb2NrcyA9IFtdXHJcbiAgICAgICAgICAgIGZpbHRlcmVkRW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcclxuICAgICAgICAgICAgICAgIGVudHJ5SFRNTEJsb2Nrcy5wdXNoKGBcclxuICAgICAgICAgICAgPGRpdiBpZD1cIiR7ZW50cnkuZGF0ZX1cIiBjbGFzcz1cInBhc3RFbnRyeVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cIiR7ZW50cnkuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJwYXN0RW50cnlUaXRsZVwiPiR7ZW50cnkuY29uY2VwdHNDb3ZlcmVkfTwvaDE+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFzdEVudHJ5VGV4dFwiPiR7ZW50cnkudGV4dEVudHJ5fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhc3RFbnRyeUxpbmtcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtlbnRyeS5saW5rfVwiPlJlbGF0ZWQgTGluazogJHtlbnRyeS5saW5rRGVzY3JpcHRpb259IDwvYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJlbnRyeUJvdHRvbUJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJkZWxldGUtLSR7ZW50cnkuaWR9XCI+RGVsZXRlIEVudHJ5PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImVkaXQtLSR7ZW50cnkuaWR9XCI+RWRpdCBFbnRyeTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlQW5kTW9vZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFzdEVudHJ5RGF0ZVwiPiR7ZW50cnkuZGF0ZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhc3RFbnRyeU1vb2RcIj4ke2VudHJ5Lm1vb2R9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudHJ5SFRNTEJsb2Nrc1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZW50cnlIVE1MQmxvY2tzXHJcbiAgICAgICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHVybkRhdGFiYXNlRW50cmllc1RvSFRNTCJdfQ==

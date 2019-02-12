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
      // need code here
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

},{"./APIFunctions.js":1,"./checkNewEntryForProfanity.js":3,"./clearDisplayedEntriesFromDOM.js":4,"./resetJournalEntryForm.js":15}],3:[function(require,module,exports){
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
  document.querySelector("#journalEntryForm").reset();
}

var _default = resetJournalEntryForm;
exports.default = _default;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function submitEditedEntry() {}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0FQSUZ1bmN0aW9ucy5qcyIsIi4uL3NjcmlwdHMvYWRkRXZlbnRMaXN0ZW5lcnMuanMiLCIuLi9zY3JpcHRzL2NoZWNrTmV3RW50cnlGb3JQcm9mYW5pdHkuanMiLCIuLi9zY3JpcHRzL2NsZWFyRGlzcGxheWVkRW50cmllc0Zyb21ET00uanMiLCIuLi9zY3JpcHRzL2RlbGV0ZUVudHJ5RnJvbURhdGFiYXNlLmpzIiwiLi4vc2NyaXB0cy9maWx0ZXJFbnRyaWVzQnlTZWFyY2hJbnB1dC5qcyIsIi4uL3NjcmlwdHMvZmlsdGVyRW50cmllc0J5U2VsZWN0ZWRNb29kLmpzIiwiLi4vc2NyaXB0cy9nZXRFbnRyaWVzRnJvbURhdGFiYXNlLmpzIiwiLi4vc2NyaXB0cy9qb3VybmFsLmpzIiwiLi4vc2NyaXB0cy9tYWtlTmV3RW50cnlPYmplY3QuanMiLCIuLi9zY3JpcHRzL3BvcHVsYXRlSm91cm5hbEZvcm0uanMiLCIuLi9zY3JpcHRzL3Bvc3ROZXdFbnRyeVRvRGF0YWJhc2UuanMiLCIuLi9zY3JpcHRzL3B1dFBhc3RFbnRyeUhUTUxPbkRPTS5qcyIsIi4uL3NjcmlwdHMvcHV0UGFzdEVudHJ5SW5Gb3JtVG9FZGl0LmpzIiwiLi4vc2NyaXB0cy9yZXNldEpvdXJuYWxFbnRyeUZvcm0uanMiLCIuLi9zY3JpcHRzL3N1Ym1pdEVkaXRlZEVudHJ5LmpzIiwiLi4vc2NyaXB0cy90dXJuRGF0YWJhc2VFbnRyaWVzVG9IVE1MLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxHQUFHLEdBQUc7QUFDUixFQUFBLEdBQUcsRUFBRSw4QkFERztBQUVSLEVBQUEsSUFBSSxFQUFFLCtCQUZFO0FBR1IsRUFBQSxNQUFNLEVBQUUsZ0NBSEE7QUFJUixFQUFBLE9BQU8sRUFBRSxpQ0FKRDtB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LHlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHB1dFBhc3RFbnRyeUhUTUxPbkRPTSBmcm9tIFwiLi9wdXRQYXN0RW50cnlIVE1MT25ET00uanNcIlxyXG5pbXBvcnQgcG9zdE5ld0VudHJ5VG9EYXRhYmFzZSBmcm9tIFwiLi9wb3N0TmV3RW50cnlUb0RhdGFiYXNlLmpzXCJcclxuaW1wb3J0IGRlbGV0ZUVudHJ5RnJvbURhdGFiYXNlIGZyb20gXCIuL2RlbGV0ZUVudHJ5RnJvbURhdGFiYXNlLmpzXCJcclxuaW1wb3J0IHB1dFBhc3RFbnRyeUluRm9ybVRvRWRpdCBmcm9tIFwiLi9wdXRQYXN0RW50cnlJbkZvcm1Ub0VkaXQuanNcIlxyXG5pbXBvcnQgc3VibWl0RWRpdGVkRW50cnkgZnJvbSBcIi4vc3VibWl0RWRpdGVkRW50cnkuanNcIlxyXG5cclxuY29uc3QgQVBJID0ge1xyXG4gICAgR0VUOiBwdXRQYXN0RW50cnlIVE1MT25ET00sXHJcbiAgICBQT1NUOiBwb3N0TmV3RW50cnlUb0RhdGFiYXNlLFxyXG4gICAgREVMRVRFOiBkZWxldGVFbnRyeUZyb21EYXRhYmFzZSxcclxuICAgIEVESVRHRVQ6IHB1dFBhc3RFbnRyeUluRm9ybVRvRWRpdCxcclxuICAgIEVESVRQT1NUOiBzdWJtaXRFZGl0ZWRFbnRyeVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUEkiLCJpbXBvcnQgQVBJIGZyb20gXCIuL0FQSUZ1bmN0aW9ucy5qc1wiXHJcbmltcG9ydCBjbGVhckRpc3BsYXllZEVudHJpZXNGcm9tRE9NIGZyb20gXCIuL2NsZWFyRGlzcGxheWVkRW50cmllc0Zyb21ET00uanNcIlxyXG5pbXBvcnQgY2hlY2tOZXdFbnRyeUZvclByb2Zhbml0eSBmcm9tIFwiLi9jaGVja05ld0VudHJ5Rm9yUHJvZmFuaXR5LmpzXCJcclxuaW1wb3J0IHJlc2V0Sm91cm5hbEVudHJ5Rm9ybSBmcm9tIFwiLi9yZXNldEpvdXJuYWxFbnRyeUZvcm0uanNcIlxyXG5cclxuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1Ym1pdEJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiUmVjb3JkIEpvdXJuYWwgRW50cnlcIikge1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tOZXdFbnRyeUZvclByb2Zhbml0eSgpKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIk5vIFByb2Zhbml0eSBBbGxvd2VkIEluIEpvdXJuYWxcIilcclxuICAgICAgICAgICAgICAgIHJlc2V0Sm91cm5hbEVudHJ5Rm9ybSgpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckRpc3BsYXllZEVudHJpZXNGcm9tRE9NKClcclxuICAgICAgICAgICAgICAgIEFQSS5QT1NUKCkudGhlbihBUEkuR0VUKVxyXG4gICAgICAgICAgICAgICAgcmVzZXRKb3VybmFsRW50cnlGb3JtKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIlVwZGF0ZSBKb3VybmFsIEVudHJ5XCIpIHtcclxuICAgICAgICAgICAgLy8gbmVlZCBjb2RlIGhlcmVcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0QnV0dG9uXCIpLnRleHRDb250ZW50ID0gXCJSZWNvcmQgSm91cm5hbCBFbnRyeVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vb2RSYWRpb1NlY3Rpb25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnR5cGUgPT09IFwicmFkaW9cIikge1xyXG4gICAgICAgICAgICBjbGVhckRpc3BsYXllZEVudHJpZXNGcm9tRE9NKClcclxuICAgICAgICAgICAgQVBJLkdFVCgpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaEVudHJpZXNJbnB1dFwiKS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyRGlzcGxheWVkRW50cmllc0Zyb21ET00oKVxyXG4gICAgICAgIEFQSS5HRVQoKVxyXG4gICAgfSlcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bhc3RFbnRyaWVzXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZC5zdGFydHNXaXRoKFwiZGVsZXRlLS1cIikpIHtcclxuICAgICAgICAgICAgbGV0IGlkID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV0pXHJcbiAgICAgICAgICAgIHJldHVybiAoQVBJLkRFTEVURShpZCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBjbGVhckRpc3BsYXllZEVudHJpZXNGcm9tRE9NKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBBUEkuR0VUKCkpXHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQuaWQuc3RhcnRzV2l0aChcImVkaXQtLVwiKSkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBwYXJzZUludChldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXSlcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJtaXRCdXR0b25cIikudGV4dENvbnRlbnQgPSBcIlVwZGF0ZSBKb3VybmFsIEVudHJ5XCJcclxuICAgICAgICAgICAgcmV0dXJuIChBUEkuRURJVEdFVChpZCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZW50cnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5Q3VycmVudGx5SW5Gb3JtXCIpLnZhbHVlID0gZW50cnkuaWRcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxEYXRlXCIpLnZhbHVlID0gZW50cnkuZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uY2VwdHNDb3ZlcmVkXCIpLnZhbHVlID0gZW50cnkuY29uY2VwdHNDb3ZlcmVkXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeVwiKS52YWx1ZSA9IGVudHJ5LnRleHRFbnRyeVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVscGZ1bExpbmtcIikudmFsdWUgPSBlbnRyeS5saW5rXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWxwZnVsTGlua1RpdGxlXCIpLnZhbHVlID0gZW50cnkubGlua0Rlc2NyaXB0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb29kXCIpLnZhbHVlID0gZW50cnkubW9vZFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWRkRXZlbnRMaXN0ZW5lcnMiLCJpbXBvcnQgbWFrZU5ld0VudHJ5T2JqZWN0IGZyb20gXCIuL21ha2VOZXdFbnRyeU9iamVjdC5qc1wiXHJcblxyXG5sZXQgcHJvZmFuaXR5UmVnZXhBcnJheSA9IFtcclxuICAgIFwiXlthQF1bc1xcJF1bc1xcJF0kXCIsXHJcbiAgICBcIlthQF1bc1xcJF1bc1xcJF1oW28wXVtsMV1bZTNdW3NcXCRdP1wiLFxyXG4gICAgXCJiW2FAXVtzXFwkXVt0XFwrXVthQF1yZFwiLFxyXG4gICAgXCJiW2UzXVthQF1bc1xcJF1bdFxcK11baTFdW2FAXT9bbDFdKFtpMV1bdFxcK115KT9cIixcclxuICAgIFwiYltlM11bYUBdW3NcXCRdW3RcXCtdW2kxXVtsMV1baTFdW3RcXCtdeVwiLFxyXG4gICAgXCJiW2UzXVtzXFwkXVt0XFwrXVtpMV1bYUBdW2wxXShbaTFdW3RcXCtdeSk/XCIsXHJcbiAgICBcImJbaTFdW3RcXCtdY2hbc1xcJF0/XCIsXHJcbiAgICBcImJbaTFdW3RcXCtdY2hbZTNdcltzXFwkXT9cIixcclxuICAgIFwiYltpMV1bdFxcK11jaFtlM11bc1xcJF1cIixcclxuICAgIFwiYltpMV1bdFxcK11jaFtpMV1uZz9cIixcclxuICAgIFwiYltsMV1bbzBdd2pbbzBdYltzXFwkXT9cIixcclxuICAgIFwiY1tsMV1baTFdW3RcXCtdXCIsXHJcbiAgICBcIl4oY3xrfGNrfHEpW28wXShjfGt8Y2t8cSlbc1xcJF0/JFwiLFxyXG4gICAgXCIoY3xrfGNrfHEpW28wXShjfGt8Y2t8cSlbc1xcJF11XCIsXHJcbiAgICBcIihjfGt8Y2t8cSlbbzBdKGN8a3xja3xxKVtzXFwkXXUoY3xrfGNrfHEpW2UzXWRcIixcclxuICAgIFwiKGN8a3xja3xxKVtvMF0oY3xrfGNrfHEpW3NcXCRddShjfGt8Y2t8cSlbZTNdclwiLFxyXG4gICAgXCIoY3xrfGNrfHEpW28wXShjfGt8Y2t8cSlbc1xcJF11KGN8a3xja3xxKVtpMV1uZ1wiLFxyXG4gICAgXCIoY3xrfGNrfHEpW28wXShjfGt8Y2t8cSlbc1xcJF11KGN8a3xja3xxKVtzXFwkXVwiLFxyXG4gICAgXCJeY3VtW3NcXCRdPyRcIixcclxuICAgIFwiY3VtbT8/W2UzXXJcIixcclxuICAgIFwiY3VtbT9baTFdbmdjb2NrXCIsXHJcbiAgICBcIihjfGt8Y2t8cSl1bVtzXFwkXWhbbzBdW3RcXCtdXCIsXHJcbiAgICBcIihjfGt8Y2t8cSl1bltpMV1bbDFdW2kxXW5ndVtzXFwkXVwiLFxyXG4gICAgXCIoY3xrfGNrfHEpdW5baTFdW2wxXVtsMV1baTFdbmd1W3NcXCRdXCIsXHJcbiAgICBcIihjfGt8Y2t8cSl1bm5baTFdW2wxXVtpMV1uZ3Vbc1xcJF1cIixcclxuICAgIFwiKGN8a3xja3xxKXVuW3RcXCtdW3NcXCRdP1wiLFxyXG4gICAgXCIoY3xrfGNrfHEpdW5bdFxcK11bbDFdW2kxXShjfGt8Y2t8cSlcIixcclxuICAgIFwiKGN8a3xja3xxKXVuW3RcXCtdW2wxXVtpMV0oY3xrfGNrfHEpW2UzXXJcIixcclxuICAgIFwiKGN8a3xja3xxKXVuW3RcXCtdW2wxXVtpMV0oY3xrfGNrfHEpW2kxXW5nXCIsXHJcbiAgICBcImN5YltlM11yKHBofGYpdShjfGt8Y2t8cSlcIixcclxuICAgIFwiZFthQF1tblwiLFxyXG4gICAgXCJkW2kxXWNrXCIsXHJcbiAgICBcImRbaTFdW2wxXWRbbzBdXCIsXHJcbiAgICBcImRbaTFdW2wxXWRbbzBdW3NcXCRdXCIsXHJcbiAgICBcImRbaTFdbihjfGt8Y2t8cSlcIixcclxuICAgIFwiZFtpMV1uKGN8a3xja3xxKVtzXFwkXVwiLFxyXG4gICAgXCJbZTNdalthQF1jdVtsMV1cIixcclxuICAgIFwiKHBofGYpW2FAXWdbc1xcJF0/XCIsXHJcbiAgICBcIihwaHxmKVthQF1nZ1tpMV1uZ1wiLFxyXG4gICAgXCIocGh8ZilbYUBdZ2c/W28wXVt0XFwrXVtzXFwkXT9cIixcclxuICAgIFwiKHBofGYpW2FAXWdnW3NcXCRdXCIsXHJcbiAgICBcIihwaHxmKVtlM11bbDFdW2wxXT9bYUBdW3RcXCtdW2kxXVtvMF1cIixcclxuICAgIFwiKHBofGYpdShjfGt8Y2t8cSlcIixcclxuICAgIFwiKHBofGYpdShjfGt8Y2t8cSlbc1xcJF0/XCIsXHJcbiAgICBcImdbYUBdbmdiW2FAXW5nW3NcXCRdP1wiLFxyXG4gICAgXCJnW2FAXW5nYlthQF1uZ1tlM11kXCIsXHJcbiAgICBcImdbYUBdeVwiLFxyXG4gICAgXCJoW28wXW0/bVtvMF1cIixcclxuICAgIFwiaFtvMF1ybnlcIixcclxuICAgIFwialthQF0oY3xrfGNrfHEpXFwtP1tvMF0ocGh8ZikocGh8Zik/XCIsXHJcbiAgICBcImpbZTNdcmtcXC0/W28wXShwaHxmKShwaHxmKT9cIixcclxuICAgIFwialtpMV1bc1xcJHpdW3NcXCR6XT9tP1wiLFxyXG4gICAgXCJbY2tdW28wXW5kdW1bc1xcJF0/XCIsXHJcbiAgICBcIm1hc3QoZXx1ciliKDh8YWl0fGF0ZSlcIixcclxuICAgIFwibltpMV1nZz9bZTNdcltzXFwkXT9cIixcclxuICAgIFwiW28wXXJnW2FAXVtzXFwkXVtpMV1tW3NcXCRdP1wiLFxyXG4gICAgXCJbbzBdcmdbYUBdW3NcXCRdbVtzXFwkXT9cIixcclxuICAgIFwicFtlM11ubj9baTFdW3NcXCRdXCIsXHJcbiAgICBcInBbaTFdW3NcXCRdW3NcXCRdXCIsXHJcbiAgICBcInBbaTFdW3NcXCRdW3NcXCRdW28wXShwaHxmKShwaHxmKVwiLFxyXG4gICAgXCJwW28wXXJuXCIsXHJcbiAgICBcInBbbzBdcm5bbzBdW3NcXCRdP1wiLFxyXG4gICAgXCJwW28wXXJuW28wXWdyW2FAXXBoeVwiLFxyXG4gICAgXCJwcltpMV1ja1tzXFwkXT9cIixcclxuICAgIFwicHVbc1xcJF1bc1xcJF1baTFdW2UzXVtzXFwkXVwiLFxyXG4gICAgXCJwdVtzXFwkXVtzXFwkXXlbc1xcJF0/XCIsXHJcbiAgICBcIltzXFwkXVtlM114XCIsXHJcbiAgICBcIltzXFwkXWhbaTFdW3RcXCtdW3NcXCRdP1wiLFxyXG4gICAgXCJbc1xcJF1bbDFddVt0XFwrXVtzXFwkXT9cIixcclxuICAgIFwiW3NcXCRdbXVbdFxcK11bc1xcJF0/XCIsXHJcbiAgICBcIltzXFwkXXB1bmtbc1xcJF0/XCIsXHJcbiAgICBcIlt0XFwrXXdbYUBdW3RcXCtdW3NcXCRdP1wiXHJcbl1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrTmV3RW50cnlGb3JQcm9mYW5pdHkoKSB7XHJcbiAgICBsZXQgdGVzdFNjb3JlID0gQm9vbGVhblxyXG4gICAgY29uc3QgZm9ybU9iamVjdCA9IG1ha2VOZXdFbnRyeU9iamVjdCgpO1xyXG4gICAgY29uc3Qgam91cm5hbElucHV0c1RvQmVDaGVja2VkID0gT2JqZWN0LnZhbHVlcyhmb3JtT2JqZWN0KVxyXG4gICAgam91cm5hbElucHV0c1RvQmVDaGVja2VkLnNwbGljZSg1LCAxKVxyXG4gICAgam91cm5hbElucHV0c1RvQmVDaGVja2VkLnNwbGljZSgwLCAxKVxyXG4gICAgY29uc3QgcHJvZmFuaXR5UmVzdWx0cyA9IGpvdXJuYWxJbnB1dHNUb0JlQ2hlY2tlZC5tYXAoKGN1cnJlbnRJbnB1dCkgPT4ge1xyXG4gICAgICAgIGxldCByZXN1bHRzRm9yVGhpc0lucHV0ID0gcHJvZmFuaXR5UmVnZXhBcnJheS5tYXAoKGN1cnJlbnRCYWRXb3JkKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZWdFeENvbnN0cnVjdG9yID0gbmV3IFJlZ0V4cChjdXJyZW50QmFkV29yZClcclxuICAgICAgICAgICAgcmV0dXJuIHJlZ0V4Q29uc3RydWN0b3IudGVzdChjdXJyZW50SW5wdXQpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzdWx0c0ZvclRoaXNJbnB1dC5pbmNsdWRlcyh0cnVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBpZiAocHJvZmFuaXR5UmVzdWx0cy5pbmNsdWRlcyh0cnVlKSkge1xyXG4gICAgICAgIHRlc3RTY29yZSA9IHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGVzdFNjb3JlID0gZmFsc2VcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXN0U2NvcmVcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2hlY2tOZXdFbnRyeUZvclByb2Zhbml0eSIsImZ1bmN0aW9uIGNsZWFyRGlzcGxheWVkRW50cmllc0Zyb21ET00oKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bhc3RFbnRyaWVzXCIpLmlubmVySFRNTCA9IFwiXCJcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xlYXJEaXNwbGF5ZWRFbnRyaWVzRnJvbURPTSIsImZ1bmN0aW9uIGRlbGV0ZUVudHJ5RnJvbURhdGFiYXNlKGlkKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6ODA4OC9lbnRyaWVzLyR7aWR9YCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVsZXRlRW50cnlGcm9tRGF0YWJhc2UiLCJpbXBvcnQgZmlsdGVyRW50cmllc0J5U2VsZWN0ZWRNb29kIGZyb20gXCIuL2ZpbHRlckVudHJpZXNCeVNlbGVjdGVkTW9vZC5qc1wiXHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJFbnRyaWVzQnlTZWFyY2hJbnB1dCgpIHtcclxuICAgIHJldHVybiBmaWx0ZXJFbnRyaWVzQnlTZWxlY3RlZE1vb2QoKVxyXG4gICAgICAgIC50aGVuKChlbnRyaWVzRmlsdGVyZWRCeU1vb2QpID0+IHtcclxuICAgICAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hFbnRyaWVzSW5wdXRcIikudmFsdWUudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICBsZXQgZW50cmllc0ZpbHRlcmVkQnlTZWFyY2hJbnB1dCA9IGVudHJpZXNGaWx0ZXJlZEJ5TW9vZC5maWx0ZXIoKG9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChvYmplY3QuY29uY2VwdHNDb3ZlcmVkLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoaW5wdXQpIHx8IG9iamVjdC50ZXh0RW50cnkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhpbnB1dCkpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBlbnRyaWVzRmlsdGVyZWRCeVNlYXJjaElucHV0XHJcbiAgICAgICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZmlsdGVyRW50cmllc0J5U2VhcmNoSW5wdXRcclxuIiwiaW1wb3J0IGdldEVudHJpZXNGcm9tRGF0YWJhc2UgZnJvbSBcIi4vZ2V0RW50cmllc0Zyb21EYXRhYmFzZS5qc1wiXHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJFbnRyaWVzQnlTZWxlY3RlZE1vb2QoKSB7XHJcbiAgICByZXR1cm4gZ2V0RW50cmllc0Zyb21EYXRhYmFzZSgpXHJcbiAgICAgICAgLnRoZW4oKHBhcnNlZEVudHJpZXMpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1vb2RPcHRpb25zQXJyYXkgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmFkaW9cIikpXHJcbiAgICAgICAgICAgIGxldCBlbnRyaWVzRmlsdGVyZWRCeU1vb2QgPSBbXVxyXG4gICAgICAgICAgICBpZiAobW9vZE9wdGlvbnNBcnJheVswXS5jaGVja2VkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkTW9vZCA9IG1vb2RPcHRpb25zQXJyYXkuZmlsdGVyKG1vb2RPcHRpb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb29kT3B0aW9uLmNoZWNrZWQgPT09IHRydWVcclxuICAgICAgICAgICAgICAgIH0pWzBdLmlkXHJcbiAgICAgICAgICAgICAgICBlbnRyaWVzRmlsdGVyZWRCeU1vb2QgPSBwYXJzZWRFbnRyaWVzLmZpbHRlcihlbnRyeSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVudHJ5Lm1vb2QgPT09IHNlbGVjdGVkTW9vZFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVudHJpZXNGaWx0ZXJlZEJ5TW9vZCA9IHBhcnNlZEVudHJpZXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZW50cmllc0ZpbHRlcmVkQnlNb29kXHJcbiAgICAgICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZmlsdGVyRW50cmllc0J5U2VsZWN0ZWRNb29kIiwiZnVuY3Rpb24gZ2V0RW50cmllc0Zyb21EYXRhYmFzZSgpIHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCIpXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRFbnRyaWVzRnJvbURhdGFiYXNlIiwiaW1wb3J0IHBvcHVsYXRlSm91cm5hbEZvcm0gZnJvbSBcIi4vcG9wdWxhdGVKb3VybmFsRm9ybS5qc1wiXHJcbmltcG9ydCBBUEkgZnJvbSBcIi4vQVBJRnVuY3Rpb25zLmpzXCJcclxuZXhwb3J0IGRlZmF1bHQgYWRkRXZlbnRMaXN0ZW5lcnNcclxuaW1wb3J0IGFkZEV2ZW50TGlzdGVuZXJzIGZyb20gXCIuL2FkZEV2ZW50TGlzdGVuZXJzLmpzXCJcclxuXHJcbiAgICBwb3B1bGF0ZUpvdXJuYWxGb3JtKClcclxuICAgIEFQSS5HRVQoKVxyXG4gICAgICAgIC50aGVuKCgpID0+IGFkZEV2ZW50TGlzdGVuZXJzKCkpXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiZnVuY3Rpb24gbWFrZU5ld0VudHJ5T2JqZWN0KCkge1xyXG4gICAgbGV0IG5ld0VudHJ5T2JqZWN0ID0ge307XHJcblxyXG4gICAgbmV3RW50cnlPYmplY3QuZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjam91cm5hbERhdGVcIikudmFsdWVcclxuICAgIG5ld0VudHJ5T2JqZWN0LmNvbmNlcHRzQ292ZXJlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uY2VwdHNDb3ZlcmVkXCIpLnZhbHVlXHJcbiAgICBuZXdFbnRyeU9iamVjdC50ZXh0RW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5XCIpLnZhbHVlXHJcbiAgICBuZXdFbnRyeU9iamVjdC5saW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWxwZnVsTGlua1wiKS52YWx1ZVxyXG4gICAgbmV3RW50cnlPYmplY3QubGlua0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWxwZnVsTGlua1RpdGxlXCIpLnZhbHVlXHJcbiAgICBuZXdFbnRyeU9iamVjdC5tb29kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb29kXCIpLnZhbHVlXHJcblxyXG4gICAgcmV0dXJuIG5ld0VudHJ5T2JqZWN0XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1ha2VOZXdFbnRyeU9iamVjdCIsImZ1bmN0aW9uIHBvcHVsYXRlSm91cm5hbEZvcm0oKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxFbnRyeUZvcm1cIikuaW5uZXJIVE1MID0gYFxyXG4gICAgPGZpZWxkc2V0PlxyXG4gICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cImVudHJ5Q3VycmVudGx5SW5Gb3JtXCIgdmFsdWU9XCIwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJqb3VybmFsRGF0ZVwiPkRhdGUgb2YgZW50cnk8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBuYW1lPVwiam91cm5hbERhdGVcIiBpZD1cImpvdXJuYWxEYXRlXCI+XHJcbiAgICAgICAgPC9maWVsZHNldD5cclxuXHJcbiAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiY29uY2VwdHNDb3ZlcmVkXCIgY2xhc3M9XCJjb25jZXB0c0NvdmVyZWRcIj5Db25jZXB0cyBDb3ZlcmVkPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNvbmNlcHRzQ292ZXJlZFwiIGlkPVwiY29uY2VwdHNDb3ZlcmVkXCI+XHJcbiAgICAgICAgPC9maWVsZHNldD5cclxuXHJcbiAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW50cnlcIj5Kb3VybmFsIEVudHJ5PC9sYWJlbD5cclxuICAgICAgICAgICAgPHRleHRhcmVhIG5hbWU9XCJlbnRyeVwiIGlkPVwiZW50cnlcIiBjb2xzPVwiMzBcIiByb3dzPVwiMTBcIj48L3RleHRhcmVhPlxyXG4gICAgICAgIDwvZmllbGRzZXQ+XHJcblxyXG4gICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImhlbHBmdWxMaW5rXCIgY2xhc3M9XCJoZWxwZnVsTGlua1wiPkhlbHBmdWwgTGluazwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJoZWxwZnVsTGlua1wiIGlkPVwiaGVscGZ1bExpbmtcIj5cclxuICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJoZWxwZnVsTGlua1RpdGxlXCIgY2xhc3M9XCJoZWxwZnVsTGlua1RpdGxlXCI+TGluayBEZXNjcmlwdGlvbjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJoZWxwZnVsTGlua1RpdGxlXCIgaWQ9XCJoZWxwZnVsTGlua1RpdGxlXCI+XHJcbiAgICAgICAgPC9maWVsZHNldD5cclxuXHJcbiAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwibW9vZFwiPk1vb2QgZm9yIHRoZSBkYXk8L2xhYmVsPlxyXG4gICAgICAgICAgICA8c2VsZWN0IG5hbWU9XCJtb29kXCIgaWQ9XCJtb29kXCI+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSGFwcHlcIj5IYXBweTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkZpbmVcIj5GaW5lPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQ29uZnVzZWRcIj5Db25mdXNlZDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlNhZFwiPlNhZDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkFuZ3J5XCI+QW5ncnk8L29wdGlvbj5cclxuICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgPC9maWVsZHNldD5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25jbGljaz1cIlwiIGlkPVwic3VibWl0QnV0dG9uXCI+UmVjb3JkIEpvdXJuYWwgRW50cnk8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgPGZpZWxkc2V0IGlkPVwibW9vZEZpbHRlclwiPlxyXG4gICAgICAgICAgICA8aDIgaWQ9XCJtb29kRmlsdGVySGVhZGVyXCI+RmlsdGVyIFBhc3QgRW50cmllcyBCeSBNb29kOlxyXG4gICAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgICA8c2VjdGlvbiBpZD1cIm1vb2RSYWRpb1NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJtb29kUmFkaW9cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJBbGxcIiBjbGFzcz1cInJhZGlvXCIgbmFtZT1cIm1vb2RSYWRpb09wdGlvblwiIHZhbHVlPVwiQWxsXCIgY2hlY2tlZD5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiQWxsXCI+QWxsPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cIm1vb2RSYWRpb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cIkhhcHB5XCIgY2xhc3M9XCJyYWRpb1wiIG5hbWU9XCJtb29kUmFkaW9PcHRpb25cIiB2YWx1ZT1cIkhhcHB5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIkhhcHB5XCI+SGFwcHk8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibW9vZFJhZGlvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwiRmluZVwiIGNsYXNzPVwicmFkaW9cIiAgbmFtZT1cIm1vb2RSYWRpb09wdGlvblwiIHZhbHVlPVwiRmluZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJGaW5lXCI+RmluZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJtb29kUmFkaW9cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJDb25mdXNlZFwiIGNsYXNzPVwicmFkaW9cIiAgbmFtZT1cIm1vb2RSYWRpb09wdGlvblwiIHZhbHVlPVwiQ29uZnVzZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiQ29uZnVzZWRcIj5Db25mdXNlZDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJtb29kUmFkaW9cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJTYWRcIiBjbGFzcz1cInJhZGlvXCIgIG5hbWU9XCJtb29kUmFkaW9PcHRpb25cIiB2YWx1ZT1cIlNhZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJTYWRcIj5TYWQ8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibW9vZFJhZGlvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwiQW5ncnlcIiBjbGFzcz1cInJhZGlvXCIgIG5hbWU9XCJtb29kUmFkaW9PcHRpb25cIiB2YWx1ZT1cIkFuZ3J5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIkFuZ3J5XCI+QW5ncnk8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICA8ZmllbGRzZXQgaWQ9XCJzZWFyY2hFbnRyaWVzXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJzZWFyY2hFbnRyaWVzSW5wdXRcIiBjbGFzcz1cInNlYXJjaEVudHJpZXNJbnB1dFwiPlNlYXJjaCBFbnRyaWVzIEluIE1vb2Q8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwic2VhcmNoRW50cmllc0lucHV0XCIgaWQ9XCJzZWFyY2hFbnRyaWVzSW5wdXRcIj5cclxuICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICA8c2VjdGlvbiBpZD1cInBhc3RFbnRyaWVzXCI+PC9zZWN0aW9uPlxyXG5cclxuICAgIGBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcG9wdWxhdGVKb3VybmFsRm9ybSIsImltcG9ydCBtYWtlTmV3RW50cnlPYmplY3QgZnJvbSBcIi4vbWFrZU5ld0VudHJ5T2JqZWN0LmpzXCJcclxuXHJcbmZ1bmN0aW9uIHBvc3ROZXdFbnRyeVRvRGF0YWJhc2UoKSB7XHJcbiAgICBsZXQgbmV3RW50cnlPYmplY3QgPSBtYWtlTmV3RW50cnlPYmplY3QoKVxyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIiwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3RW50cnlPYmplY3QpXHJcbiAgICB9KVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBvc3ROZXdFbnRyeVRvRGF0YWJhc2UiLCJpbXBvcnQgdHVybkRhdGFiYXNlRW50cmllc1RvSFRNTCBmcm9tIFwiLi90dXJuRGF0YWJhc2VFbnRyaWVzVG9IVE1MLmpzXCJcclxuXHJcbmZ1bmN0aW9uIHB1dFBhc3RFbnRyeUhUTUxPbkRPTSgpIHtcclxuICAgIHJldHVybiB0dXJuRGF0YWJhc2VFbnRyaWVzVG9IVE1MKClcclxuICAgIC50aGVuKChlbnRyeUhUTUxCbG9ja3MpID0+IHtcclxuICAgICAgICBlbnRyeUhUTUxCbG9ja3MuZm9yRWFjaChibG9jayA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzdEVudHJpZXNcIikuaW5uZXJIVE1MICs9IGJsb2NrO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHV0UGFzdEVudHJ5SFRNTE9uRE9NIiwiZnVuY3Rpb24gcHV0UGFzdEVudHJ5SW5Gb3JtVG9FZGl0KGlkKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzLyR7aWR9YClcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHV0UGFzdEVudHJ5SW5Gb3JtVG9FZGl0IiwiZnVuY3Rpb24gcmVzZXRKb3VybmFsRW50cnlGb3JtKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRW50cnlGb3JtXCIpLnJlc2V0KClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVzZXRKb3VybmFsRW50cnlGb3JtIiwiZnVuY3Rpb24gc3VibWl0RWRpdGVkRW50cnkoKSB7XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdWJtaXRFZGl0ZWRFbnRyeSIsImltcG9ydCBmaWx0ZXJFbnRyaWVzQnlTZWFyY2hJbnB1dCBmcm9tIFwiLi9maWx0ZXJFbnRyaWVzQnlTZWFyY2hJbnB1dC5qc1wiXHJcblxyXG5mdW5jdGlvbiB0dXJuRGF0YWJhc2VFbnRyaWVzVG9IVE1MKCkge1xyXG4gICAgcmV0dXJuIGZpbHRlckVudHJpZXNCeVNlYXJjaElucHV0KClcclxuICAgICAgICAudGhlbigoZmlsdGVyZWRFbnRyaWVzKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeUhUTUxCbG9ja3MgPSBbXVxyXG4gICAgICAgICAgICBmaWx0ZXJlZEVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbnRyeUhUTUxCbG9ja3MucHVzaChgXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCIke2VudHJ5LmRhdGV9XCIgY2xhc3M9XCJwYXN0RW50cnlcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCIke2VudHJ5LmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgPGgxIGNsYXNzPVwicGFzdEVudHJ5VGl0bGVcIj4ke2VudHJ5LmNvbmNlcHRzQ292ZXJlZH08L2gxPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhc3RFbnRyeVRleHRcIj4ke2VudHJ5LnRleHRFbnRyeX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYXN0RW50cnlMaW5rXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7ZW50cnkubGlua31cIj5SZWxhdGVkIExpbms6ICR7ZW50cnkubGlua0Rlc2NyaXB0aW9ufSA8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiZW50cnlCb3R0b21CYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiZGVsZXRlLS0ke2VudHJ5LmlkfVwiPkRlbGV0ZSBFbnRyeTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJlZGl0LS0ke2VudHJ5LmlkfVwiPkVkaXQgRW50cnk8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZUFuZE1vb2RcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhc3RFbnRyeURhdGVcIj4ke2VudHJ5LmRhdGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYXN0RW50cnlNb29kXCI+JHtlbnRyeS5tb29kfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYClcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbnRyeUhUTUxCbG9ja3NcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIGVudHJ5SFRNTEJsb2Nrc1xyXG4gICAgICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHR1cm5EYXRhYmFzZUVudHJpZXNUb0hUTUwiXX0=

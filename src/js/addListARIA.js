function addListARIA() {
  try {
    var allLists = document.querySelectorAll("ol, ul");
    for (var i = 0; i < allLists.length; i++) {
      allLists[i].setAttribute("role", "list");
    }
    var allListItems = document.querySelectorAll("li");
    for (var i = 0; i < allListItems.length; i++) {
      allListItems[i].setAttribute("role", "listitem");
    }
    var allDefLists = document.querySelectorAll("dl");
    for (var i = 0; i < allDefLists.length; i++) {
      allDefLists[i].setAttribute("role", "associationlist list");
    }
    var allDefTerms = document.querySelectorAll("dt");
    for (var i = 0; i < allDefTerms.length; i++) {
      allDefTerms[i].setAttribute("role", "associationlistitemkey listitem");
    }
    var allDefItems = document.querySelectorAll("dd");
    for (var i = 0; i < allDefItems.length; i++) {
      allDefItems[i].setAttribute("role", "associationlistitemvalue listitem");
    }
  } catch (e) {
    console.log("AddListARIA(): " + e);
  }
}

export {addListARIA}

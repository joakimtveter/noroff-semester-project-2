function addListARIA() {
  try {
    const allLists = document.querySelectorAll("ol, ul");
    for (let i = 0; i < allLists.length; i++) {
      allLists[i].setAttribute("role", "list");
    }
    const allListItems = document.querySelectorAll("li");
    for (let i = 0; i < allListItems.length; i++) {
      allListItems[i].setAttribute("role", "listitem");
    }
    const allDefLists = document.querySelectorAll("dl");
    for (let i = 0; i < allDefLists.length; i++) {
      allDefLists[i].setAttribute("role", "associationlist list");
    }
    const allDefTerms = document.querySelectorAll("dt");
    for (let i = 0; i < allDefTerms.length; i++) {
      allDefTerms[i].setAttribute("role", "associationlistitemkey listitem");
    }
    const allDefItems = document.querySelectorAll("dd");
    for (let i = 0; i < allDefItems.length; i++) {
      allDefItems[i].setAttribute("role", "associationlistitemvalue listitem");
    }
  } catch (e) {
    console.log("AddListARIA(): " + e);
  }
}

export {addListARIA}

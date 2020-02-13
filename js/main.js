/**
 * Author: Gerardo Keys
 * Program Description: This program will display the cards populated from with information from a public
 * profile API, which generates random user profiles. All cards are poplulated with names, addresses, and emails.
 * When each card is clicked a generated overlay will unhide to reveal further information. When in the modal window
 * the user will be able to click the next or previous buttons to cycle between all 12 generated profiles. The modal
 * window can be closed by clicking the x button located on the top right of the window.
 */

/**
 * Div container for search bar and button. API address valiable.
 */
const searchContainer = $(".search-container");
const randomUser = "https://randomuser.me/api/?results=12&nat=us";

/**
 * Div container being appended with search form containing input and submit button.
 */
searchContainer.append(`<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`);

/**
 * Profile card event listener. This will show the modal cover for
 * the profile that was picked.
 */
$(document).on("click", ".card", function() {
  const name = $(this)
    .children()
    .children()[1];

  let $modals = $(".modal-container");

  $($modals[0])
    .find("#modal-prev")
    .attr("disabled", true)
    .css("opacity", "0.07");

  $($modals[11])
    .find("#modal-next")
    .attr("disabled", true)
    .css("opacity", "0.07");

  for (let i = 0; i < $modals.length; i++) {
    let chosen = $($modals[i])
      .children()
      .children()[1];
    let chosen1 = $(chosen).children()[1];
    if ($(name).text() == $(chosen1).text()) {
      $($modals[i]).show();
    }
  }
});

/**
 * This is the event listener for the modal windows close button.
 * When this is clicked the modal window will be hidden.
 */
$(document).on("click", ".modal-close-btn", function() {
  let parent = $(this)
    .parent()
    .parent();
  $(parent).hide();
});


/**
 * Event listener for the modal windows previous button. This will cycle
 * through all the previous modals until it reaches the first card.
 */
$(document).on("click", ".modal-prev", function() {
  const $parent = $(this)
    .parent()
    .parent();
  $($parent).hide();
  $($parent)
    .prev()
    .show();
});

/**
 * Event listener for the modal windows next button. Will cycle through
 * all the cards until it reaches the last card.
 */
$(document).on("click", ".modal-next", function() {
  const $parent = $(this)
    .parent()
    .parent();
  $($parent).hide();
  $($parent)
    .next()
    .show();
});

/**
 * This will trigger the cards box shadow when mouse cursor enters and hovers
 * over the profile cards.
 */
$(document).on("mouseenter", ".card", function() {
  $(this)
    .css(
      "box-shadow",
      "0 4px 8px 0 rgba(0,0,0,0.3),0 6px 20px 0 rgba(0,0,0,0.19)"
    )
    .css("border", "none");
});

/**
 * This will trigger the box shadow to end when the cursor leaves the card window.
 */
$(document).on("mouseleave", ".card", function() {
  $(this).css("box-shadow", "");
});

/**
 * Will trigger the submit on the form when the search button is clicked. When 
 * the search is performed the corresponding cards that match the value will be
 * showed.
 */
$(document).on("click", "#search-submit", function(event) {
  event.preventDefault();
  const $cards = $(".card");
  let searchInput = $("#search-input")[0].value.toLowerCase();
  $.each($cards, function(i, val) {
    let allNames = $(this)
      .children()
      .children()[1].innerHTML;
    console.log(allNames);
    allNames.toLowerCase().includes(searchInput) ? $(val).show() : $(val).hide();
  });
});

/**
 * The API requests main entry point, will take in the url and return the response
 * as JSON.
 * @param {string} url 
 */
const apiRequest = async url => {
  const val = await fetch(url);
  return await val.json();
};

/**
 * The API request chain. Will create new class instances and call methods.
 */
apiRequest(randomUser)
  .then(val => {
    const direct = new EmployeeDirectory(val);
    direct.generateContainer();
    return val;
  })
  .catch(err => console.log(err))
  .then(val => {
    const overlay = new EmployeeOverlay(val);
    overlay.generateOverlay();
  });

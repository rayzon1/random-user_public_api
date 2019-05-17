const $body = $('body');




                    

const generateOverlay = (arr) => {
    const results = arr.results;
    const pictures = getPictures(results);
    const names = getName(results);
    const emails = getEmail(results);
    const city = getCity(results);
    const numbers = getNumber(results);
    const addresses = getFullAddress(results);
    const birthdays = getBirthdays(results);

    for (let i = 0; i < results.length; i ++) {
        let modalContainer = `<div class="modal-container" hidden>
                        <div class="modal">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                                <img class="modal-img" src="${pictures[i]}" alt="profile picture">
                                <h3 id="name" class="modal-name cap">${names[i]}</h3>
                                <p class="modal-text">${emails[i]}</p>
                                <p class="modal-text cap">${city[i]}</p>
                                <hr>
                                <p class="modal-text">${numbers[i]}</p>
                                <p class="modal-text">${addresses[i]}</p>
                                <p class="modal-text">Birthday: ${birthdays[i]}</p>
                            </div>
                        </div>`
        $body.append(modalContainer);

    }
    //$body.append(overlay);
    //console.log(numbers);
}



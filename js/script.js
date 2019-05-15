const searchContainer = $('.search-container');
const galleryContainer = $('.gallery');
const cardName = $('.card-name');

searchContainer.append(`<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                        </form>`);

let cardContainer = `<div class="card">
                            <div class="card-img-container">
                                <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
                            </div>
                            <div class="card-info-container">
                                <h3 id="name" class="card-name cap"></h3>
                                <p class="card-text">email</p>
                                <p class="card-text cap">city, state</p>
                            </div>
                        </div>`






const randomUser = 'https://randomuser.me/api/?results=12';

const getPictures = (arr) => {
    let pictures = []
    for (let i = 0; i < arr.length; i ++) {
        pictures.push(arr[i].picture.large);   
    }
    return pictures;
}


const getName = (arr) => {
    let names = [];
    for (let i = 0; i < arr.length; i ++){
        names.push(arr[i].name.first + ' ' + arr[i].name.last);
    }
    return names;
}

const getEmail = (arr) => {
    let emails = [];
    for (let i = 0; i < arr.length; i++) {
        emails.push(arr[i].email);
    }
    return emails;
}

const generateContainer = (names, email, picture) => {
    
     let newCard = '';

     for (let i = 0; i < names.length; i ++) {
        let cardContainer = `<div class="card">
                            <div class="card-img-container">
                                <img class="card-img" src="${picture[i]}" alt="profile picture">
                            </div>
                            <div class="card-info-container">
                                <h3 id="name" class="card-name cap">${names[i]}</h3>
                                <p class="card-text">${email[i]}</p>
                                <p class="card-text cap">city, state</p>
                            </div>
                        </div>`
        newCard += cardContainer
    }
    galleryContainer.append(newCard);
}



const apiRequest = (url) => {
    return fetch(url)
            .then(val => val.json())
            //.then(val => console.log(val));
}


apiRequest(randomUser)
    .then(val => {
        console.log(val)
        const results = val.results
        const pictures = getPictures(results);
        const names = getName(results);
        const emails = getEmail(results);
        generateContainer(names, emails, pictures);
    })
    //.then(val => generateContainer(val))
    //.then(val => appendName(val))
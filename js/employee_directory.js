const searchContainer = $('.search-container');
const galleryContainer = $('.gallery');
const cardName = $('.card-name');

searchContainer.append(`<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                        </form>`);



const randomUser = 'https://randomuser.me/api/?results=12';

const getPictures = (arr) => {
    return arr.map(val => val.picture.large);
}

const getName = (arr) => {
    return arr.map(val => val.name.first + ' ' + val.name.last);
}

const getEmail = (arr) => {
    return arr.map(val => val.email);
}

const getCity = (arr) => {
    return arr.map(val => val.location.city);
}

const getNumber = (arr) => {
    return arr.map(val => val.cell);
}

const getFullAddress = (arr) => {
    return arr.map(val => `${val.location.street}, ${val.location.state} ${val.location.postcode}`)
}

const getBirthdays = (arr) => {
    const regex = /^(\d{4})-?(\d{2})-?(\d{2}?)?\D.*$/;
    return arr.map(val => {
            let date = val.dob.date;
            return date.replace(regex, "$2/$3/$1");
        })
}

const generateContainer = (names, email, picture, city) => {
    
     let newCard = '';

     for (let i = 0; i < names.length; i ++) {
        let cardContainer = `<div class="card">
                            <div class="card-img-container">
                                <img class="card-img" src="${picture[i]}" alt="profile picture">
                            </div>
                            <div class="card-info-container">
                                <h3 id="name" class="card-name cap">${names[i]}</h3>
                                <p class="card-text">${email[i]}</p>
                                <p class="card-text cap">${city[i]}</p>
                            </div>
                        </div>`
        newCard += cardContainer
    }
    galleryContainer.append(newCard);
}



const apiRequest = async (url) => {
    const val = await fetch(url);
    return await val.json();
}


apiRequest(randomUser)
    .then(val => {
        //console.log(val)
        const results = val.results
        const pictures = getPictures(results);
        const names = getName(results);
        const emails = getEmail(results);
        const cityState = getCity(results)
        generateContainer(names, emails, pictures, cityState);
        return val;
    })
    .then(val => generateOverlay(val))
    //.then(val => appendName(val))

    
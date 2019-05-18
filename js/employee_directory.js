

class EmployeeDirectory {
    constructor(people) {
        this.results = people.results;
        this.pictures = this.getPictures(this.results);
        this.names = this.getName(this.results);
        this.emails = this.getEmail(this.results);
        this.city = this.getCity(this.results);
        this.$galleryContainer = $('.gallery');

    }

    getPictures (arr) {
        return arr.map(val => val.picture.large);
    }
    
    getName (arr) {
        return arr.map(val => val.name.first + ' ' + val.name.last);
    }
    
    getEmail (arr) {
        return arr.map(val => val.email);
    }
    
    getCity (arr) {
        return arr.map(val => val.location.city);
    }
    
    generateContainer () {
         let newCard = '';
         for (let i = 0; i < this.results.length; i ++) {
            let cardContainer = `<div class="card">
                                <div class="card-img-container">
                                    <img class="card-img" src="${this.pictures[i]}" alt="profile picture">
                                </div>
                                <div class="card-info-container">
                                    <h3 id="name" class="card-name cap">${this.names[i]}</h3>
                                    <p class="card-text">${this.emails[i]}</p>
                                    <p class="card-text cap">${this.city[i]}</p>
                                </div>
                            </div>`
            newCard += cardContainer
        }
        this.$galleryContainer.append(newCard); 
    }

}

    

    
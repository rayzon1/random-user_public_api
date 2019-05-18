


class EmployeeOverlay extends EmployeeDirectory {
    constructor(people){
        super(people);
        this.numbers = this.getNumber(this.results);
        this.addresses = this.getFullAddress(this.results);
        this.birthdays = this.getBirthdays(this.results);
        this.$body = $('body');
    }

    getNumber (arr) {
        return arr.map(val => val.cell);
    }
    
    getFullAddress (arr) {
        return arr.map(val => {
            return `${val.location.street}, ${val.location.state} ${val.location.postcode}`
        })
    }
    
    getBirthdays (arr) {
        const regex = /^(\d{4})-?(\d{2})-?(\d{2}?)?\D.*$/;
        return arr.map(val => {
                let date = val.dob.date;
                return date.replace(regex, "$2/$3/$1");
            })
    }

    generateOverlay () {
        
        for (let i = 0; i < this.results.length; i ++) {
            let modalContainer = `<div class="modal-container" hidden>
                            <div class="modal">
                                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                <div class="modal-info-container">
                                    <img class="modal-img" src="${this.pictures[i]}" alt="profile picture">
                                    <h3 id="name" class="modal-name cap">${this.names[i]}</h3>
                                    <p class="modal-text">${this.emails[i]}</p>
                                    <p class="modal-text cap">${this.city[i]}</p>
                                    <hr>
                                    <p class="modal-text">${this.numbers[i]}</p>
                                    <p class="modal-text">${this.addresses[i]}</p>
                                    <p class="modal-text">Birthday: ${this.birthdays[i]}</p>
                                </div>
                            </div>`
    
                          
            this.$body.append(modalContainer);
            
        }
        
        const $modalContainer = $('.modal-container');
        const modalButtons = `<div class="modal-btn-container">
                                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                                </div>`
    
        
        $modalContainer.each((i, val) => $(val).append(modalButtons));
        
    }

}



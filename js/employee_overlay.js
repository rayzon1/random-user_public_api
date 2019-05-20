
/**
 * Employee Overlay contains the code to generate the modal profile cards which are all added
 * to the dom and then hidden. When the card matching the modal is picked that modal is then 
 * unhidden from the dom. This class contains methods which are used to generate the properties
 * from the information from the API. 
 */

class EmployeeOverlay extends EmployeeDirectory {
    /**
     * Class constructor extends properties and methods from Employee Directory.
     * Adds properties specific for this class.
     * @param {object} people 
     */
  constructor(people) {
    super(people);
    this.numbers = this.getNumber(this.results);
    this.addresses = this.getFullAddress(this.results);
    this.birthdays = this.getBirthdays(this.results);
    this.$body = $("body");
  }

  /**
   * Will get profile numbers from the API.
   * @param {array} arr 
   */
  getNumber(arr) {
    return arr.map(val => val.cell);
  }

  /**
   * Will return a full address generated from API information.
   * @param {array} arr 
   */
  getFullAddress(arr) {
    return arr.map(val => {
      return `${val.location.street}, ${val.location.state} ${
        val.location.postcode
      }`;
    });
  }

  /**
   * This will gather the birthdates from API. Will format using regex as template
   * to replace.
   * @param {array} arr 
   */
  getBirthdays(arr) {
    const regex = /^(\d{4})-?(\d{2})-?(\d{2}?)?\D.*$/;
    return arr.map(val => {
      let date = val.dob.date;
      return date.replace(regex, "$2/$3/$1");
    });
  }

  /**
   * This method will create the modal cards and append them to the dom.
   */
  generateOverlay() {
    for (let i = 0; i < this.results.length; i++) {
      let modalContainer = `<div class="modal-container" hidden>
                            <div class="modal">
                                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                <div class="modal-info-container">
                                    <img class="modal-img" src="${
                                      this.pictures[i]
                                    }" alt="profile picture">
                                    <h3 id="name" class="modal-name cap">${
                                      this.names[i]
                                    }</h3>
                                    <p class="modal-text">${this.emails[i]}</p>
                                    <p class="modal-text cap">${
                                      this.city[i]
                                    }</p>
                                    <hr>
                                    <p class="modal-text">${this.numbers[i]}</p>
                                    <p class="modal-text">${
                                      this.addresses[i]
                                    }</p>
                                    <p class="modal-text">Birthday: ${
                                      this.birthdays[i]
                                    }</p>
                                </div>
                            </div>`;

      this.$body.append(modalContainer);
    }

    const $modalContainer = $(".modal-container");
    const modalButtons = `<div class="modal-btn-container">
                                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                                </div>`;

    $modalContainer.each((i, val) => $(val).append(modalButtons));
  }
}

/**
 * Employee Directory class will be responsible for the card creation as well as methods for extracting
 * values from the API. These values will be used to populate the profile cards.
 */
class EmployeeDirectory {

    /**
     * Constructor holds the object generated from the API. The constuctor
     * calls methods of this instance to generate the values from the properties.
     * @param {Object} people 
     */
  constructor(people) {
    this.results = people.results;
    this.pictures = this.getPictures(this.results);
    this.names = this.getName(this.results);
    this.emails = this.getEmail(this.results);
    this.city = this.getCity(this.results);
    this.$galleryContainer = $(".gallery");
  }

  /**
   * Will gather large picture sizes for user photos from API.
   * @param {array} arr 
   */
  getPictures(arr) {
    return arr.map(val => val.picture.large);
  }

  /**
   * Will gather names from the API object.
   * @param {array} arr 
   */
  getName(arr) {
    return arr.map(val => val.name.first + " " + val.name.last);
  }

  /**
   * Will gather email addresses for the users from API.
   * @param {array} arr 
   */
  getEmail(arr) {
    return arr.map(val => val.email);
  }

  /**
   * Will obtain city location form API object.
   * @param {array} arr 
   */
  getCity(arr) {
    return arr.map(val => val.location.city);
  }

  /**
   * This method will generate the user cards and add them to the dom.
   */
  generateContainer() {
    let newCard = "";
    for (let i = 0; i < this.results.length; i++) {
      let cardContainer = `<div class="card">
                                <div class="card-img-container">
                                    <img class="card-img" src="${
                                      this.pictures[i]
                                    }" alt="profile picture">
                                </div>
                                <div class="card-info-container">
                                    <h3 id="name" class="card-name cap">${
                                      this.names[i]
                                    }</h3>
                                    <p class="card-text">${this.emails[i]}</p>
                                    <p class="card-text cap">${this.city[i]}</p>
                                </div>
                            </div>`;
      newCard += cardContainer;
    }
    this.$galleryContainer.append(newCard);
  }
}

/**
 * Manage all the drivers in the system.
 * @hideconstructor
 */
class Drivers {
  /**
   * @type {Map<String, Driver>}
   */
  #drivers = new Map();
  
  constructor () {}
  
  /**
   * Adds a driver to the list of available drivers. Drivers with the same id will be overwritten.
   * @param {Driver} driver
   */
  add (driver) {
    this.#drivers[driver.id] = driver;
  }
  
  /**
   * Returns the driver for the given id.
   * @param {string} id
   * @return {Driver}
   */
  fetch (id) {
    return this.#drivers[id];
  }
  
  /**
   * Returns all knows drivers as a list.
   * @return {Driver[]} - The (random) list of drivers.
   */
  list () {
    let list = [];
    for (let id in this.#drivers) {
      list.push(this.#drivers[id]);
    }
    return list;
  }
}

export default new Drivers();
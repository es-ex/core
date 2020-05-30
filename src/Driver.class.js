/**
 * This is only a reference implementation to code against. It's not actually being used anywhere.
 * Drivers that implement different database sinks and faucets will provide the same interface.
 */
import { Readable, Writable } from 'stream';

/**
 * A definition of all the functions and properties a driver needs to provide to be fully functional.
 */
export default class Driver {
  /**
   * @type {string} the unique full name that identifies this driver.
   */
  name = 'Elasticsearch';
  
  /**
   * @type {string} a short space saving unique identifier used in various places.
   */
  id = 'es';
  
  /**
   * Returns a help object that will be printed by the client.
   * @returns {Help}
   */
  help () {}
  
  /**
   * Takes the given options and verifies them for correctness. At the same time it is expected that this step will
   * auto-fill any settings that can be inferred by other values. It may be run multiple times on the same object, so
   * repeatable operations should not cause a loss of configuration.
   * @param {PlumbingOptions} options
   */
  validate (options) {
    switch (options.type) {
      case 'sink':
        break;
      case 'faucet':
        break;
    }
  }
  
  /**
   * Import data into the target sink
   * @param {SinkOptions} options - The configuration options and metadata of where and how to store data.
   * @param {Readable<Entry>} stream - The stream of data from which the driver can read entries.
   */
  import (options, stream) {}
  
  /**
   * @param {FaucetOptions} options - The configuration options and metadata of where and how to read data.
   * @param {Writable<Entry>} stream - The stream of data to which the driver can write entries to.
   */
  export (options, stream) {}
  
  /**
   * This property holds all entry transformation functions that might be called by a stream mid flow.
   */
  static transform = {
    /**
     * Transforms an entry from the driver format to the common format ready to read.
     * @param {Object} entry - The driver specific object. Format depends on the driver.
     * @returns {Entry} - A common format entry with data and metadata.
     */
    from: function(entry) {},
    /**
     * Transforms an entry from the common format to the driver format ready to write.
     * @param {Entry} entry - A common format entry with data and metadata.
     * @returns {Object} - The driver specific object. Format depends on the driver.
     */
    to: function(entry) {}
  }
}
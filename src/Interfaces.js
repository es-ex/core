/**
 * This is only a reference implementation to code against. It's not actually being used anywhere.
 * Drivers that implement different database sinks and faucets will provide the same interface.
 */
import { Readable, Writable } from 'stream';

/**
 * The description of a driver and the options that it supports.
 * @hideconstructor
 * @Example <code>{
 *   description = 'The elasticsearch driver. Uses the bulk import and streaming export feature to transfer data.'
 *   options = [OptionHelp, OptionHelp, ...]
 * }</code>
 */
class Help {
  /**
   * @type {string} - A longer description of the plugin and what it does. This will be printed as a header for the
   *                  options that follow.
   */
  description;
  
  /**
   * @type {OptionHelp[]} - A list of help entries for each options supported by the driver.
   */
  options;
}

/**
 * A Help entry that is used for verification and reference (e.g. default values)
 * @hideconstructor
 * @Example <code>{
 *   short = 'h',
 *   long = 'hostNameExample',
 *   preset = 'localhost',
 *   required = true, // can be omitted since a preset is set
 *   text = 'The hostname from/to which we're transferring data. ipv4 or dns format is acceptable.'
 *  }</code>
 */
class OptionHelp {
  /**
   * @type {string} - Short identifier, 1 or 2 letters/numbers at most.
   */
  short;
  
  /**
   * @type {string} - Long identifier, single word, camelCase.
   */
  long;
  
  /**
   * @type {[*]} - Default value for this setting.
   */
  preset;
  
  /**
   * @type {boolean} - Specify whether this option needs to be set to be able to run. Will be used during verify phase
   *                   by core.
   */
  required = false;
  
  /**
   * @type {string} - Help text that will be rendered along the options, describing what that option does.
   */
  text;
}

/**
 * The topmost options object that has the most generic properties that all object types have.
 * @hideconstructor
 */
class Options {
  /**
   * @type {string} - The type of options in this object. Allows a driver to specify options with the use of classes.
   */
  type;
}

/**
 * An abstract interface that is never used directly. Just used here for brevity.
 * @abstract
 */
class PlumbingOptions extends Options {
  /**
   * @type {string} - The id of the driver to use for these options
   */
  driver;
  
  /**
   * @type {string} - The hostname of a server. Both ipv4 and dns should work.
   */
  host;
  
  /**
   * @type {number} - The port number to connect to.
   */
  port;
  
  /**
   * @type {string[]} - This translates to schemas, indices, types, tables and any other type of logical separation of
   *                    data. The list is in the order in which the system is descended. The depth of the list is
   *                    variable since it depends on the database system and how many levels of organization it has
   *                    available.
   */
  categories = [];
}

/**
 * The options for the sink that receives the data.
 * @hideconstructor
 */
class SinkOptions extends PlumbingOptions {
  type = 'sink';
  
  /**
   * @type {boolean} - If any documents have already been indexed they will be replaced.
   */
  override = false;
}

/**
 * The options for the faucet that provides the data.
 * @hideconstructor
 */
class FaucetOptions extends PlumbingOptions {
  type = 'faucet';
  
  /**
   * @type {string} - A query that is run to determine the source data instead of the constructed one.
   */
  query;
}

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
}
/**
 * The topmost options object that has the most generic properties that all object types have.
 * @hideconstructor
 */
export default class Options {
  /**
   * @type {string} - The type of options in this object. Allows a driver to specify options with the use of classes.
   */
  type;
}

/**
 * An abstract interface that is never used directly. Just used here for brevity.
 * @abstract
 */
export class PlumbingOptions extends Options {
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
export class SinkOptions extends PlumbingOptions {
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
export class FaucetOptions extends PlumbingOptions {
  type = 'faucet';
  
  /**
   * @type {string} - A query that is run to determine the source data instead of the constructed one.
   */
  query;
}

/**
 * Options that can be used by either the sink or the faucet.
 */
export class PumpOptions extends Option {
  /**
   * @type {number} - How long a socket will be kept around once used to establish another connection.
   */
  agentKeepAlive = 5000
  /**
   * @type {number} - Timeout before a socket times out and gets closed.
   */
  agentTimeout = 10000
}
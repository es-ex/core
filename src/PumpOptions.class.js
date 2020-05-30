export default class PumpOptions extends Option {
  /**
   * @type {number} - The number of workers assigned to writing data to the sink.
   */
  sinks = 1
  
  /**
   * @type {number} - The number of workers assigned to reading data from the faucet.
   */
  faucets = 1
}
/**
 * The description of a driver and the options that it supports.
 * @hideconstructor
 * @Example <code>{
 *   description = 'The elasticsearch driver. Uses the bulk import and streaming export feature to transfer data.'
 *   options = [OptionHelp, OptionHelp, ...]
 * }</code>
 */
export default class Help {
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
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
export default class OptionHelp {
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
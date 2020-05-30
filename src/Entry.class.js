/**
 * A single data entry from a faucet database. This class wraps the data needed to recreate a single unit of logically
 * connected data such as a row, document or node.
 */
export default class Entry {
  /**
   * @type {*} - The actual data in the individual fields or properties.
   */
  data;
  
  /**
   * @type {*} - Any metadata fields that have been set, such as a ttl or version.
   */
  meta;
}
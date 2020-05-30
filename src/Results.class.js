export default class Results {
  /**
   * @type {number} - The number of document this run has processed.
   */
  documents = 0;
  
  /**
   * @type {number} - The number of documents that caused errors.
   */
  errors = 0;
  
  /**
   * @type {number} - The number of requests that were performed during the run.
   */
  requests = 0;
  
  /**
   * @type {number} - How often the driver needed to retry during a run.
   */
  retries = 0;
  
  /**
   * @type {string} - A human readable string that says something about how far we got in a run and what the outcome
   *   was.
   */
  result = 'Not Started'
}
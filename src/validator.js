import Drivers from './Drivers';

/**
 * Validates the incoming options.
 * Performs checks for e.g. required options automatically, but also forwards options to target drivers for verification
 * @hideconstructor
 */
class Validator {
  constructor () {}
  
  /**
   * Looks at what type of options object this is and then performs the appropriate validation.
   * @param {Options} options - The options object to check.
   */
  check (options) {
    switch (options.type) {
      case 'sink':
      case 'faucet':
        let driver = Drivers.fetch(options.driver);
        driver.validate(options);
        break;
      default:
        throw new Error('Unknown options were set! How did that happen?');
    }
  }
}

export default new Validator();
import Pump      from 'src/Pump';
import Validator from 'src/Validator';
import Drivers   from 'src/Drivers';

/**
 * Runs a data transfer from on location to another if all options are valid.
 * @param {Options} optionsList - A list of options that should include at least sink and faucet type options.
 * @return {Results} results
 */
export function run (...optionsList) {
  let optionsMap = new Map();
  for (let options of optionsList) {
    Validator.check(options);
    optionsMap[options.type] = options;
  }
  return Pump.run(optionsMap);
}

/**
 * Depending on the type of options the core system will perform different types of validation.
 * @param {Options} optionsList - A list of options to be verified.
 */
export function validate (...optionsList) {
  for (let options of optionsList) {
    Validator.check(options);
  }
}

/**
 * Returns the help for each of the options
 * @param {Options} optionsList
 */
export function help (...optionsList) {
  let helpMap = new Map();
  for (let options of optionsList) {
    switch (options.type) {
      case 'faucet':
      case 'sink':
        helpMap[options.type] = Drivers[options.type].help();
        break;
      default:
        helpMap[options.type] = false;
    }
  }
}
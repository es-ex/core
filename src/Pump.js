import { Duplex, Transform } from 'stream';
import Drivers    from './Drivers.js';
import Results    from './Results.class.js';

class Pump {
  /**
   * Performs the actual transfer of data from faucet to sink.
   * @param {Map<String,Options>} options - The list of options of different types for this run. These are assumed
   *   valid.
   * @returns {Results} - The results of this run.
   */
  run (options) {
    const results = new Results();
    let faucet = Drivers.fetch(options['faucet'.driver]);
    let sink = Drivers.fetch(options['sink'].driver);
    let stream = new Duplex({objectMode: true});
    sink.import(options['sink'], stream);
    faucet.export(options['faucet'], stream);
    stream.pipe(new FromTransformer(faucet)).pipe(new ToTransformer(sink));
    return results;
  }
}

class FromTransformer extends Transform {
  #driver
  
  constructor (driver, options = {objectMode: true}) {
    super(options);
    this.#driver = driver;
  }
  
  _transform (entry, encoding, callback) {
      callback(this.#driver.transform.from(entry));
  }
}

class ToTransformer extends Transform {
  #driver
  
  constructor (driver, options = {objectMode: true}) {
    super(options);
    this.#driver = driver;
  }
  _transform (entry, encoding, callback) {
    callback(this.#driver.transform.to(entry));
  }
}

// TODO think whether this needs to be a singleton
export default new Pump();
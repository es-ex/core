import { Duplex, Transform } from 'stream';
import Drivers    from './Drivers';
import Results    from './Results.class';

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
    // TODO create many sinks using threading
    sink.import(options['sink'], stream);
    // TODO create many faucets using threading
    faucet.export(options['faucet'], stream);
    stream.pipe(new FromTransformer(faucet)).pipe(new ToTransformer(sink));
    return results;
  }
}

class FromTransformer extends Transform {
  constructor (driver, options = {objectMode: true}) {
    super(options);
    this.#driver = driver;
  }
  
  _transform (entry, encoding, callback) {
      callback(this.#driver.transform.from(entry));
  }
}

class ToTransformer extends Transform {
  constructor (driver, options = {objectMode: true}) {
    super(options);
    this.#driver = driver;
  }
  _transform (entry, encoding, callback) {
    callback(this.#driver.transform.to(entry));
  }
}

export default new Pump();
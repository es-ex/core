import { Duplex } from 'stream';
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
    sink.import(options['sink'], stream);
    faucet.export(options['faucet'], stream);
    return results;
  }
}

export default new Pump();
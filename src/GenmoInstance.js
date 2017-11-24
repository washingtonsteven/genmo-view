import Genmo from './genmo';
// import world_data from './genmo/data/data.json';
import world_data from './data/test1.json';

const genmo = new Genmo({
  world_data,
  output:(m,o) => {}
});

export default genmo;
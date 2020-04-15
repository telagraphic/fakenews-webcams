const cnn = require('./feeds/cnn.js');
const fox = require('./feeds/fox.js');
const rt = require('./feeds/rt.js');
const nytimes = require('./feeds/nytimes.js');
const drudgereport = require('./feeds/drudgereport.js');
const talkingpointsmemo = require('./feeds/talkingpointsmemo.js');
const zerohedge = require('./feeds/zerohedge.js');
const politico = require('./feeds/politico.js');
const breitbart = require('./feeds/breitbart.js');
const huffpost = require('./feeds/huffpost.js');
const infowars = require('./feeds/infowars.js');
const theonion = require('./feeds/theonion.js');

// async function getStories() {
//   await
// }
//
// await getStories();

cnn.fetchStories();

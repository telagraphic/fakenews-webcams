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


// May 13 13:50:30 fakenews-webcams app/scheduler.1014: JOB START: FOX
// May 13 13:51:07 fakenews-webcams app/scheduler.2125: JOB START: TALKING POINTS MEMO
// May 13 14:50:29 fakenews-webcams app/scheduler.6128: JOB START: TALKING POINTS MEMO
// May 13 14:51:13 fakenews-webcams app/scheduler.8717: JOB START: FOX
// May 13 15:50:32 fakenews-webcams app/scheduler.8459: JOB START: POLITICO
// May 13 15:51:03 fakenews-webcams app/scheduler.4876: JOB START: NYTIMES
// May 13 16:50:29 fakenews-webcams app/scheduler.8325: JOB START: POLITICO
// May 13 16:51:16 fakenews-webcams app/scheduler.9060: JOB START: TALKING POINTS MEMO
// May 13 17:50:31 fakenews-webcams app/scheduler.5798: JOB START: CNN
// May 13 18:50:34 fakenews-webcams app/scheduler.6352: JOB START: RT
// May 13 18:50:58 fakenews-webcams app/scheduler.3151: JOB START: THE ONION
// May 13 18:50:58 fakenews-webcams app/scheduler.2231: JOB START: POLITICO
// May 13 19:50:38 fakenews-webcams app/scheduler.1854: JOB START: THE ONION
// May 13 20:50:23 fakenews-webcams app/scheduler.6921: JOB START: DRUDGEREPORT
// May 13 20:51:02 fakenews-webcams app/scheduler.1069: JOB START: ZEROHEDGE
// May 13 20:51:27 fakenews-webcams app/scheduler.2140: JOB START: CNN
// May 13 21:50:32 fakenews-webcams app/scheduler.4154: JOB START: NYTIMES
// May 13 21:51:10 fakenews-webcams app/scheduler.3016: JOB START: POLITICO
// May 13 22:50:25 fakenews-webcams app/scheduler.6027: JOB START: POLITICO
// May 13 22:51:00 fakenews-webcams app/scheduler.6572: JOB START: HUFFPOST
// May 13 23:50:28 fakenews-webcams app/scheduler.2702: JOB START: BREITBART
// May 14 00:50:25 fakenews-webcams app/scheduler.8686: JOB START: BREITBART
// May 14 01:50:30 fakenews-webcams app/scheduler.3900: JOB START: HUFFPOST
// May 14 01:50:52 fakenews-webcams app/scheduler.5740: JOB START: INFOWARS
// May 14 01:51:31 fakenews-webcams app/scheduler.9469: JOB START: POLITICO
// May 14 02:50:25 fakenews-webcams app/scheduler.6975: JOB START: DRUDGEREPORT
// May 14 02:51:06 fakenews-webcams app/scheduler.3446: JOB START: BREITBART
// May 14 03:50:28 fakenews-webcams app/scheduler.3500: JOB START: POLITICO
// May 14 03:50:58 fakenews-webcams app/scheduler.4824: JOB START: BREITBART
// May 14 04:50:31 fakenews-webcams app/scheduler.4627: JOB START: INFOWARS
// May 14 04:51:07 fakenews-webcams app/scheduler.8244: JOB START: FOX
// May 14 05:50:27 fakenews-webcams app/scheduler.6116: JOB START: DRUDGEREPORT
// May 14 05:51:05 fakenews-webcams app/scheduler.1252: JOB START: INFOWARS
// May 14 06:50:28 fakenews-webcams app/scheduler.3625: JOB START: HUFFPOST
// May 14 06:51:00 fakenews-webcams app/scheduler.7328: JOB START: INFOWARS
// May 14 07:50:27 fakenews-webcams app/scheduler.7452: JOB START: ZEROHEDGE
// May 14 07:50:54 fakenews-webcams app/scheduler.3400: JOB START: NYTIMES
// May 14 09:50:30 fakenews-webcams app/scheduler.6568: JOB START: THE ONION
// May 14 10:50:32 fakenews-webcams app/scheduler.6206: JOB START: BREITBART
// May 14 11:50:33 fakenews-webcams app/scheduler.3055: JOB START: NYTIMES
// May 14 12:50:26 fakenews-webcams app/scheduler.3747: JOB START: RT
// May 14 12:51:06 fakenews-webcams app/scheduler.4249: JOB START: FOX
// May 14 13:50:29 fakenews-webcams app/scheduler.8555: JOB START: CNN
// May 14 13:51:08 fakenews-webcams app/scheduler.6194: JOB START: TALKING POINTS MEMO
// May 14 14:50:27 fakenews-webcams app/scheduler.5483: JOB START: POLITICO
// May 14 16:50:30 fakenews-webcams app/scheduler.3918: JOB START: POLITICO
// May 14 16:50:33 fakenews-webcams app/scheduler.7394: JOB START: DRUDGEREPORT
// May 14 16:51:21 fakenews-webcams app/scheduler.3901: JOB START: TALKING POINTS MEMO
// May 14 17:50:28 fakenews-webcams app/scheduler.8079: JOB START: BREITBART
// May 14 18:50:31 fakenews-webcams app/scheduler.2723: JOB START: POLITICO
// May 14 18:51:07 fakenews-webcams app/scheduler.9914: JOB START: RT
// May 14 19:50:30 fakenews-webcams app/scheduler.8903: JOB START: RT
// May 14 19:51:01 fakenews-webcams app/scheduler.4349: JOB START: POLITICO
// May 14 20:50:19 fakenews-webcams app/scheduler.5924: JOB START: FOX
// May 14 20:50:54 fakenews-webcams app/scheduler.1356: JOB START: BREITBART
// May 14 21:50:27 fakenews-webcams app/scheduler.8886: JOB START: RT
// May 14 22:50:32 fakenews-webcams app/scheduler.3191: JOB START: BREITBART
// May 14 23:50:30 fakenews-webcams app/scheduler.2250: JOB START: RT
// May 14 23:51:04 fakenews-webcams app/scheduler.4717: JOB START: NYTIMES
// May 15 00:50:32 fakenews-webcams app/scheduler.2822: JOB START: RT
// May 15 00:51:09 fakenews-webcams app/scheduler.2783: JOB START: FOX
// May 15 01:50:30 fakenews-webcams app/scheduler.4764: JOB START: POLITICO
// May 15 01:51:11 fakenews-webcams app/scheduler.7914: JOB START: RT
// May 15 02:50:26 fakenews-webcams app/scheduler.3976: JOB START: THE ONION
// May 15 02:51:01 fakenews-webcams app/scheduler.6009: JOB START: INFOWARS
// May 15 03:50:34 fakenews-webcams app/scheduler.1825: JOB START: RT
// May 15 03:51:17 fakenews-webcams app/scheduler.3316: JOB START: ZEROHEDGE
// May 15 04:50:26 fakenews-webcams app/scheduler.6518: JOB START: ZEROHEDGE
// May 15 06:50:28 fakenews-webcams app/scheduler.6187: JOB START: INFOWARS
// May 15 06:50:55 fakenews-webcams app/scheduler.1438: JOB START: NYTIMES
// May 15 06:51:22 fakenews-webcams app/scheduler.3759: JOB START: BREITBART
// May 15 07:50:21 fakenews-webcams app/scheduler.9069: JOB START: TALKING POINTS MEMO
// May 15 08:50:35 fakenews-webcams app/scheduler.4646: JOB START: POLITICO
// May 15 08:51:16 fakenews-webcams app/scheduler.4942: JOB START: HUFFPOST
// May 15 09:50:30 fakenews-webcams app/scheduler.1866: JOB START: INFOWARS
// May 15 09:51:01 fakenews-webcams app/scheduler.5156: JOB START: NYTIMES
// May 15 10:50:26 fakenews-webcams app/scheduler.3040: JOB START: RT
// May 15 10:51:06 fakenews-webcams app/scheduler.4372: JOB START: CNN
// May 15 11:50:32 fakenews-webcams app/scheduler.2524: JOB START: THE ONION
// May 15 11:51:10 fakenews-webcams app/scheduler.7069: JOB START: FOX
// May 15 12:50:28 fakenews-webcams app/scheduler.7339: JOB START: CNN
// May 15 12:51:12 fakenews-webcams app/scheduler.7718: JOB START: RT

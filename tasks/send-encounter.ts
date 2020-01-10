var request = require('basic-browser-request');
var bodyMover = require('request-body-mover');
var config = require('../config');

const apiServerBaseURL = 'https://smidgeo.com/note-taker/note';

export function sendEncounter(
  {
    encounterId,
    beatIds,
    state,
    actionLogs
  }: {
    encounterId: string;
    beatIds: Array<string>;
    state: any;
    actionLogs: Array<Array<any>>;
  },
  done: (Error, any) => void
) {
  const message = JSON.stringify(
    { encounterId, state, beatIds, actionLogs },
    null,
    2
  );

  var reqOpts = {
    method: 'POST',
    url: apiServerBaseURL,
    json: true,
    headers: {
      Authorization: `Key ${config.playthroughs}`,
      'X-Note-Archive': 'playthroughs',
      'Content-Type': 'application/json'
    },
    body: {
      caption: `<pre>${message}</pre>`
    }
  };
  request(reqOpts, bodyMover(done));
}

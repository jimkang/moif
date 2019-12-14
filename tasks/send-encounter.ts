var easyRequest = require('easy-browser-request');

const token =
  'xoxp-20738496321-20739644710-860876563122-c81480a6aa774ffb68152a54bc672a63';

export async function sendEncounter({
  encounterId,
  beatIds,
  state,
  actionLog
}: {
  encounterId: string;
  beatIds: Array<string>;
  state: any;
  actionLog: Array<any>;
}) {
  const message = JSON.stringify(
    { encounterId, state, beatIds, actionLog },
    null,
    2
  );
  var { error, body } = await easyRequest({
    method: 'GET',
    url: `https://slack.com/api/chat.postMessage?token=${token}&channel=adventure-results&text=${message}.&pretty=1`,
    json: true
  });
  if (error) {
    return Promise.reject(error);
  }
  if (body.error) {
    return Promise.reject(new Error(body.error));
  }
  return Promise.resolve();
}

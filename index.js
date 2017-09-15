

"use strict";

const slack = require('./tinyspeck.js');

//respond to a pick request
slack.on('/sparkroulette', payload => {
//get the list of members in the channel
let channelRequest = {
  token: process.env.SLACK_TOKEN,
  unfurl_links: true,
  channel: process.env.CHANNEL_ID // 
}  
// pass in the method name to call, so that it will retrieve the information on the channel
slack.send('channels.info', channelRequest).then(res => {
  console.log(res.status);
  console.log(res.data.channel.members);
  //choose the vic... speaker
  var user = res.data.channel.members[Math.floor(Math.random()*res.data.channel.members.length)];
  console.log(user);
  //construct the reply
  let message = {
  unfurl_links: true,
  channel: process.env.CHANNEL_ID,
  response_type: 'in_channel',
  token: process.env.SLACK_BOT_TOKEN,
  text: "For the next Spark, I choose you, <@"+user+">!"
}
  //send the message
  slack.send(payload.response_url, message).then(res => { // on success
            console.log("Response sent to slash command");
          }, reason => { // on failure
            console.log("An error occurred when responding to slash command: " + reason); 
});
  
});
});
slack.listen('3000');

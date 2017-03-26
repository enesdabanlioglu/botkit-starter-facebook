var debug = require('debug')('botkit:incoming_webhooks');

module.exports = function(webserver, controller) {

    debug('Configured POST /facebook/receive url for receiving events');
    webserver.post('/facebook/receive', function(req, res) { console.log(req);

        // NOTE: we should enforce the token check here

        // respond to Slack that the webhook has been received.
        res.status(200);
        res.send('ok');

        var bot = controller.spawn({});

        // Now, pass the webhook into be processed
        //controller.handleWebhookPayload(req, res, bot);

        controller.hears(['keyword','^pattern$'],['message_received'],function(bot,message) {

          // do something to respond to message
          bot.reply(message,'You used a keyword!');

        });

    });

    debug('Configured GET /facebook/receive url for verification');
    webserver.get('/facebook/receive', function(req, res) {
        if (req.query['hub.mode'] == 'subscribe') {
            if (req.query['hub.verify_token'] == controller.config.verify_token) {
                res.send(req.query['hub.challenge']);
            } else {
                res.send('OK');
            }
        }
    });

}

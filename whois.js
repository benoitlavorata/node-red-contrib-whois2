module.exports = function (RED) {

    var handle_error = function (err, node) {
        node.log(err.body);
        node.status({
            fill: "red",
            shape: "dot",
            text: err.message
        });
        node.error(err.message);
    };

    function MyNode(config) {
        const node = this;
        RED.nodes.createNode(node, config);

        const whois = require('whois-json');

        const requiredArgs = ['method', 'args'];
        node.on('input', function (msg) {
            console.log(node);
            node.status({
                fill: "blue",
                shape: "dot",
                text: `Whois ${msg.payload}...`
            });

            msg['_original'] = msg.payload;
            var results = whois(msg.payload)
                .then(data => {
                    node.status({
                        fill: "green",
                        shape: "dot",
                        text: `Success !`
                    });
                    msg.payload = data;
                    node.send(msg);
                }).catch(err => {
                    node.error(err);
                    handle_error(err, node);
                    msg.payload = false;
                    node.send(msg);
                });
        });
    }
    RED.nodes.registerType("whois", MyNode);
};
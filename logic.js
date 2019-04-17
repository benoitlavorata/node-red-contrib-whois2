const whois = require('whois-json');
const onMessage = async (msg) => {
        return whois(msg.payload);
}
module.exports = {
        onMessage: onMessage
}
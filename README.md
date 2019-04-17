# node-red-contrib-whois
Provide a block to perform a whois request, parse the results to JSON.

## Input
Provide the domain name in msg.payload

## Output
The output will return a json document with whois reply or false if an error occured.
var request = require('request');
var querystring = require('querystring');

var contextBrokerRequest = function(method, params, body) {
	request({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: method,
		url: 'http://localhost:1026' + params,
		//url: 'http://fiware.dev:1026' + params,
		//url: 'http://leandroguillen.com:1026' + params,
		body: JSON.stringify(body)
	}, function(error, response, body) {
		console.log(body);
	});
};

var getStatus = function() {
	contextBrokerRequest('GET', '/version');
};

var createEntity = function() {
	var body = {
	    "id": "Bedroom3",
	    "type": "Room",
	    "attributes": [
	        {
	            "name": "Temperature",
	            "type": "float",
	            "value": "35.8"
	        },
	        {
	            "name": "Presence",
	            "type": "boolean",
	            "value": "true"
	        },
	        {
	            "name": "Status",
	            "type": "string",
	            "value": "OK"
	        }
	    ]
	};
	contextBrokerRequest('POST', '/v1/contextEntities', body);
};

var getEntity = function() {
	contextBrokerRequest('GET', '/v1/contextEntities/Bedroom3/attributes/Temperature')
};

var subscribe = function() {
    var body = {
        "entities": [
            {
                "type": "Room",
                "isPattern": false,
                "id": "Bedroom3"
            }
        ],
        "attributes": [
            "temperature"
        ],
        "reference": "http://192.168.1.104:8080/publish",
        "duration": "P1M",
        "notifyConditions": [
            {
                "type": "ONCHANGE",
                "condValues": [
                    "temperature"
                ]
            }
        ],
        "throttling": "PT5S"
    };
    contextBrokerRequest('POST', '/v1/subscribeContext', body);
};

//getStatus();
createEntity();
//getEntity();
//subscribe();
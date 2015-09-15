var request = require('request');
var querystring = require('querystring');

var contextBrokerRequest = function(method, params, body) {
	request({
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: method,
		url: 'http://fiware.dev:1026' + params,
		body: JSON.stringify(body)
	}, function(error, response, body) {
		console.log(body);
	});
}

var getStatus = function() {
	contextBrokerRequest('GET', '/version');
}

var exercise2 = function() {
	var body = {
	    "id": "Bedroom3",
	    "type": "Room",
	    "attributes": [
	        {
	            "name": "Temperature",
	            "type": "float",
	            "value": "22.8"
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

var exercise3 = function() {
	contextBrokerRequest('GET', '/v1/contextEntities/Bedroom3/attributes/Temperature')
}

//getStatus();

//exercise2();

exercise3();
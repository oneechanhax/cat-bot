const token = require('./private.json').token;

const Tail = require('tail').Tail;
const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);

var queue = [];
var stack = [];

const stack_size = 10;
var stack_iterator = 0;

function test_and_set(msg) {
	var j = stack_iterator;
	for (var i = 0; i < 10; i++) {
		if (stack[j] == msg) return false;
		j++;
		if (j >= stack_size) j = 0;
	}
	stack[stack_iterator++] = msg;
	if (stack_iterator >= stack_size) stack_iterator = 0;
	return true;
}

function onLine(data) {
	if (test_and_set(data)) {
		console.log(data);
		queue.push(data);	
	}
}

var muted = {};

client.on('message', (msg) => {
	try {
		if (!msg.member.hasPermission('MANAGE_GUILD')) return;
		if (msg.content.indexOf('$$mute') == 0) {
			var id = msg.content.substr(msg.content.indexOf('[U'));
			console.log('muting', id);
			muted[id] = true;
		}
	} catch (e) {}
});

var nospam = {
	onmessage: function(id) {
		var data = nospam.data;
		console.log(id);
		if (!data[id]) data[id] = { time: 0, infractions: 0, time_infr: 0 };
		if (Date.now() - data[id].time < 1000) {
			console.log('infraction', data[id].infractions, id);
			data[id].time_infr = Date.now();
			data[id].infractions++;
		}
		data[id].time = Date.now();
		if (data[id].infractions > 10) {
			if (Date.now() - data.time_infr < 15000) {
				console.log(id, 'is spamming');
				return true;
			}
		}
		
		data[id].infractions -= (Date.now() - data.time_infr) / 8000;
		if (data[id].infractions < 0) data[id].infractions = 0;
		
		return false;
	},
	data: {}
};


function send() {
	var msg = '.\n';
	if (!queue.length) return;
	while (queue.length) {
		try { 
		var m = queue.shift();
		var id = /(\[U:1:\d+\])/.exec(m)[1];
		if (muted[id]) continue;
		m = m.replace(/([<>_\.])/g, "\\$1");
		msg += m + '\n'
		} catch (e) { console.log('error', e); }
	}
	if (msg == '.\n') return;
	console.log('Sending data: ', msg.length);
	try {
		client.channels.get('341107291417739276').send(msg);
		client.channels.get('341142132544765957').send(msg);
	} catch (e) {}
}

setInterval(send, 10000);

function onError(error) {
	console.log('ERROR:', error);	
}
 
var tails = [];

try {
	for (var i = 1; i < 10; i++) tails[i] = new Tail('/opt/steamapps/common/Team Fortress 2/cathook/chat-catbot-' + i + '.log');
} catch (e) {}
try {
	for (var i = 1; i < 10; i++) tails[i].on('line', onLine);
} catch (e) {}
try {
	for (var i = 1; i < 10; i++) tails[i].on('error', onError);	
} catch (e) {}
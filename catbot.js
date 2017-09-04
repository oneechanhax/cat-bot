const token = require('./private.json').token;
const Discord = require("discord.js");
const bigInt = require("big-integer");

const client = new Discord.Client();







// Used from cats logbot script because it looks nicer
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// Create an event listener for messages
client.on('message', message => {
	
	switch (message.content) {
	case "cat_register": // Command for "cat_register"
			try {
			// Lock command to #register
			if (message.channel.id === '310541030522880010') {

				/*// Send out a message to the user
				message.member.send('By registering for the cathook server, you agree to follow the rules.\nFaliure to do so result in a ban.\nCathook is NOT for the windows operating system.\nRegister with the \"cat_register_me\" command in the private chat.');
				// Send message to channel command was used in
				message.channel.send('Read the direct message to register!');*/
				message.member.send('This command is currently work in progress');
			}
		} catch (e) {console.log("error", e);}
	break;
	case "cat_register_me": // Command for "cat_register"
		try {
			// Prevent command in use in non-pm messages
			if (message.channel.type === 'dm') {

				// 343189976197890049 for registered role

				// Since command was used the correct way, we give the user the registered role
				//message.member
				message.member.send('This command is currently work in progress');

			// If the command was used in a non pm place, we remove it if it was done in register channel
			} else {
				if (message.channel.id === '310541030522880010') {
					
					// Delete the sent message and scold the user
					message.delete().then(msg => message.channel.send('Dont use this command in the register chat!'));

				}
			}
		} catch (e) {console.log("error", e);}
	break;
	case "cat_deboog_role": // Command for "cat_deboog_role"
		try {
			message.channel.send('attempt role');
			message.member.addRole(message.guild.roles.find("name", "Cathook"));
		} catch (e) {console.log("error", e);}
	break;
			
	default: // When no specific command or command with arguments
		
		// Kill person with mentions
		try {
			// get lobby to var
			var messageIndex = message.content.indexOf("cat_mention ");
			if (messageIndex != -1) {
				
			}
		} catch (e) {console.log("error", e);}
			
		// Handle lobby invites
		try {
			// Probs check to prevent crash
			if (message.content.indexOf('.') != 0) {
				// get lobby to var
				var lobby = /\[L:1:(\d+)]/g.exec(message.content);
				if (lobby) {
					var lobbyNumber = new Long(parseInt(lobby[1]), 25559040).toUnsigned().toString();
					RichReply.reply(message, "#3333aa", "Automatically detected lobby", "steam://joinlobby/440/" + "10977524" + lobbyNumber + '\n`connect_lobby ' + lobbyNumber + '`\nOriginal message: **' + message + '**');
				}
			}
		} catch (e) {console.log("error", e);}
	break;
	}
});

// Log our bot in
client.login(token);


	//		var lobbyIndex = message.content.indexOf("[L:1:");
	//		if (lobbyIndex != -1) {

/*class Lobby extends Mod {
    constructor(manager) {
        super(manager, 'lobby', 'Lobby Mod', 'Detects lobby links');
        var that = this;
        this.registerListener('message', (message) => {
            if (message.content.indexOf('.') == 0) return;
            var lobby = /\[L:1:(\d+)]/g.exec(message.content);
            if (lobby) {
                var lobbyl = new Long(parseInt(lobby[1]), 25559040).toUnsigned().toString();
                RichReply.reply(message, '#3333aa', 'Automatically detected lobby', 'steam://joinlobby/440/' + lobbyl + '\n`connect_lobby ' + lobbyl + '`\nOriginal message: **' + message + '**');
            }
        });
    }
}*/




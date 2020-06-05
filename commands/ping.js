//This is a simple ping command, for more info on how to set up new commands, check the templates folder.

const Discord = require('discord.js');


module.exports = {
    config: {
        name: 'ping', 
        aliases: [], 
        disabledInDM: false
    },
    run: (client, message, args) => {
        message.channel.send('Calculating Latency...').then(msg => {
            const e = new Discord.RichEmbed()
            .setColor('RANDOM')
            .addField('Bot Latency', `**${Math.floor(client.ping)}ms**`, true)
            .addField('API Latency', `**${msg.createdTimestamp - message.createdTimestamp}ms**`, true)
    
            msg.edit(e);
        })
    }
}

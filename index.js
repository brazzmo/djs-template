const Discord = require('discord.js');

//Define Client.
const client = new Discord.Client();

//Client Config
client.config = require('./config/config'); //Add all things you need global access to here.
client.log = require('./utility/Logger'); //Used for pretty logging.

//Command Handler: for help creating commands go to /template/templateCommand.js

//Definitions for Commands Handlers
const { readdir } = require('fs');

//Collections (for Command names and aliases)
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

readdir('./commands', (err, files) => {
    if(err) return client.log.error(`Error reading commands directory: ${err.message}`);
    const jsfiles = files.filter(f => f.split('.').pop() === 'js');

    //Log the amount of commands loaded.
    client.log.log(`Loading ${jsfiles.length} commnads.`);


    //Push each command into both collections.
    jsfiles.forEach(file => {
        //Require each command.
        const cmd = require(`./commands/${file}`);

        //Add command to client.commands collection.
        client.commands.set(cmd.config.name, cmd);

        //Add command to client.aliases collection.
        cmd.config.aliases.forEach(command => {
            client.aliases.set(command, cmd.config.name);
        });

        //Log command (for debugging)
        client.log.log(`Command Loaded: ${file}`);
        if(cmd.config.aliases.length > 0) client.log.log(`${cmd.config.name.toUpperCase()}: Aliases Loaded --> ${cmd.config.aliases.map(a => a).join(',')}`)
    })
})
//End of Command Handler.


//Event Handler: for help creating events go to /template/templateEvent.js
readdir(`./events/`, (err, evtFiles) => {
    //Log the amount of events loaded.
    client.log.log(`Loading ${evtFiles.length} events.`);

    evtFiles.forEach(file => {
        if(file.split('.').slice(-1)[0] !== 'js') return;
        

        const evtName = file.split('.')[0];
        const event  = require(`./events/${file}`);

        client.on(evtName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
        client.log.log(`Event Loaded: ${evtName}.js`);
    });
});


//Login the Client.
client.login(/**Token Here */);

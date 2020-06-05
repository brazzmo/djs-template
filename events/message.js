module.exports = async (client, message) => {
    if(message.author.bot) return; //Do nothing if user executing a message is a bot.
    if(client.config.disablePrefixInDMs && message.channel.type === 'dm') client.config.globalPrefix = ''; 
    if(message.content.toLowerCase().startsWith(client.config.globalPrefix)) {
    /**
     * Define content
     */ const content = message.content;

    /**
     * Split Message content into an array
     */ const messageArr = content.split(' ');
     
    /**
     * Define Command 
     */ const command = messageArr[0].slice(client.config.globalPrefix.length);

    /**
     * Define Arguments (for easy usage in commands)
     */ const args = messageArr.slice(1);

    /**
     * Get command file
     */ const cmdFile = client.commands.get(command) || client.commands.get(client.aliases.get(command))
        // If found, run the command file's run() function.
        if(cmdFile) {
            if(cmdFile.config.disabledInDM && message.channel.type === 'dm') return;
            cmdFile.run(client, message, args)
        }
        
    };
};
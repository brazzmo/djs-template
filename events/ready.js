//This is your ready event, for a template to set up other supported discord.js events, check the templates folder.

module.exports = (client) => {
    client.log.log(`${client.user.username} is handling commands for ${client.users.size} users.`);
}
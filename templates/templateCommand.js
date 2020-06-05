//This command is a template.

//Place all required packages here.


module.exports = {
    config: {
        name: 'template', //This is what someone will type after the prefix, ex: ?help where 'help' is the name.
        aliases: [], //An array of strings, this will be alternate names for each command.
        disabledInDM: false,
        //You can add more here to be used with your help command (or elsewhere), only the first 2 are required for command handling.
    },
    run: (client, message, args) => {
        //code here.
    }
}
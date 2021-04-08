const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();

    if(!args[0]) return message.channel.send("Entre un nombre. Ex: \"clear 5\"").then(msg => msg.delete(5000));

    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`${args[0]} messages ont été supprimé.`).then(message => message.delete({timeout:10000}));

    });
}

module.exports.config = {
    name: "clear"
}
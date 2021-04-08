const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const embed = require("./embed.json");
const fs = require('fs');

bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
    if(err) console.log(err)
    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if(jsfile.length <= 0) {
        console.log('[BOT]: Aucune commande trouvée')
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`[BOT]: ${f} Prêt !`)
        bot.commands.set(props.config.name, props)
    })
});

bot.on("ready", async() => {

    console.log(`[BOT]: En ligne !`)

    setInterval(function() {
        bot.user.setPresence({ activity: { name: embed.Activity, type: 'WATCHING'}, status: 'En Ligne' })
    }, 5000);
});

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    let commandFile = bot.commands.get(command.slice(prefix.length))
    if(commandFile) commandFile.run(bot, message, args)
})

bot.login(config.token)
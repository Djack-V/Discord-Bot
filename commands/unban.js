const Discord = require('discord.js')
const config = require('../config.json');
const embed = require("../embed.json");
let prefix = config.prefix

module.exports.run = async(bot,message,args) => {
    message.delete();

    let user = await bot.users.fetch(args[0])

    let UnBanChannel = message.guild.channels.cache.get('789198495965249546'); // ID DU CHANNEL POUR LES LOGS
    if(!UnBanChannel) {
        return message.channel.send('Salon \`logs\` n\'as pas été trouver. Merci d\'en créer un')
    }

    if(message.member.hasPermission("BAN_MEMBERS") || (message.author.id == "469601427560333332")){

        if(message.content.startsWith(`${prefix}unban`)){

            let unbaEmbed = new Discord.MessageEmbed()
            .setColor(embed.Color)
            .setAuthor('Logs :')
            .setDescription("Cet utilisateur n'existe pas.")
            .setFooter(embed.Footer)

            if(!user) return message.channel.send(unbaEmbed).then(message => message.delete({timeout:20000}))

            let unbanEmbed = new Discord.MessageEmbed()
            .setColor(embed.Color)
            .setThumbnail(embed.Thumbnail)
            .setAuthor('Logs :')
            .setDescription(`${message.author.username} a unban ${user}.`)
            .setFooter(embed.Footer)

            if(message.guild.members.unban(user))
            UnBanChannel.send(unbanEmbed)

        }else{
            let unbEmbed = new Discord.MessageEmbed()
            .setColor(embed.Color)
            .setAuthor('Logs :')
            .setDescription(`:9349_nope:  Vous devez avoir la permission de bannir un utilisateur pour utiliser cette commande !`)
            .setFooter(embed.Footer)
            message.channel.send(unbEmbed).then(message => message.delete({timeout:20000}))
        }
    }
}

module.exports.config = {
    name: 'unban'
}
const Discord = require('discord.js');
const embed = require("../embed.json");

module.exports.run = async(bot,message,args) => {
    message.delete();

    let BannedUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!BannedUser) {
        return message.channel.send('L\'utilisateur :' + BannedUser + ' n\'a pas été trouvé')
    }

    let BanReason = args.join(' ').slice(22);
    if(!BanReason) BanReason = 'Aucune raison';

    if(BannedUser.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send('Vous ne pouvez pas ban cette personne !')
    }

    let BanEmbed = new Discord.MessageEmbed()
    .setDescription('Logs :')
    .setColor(embed.Color)
    .setThumbnail(embed.Thumbnail)
    .addField('→ Nom de l\'utilisateur banni :', `${BannedUser} (ID: ${BannedUser.id})`)
    .addField('→ Auteur du bannissement :', `${message.author} (ID: ${message.author.id})`)
    .addField('→ Salon d\'ou la commande à été effectué :', message.channel)
    .addField('→ Raison du bannissement :', BanReason)
    .setFooter(embed.Footer)

    let BanChannel = message.guild.channels.cache.get('789198495965249546');
    if(!BanChannel) {
        return message.channel.send('Salon \`logs\` n\'as pas été trouver. Merci d\'en créer un')
    }

    message.guild.member(BannedUser).ban({reason: BanReason})
    BanChannel.send(BanEmbed)
}

module.exports.config = {
    name: 'ban'
}
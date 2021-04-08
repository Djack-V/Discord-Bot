const Discord = require('discord.js');
const embed = require("../embed.json");

module.exports.run = async(bot,message,args) => {
    message.delete();

    let kickedUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!kickedUser) {
        return message.channel.send('L\'utilisateur :' + kickedUser + ' n\'a pas été trouvé')
    }

    let kickReason = args.join(' ').slice(22);
    if(!kickReason) kickReason = 'Aucune raison';

    if(kickedUser.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send('Vous ne pouvez pas kick cette personne !')
    }

    let kickEmbed = new Discord.MessageEmbed()
    .setDescription('Logs :')
    .setColor(embed.Color)
    .setThumbnail(embed.Thumbnail)
    .addField('→ Nom de l\'utilisateur expulsé :', `${kickedUser} (ID: ${kickedUser.id})`)
    .addField('→ Auteur de l\'expulsion :', `${message.author} (ID: ${message.author.id})`)
    .addField('→ Salon d\'ou la commande à été effectué :', message.channel)
    .addField('→ Raison de l\'expulsion :', kickReason)
    .setFooter(embed.Footer)

    let kickChannel = message.guild.channels.cache.get('789198495965249546');
    if(!kickChannel) {
        return message.channel.send('Salon \`logs\` n\'as pas été trouver. Merci d\'en créer un')
    }

    message.guild.member(kickedUser).kick(kickReason)
    kickChannel.send(kickEmbed)
}

module.exports.config = {
    name: 'kick'
}
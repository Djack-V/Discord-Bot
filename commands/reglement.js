const Discord = require('discord.js');
const embed = require("../embed.json");

module.exports.run = async(bot,message,args) => {
    message.delete();

    let ReglementEmbed = new Discord.MessageEmbed()
    .setColor(embed. Color)
    .setAuthor('Règlement Discord :')
    .setDescription('Toutes les règles doivent obligatoirement être lues')
    .setThumbnail(embed.Thumbnail)
    .addField('→ Règle n° 1:', 'Nous vous rappelons que le serveur est fréquenté par des mineurs, Merci de ne pas les exposer à des liens ou des remarques qui pourraient les affecter.')
    .addField('→ Règle n° 2:', 'Tous propos à caractère raciste, homophobe, sexiste et autres forme de discrimination est interdite sur ce discord.')
    .addField('→ Règle n° 3:', 'Il est interdit de partager des informations personnelles d\'une tiers personne sans autorisation de cette dernière.')
    .addField('→ Règle n° 4:', 'Le spam soundboard est autorisé a conditions que toutes les personne dans le vocal soient d\'accord avec cela.')
    .setFooter(embed.Footer)

    message.channel.send(ReglementEmbed)

}

module.exports.config = {
    name: 'reglement'
}
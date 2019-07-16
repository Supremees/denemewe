const Discord = require('discord.js');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username} `, client.user.avatarURL)
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Nsfw Komutları`)
    .addField('!!nsfw-gif', '+18 gif atar.')
    .addField('!!pgif', ' 4K görüntüsünde +18 gif atar.')
    .setThumbnail(client.user.avatarURL)
   .addField(`» Linkler`, `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=594186331907948563&scope=bot&permissions=2146958847) **|** [Destek Sunucusu](https://discord.gg/BAĞLANTI)`)
    .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'nsfw',
  description: '',
  usage: ''
};
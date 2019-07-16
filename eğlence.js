const Discord = require('discord.js');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Eğlence Komutları`)
    .addField('!!1vs1', 'Bir kullanıcıyıla vs atarsanız.')
    .addField('!!boks-makinesi', 'Boks makinesine vurursunuz ne kadar vurdğunuzu söyler.')
    .addField('!!ezhel', 'Ezhel fotoğrafları at.')
    .addField('!!fenerbahçe', 'Fotoğrafınıza fenerbahçe efekti ekler.')
    .addField('!!film', 'Aradığınız filmi bulmanızı sağlar.')
    .addField('!!galatasaray', 'Fotoğrafınıza galatasaray efekti ekler.')
    .addField('!!slots', 'Slot oynarsınız.')
    .addField('!!pixel', 'Fotoğrafınıza pixel uygular.')
    .addField('!!wasted', 'Waster gif atar.')
    .addField('!!soru-sor', 'Bota soru sorarsınız.')
    .addField(`» Linkler`, `[Bot Davet Linki](https://discordapp.com/oauth2/authorize?client_id=594186331907948563&scope=bot&permissions=2146958847) **|** [Destek Sunucusu](https://discord.gg/BAĞLANTI)`)
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'eğlence',
  description: '',
  usage: ''
};
   
const Discord = require('discord.js');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Müzik Komutları`)
    .addField('!!çal', 'Bota şarkı ismini söylersiniz ve listeden numaraya göre seçersiniz.')
    .addField('!!gir', 'Botun ses kanalına girmesini sağlar.')
    .addField('!!geç', 'Kuyrukta olan diğer şarkıya geçer.')
    .addField('!!durdur', 'Oynatılan şarkıyı durdurur.')
    .addField('!!ses', 'Botun sesini arttırırsınız.')
    .addField('!!çalan', 'Çalınan şarkıyı size söyler.')
    .addField('!!duraklat', 'Oynatılan şarkıyı duraklatır.')
    .addField('!!devam', 'Duraklatılan şarkıyı devam ettirir.')
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
  name: 'müzik',
  description: '',
  usage: ''
};
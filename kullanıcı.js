const Discord = require('discord.js');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Kullanıcı Komutları`)
    .addField('!!bug-bildir', 'Botun yapımcısına botta oluşan bugları bildirirsiniz. (Gereksiz yere kullanmayın)')
    .addField('!!canlıdestek', 'Yetkili birisi sizinle ilgilenir.')
    .addField('!!çevir', 'Bir yazı yazarsınız ve bu yazıyı başka dile çevirirsiniz.')
    .addField('!!avatar', 'Profil fotoğrafınızı gösterir.')
    .addField('!!kullanıcı-bilgi', 'Bir kullanıcının yada kendinizin bilgilerini gösterir.')
    .addField('!!rastgele-şifre', 'Size rastgele bir şifre verir.')
    .addField('!!icon', 'Sunucunun iconunu size gösterir.')
    .addField('!!rol-bilgi', 'Belirlediğiniz rol hakkında bilgi verir.')
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
  name: 'kullanıcı',
  description: '',
  usage: ''
};
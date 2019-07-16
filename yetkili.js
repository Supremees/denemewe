const Discord = require('discord.js');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username}  Yetkili Komutları `)
    .addField('!!ban', 'Bir kullanıcıyı banlarsınız.')
    .addField('!!banlananlar-listesi', 'Banlanan kullanıcıları liste halinde söyler.')
    .addField('!!emoji-yükle', 'Sunucunuza emoji eklersiniz')
    .addField('!!girişçıkışayarla', 'Girişleri ve çıkışları ayarlamanızı sağlar.')
    .addField('!isimdeğiştir', 'Kendinizin veya bir kullanıcının ismini değiştirirsiniz.')
    .addField('!!kanalaçıklama', 'Bulunduğunuz kanala açıklama eklersiniz.')
    .addField('!!yaz', 'Bota birşey yazdırırsınız.')
    .addField('!!küfür-engelle', 'Sunucunuzda küfürleri açıp kapatabilirsiniz.')
    .addField('!!link-engelle', 'Sunucunuzda reklam atmayı açıp kapatabilirsiniz.')
    .addField('!!metin-kanal-aç', 'Metin kanalı oluşturursunuz')
    .addField('!!mute', 'Bir kullanıcıyı susturursunuz.')
    .addField('!!prefixayarla', 'Botun prefixini değiştirirsiniz kendinize göre ayarlarsınız.')
    .addField('!reklam-taraması', 'Kullanıcıların oynuyor kısmı ve ismindeki reklamları inceleyip size söyler.')
    .addField('!!ses-kanal-aç', 'Ses kanalı oluşturursunuz.')
    .addField('!!dmduyuru', 'Sunucudaki herkese özelden mesaj atarsınız.')
    .addField('!!otorol-aç', 'Kullanıcılara otorol verir.')
    .addField('!!otorol-kapat', 'Kullanıcılara otorol vermeyi kapatır.')
    .addField('!!otorol-yazı-kapat', 'Otorol verirken verilen mesajı kapatmanızı sağlar.')
    .addField('!!oy-kick', 'Oylamayla bir kullanıcıyı sunucudan atabilirsiniz.')
    .addField('!!sayaç-ayarla', 'Belirlediğiniz kanala sayaç ayarlarsınız')
    .addField('!!sayaç-sıfırla', 'Sayaç ayarını kapatabilirsiniz.')
    .addField('!!slowmode', 'Bulunduğunuz kanala belli aralıklara mesaj atmalarını sağlar.')
    .addField('!!sunucu-tanıt', 'Botun support sunucusuna reklam gönderirsiniz.')
    .addField('!!sureli-mute', 'Belirlediğiniz süre boyunca bir kullanıcı o zaman içerisinde susturulur.')
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
  name: 'yetkili',
  description: '',
  usage: ''
};
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    if(!args[0]) return message.channel.send("Film ara!")
    require("request")(`https://acarla.glitch.me/api/film?ara=${args.join(" ")}&key=envycode`, function(x, y, body) {
        var veri = JSON.parse(body)
        if(veri.hata) return message.channel.send(veri.hata)
        var embed = new Discord.RichEmbed()
            .addField("İsim", `[${veri.isim}](${veri.link})`)
            .addField("Çıkış tarihi", veri.çıkış)
            .addField("Ülke", veri.ülke)
            .addField("Kategoriler", veri.kategoriler.join(", "))
            .addField("Açıklama", veri.açıklama)
            .addField("Süre", veri.süre)
        message.channel.send(embed)
    })
}

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'film', 
  description: 'Film ararsanız.',
  usage: 'film [film ismi]'
};
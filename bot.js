const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const eco = require('discord-economy');
let kufurEngel = JSON.parse(fs.readFileSync("./jsonlar/kufurEngelle.json", "utf8"));
let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8")); 
let linkEngel = JSON.parse(fs.readFileSync("././jsonlar/linkEngelle.json", "utf8"));
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
}); 

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm selam,  hoş geldin ^^');
  }
});


client.on("message", msg => {
  if (!msg.guild) return;
  if (!kufurEngel[msg.guild.id]) return;
  if (kufurEngel[msg.guild.id].küfürEngel === 'kapali') return;
    if (kufurEngel[msg.guild.id].küfürEngel=== 'acik') {
      const kufur = ["mk", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git"];
  if (kufur.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.reply("Bu sunucuda küfürler **Asistan** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!").then(message => message.delete(3000));
    }
}
    }
});

    client.on(`guildMemberAdd`, async member => {
      const e = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setImage(`https://media.giphy.com/media/PjBhcOypzsTRfv7bKr/giphy.gif`)
        .addField(`Sunucumuza geldiğin için teşekkür ederim!`, `Asistan iyi eğlenceler diler`)
        .addField(`Davet Linkleri;`, `[Botu Sunucuna Eklemek için Tıkla](BOT DAVET)\n[Botun Destek Sunucusu](DESTEK)`)
        .setFooter(`Bu Sunucu 7/24 Asistan tarafından korunuyor.`)
      member.send(e);
    });

    const settings = {
      prefix: '.',
      token: '',
      admin:["338316550442450954"]
    }
         
     
    client.on("message", async message => {
      let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
      if(sayac[message.guild.id]) {
          if(sayac[message.guild.id].sayi <= message.guild.members.size) {
              const embed = new Discord.RichEmbed()
                  .setDescription(`Tebrikler, başarılı bir şekilde ${sayac[message.guild.id].sayi} kullanıcıya ulaştık!`)
                  .setColor("0x808080")
                  .setTimestamp()
              message.channel.send({embed})
              delete sayac[message.guild.id].sayi;
              delete sayac[message.guild.id];
              fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                  console.log(err)
              })
          }
      }
  })
  client.on("guildMemberRemove", async member => {
          let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
    let embed = new Discord.RichEmbed()
      .setTitle('')
      .setDescription(``)
   .setColor("RED")
      .setFooter("", client.user.avatarURL);
   
    if (!giriscikis[member.guild.id].kanal) {
      return;
    }
   
    try {
      let giriscikiskanalID = giriscikis[member.guild.id].kanal;
      let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
      giriscikiskanali.send(`:loudspeaker: ${member.user.tag}, aramızdan ayrıldı, \**${sayac[member.guild.id].sayi}\** kişi olmamıza \**${sayac[member.guild.id].sayi - member.guild.memberCount}\** kişi kaldı!`);
    } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
      return console.log(e)
    }
   
  });
  client.on("guildMemberAdd", async member => {
          let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
    let embed = new Discord.RichEmbed()
      .setTitle('')
      .setDescription(``)
   .setColor("GREEN")
      .setFooter("", client.user.avatarURL);
   
    if (!giriscikis[member.guild.id].kanal) {
      return;
    }
   
    try {
      let giriscikiskanalID = giriscikis[member.guild.id].kanal;
      let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
      giriscikiskanali.send(`:loudspeaker: ${member.user.tag}, aramıza katıldı **${sayac[member.guild.id].sayi}** kişi olmamıza **${sayac[member.guild.id].sayi - member.guild.memberCount}** kişi kaldı!` );
    } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
      return console.log(e)
    }
   
  });

  client.on("guildMemberAdd", async member => {
    let sayac = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
let otorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let arole = otorole[member.guild.id].sayi
let giriscikis = JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
let embed = new Discord.RichEmbed()
.setTitle('Otorol Sistemi')
.setDescription(`:loudspeaker: :inbox_tray:  @${member.user.tag}'a Otorol Verildi `)
.setColor("GREEN")
.setFooter("Harmony ", client.user.avatarURL);

if (!giriscikis[member.guild.id].kanal) {
return;
}

try {
let giriscikiskanalID = giriscikis[member.guild.id].kanal;
let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
giriscikiskanali.send(`:loudspeaker: :white_check_mark: Hoşgeldin **${member.user.tag}** Rolün Başarıyla Verildi.`);
} catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
return console.log(e)
}

});

client.on("guildMemberAdd", async (member) => {
  let autorole =  JSON.parse(fs.readFileSync("./otorol.json", "utf8"));
  let role = autorole[member.guild.id].sayi

  member.addRole(role)
});


  
  client.on('guildCreate', guild => {
  
  let rrrsembed = new Discord.RichEmbed()
  
  .setColor("GREEN")
  .setTitle(" Bot Eklendi ")
  .addField("Sunucu Adı:", guild.name)
  .addField("Sunucu sahibi", guild.owner)
  .addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
  .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
  .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)
  
     client.channels.get('Kanalİd').send(rrrsembed);
    
  });
  
  client.on('guildDelete', guild => {

let rrrsembed = new Discord.RichEmbed()

.setColor("RED")
.setTitle(" Bot Kickledi ")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin ID'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.get('Kanalİd').send(rrrsembed);
  
});


  client.on('message', async message => {
    const ms = require('ms');
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let u = message.mentions.users.first() || message.author;
    if (command === "bot-paneli ") {
    if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
    message.channel.send(`Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
        if (!message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
        message.channel.awaitMessages(response => response.content === 'evet', {
          max: 1,
          time: 10000,
          errors: ['time'],
        })
      .then((collected) => {
     message.guild.createChannel('Bot Kullanımı', 'category', [{
    id: message.guild.id,
    deny: ['CONNECT']
  }])
  
  
  
          
   message.guild.createChannel(`Bellek Kullanımı: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, 'voice', [{
    id: message.guild.id,
    deny: ['CONNECT']
  }])
  .then(channel =>
   channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
   message.guild.createChannel(`Sunucular: ${client.guilds.size.toLocaleString()}`, 'voice', [{
    id: message.guild.id,
    deny: ['CONNECT']
  }])
  .then(channel =>
         channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
         message.guild.createChannel(`Toplam Kanal: ${client.channels.size.toLocaleString()}`, 'voice', [{
          id: message.guild.id,
          deny: ['CONNECT']
        }])
  .then(channel =>
               channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
               message.guild.createChannel(`Ping: ${client.ping}`, 'voice', [{
                id: message.guild.id,
                deny: ['CONNECT']
              }])
              .then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
              message.guild.createChannel('Yapımcım: Elwasy', 'voice', [{
                id: message.guild.id,
                deny: ['CONNECT']
              }])
              .then(channel =>
                channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
               message.guild.createChannel(`Kütüphanesi: Discord.js`, 'voice')
              
  .then(channel =>
   channel.setParent(message.guild.channels.find(channel => channel.name === "Bot Kullanımı")));
          message.channel.send('Bot Bilgi Panelini Oluşturdum');
                   })   
      
  }
  });

     
client.on("message", msg => { 
  if (!linkEngel[msg.guild.id]) return;
  if (linkEngel[msg.guild.id].linkEngel === "kapali") return;
      if (linkEngel[msg.guild.id].linkEngel === "acik") {
      var regex = new RegExp(/(discord.gg|http|.gg|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/)
      if (regex.test(msg.content)== true) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete()
         msg.channel.send(`<@${msg.author.id}>`).then(message => message.delete(5000));
          var e = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("Link Engeli!")
          .setDescription(`Bu sunucuda linkler **${client.user.username}** tarafından engellenmektedir! Link atmana izin vermeyeceğim!`)
          msg.channel.send(e).then(message => message.delete(5000));
      }
  }
      }
  });

  const YouTube = require('simple-youtube-api');
  const ytdl = require('ytdl-core');
  const youtube = new YouTube('AIzaSyCkT_L10rO_NixDHNjoAixUu45TVt0ES-s');
  const queue = new Map();
  
  client.on('message', async msg => {
  
    if (msg.author.bot) return undefined;
  
    const args = msg.content.split(' ');
    const searchString = args.slice(1).join(' ');
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);
    let command = msg.content.toLowerCase().split(' ')[0];
  
    if (command === '!!çal') {
      const voiceChannel = msg.member.voiceChannel;
      if (!voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
        .setColor('RANDOM')
      .setDescription('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
      const permissions = voiceChannel.permissionsFor(msg.client.user);
      if (!permissions.has('CONNECT')) {
        return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
      }
      if (!permissions.has('SPEAK')) {
         return msg.channel.sendEmbed(new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('❎ | Şarkıyı Çalamıyorum Bu Kanalda Konuşma Yetkim Yok!'));
          }
  
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
        const playlist = await youtube.getPlaylist(url);
        const videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
          const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
          await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
        }
         return msg.channel.sendEmbed(new Discord.RichEmbed)
        .setTitle(`✅** | **${playlist.title}** Adlı Şarkı Kuyruğa Eklendi!**`)
      } else {
        try {
          var video = await youtube.getVideo(url);
        } catch (error) {
          try {
            var videos = await youtube.searchVideos(searchString, 10);
            let index = 0;
            
           msg.channel.sendEmbed(new Discord.RichEmbed()                  
           .setTitle('Şarkı Seçimi')
           .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
           .setFooter('Lütfen 1-10 Arasında Bir Rakam Seçiniz 10 Saniye İçinde Liste İptal Edilecektir!')
     .setFooter('Örnek Kullanım 1')
           .setColor('0x36393E'));
            msg.delete(5000)
            try {
              var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                maxMatches: 1,
                time: 10000,
                errors: ['time']
              });
            } catch (err) {
              console.error(err);
               return msg.channel.sendEmbed(new Discord.RichEmbed()
              .setColor('0x36393E')
              .setDescription('❎ | **10 Saniye İçinde Şarkı Seçmediğiniz İçin seçim İptal Edilmiştir!**.'));
                      }
            const videoIndex = parseInt(response.first().content);
            var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
          } catch (err) {
            console.error(err);
            return msg.channel.sendEmbed(new Discord.RichEmbed()
            .setColor('0x36393E')
            .setDescription('❎ | YouTubede Böyle Bir Şarkı Yok !**'));
                  }
              }
        return handleVideo(video, msg, voiceChannel);
        
      }
    } else if (command === '!!gir') {
      return new Promise((resolve, reject) => {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('Kanalda Kimse Olmadığından Çıkıyorum!');
        voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
      });
    } else if (command === '!!geç') {
      if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
      if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
       .setColor('RANDOM')
       .setTitle('❎ **Şu An Zaten Şarkı Çalmıyorum!'));                                              
      serverQueue.connection.dispatcher.end('**Sıradaki Şarkıya Geçildi!**');
      return undefined;
    } else if (command === '!!durdur') {
      if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
      if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
       .setColor('RANDOM')
       .setTitle('❎ | Şu An Zaten Şarkı Çalmıyorum!'));                                              
      msg.channel.send(`:stop_button: **${serverQueue.songs[0].title}** Adlı Şarkı Durduruldu`);
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end('**Şarkı Bitti**');
      return undefined;
    } else if (command === '!!ses') {
      if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
      if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
       .setColor('RANDOM')
       .setTitle('❎ | Çalmayan Müziğin Sesine Bakamam'));                                              
      if (!args[1]) return msg.channel.sendEmbed(new Discord.RichEmbed()
     .setTitle(`:loud_sound: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
      .setColor('RANDOM'))
      serverQueue.volume = args[1];
      serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`:loud_sound: Ses Seviyesi Ayarlanıyor: **${args[1]}**`)
      .setColor('RANDOM'));                             
    } else if (command === '!!çalan') {
      if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle("❎ | Şu An Şarkı Çalınmıyor!")
      .setColor('RANDOM'));
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle("Çalan")                            
      .addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
      .addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
    } else if (command === 'sıra') {
      let index = 0;
      if (!serverQueue) return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle("❎ | **Şarkı Kuyruğunda Şarkı Bulunmamakta**")
      .setColor('RANDOM'));
        return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setColor('RANDOM')
       .setTitle('Şarkı Kuyruğu')
      .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`))
      .addField('Şu Anda Çalınan: ' + `${serverQueue.songs[0].title}`);
    } else if (command === '!!duraklat') {
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return msg.channel.sendEmbed(new Discord.RichEmbed()
        .setTitle("**:pause_button: Şarkı Durduruldu!**")
        .setColor('RANDOM'));
      }
      return msg.channel.send('❎ | **Şarkı Çalmıyor Şu An**');
    } else if (command === '!!devam') {
      if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return msg.channel.sendEmbed(new Discord.RichEmbed()
        .setTitle("**:arrow_forward: Şarkı Devam Ediyor!**")
        .setColor('RANDOM'));
      }
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle("**❎ | Şu An Şarkı Çalınmıyor!**")
      .setColor('RANDOM'));
    }
    
  
    return undefined;
  });
  
  async function handleVideo(video, msg, voiceChannel, playlist = false) {
      const serverQueue = queue.get(msg.guild.id);
      console.log(video);
      const song = {
          id: video.id,
          title: video.title,
          url: `https://www.youtube.com/watch?v=${video.id}`,
      durationh: video.duration.hours,
      durationm: video.duration.minutes,
          durations: video.duration.seconds,
      views: video.views,
      };
    if (!serverQueue) {
      const queueConstruct = {
        textChannel: msg.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };
      queue.set(msg.guild.id, queueConstruct);
  
      queueConstruct.songs.push(song);
  
      try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        play(msg.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.error(`❎ | **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`);
        queue.delete(msg.guild.id);
        return msg.channel.sendEmbed(new Discord.RichEmbed()
        .setTitle(`❎ | **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`)
        .setColor('RANDOM'))
      }
    } else {
      serverQueue.songs.push(song);
      console.log(serverQueue.songs);
      if (playlist) return undefined;
      return msg.channel.sendEmbed(new Discord.RichEmbed()
      .setTitle(`✅ | **${song.title}** Adlı Şarkı Kuyruğa Eklendi!`)
      .setColor('RANDOM'))
    }
    return undefined;
  }
  
  function play(guild, song) {
    const serverQueue = queue.get(guild.id);
  
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
    console.log(serverQueue.songs);
  
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
      .on('end', reason => {
        if (reason === '❎ | **Yayın Akış Hızı Yeterli Değil.**') console.log('Şarkı Bitti.');
        else console.log(reason);
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  
     serverQueue.textChannel.sendEmbed(new Discord.RichEmbed()                                   
    .setTitle("**🎙 Şarkı Başladı**",`https://i.hizliresim.com/RDm4EZ.png`)
    .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
    .addField('\nBaşlık', `[${song.title}](${song.url})`, true)
    .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
    .addField("Süre", `${song.durationm}:${song.durations}`, true)
    .setColor('RANDOM'));
  }



client.on("message", message => {
  const dmchannel = client.channels.find("name", "dm-log");
  if (message.channel.type === "dm") {
      if (message.author.bot) return;
      dmchannel.sendMessage("", {embed: {
          color: 3447003,
          title: `Gönderen: ${message.author.tag}`,
          description: `Bota Özelden Gönderilen DM: ${message.content}`
      }})
  }
});

 

client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    await msg.react('🇦');
    msg.react('🇸');
  }
  });



client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

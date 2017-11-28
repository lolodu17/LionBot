const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyBw5BUPpm2E4HxIS8lXUzS6SfdBOH_07SE");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args, func) => {
        const arg = message.content.split(' ');
        const searchString = arg.slice(1).join(' ');
        if(!searchString) return message.channel.send("Please provide a search term.").then(m=>m.react("❌"));
        const url = arg[0] ? arg[0].replace(/<(.+)>/g, '$1') : '';
        const voiceChannel = message.member.voiceChannel;
        if(!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
        const perms = voiceChannel.permissionsFor(message.client.user);
        if(!perms.has("CONNECT")) {
            return message.channel.send("I cannot connect to your voiceChannel, make sure i have the correct permissions");
        }
        if(!perms.has("SPEAK")) {
            return message.channel.send("I cannot speak in your voiceChannel, make sure i have the correct permissions");
        }
        if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, bot, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
        } else {
            try {
                const video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    var em = new Discord.RichEmbed();
                    let num=0;
                    em.setColor(0xd6a67a);
                    em.setDescription(`Song Selection\n\n${videos.map(v=>`**${++num}:** ${v.title}`).join('\n')}\n\n\nPlease Provide a number between 1-10`);
                    message.channel.send(em);
                    try {
                        var response = await message.channel.awaitMessages(msg=>msg.content > 0 && msg.content < 11, {
                           maxMatches: 1,
                           time: 10000,
                           errors: ['time'] 
                        });
                    } catch (err) {
                        message.channel.send("No value was entered. Canceling video selection.");
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (e) {
                    return message.channel.send("I cannot find the video your looking for");
                }
            }
            return handleVideo(video, message, voiceChannel, bot);
        }
        return undefined;
}

function play(guild, song, bot, message) {
    const serverQueue = bot.queue.get(guild.id);
    if(!song) {
        return bot.queue.delete(guild.id);
    }
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url), { filter: "audioonly" });
    dispatcher.on("end", () => {
        serverQueue.songs.shift();
        setTimeout(() => {
            play(guild, serverQueue.songs[0], bot, message);
        }, 250);
    });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    message.channel.send(`Started playing **${serverQueue.songs[0].title}**`);
}

async function handleVideo(video, message, voiceChannel, bot, playlist = false) {
    const serverQueue = bot.queue.get(message.guild.id);
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
    };
    if(!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 2,
            playing: true
        };

        bot.queue.set(message.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0], bot, message);
        } catch (error) {
            message.channel.send(error.stack);
        }
    } else {
        serverQueue.songs.push(song);
        if(playlist) return undefined;
        else return message.channel.send(`**${song.title}** has been added to the queue`);
    }
    return undefined;
}

module.exports.config = {
    command: "play"
}
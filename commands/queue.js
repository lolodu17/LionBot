module.exports.run = async (bot, message, args, func) => {
    var sn = 0;
    message.channel.send(`
**Song Queue:**

${bot.serverQueue.songs.map(s=> `**${++sn}:** ${s.title}`).join("\n")}

**Now Playing:** ${bot.serverQueue.songs[0].title}
    `);
}
    
module.exports.config = {
    command: "queue"
}
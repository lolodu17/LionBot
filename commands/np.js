module.exports.run = async (bot, message, args, func) => {
    if(!bot.serverQueue) return messsage.channel.send("Nothing is playing");
    else message.channel.send(`**${message.author.username}** I am playing ${bot.serverQueue.songs[0].title}`);
}

module.exports.config = {
    command: "np"
}
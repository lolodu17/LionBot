module.exports.run = async (bot, message, args, func) => {
    if(bot.serverQueue && bot.serverQueue.playing) {
        bot.serverQueue.connection.dispatcher.pause();
        bot.serverQueue.playing = false;
        return message.channel.send("Paused the music for you");
    }
    return message.channel.send("Nothing to play /shrug");
}

module.exports.config = {
    command: "pause"
}
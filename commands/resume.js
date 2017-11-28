module.exports.run = async (bot, message, args, func) => {
    if(bot.serverQueue && !bot.serverQueue.playing) {
        bot.serverQueue.connection.dispatcher.resume();
        bot.serverQueue.playing = true;
        return message.channel.send("Resumed the music for you");
    }
    return message.channel.send("Nothing to play /shrug");
}
    
module.exports.config = {
    command: "resume"
}
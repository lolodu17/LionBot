module.exports.run = async(bot, message, args, func) => {
    if(!bot.serverQueue) return message.channel.send("There is nothing in queue");
    else {
        try {
            bot.serverQueue.voiceChannel.leave();
            bot.queue.delete(message.guild.id);
            message.channel.send("Stopped music and deleted queue");
        } catch (error) {
            message.channel.send(error.stack);
        }
    }
}

module.exports.config = {
    command: "stop"
}
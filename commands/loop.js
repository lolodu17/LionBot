module.exports.run = async(bot, message, args, func) => {
    if(!bot.serverQueue || !message.member.voiceChannel) return message.channel.send("You must be in a voiceChannel. `CHANNEL_USER_ERR`");
    if(bot.serverQueue.loop === true) {
        bot.serverQueue.loop === false;
        func.embed(message.channel, "I've disabled loopmode");
    } else {
        bot.serverQueue.loop === true;
        func.embed(message.channel, "I've enabled loopmode");
    }
}

module.exports.config = {
    command: 'loop'
}
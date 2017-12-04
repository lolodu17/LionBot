module.exports.run = async(bot, message, args, func) => {
    const serverQueue = bot.queue.get(message.guild.id);
    if(!serverQueue || !message.member.voiceChannel) return message.channel.send("You must be in a voiceChannel. `CHANNEL_USER_ERR`. Or nothing is playing `NO_QUEUED_SONGS`");
    if(bot.serverQueue.loop == false) {
        serverQueue.loop == true;
        func.embed(message.channel, "I've enabled loopmode");
    } else {
        serverQueue.loop == false;
        func.embed(message.channel, "I've disabled loopmode");
    }
}

module.exports.config = {
    command: 'loop'
}
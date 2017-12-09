module.exports.run = async(bot, message, args, func) => {
    const serverQueue = bot.queue.get(message.guild.id);
    if(!serverQueue || !message.member.voiceChannel) return message.channel.send("You must be in a voiceChannel. `CHANNEL_USER_ERR`. Or nothing is playing `NO_QUEUED_SONGS`");
    if(serverQueue.loop) {
        func.embed(message.channel, "**Music Queue**\n\nI've enabled loopmode");
        serverQueue.loop == true;
    } else {
        func.embed(message.channel, "**Music Queue**\n\nI've disabled loopmode");
        serverQueue.loop == false;
    }
}

module.exports.config = {
    command: 'loop'
}
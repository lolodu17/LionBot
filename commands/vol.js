module.exports.run = async (bot, message, args, func) => {
    let num = args.join(" ");
    if(!bot.serverQueue) return message.channel.send("Nothing is playing");
    if(!num) return message.channel.send("My current volume is: **" + bot.serverQueue.volume + "**");
    bot.serverQueue.volume = num;
    bot.serverQueue.connection.dispatcher.setVolumeLogarithmic(num / 5);
    message.channel.send(`I've set the volume to **${num}**`);
    return undefined;
}
    
module.exports.config = {
    command: "vol"
}
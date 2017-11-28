module.exports.run = async (bot, message, args, func) => {
    if(!bot.serverQueue) return;
    else bot.serverQueue.connection.dispatcher.end();
    message.channel.send("Song Skipped");
}
    
module.exports.config = {
    command: "skip"
}
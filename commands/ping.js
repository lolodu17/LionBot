exports.run = (bot, message, args, func) => {
    message.channel.send("Pong! " + bot.ping.toFixed() + "ms");
}

module.exports.config = {
    command: "ping"
}
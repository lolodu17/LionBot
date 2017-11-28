const db = require("quick.db");

module.exports.run = async(bot, message, args, func) => {
    if(!args[0]) return message.channel.send("Please provide a prefix to set");
    if(message.member.hasPermission("ADMINISTRATOR")) return;
    db.updateText(`guildPrefix_${message.guild.id}`, args.join().trim()).then(i => {
        message.channel.send("Updated prefix to **" + i.text + "**");
    });
}

module.exports.config = {
    command: "prefix"
}
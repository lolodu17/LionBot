const Discord = require("discord.js");

module.exports.run = async (bot, message, args, func) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.sendMessage("Permission Needed : MANAGE_MESSAGES")
      } else {
        const params = message.content.split(' ').slice(1);
        let count = parseInt(params[0]);
        message.channel.bulkDelete(count);
        message.channel.send(":white_check_mark: Purged " + count + " messages").then(m=>m.delete(2000));
      }
}

module.exports.config = {
    command: "purge"
}
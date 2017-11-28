const Discord = require("discord.js");

module.exports.run = async (bot, message, args, func) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
        return;
      } else {
        let banMember = message.guild.member(message.mentions.users.first());
        if (!banMember) {
            var error2 = new Discord.RichEmbed()
            .setColor(0xff0000)
            .addField("Error", "Mention a user to ban.");
            message.channel.send(error2);
        } else {
            banMember.ban("Banned by cheesebot");
            return message.channel.send("Alright ive banned **" + banMember + "**");
        }
      }
}

module.exports.config = {
    command: "ban"
}
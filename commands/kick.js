const Discord = require("discord.js");

module.exports.run = async (bot, message, args, func) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) {
       return;
      } else {
        let kickMember = message.guild.member(message.mentions.users.first());
        if (!kickMember) {
            var error2 = new Discord.RichEmbed()
            .setColor(0xff0000)
            .addField("Error", "Mention a user to kick.")
            message.channel.send(error2);
        } else {
            kickMember.kick();
            return message.channel.send("Alright ive kicked **" + kickMember + "**");
        }
      }
}

module.exports.config = {
    command: "kick"
}
const Discord = require("discord.js");

module.exports.run = async (bot, message, args, func) => {
        if(message.author.id !== "302604426781261824") return;
        try {
          const code = args.join(" ");
          let evaled = eval(code);
    
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
            message.channel.send("Output\n\n`" + '```xl\n' + clean(evaled) + "```\n\nType `" + typeof evaled + "`");
        } catch (err) {
            message.channel.send("ERROR \n\n" + "```xl\n" + clean(err) + "```");
        }
}

module.exports.config = {
    command: "eval"
}

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
const Discord = require("discord.js");
const fs = require("fs");
const func = require(__dirname + "/functions.js");
const bot = new Discord.Client();
const db = require("quick.db");
// message.guild.channels.filter(f=>f.type === "text").size

bot.on("guildCreate", server => {
        var serverb = new Discord.RichEmbed();
        serverb.setTitle(":ballot_box_with_check: New server Joined");
        serverb.setColor(0xd6a67a);
        serverb.addField("Server", `${server.name}(${server.id})`);
        serverb.addField("Info", `Info: The server has a total of **${server.channels.size}** Channels with **${server.channels.filter(c => c.type === "text").size}** Text Channels being text, and the other being **${server.channels.filter(c => c.type === "voice").size}** Voice Channels.`);
        serverb.addField("Large server", `${server.memberCount > 100}`);
        serverb.addField("Users", `${server.memberCount}`);
        serverb.addField("Creation", `${server.createdAt}`);
        bot.channels.get("380203802067861514").send(serverb);
        bot.channels.get("380203802067861514").send("I am now in " + bot.guilds.size);
        bot.user.setGame(`with ${bot.guilds.size} Servers. | -help`);
});

bot.on("guildDelete", server => {
        var serverb = new Discord.RichEmbed();
        bot.channels.get("380203802067861514").send("Left server! " + server.name);
        bot.channels.get("380203802067861514").send("I am now in " + bot.guilds.size);
        bot.user.setGame(`with ${bot.guilds.size} Servers. | -help`);
});

bot.login(process.env.TOKEN);

bot.queue = new Map();

bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => { // This reads the directory of the commands folder.
    if(err) console.error(err); // This, sends an error message if it gets an error calling the commands,
    var jsfiles = files.filter(f => f.split('.').pop() === 'js'); // This checks if the file extension is 'js', or the text after the . is 'js'.
    if (jsfiles.length <= 0) { return console.log('No commands found...')} // This returns & sends to the console that no commands were found in the folder.
    else { console.log(jsfiles.length + ' commands loaded') } // This tells how many commands it found.
    jsfiles.forEach((f, i) => { // This, loops through each file and runs the following code.
        var cmds = require(`./commands/${f}`); // This gets every js file in the chosen folder.
        bot.commands.set(cmds.config.command, cmds); // This gets the name of the command, as well as the modules in the file.
    });
});

bot.on("ready", () => {
    bot.user.setGame(`with ${bot.guilds.size} Servers. | -help`);
    console.log("bot Logged in");
});

bot.on("message", async message => {
    db.fetchObject(`guildPrefix_${message.guild.id}`).then(i => {
        let prefix;
        if(i.text) {
            prefix = i.text;
        } else {
            prefix = '-';
        }

        if(config.blacklist.includes(message.author.id) === true) return;

        bot.serverQueue = bot.queue.get(message.guild.id);

        let messageArray = message.content.split(/\s+/g);
        let command = messageArray[0];
        let args = messageArray.slice(1);
        if(!command.startsWith(prefix)) return;
        let cmd = bot.commands.get(command.slice(prefix.length));
        if(cmd) cmd.run(bot, message, args, func);
    });
});
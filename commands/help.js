const fs = require('fs');

module.exports.run = async (bot, message, args, func) => {
    let cmd = "**CheeseBot Commands**\nHello there thank using me.\nIm in `" + bot.guilds.size + "` Servers and growing.\n\n";
    cmd += "**Music Commands**\n";
    cmd += "`play` : play's a song from youtube\n";
    cmd += "`queue` : Display's the music queue and the cirrent song thats playing\n";
    cmd += "`stop` : Stops the current playing song\n";
    cmd += "`skip` : Skips the current playing song. Then plays the next in the queue\n";
    cmd += "`vol` : Sets the volume of the bot\n";
    cmd += "`np` : Displays whats playing in this queue"
    cmd += "`pause` : Pauses the music";
    cmd += "`resume` : Resumes the music";

    let staff = "**Staff Commands**\n";
    staff += "`purge` : purges chat limited to 100 messages (User needs permission: MANAGE_MESSAGES)\n";
    staff += "`ban` : Bans a user (User needs permission: BAN_MEMBERS)\n"; 
    staff += "`prefix` : Changes the bots prefix (User needs permission: ADMINISTRATOR)\n";
    staff += "`kick` : kick a user (User needs permission: KICK_MEMBERS)\n\n";

    let fun = "**Fun Commands**\n";
    fun += "`ball` : Ask the 8ball anything\n";
    fun += "`ping` : Pong!\n";
    func.embed(message.author, cmd);
    func.embed(message.author, staff);
    func.embed(message.author, fun);
    message.author.send("If you need support you can join\ndiscord.gg/XFrAEjW");
    await message.channel.send("You've got mail. :mailbox_with_mail: ");
}

module.exports.config = {
    command: "help"
}
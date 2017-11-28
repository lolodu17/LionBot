module.exports = {
    embed: function (channel, message, deleteTimer) {
        channel.send({
            embed:{
                description: message,
                color: 0xd6a67a
            }
        }).then(msg => {
            if(!isNaN(deleteTimer)) {
                message.delete(deleteTimer);
            }
        });
    }
}
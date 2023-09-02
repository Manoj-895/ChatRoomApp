const Messages = require('./model')

const chatAppCtrl = {
    storeMessage: async (req, res) => {
        const { message, room } = req.body;
        let existing = await Messages.findOne({ roomName: room })
        if (existing) {
            existing.name.push(message.messageData)
            existing.save();
            res.send("Saved")
        }
        else {
            const data = Messages({
                name: [message.messageData],
                roomName: room
            });
            data.save()
            res.send("Saved")
        }
    },
    getMessages: async (req, res) => {
        const { room } = req.body;
        let existing = await Messages.findOne({ roomName: room })
        if (existing) {
            res.send(existing.name)
        }
        else {
            res.send([])
        }
    },
}

module.exports = chatAppCtrl
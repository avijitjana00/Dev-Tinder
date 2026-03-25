const { Chat }  = require("../models/chat.model");

module.exports = {
    fetchChatDetails: async function (req) {
        try {
            const {targetUserId} = req.params;
            const userId = req.user._id;

            const chat = await Chat.findOne({
                participants: { $all: [userId, targetUserId]},
            }).populate({
                path: "messages.senderId",
                select: "firstName lastName, photoUrl"
            });

            if(!chat) {
                chat = new Chat({
                    participants: [ userId, targetUserId],
                    messages: []
                })
                await chat.save();
            }
            return chat;
        } catch (e) {
            return { error: e };
        }
    }
}
const { StatusCodes } = require("http-status-codes");
const customException = require("../common/customException.js");
const User = require("../models/users.model.js");
const ConnectionRequest = require("../models/connectionRequest.model.js");

module.exports = {
    sendConnectionRequest: async function (req) {
        try {
            const fromUserId = req.user._id;
            const toUserId = req.params.toUserId;
            const status = req.params.status;

            const allowedStatus = ["ignored", "interested"];
            if(!allowedStatus.includes(status)) return {error: customException.error(StatusCodes.BAD_REQUEST, "Invalid status", "Invalid status")  };
            
            const toUser = await User.findById(toUserId);
            if(!toUser) return {error: customException.error(StatusCodes.BAD_REQUEST, "User not found", "User not found")  };

            const existingConnectionRequest = await ConnectionRequest.findOne({
                $or:[
                    {fromUserId: toUserId},
                    {fromUserId: toUserId, toUserId: fromUserId}
                ]
            });
             if(existingConnectionRequest) return {error: customException.error(StatusCodes.BAD_REQUEST, "Connection request already exists", "Connection request already exists")  };

            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                connectionStatus: status
            });

            const data = await connectionRequest.save();
            if(data) return data;

        } catch (e) {
            return { error: e}
        }
    },
    acceptOrRejectConnectionRequest: async function(req) {
        try {
            const loggedInUser = req.user;
            const { status, requestId } = req.params;

             const allowedStatus = ["accepted", "rejected"];
            if(!allowedStatus.includes(status)) return {error: customException.error(StatusCodes.BAD_REQUEST, "Invalid status", "Invalid status")  };
            
             const connectionRequest = await ConnectionRequest.findOne({
                _id: requestId,
                toUserId: loggedInUser._id,
                connectionStatus: "interested"
            });
            
            if(!connectionRequest) return { error: customException.error(StatusCodes.BAD_REQUEST, "Connection request not found", "Connection request not found") };
            
            connectionRequest.connectionStatus  = status;
            const data = await connectionRequest.save();
            
            if(data) return data;

        } catch (e) {
            return { error: e};
        }
        
    }
}
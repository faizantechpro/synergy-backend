import { getFriends } from "./helper/socket.js";
import { User } from "./App/models/User.model.js";
import admin from "./helper/firebaseAuth/index.js";

export const socketio = (io) => {
  io.use(async function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
      const userToken = await admin
        .auth()
        .verifyIdToken(socket.handshake.query.token);
      const user = await User.findOne({
        uid: userToken.uid,
      });

      if (user) {
        socket.user = user;
        next();
      }
    } else {
      next(new Error("Authentication error"));
    }
  }).on("connection", (socket) => {
    console.log("im connected ✌", socket.id);

    socket.on("IS_USER_ONLINE", () => {
      socket.broadcast.emit("USER_STATUS", { status: true });
    });

    socket.on("UPDATE_LOCATION", async ({ data }) => {
      // example obj for data
      // {
      //   id: <MongoID>
      //   coordinates: [long, lat]
      // }

      const location = { type: "Point", coordinates: data.coordinates };
      await User.findByIdAndUpdate(socket.user._id, { location }, { new: true });
    });

    socket.on("GET_NEARBY_FRIENDS", async ({ data }) => {
      const friendsList = await getFriends(socket.user._id);
      const updatedUser = await User.findById(socket.user._id);

      const updatedLocation = {
        type: "Point",
        coordinates: updatedUser?.location?.coordinates,
      };

      const user = await User.aggregate([
        {
          $geoNear: {
            near: updatedLocation,
            maxDistance: 10,
            distanceField: "dist.calculated",
            query: {
              _id: {
                $in: friendsList,
              },
            },
            spherical: true,
          },
        },
      ]);
      socket.emit("NEARBY_FRIENDS", user);
    });

    socket.on("disconnect", () => {
      socket.on("IS_USER_ONLINE", () => {
        socket.broadcast.emit("USER_STATUS", { status: false });
      });
      console.log("im disconnected 🤞", socket.id);
    });
  });
};

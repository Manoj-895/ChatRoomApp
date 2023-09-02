const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');
app.use(cors());
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const chatAppCtrl = require('./controllers/controler')
const DBURL = process.env.DBURL

console.log(DBURL)

const dbUri = DBURL;

const connectDB = async () => {
  try {
      await mongoose.connect(dbUri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
  }
};
connectDB();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
const server = http.createServer(app);
app.post('/sendmessages',chatAppCtrl.storeMessage)
app.post('/getmessages',chatAppCtrl.getMessages)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});

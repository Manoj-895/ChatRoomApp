import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";


const socket = io.connect("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const leaveChat = async (e) => {
    e.preventDefault(); 
    setShowChat(!showChat)
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <form>
          <input
            type="text"
            placeholder="Name..."
            required
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID... default: 895"
            required
            value={room}
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
          </form>
        </div>
      ) : (
        <>
          <Chat socket={socket} username={username} room={room} />
          <button className="leave_button" onClick={(e) => {leaveChat(e)}}>Leave Chat</button>
        </>
      )}
    </div>
  );
}

export default App;

import io from "socket.io-client";

const socket = io.connect(); // instatiate connection to server - local host

export default socket;

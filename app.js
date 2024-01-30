const { io } = require("./server");

io.on("connection", function (socket) {
	console.log("New connection:", socket.id);
});

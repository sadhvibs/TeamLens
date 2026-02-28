const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.set("io", io);

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    // socket.on("joinProject", (projectId) => {
    //     socket.join(projectId);
    //     console.log("Joined project", projectId);
    // })

    socket.on("disconnect", () => {
        console.log("Socket disconnected", socket.id);
    })
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
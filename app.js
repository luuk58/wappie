const fs = require("fs");

let config = JSON.parse(fs.readFileSync("config.json"));

function isditjson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}


// scriptje bouwen

var liquidscript_1 = "";
var liquidscript_2 = "";
var liquidscript_3 = "thread.run(every=.1, fun () -> print(\"{";
var liquidscript_4 = "";

config.stations.forEach(station => {
  liquidscript_1 += "audio_" + station.id + " = mksafe(input.http(\"" + station.url + "\"))\n";
  liquidscript_2 += "func_" + station.id + " = peak(duration=.1,audio_" + station.id + ")\n";
  liquidscript_3 += '\\"' + station.id + '\\":#{func_' + station.id + '.peak()}0,';
  liquidscript_4 += "output.dummy(func_" + station.id + ")\n";
});

liquidscript_3 = liquidscript_3.slice(0, -1) + "}\"))\n";

liquidscript = liquidscript_1 + "\n\n\n" + liquidscript_2 + "\n\n\n" + liquidscript_3 + "\n\n\n" + liquidscript_4;

fs.writeFileSync("./wappie.liq", liquidscript);

const { spawn } = require("child_process");

const child = spawn("liquidsoap", [__dirname + "/wappie.liq"]);

child.stdout.on("data", data => {
  if (isditjson(data)) {
    io.emit("wapper", JSON.parse(data.toString()));
  } else {
    console.log("liquidsoap: " +  data);
  }
});

child.stderr.on("data", data => {
  console.log("stderr: " + data);
});








const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET"]
  }
});





io.on("connection", (socket) => {
  console.log("client connected: " + socket.id);
  socket.emit("init", config.stations);
  socket.on("disconnect", () => {
    console.log("client disconnected: " + socket.id);
  });
});




app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});




server.listen(3000, () => {
  console.log("listening on *:3000");
});





process.on("SIGINT", () => {
  fs.unlinkSync("./wappie.liq");
  process.exit(0);
});
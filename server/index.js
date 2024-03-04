import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { getAttendance } from './utils/getAttendance.js';
import { log } from 'console';

dotenv.config();

const PORT = process.env.PORT;

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

const onConnection = (socket) => {
  console.log(`User connected with ID: ${socket.id}`);
  socket.on('details', async ({ collegeId, collegeKey }) => {
    try {
      await getAttendance({
        username: collegeId,
        password: collegeKey,
        socket,
      });
    } catch (error) {
      console.log('error', error);
      socket.disconnect();
    }
  });
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
};

io.on('connection', onConnection);

httpServer.listen(PORT, () => {
  console.log(`runnin' on port ${PORT}`);
});

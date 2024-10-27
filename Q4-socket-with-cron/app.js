const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cron = require('node-cron');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 8000;
const TIME_INTERVAL = 3; // Time interval in seconds

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.get('/', (req, res) => {
  res.render('index', { title: `Random quote after every ${TIME_INTERVAL} seconds` });
});

async function fetchData() {
  try {
    const response = await axios.get('https://dummyjson.com/quotes/random');
    return response.data.quote;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

cron.schedule(`*/${TIME_INTERVAL} * * * * *`, async () => {
  const data = await fetchData();
  io.emit('dataUpdate', data);
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
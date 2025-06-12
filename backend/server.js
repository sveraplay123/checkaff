const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let stats = {
  visits: 0,
  ips: {},
};

let applications = [];
let chats = []; // {name, email, messages: [{from: 'user'|'admin', text}]}

app.post('/api/visit', (req, res) => {
  stats.visits += 1;
  const ip = req.ip;
  stats.ips[ip] = (stats.ips[ip] || 0) + 1;
  res.sendStatus(200);
});

app.get('/api/stats', (req, res) => {
  res.json(stats);
});

app.post('/api/applications', (req, res) => {
  const appData = req.body;
  applications.push({ ...appData, date: new Date().toISOString() });
  res.sendStatus(200);
});

app.get('/api/applications', (req, res) => {
  res.json(applications);
});

app.post('/api/chat', (req, res) => {
  const { name, email, message } = req.body;
  let chat = chats.find(c => c.name === name && c.email === email);
  if (!chat) {
    chat = { name, email, messages: [] };
    chats.push(chat);
  }
  chat.messages.push({ from: 'user', text: message, time: new Date().toISOString() });
  res.sendStatus(200);
});

app.get('/api/chat', (req, res) => {
  res.json(chats);
});

app.post('/api/adminReply', (req, res) => {
  const { name, email, message } = req.body;
  let chat = chats.find(c => c.name === name && c.email === email);
  if (chat) {
    chat.messages.push({ from: 'admin', text: message, time: new Date().toISOString() });
  }
  res.sendStatus(200);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

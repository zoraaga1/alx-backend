import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Handle successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Handle connection errors
client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err}`);
});

// Subscribe to the channel
const channel = 'holberton school channel';
client.subscribe(channel);

// Handle messages received on the channel
client.on('message', (channel, message) => {
  console.log(`Received message: ${message}`);
  
  if (message === 'KILL_SERVER') {
    client.unsubscribe(channel);
    client.quit();
  }
});

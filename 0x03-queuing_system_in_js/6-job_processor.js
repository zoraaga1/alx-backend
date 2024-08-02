import kue from 'kue';
import redis from 'redis';

// Create a Redis client
const redisClient = redis.createClient();
redisClient.on('connect', () => {
  console.log('Redis client connected to the server');
});
redisClient.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err}`);
});

// Create a Kue queue
const queue = kue.createQueue({
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});

// Define the function to send a notification
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs from the queue
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done();
});

// Graceful shutdown
process.on('SIGINT', () => {
  queue.shutdown(5000, () => {
    console.log('Queue shut down');
    process.exit(0);
  });
});

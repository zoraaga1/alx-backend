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

/**
 * Set a new value in the Redis store for the given schoolName
 * @param {string} schoolName - The key name
 * @param {string} value - The value to set
 */
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

/**
 * Display the value associated with a given key
 * @param {string} schoolName - The key name
 */
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, result) => {
    if (err) {
      console.error(`Error retrieving value for ${schoolName}: ${err}`);
    } else {
      console.log(`${schoolName}: ${result}`);
    }
  });
}

// Call the functions as required
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

import redis from 'redis';
import { promisify } from 'util';

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

// Promisify Redis client methods
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

/**
 * Set a new value in the Redis store for the given schoolName
 * @param {string} schoolName - The key name
 * @param {string} value - The value to set
 */
function setNewSchool(schoolName, value) {
  setAsync(schoolName, value)
    .then(() => {
      console.log(`Set ${schoolName} to ${value}`);
    })
    .catch((err) => {
      console.error(`Error setting value for ${schoolName}: ${err}`);
    });
}

/**
 * Display the value associated with a given key
 * @param {string} schoolName - The key name
 */
async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);
    console.log(`${schoolName}: ${value}`);
  } catch (err) {
    console.error(`Error retrieving value for ${schoolName}: ${err}`);
  }
}

// Call the functions as required
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

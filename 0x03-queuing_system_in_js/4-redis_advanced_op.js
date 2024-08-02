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
 * Create a hash with multiple fields
 */
function createHash() {
  const hashKey = 'HolbertonSchools';
  const hashFields = {
    Portland: '50',
    Seattle: '80',
    'New York': '20',
    Bogota: '20',
    Cali: '40',
    Paris: '2'
  };

  // Iterate over each field-value pair and set it in the hash
  for (const [field, value] of Object.entries(hashFields)) {
    client.hset(hashKey, field, value, redis.print);
  }
}

/**
 * Display the entire hash object stored in Redis
 */
function displayHash() {
  const hashKey = 'HolbertonSchools';

  client.hgetall(hashKey, (err, res) => {
    if (err) {
      console.error(`Error retrieving hash: ${err}`);
    } else {
      console.log(res);
    }
  });
}

// Create the hash and then display it
createHash();
displayHash();

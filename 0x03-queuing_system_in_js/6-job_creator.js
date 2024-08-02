import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Define the job data
const jobData = {
  phoneNumber: '123-456-7890',
  message: 'Hello, this is a test notification',
};

// Create a job
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (err) {
      console.error('Error creating job:', err);
    } else {
      console.log(`Notification job created: ${job.id}`);
    }
  });

// Process the job
queue.process('push_notification_code', (job, done) => {
  console.log('Processing job:', job.id);

  // Simulate job processing
  setTimeout(() => {
    // Simulate a success or failure scenario
    const isSuccess = Math.random() > 0.2; // 80% chance of success

    if (isSuccess) {
      console.log('Notification job completed');
      done(); // Mark the job as completed
    } else {
      console.error('Notification job failed');
      done(new Error('Job failed')); // Mark the job as failed
    }
  }, 3000); // Simulate a delay in processing
});

// Handle job completion
queue.on('job complete', (id) => {
  console.log(`Job ${id} completed`);
});

// Handle job failure
queue.on('job failed', (id, error) => {
  console.log(`Job ${id} failed with error: ${error.message}`);
});

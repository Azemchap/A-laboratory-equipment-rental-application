const kill = require('kill-port');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

console.log(`🔍 Checking for processes on port ${PORT}...`);

kill(PORT, 'tcp')
    .then(() => {
        console.log(`✅ Port ${PORT} is now free`);
        process.exit(0);
    })
    .catch((err) => {
        // If no process is found, that's fine
        if (err.message.includes('No process running')) {
            console.log(`✅ Port ${PORT} is already free`);
            process.exit(0);
        } else {
            console.log(`✅ Port ${PORT} cleared (or was already free)`);
            process.exit(0);
        }
    });

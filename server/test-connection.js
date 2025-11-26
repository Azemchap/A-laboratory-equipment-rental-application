require('dotenv').config();
const mongoose = require('mongoose');

// Use DATABASE_URI as configured for Parse Server
const connectionString = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!connectionString) {
    console.error('❌ Error: DATABASE_URI or MONGODB_URI not found in .env file');
    process.exit(1);
}

console.log('🔄 Connecting to MongoDB...\n');

mongoose.connect(connectionString)
    .then(async () => {
        console.log('✅ MongoDB Connected Successfully!\n');

        // Get database name from connection
        const db = mongoose.connection.db;
        const dbName = db.databaseName;

        console.log('📊 Database Information:');
        console.log(`   Database Name: ${dbName}`);

        // Check if database exists and list collections
        const collections = await db.listCollections().toArray();

        if (collections.length === 0) {
            console.log('   Collections: None (Database is empty - will be created when first data is inserted)');
        } else {
            console.log(`   Collections Found: ${collections.length}`);
            collections.forEach((col, index) => {
                console.log(`      ${index + 1}. ${col.name}`);
            });
        }

        // Get database stats
        try {
            const stats = await db.stats();
            console.log(`\n📈 Database Stats:`);
            console.log(`   Storage Size: ${(stats.storageSize / 1024 / 1024).toFixed(2)} MB`);
            console.log(`   Data Size: ${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`);
        } catch (err) {
            console.log('   (Stats not available for empty database)');
        }

        console.log('\n✅ Database test completed successfully!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.error('\nTroubleshooting:');
        console.error('1. Check your DATABASE_URI in .env file');
        console.error('2. Verify MongoDB Atlas credentials');
        console.error('3. Ensure your IP is whitelisted in MongoDB Atlas');
        process.exit(1);
    });
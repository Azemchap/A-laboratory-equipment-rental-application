require('dotenv').config();
const ParseServer = require('parse-server').ParseServer;
const Parse = require('parse/node');

// Initialize Parse
Parse.initialize(process.env.APP_ID, 'unused', process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;

const DEFAULT_ADMIN = {
    username: 'admin',
    password: 'admin123',
    email: 'admin@example.com',
    role: 'admin'
};

const DEFAULT_LABO_WORKER = {
    username: 'worker',
    password: 'worker123',
    email: 'worker@example.com',
    role: 'laboworker'
};

const DEFAULT_USER = {
    username: 'user',
    password: 'user123',
    email: 'user@example.com',
    role: 'user'
};

async function createUser(userData) {
    const query = new Parse.Query(Parse.User);
    query.equalTo('username', userData.username);

    try {
        const existingUser = await query.first({ useMasterKey: true });

        if (existingUser) {
            console.log(`⚠️  User "${userData.username}" already exists - skipping`);
            return existingUser;
        }

        const user = new Parse.User();
        await user.signUp(userData, { useMasterKey: true });
        console.log(`✅ Created user: ${userData.username} (${userData.role})`);
        return user;
    } catch (error) {
        console.error(`❌ Error creating user ${userData.username}:`, error.message);
        throw error;
    }
}

async function seedDatabase() {
    console.log('🌱 Starting database seeding...\n');
    console.log('📊 Parse Server URL:', process.env.SERVER_URL);
    console.log('🔑 App ID:', process.env.APP_ID);
    console.log('');

    try {
        // Create admin user
        console.log('Creating users...');
        await createUser(DEFAULT_ADMIN);
        await createUser(DEFAULT_LABO_WORKER);
        await createUser(DEFAULT_USER);

        console.log('\n✅ Database seeding completed successfully!');
        console.log('\n📝 Default Login Credentials:');
        console.log('================================');
        console.log('Admin:');
        console.log('  Username: admin');
        console.log('  Password: admin123');
        console.log('  Role: admin');
        console.log('');
        console.log('Lab Worker:');
        console.log('  Username: worker');
        console.log('  Password: worker123');
        console.log('  Role: laboworker');
        console.log('');
        console.log('Regular User:');
        console.log('  Username: user');
        console.log('  Password: user123');
        console.log('  Role: user');
        console.log('================================');
        console.log('\n⚠️  IMPORTANT: Change these passwords in production!');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Seeding failed:', error.message);
        process.exit(1);
    }
}

// Wait a bit for server to be ready if just started
setTimeout(() => {
    seedDatabase();
}, 2000);

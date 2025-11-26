const Parse = require('parse/node');

// Initialize Parse - this will be called after server starts
function initializeParse() {
    Parse.initialize(process.env.APP_ID, 'unused', process.env.MASTER_KEY);
    Parse.serverURL = process.env.SERVER_URL;
}

const DEFAULT_USERS = [
    {
        username: 'admin',
        password: 'admin123',
        email: 'admin@example.com',
        role: 'admin'
    },
    {
        username: 'worker',
        password: 'worker123',
        email: 'worker@example.com',
        role: 'laboworker'
    },
    {
        username: 'user',
        password: 'user123',
        email: 'user@example.com',
        role: 'user'
    }
];

async function createUser(userData) {
    const query = new Parse.Query(Parse.User);
    query.equalTo('username', userData.username);

    try {
        const existingUser = await query.first({ useMasterKey: true });

        if (existingUser) {
            console.log(`   ⚠️  User "${userData.username}" already exists - skipping`);
            return existingUser;
        }

        const user = new Parse.User();
        await user.signUp(userData, { useMasterKey: true });
        console.log(`   ✅ Created user: ${userData.username} (${userData.role})`);
        return user;
    } catch (error) {
        console.error(`   ❌ Error creating user ${userData.username}:`, error.message);
        return null;
    }
}

async function seedDefaultUsers() {
    console.log('🌱 Checking for default users...');

    initializeParse();

    try {
        // Check if any users exist
        const userQuery = new Parse.Query(Parse.User);
        const userCount = await userQuery.count({ useMasterKey: true });

        if (userCount === 0) {
            console.log('📝 No users found. Creating default users...\n');

            for (const userData of DEFAULT_USERS) {
                await createUser(userData);
            }

            console.log('\n✅ Default users created successfully!');
            console.log('\n📝 Default Login Credentials:');
            console.log('================================');
            console.log('Admin: admin / admin123');
            console.log('Worker: worker / worker123');
            console.log('User: user / user123');
            console.log('================================');
            console.log('⚠️  Change these passwords in production!\n');
        } else {
            console.log(`✅ Users already exist (${userCount} users found)\n`);
        }
    } catch (error) {
        console.error('❌ Error checking/seeding users:', error.message);
    }
}

module.exports = { seedDefaultUsers };

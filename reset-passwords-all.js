import dns from 'dns';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

dns.setServers(['8.8.8.8', '8.8.4.4']);

const MONGO_URI = process.env.MONGODB_URI
  || 'mongodb+srv://dgadmin:dgadmin2026@digiclassroom.oen9jsx.mongodb.net/digiClassroom?appName=DigiClassRoom';

const NEW_PASSWORD = 'Test@1234';

async function run() {
  console.log('🔌 Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected!\n');

  const db = mongoose.connection.db;
  const hashed = await bcrypt.hash(NEW_PASSWORD, 10);

  const updates = [
    { coll: 'admins',   email: 'test@gmail.com',  role: 'Admin'   },
    { coll: 'teachers', email: 'ravi@gmail.com',  role: 'Teacher' },
    { coll: 'students', email: 'ravi@gmail.com',  role: 'Student' },
    { coll: 'students', email: 'test@gmail.com',  role: 'Student' },
  ];

  for (const { coll, email, role } of updates) {
    const result = await db.collection(coll).updateOne(
      { email },
      { $set: { password: hashed } }
    );
    const status = result.modifiedCount > 0 ? '✅' : '⚠️  (not found or no change)';
    console.log(`${status} ${role} (${email}) → password: ${NEW_PASSWORD}`);
  }

  await mongoose.disconnect();
  console.log('\n✅ Done!');
}

run().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});

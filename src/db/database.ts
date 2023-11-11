import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://admin:Niko2000@invite-generator.wfoei1v.mongodb.net/invite-generator?retryWrites=true&w=majority';
mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

export { db };
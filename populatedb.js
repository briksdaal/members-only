var debug = require('debug')('membersonly:populate');

// import models
const User = require('./models/user');
const Message = require('./models/message');

const users = [];

// set up mongoose connection
const db = require('./mongooseconnection');

main().catch((err) => debug(err));

async function main() {
  await clearDb();
  await createUsers();
  await createMessages();

  debug('closing connection');
  await db.close();
  debug('connection closed');
}

async function clearDb() {
  // drop all collections to clear db for fresh population
  const collections = await db.listCollections();

  await Promise.all(
    collections.map((c) =>
      (async () => {
        await db.dropCollection(c.name);
        debug(`${c.name} collections dropped`);
      })()
    )
  );
}

async function userCreate(index, firstname, lastname, email, password) {
  const user = new User({ firstname, lastname, email, password });
  await user.save();
  users[index] = user;
  debug(`Added User: ${user.fullname}`);
}

async function createUsers() {
  debug('Adding Users');
  await Promise.all([
    userCreate(0, 'John', 'Doe', 'john.doe@example.com', 'test123'),
    userCreate(1, 'Jane', 'Smith', 'jane.smith@example.com', 'dummy456'),
    userCreate(2, 'Alex', 'Johnson', 'alex.johnson@example.com', 'testing789'),
    userCreate(3, 'Emily', 'Davis', 'emily.davis@example.com', 'pass1234'),
    userCreate(4, 'Chris', 'Miller', 'chris.miller@example.com', 'sample567'),
    userCreate(5, 'Megan', 'Wilson', 'megan.wilson@example.com', 'tempPass'),
  ]);
}

async function messageCreate(title, content, createdAt, by) {
  const message = new Message({
    title,
    content,
    createdAt,
    by,
  });

  await message.save();

  debug(`Added Message: ${title}`);
}

async function createMessages() {
  debug('Adding Messages');
  await Promise.all([
    messageCreate(
      'Meeting Tomorrow',
      "Let's discuss the agenda for tomorrow's meeting.\r\nYour updates and ideas are crucial.\r\nPlease come prepared!",
      (() => {
        const date = new Date();
        date.setDate(date.getDate() - 15);
        return date;
      })(),
      users[2]
    ),
    messageCreate(
      'Project Update',
      "Here's a comprehensive update on the project progress.\r\nWe're on track for the next milestone.\r\nLet's keep up the momentum!",
      (() => {
        const date = new Date();
        date.setDate(date.getDate() - 10);
        return date;
      })(),
      users[4]
    ),
    messageCreate(
      'Coffee Break',
      "Take a break and join us for a casual coffee session in the office lounge.\r\nIt's an excellent opportunity to connect with colleagues.\r\nYour presence will add to the warmth of our team!",
      (() => {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return date;
      })(),
      users[0]
    ),
    messageCreate(
      'New Feature Announcement',
      'Exciting news! A new feature is ready for deployment.\r\nStay tuned for the official announcement.\r\nYour feedback is highly valued!',
      (() => {
        const date = new Date();
        date.setDate(date.getDate() - 5);
        return date;
      })(),
      users[1]
    ),
    messageCreate(
      'Team Building Event',
      "Get ready for an unforgettable team building event next week.\r\nYour participation is key to making this event a success.\r\nLet's make lasting memories together!",
      (() => {
        const date = new Date();
        date.setDate(date.getDate() - 12);
        return date;
      })(),
      users[3]
    ),
  ]);
}

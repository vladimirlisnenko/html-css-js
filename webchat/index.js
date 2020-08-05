require('./server');
const { db } = require('./dist');

try {
  db.getAllMessages()
    .then((messages) => {
      console.warn(`${messages.length}/`);
      console.warn(messages[0]);
    });
} catch (e) {
  console.error(e);
}

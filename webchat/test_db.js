const { v4 } = require('uuid');
const db = require('./dist/index');

const message = {
  from: {
    id: v4(),
  },
  to: {
    id: v4(),
  },
  content: 'String',
};

try {
  db.newMessage(message);

  db.getAllMessages()
    .then((messages) => {
      console.warn(messages.length);
      console.warn(messages[0]);
    });
} catch (e) {
  console.error(e);
}

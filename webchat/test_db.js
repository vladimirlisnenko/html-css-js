const db = require('./db/index')
const { v4 } = require('uuid'); 
const { error } = require('console');

let message= {
    from: {
        id:v4()
    },
    to: {
        id:v4()
    },
    content: "String"
  }

try {
    db.newMessage(message)

    db.getAllMessages().then((messages)=>{
        console.log(messages.length)
        console.log(messages[0])
    })

} catch(e){
    console.error(e);
}
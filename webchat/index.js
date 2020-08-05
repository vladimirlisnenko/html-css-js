require('./server')
const db=require('./dist')

try {
    db.getAllMessages()
    .then((messages)=>{
        console.log(messages.length)
        console.log(messages[0])
    })

} catch(e){
    console.error(e);
}
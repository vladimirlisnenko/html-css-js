const input = require('./in.json')
const Hapi = require('@hapi/hapi');

const fs = require('fs');
const os=require('os')

console.warn('123')
console.log(input.lastName);

console.error((Math.round(os.freemem()/(1024*1024))))

input.lastName="Test"

let text = JSON.stringify(input)

fs.writeFile("./output.json", text, function(err) {
    if(err) {
        console.error(err);
    }
    console.log("The file was saved!");
}); 


const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/korzina/{1,5,8}_{11}',
        handler: (request, h) => {
            console.log(request.paramsArray)
            if (request.paramsArray[0]!="admin") {
                return "Not Admin idi nahui"
            }

            if (request.paramsArray[1]=="page1") {
                return 'Page1';
            }
            return 'Un known page';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};


init();
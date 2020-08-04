let routes=[]

routes.push({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Hello World!';
    }
})

routes.push({
    method: 'GET',
    path: '/json',
    handler: (request, h) => {
        return h.response({
            str:"string",
            num:1,
            bool:true,
            arr:['1','2','3']    
        })
    }
})


routes.push({
    method: 'GET',
    path: '/param/{data}',
    handler: (request, h) => {
        return request.params.data;
    }
})


routes.push({
    method: 'POST',
    path: '/post',
    handler: (request, h) => {
        return request.payload;
    }
})

module.exports = routes
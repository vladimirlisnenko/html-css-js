const url='http://localhost:3000/'

function fetchData() {
    fetch(url+'json')
    .then(response=>{
        console.log(response);
        return response
    })
        .then(response => response.json())
        .then(data => console.log(data));  
}

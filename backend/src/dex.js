function myFunction(){
    document.getElementById("demo").innerHTML="Hello World"
    document.getElementById("btn").hidden
    
}
//callback function
(function(){
    document.getElementById("dem").innerHTML="Hello World"
})()

const x = (x, y) => x * y

document.getElementById("de").innerHTML=x(5,5)
//fucntion as parameter

function ding(callback)
{
    console.log("from ding")
    callback()
}
function print(){
    console.log("PRINT")
}

ding(print)

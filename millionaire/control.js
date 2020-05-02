var net = require('net')

var socket = net.connect("5250", "localhost")

socket.on("connect", function(){
    console.log("connect")
    var updateData = JSON.stringify(JSON.stringify({
        question: {
            text: "Who played Buzz Lightyear in Toy Story?"
        },
        answerA: {
            text: "Tom Hanks"
        },
        answerB: {
            text: "Bill Murray"
        },
        answerC: {
            text: "Tim Allen"
        },
        answerD: {
            text: "John Ratzenberger"
        }
    }))
    socket.write(`CG 1-2 ADD 1 templates/millionaire/millionaire 1 ${updateData}\r\n`, (err) => {
        setInterval(function(){
            socket.write('CG 1-2 NEXT 1\r\n')
        }, 2000)
    })
})

socket.on("data", data => {
    console.log(data.toString())
})
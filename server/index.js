var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var uuerArr = {}
server.listen(8066,function(){
  console.log('server start in port 8066')
})

app.get('/',function(req,res){
  res.send('hello JSAnntQ')
})
io.on('connection',function(socket){
  // console.log(socket)
  socket.on('online',data=>{
    uuerArr[data.fuuid] = socket.id;
    console.log(uuerArr)
  })
  console.log(socket.id)
  socket.on('my other event', function(data){
    
    console.log("message: "+ JSON.stringify(data))
    if(data.touuid){
      io.sockets.sockets[uuerArr[data.touuid]].emit('news', data)
    }else{
      socket.broadcast.emit('news', data)
    }
  })
})

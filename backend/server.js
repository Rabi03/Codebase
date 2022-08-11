const express = require('express');
const app = express();
const db=require('./connectDatabase');
const cookieParser=require('cookie-parser');
require('dotenv').config();

const user=require('./routes/User');
const community=require('./routes/Community');
const course=require('./routes/Course');
const channel=require('./routes/Channel')
const message=require('./routes/Message')
const promotion=require('./routes/Promotion')
const search=require('./routes/search');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

db.connect(err=>{
    if(err) throw err;
    else{
        console.log("Mysql is connected");
    }
});

app.use('/api/user',user);
app.use('/api/search',search);
app.use('/api/promotion',promotion);
app.use('/api/community',community);
app.use('/api/community/course',course);
app.use('/api/channel',channel);
app.use('/api/message',message);


const server=app.listen(5000,()=>console.log("Server listening on port 5000"));

const io=require('socket.io')(server,{
    pingTimeout: 60000,
    cors:{
        origin: 'http://localhost:3000'
    }
});

io.on('connection',(socket)=>{
    console.log('Connected to socket.io');

    socket.on('setup',(userData)=>{
        socket.join(userData.user_id);
        socket.emit('connected');
    });

    socket.on('join chat',(roomId)=>{
        socket.join(roomId);
        console.log('user joined chat',roomId);
    });

    socket.on('new message',(newMessage)=>{
        console.log("New Message Request");
        const members=newMessage.members;
        if(!members) return console.log("Chat users is not defined");

        members.forEach(member=>{
            if(member.user_id===newMessage.sender_id) return;
            socket.in(member.user_id).emit('message received',newMessage);
        })
    });



  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})
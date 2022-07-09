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
app.use('/api/community/channel',channel);
app.use('/api/community/channel/message',message);


app.listen(5000,()=>console.log("Server listening on port 5000"))
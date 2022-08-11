const db=require('../connectDatabase');

exports.sendMessage=(req, res) => {
    const {channel_id}=req.body;
    const newMessage={
        ...req.body
    };

    const updateChannel={
        last_message:req.body.message,
    };

    const sql=
    `
    INSERT INTO message SET \`timestamp\`=CURRENT_TIMESTAMP(), ?;
    UPDATE channel
    SET \`timestamp\`=CURRENT_TIMESTAMP(), ?
    WHERE channel_id='${channel_id}';
    `;

    db.query(sql,[newMessage,updateChannel],(err, result)=>{
        if(err) {
            return res.status(400).json({
                success:false,
                error:err
            })
        }
        return res.status(200).json({
            message:"Send message successfully"
        })
    });
};

exports.allMessages=(req,res)=>{
    const channelId=req.params.channel_id;

    const sql=
        `
            SELECT * 
            FROM message m  
            JOIN user u 
            ON (u.user_id=m.sender_id)
            WHERE m.channel_id='${channelId}'
            ORDER BY timestamp ASC
        `
    
    db.query(sql,(err,result)=>{
        if(err){
            return res.status(400).json({
                success: false,
                error:err
            })
        }

        return res.status(200).json({
            messages:result
        })
    });
}
const asyncHandler = require('express-async-handler');
const db=require('../connectDatabase');


exports.fetchChannels=asyncHandler((req,res)=>{
    const userId = req.user.user_id;
    
    const sql=
    `SELECT * FROM channel c
    JOIN community USING (community_id)
    WHERE  c.community_id IN (
        SELECT i.community_id 
        FROM create_join_community_instructor i
        WHERE i.user_id='${userId}'
        UNION
        SELECT s.community_id 
        FROM join_community_as_student s
        WHERE s.user_id='${userId}'
    )
    `;


    db.query(sql,(err,result)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            channel:result
        })

    });
});

exports.getChannelMembers=asyncHandler((req,res)=>{
    const {community_id} = req.params;

    const sql=`
    SELECT user_id FROM create_join_community_instructor cji
    JOIN community c USING (community_id)
    WHERE c.community_id='${community_id}'
    UNION
    SELECT user_id FROM join_community_as_student jcas
    JOIN community c USING (community_id)
    WHERE c.community_id='${community_id}'
    `;

    db.query(sql,(err,result)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            members:result
        })

    });
})

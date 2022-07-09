const db=require('../connectDatabase');

exports.getPromotions =(req,res) => {
    const sql=`SELECT p.name AS promo_name,p.description AS promo_description,date,course_id,c.community_id AS community_id,image,videoLink,c.name AS community_name,c.group_image AS community_image 
     FROM promotion p JOIN community c`;

    db.query(sql,(err,result)=>{
        if(err) {
            return res.status(400).json({
                success: false,
                error:err
            });
        }
        return res.status(200).json({
            promotion: result?result :[]
        })
    });
};
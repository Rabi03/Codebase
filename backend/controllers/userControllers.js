const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const sendToken = require('../utils/SendToken');
const db=require('../connectDatabase');

exports.registration =async(req, res) => {
    const id=uuid.v4();
    const {password,role} = req.body;
    const newPassword=await bcrypt.hash(password,12);

    req.body.password=newPassword;
    const data={
        user_id:id,
        ...req.body
    }
    const sql='INSERT INTO user SET ?';

    db.query(sql,data,(err, result)=>{
        if(err) {
            return res.status(400).send({
                error:err
            });
        }
        sendToken(data,role,200,res);
    });
};

exports.login=(req, res)=>{
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(401).send({
            success: false,
            error: {
              message: "Please enter your email or password",
            },
          });
    }

    const sql='SELECT * FROM user WHERE email=?';

    db.query(sql,email,async(err,result)=>{
        if(err) return res.status(400).send({
            error:err
        });
        const user=result[0];
        if(!user) return res.status(201).json({
            message:'Email not found'
        })
        isMatch=await bcrypt.compare(password,user.password);
        if(isMatch){
        sendToken(user,user.role,200,res);
        }
        else{
            return res.status(401).send({
                success: false,
                error: {
                  password: "Password is not correct",
                },
              });
        }
    });

};

exports.getCurrentUser =(req, res)=>{
    const user_id=req.user.user_id;
    const sql='SELECT * FROM user WHERE user_id=?';
    const course_student=`
    SELECT * FROM course c
    LEFT JOIN enroll 
    USING (course_id)
    WHERE user_id=?
    `;

    const join_as_student=`
    SELECT * FROM community c
    LEFT JOIN join_community_as_student jc 
    USING (community_id)
    WHERE jc.user_id=?
    `;

    const join_as_instructor=`
    SELECT * FROM community c
    LEFT JOIN create_join_community_instructor jc
    USING (community_id)
    WHERE jc.user_id=?
    `;

    const total_course=`
    SELECT COUNT(course_id) AS total_course FROM course WHERE community_id IN (
    SELECT community_id FROM create_join_community_instructor WHERE user_id=?
    )
    `;
    const total_student=`
    SELECT COUNT(user_id) AS total_student FROM user WHERE user_id IN (
    SELECT user_id FROM join_community_as_student WHERE user_id=?
    )
    `;

    db.query(sql,user_id,(err,result)=>{
        if(err){
            return res.status(400).json({
                success: false,
                error:err
            });
        }
        if(req.user.role===1){
            db.query(course_student,user_id,(err,course)=>{
                if(err){
                    return res.status(400).json({
                        success: false,
                        error:err
                    });
                }
                db.query(join_as_student,user_id,(err,join_student)=>{
                    if(err){
                        return res.status(400).json({
                            success: false,
                            error:err
                        });
                    }
                    return res.status(200).json({
                        user:result[0],
                        course,
                        join_student
                    })
                    
                });
            });
        }
        else{
            db.query(join_as_instructor,user_id,(err,join_instructor)=>{
                if(err){
                    return res.status(400).json({
                        success: false,
                        error:err
                    });
                }
                db.query(total_course,user_id,(err,total_course)=>{
                    if(err){
                        return res.status(400).json({
                            success: false,
                            error:err
                        });
                    }
                    db.query(total_student,user_id,(err,total_student)=>{
                        if(err){
                            return res.status(400).json({
                                success: false,
                                error:err
                            });
                        }
                        return res.status(200).json({
                            user:result[0],
                            join_instructor,
                            total_course:total_course[0].total_course,
                            total_student:total_student[0].total_student
                        })
                        
                    });
                    
                });
                
            });
        }
        
    });
}

exports.logout =(req, res)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
}
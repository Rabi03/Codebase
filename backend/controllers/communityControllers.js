const uuid = require('uuid');
const db = require('../connectDatabase');

exports.createCommunity = (req, res) => {
    const id = uuid.v4();
    const channel_id = uuid.v4();
    const data = {
        community_id: id,
        ...req.body
    };

    const createorjoinData = {
        user_id: req.user.user_id,
        community_id: id,
        join_as: 'admin',
    }

    const channelData = {
        channel_id: channel_id,
        community_id: id
    }

    const sql = `
    START TRANSACTION;
    INSERT INTO community SET ?;
    INSERT INTO create_join_community_instructor SET ?;
    INSERT INTO channel SET ?;
    COMMIT;
    `;

    db.query(sql, [data, createorjoinData, channelData], (err, result) => {
        if (err) {
            return res.status(400).send({
                success: false,
                error: {
                    message: err,
                },
            });
        }
        return res.status(200).json({
            community_id: id,
            channel_id: channel_id
        })
    })
};

exports.join_as_instructor = (req, res) => {
    const joinData = {
        user_id: req.user.user_id,
        join_as: 'member',
        ...req.body
    };

    const sql = `INSERT INTO create_join_community_instructor SET ?`

    db.query(sql, joinData, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Successfully joined as instructor'
        })
    });
};

exports.join_as_student = (req, res) => {
    const joinData = {
        user_id: req.user.user_id,
        ...req.body
    };

    const sql = `INSERT INTO join_community_as_student SET ?`

    db.query(sql, joinData, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Successfully joined as student'
        })
    });
};

exports.topCommunity = (req, res) => {
    const { skip } = req.query;
    const sql = `SELECT * FROM community LIMIT 3 OFFSET ${skip}`;
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            });
        }
        return res.status(200).json({
            topCommunity: result ? result : []
        })
    });
};

exports.getCommunity = (req, res) => {
    const id = req.params.community_id;
    const sql = 'SELECT * FROM community WHERE community_id =?';
    const member_sql = `
    SELECT * FROM user 
    WHERE user_id IN
    (SELECT user_id FROM create_join_community_instructor WHERE community_id =?)`;
    const course_sql =`
        SELECT * FROM course
        WHERE community_id=?
    `;

    db.query(sql, id, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            });
        }
        db.query(member_sql, id, (err, member) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                });
            }
            db.query(course_sql, id, (err, course) => {

                if (err) {
                    return res.status(400).json({
                        success: false,
                        error: err
                    });
                }
                
                return res.status(200).json({ ...result[0], member,course });
            });
        });
    });
};




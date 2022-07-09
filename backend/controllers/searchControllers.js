const db = require('../connectDatabase');

exports.searchCourse= (req, res) => {
    const keyword=req.query.search;

    const sql=`SELECT course_id,name,description,image FROM course WHERE name LIKE '%${keyword}%'`;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            });
        }

        return res.status(200).json(result);
    });

};

exports.searchCommunity= (req, res) => {
    const keyword=req.query.search;

    const sql=`SELECT community_id,name,description,group_image FROM community WHERE name LIKE '%${keyword}%'`;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            });
        }

        return res.status(200).json(result);
    });

};
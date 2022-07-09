const uuid = require('uuid');
const db = require('../connectDatabase');

exports.createCourse = (req, res) => {
    const course_id = uuid.v4();
    const community_id = req.params.community_id;


    const data = {
        course_id: course_id,
        community_id: community_id,
        ...req.body.course
    };

    const content = req.body.content.map(content => `INSERT INTO content SET course_id='${course_id}',name='${content.name}',video='${content.video}',file='${content.file}',description='${content.description}'`)

    const sql =
        `
    START TRANSACTION;
    INSERT INTO course SET ?;
    INSERT INTO promotion SET ?;
    ${content.join(';')};
    UPDATE community SET total_course=total_course+1 WHERE community_id=?;
    COMMIT;
    `;

    db.query(sql, [data, data, community_id], (err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Course is created successfully'
        })
    });

};

exports.enrollCourse = (req, res) => {
    const user_id = req.user.user_id;
    const { community_id, course_id } = req.body;

    const data = {
        user_id: user_id,
        course_id: course_id,
        community_id: community_id
    }

    const sql = `INSERT INTO enroll SET ?`

    db.query(sql, data, (err, result) => {
        if (err) return res.status(400).json({ error: err });
        return res.status(200).json({
            success: true,
            message: "Enrolled successfully"
        });
    });
};

exports.getCourse = (req, res) => {
    console.log("search")
    const id = req.params.course_id;
    const sql = `
    select temp.*,c.community_id as community_id,c.name as community_name,c.purpose as community_purpose,c.group_image as group_image,c.total_student as total_student,c.admin as admin from community c
    right join(
    select * from course where course_id=?) as temp
    using(community_id);
    `;
    const content_sql = `SELECT * FROM content WHERE course_id=?`;

    db.query(sql, id, (err, result) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            });
        }
        db.query(content_sql, id, (err, content) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                });
            }

            return res.status(200).json({ ...result[0], content });
        });
    });
};

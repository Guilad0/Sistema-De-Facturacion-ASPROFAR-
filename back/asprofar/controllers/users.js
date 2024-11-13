const connection = require('../database');
const { response: res, request: req } = require('express');




// const getById = (req, res) => {
//     const id = req.params.id;
//     const query = 'SELECT * FROM users WHERE user_id = ?';

//     connection.query(query, [id], (err, results) => {
//         if (err) {
//             res.status(500).send(err);
//             return;
//         }

//         if (results.length === 0) {
//             res.status(404).json({
//                 user: {},
//                 msg: 'User not found'
//             });

//             return;
//         }
//         res.status(200).json({
//             user: results[0]
//         })

//     })
// }

const getByIdHelper = (id, callback) => {
    const query = 'SELECT * FROM users WHERE user_id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }

        if (results.length === 0) {
            callback(null, {});
            return;
        }
        callback(null, results[0]);

    })
}

const getById = (req, res) => {
    const id = req.params.id;
    // Llamamos a getById para verificar que el usuario existe
    getByIdHelper(id, (err, user) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving user', details: err });
            return;
        }

        if (!user) {
            res.status(404).json({ msg: 'User not found' });
            return;
        }

        res.status(200).json({
            user
        })
    });
}


const changeState = (req, res) => {
    const id = req.params.id;

    getByIdHelper(id, (err, user) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving user', details: err });
            return;
        }

        if (!user) {
            res.status(404).json({ msg: 'User not found' });
            return;
        }

        console.log(user);
        if (user == {}) {
            res.status(404).json({ msg: 'User not found' });
            return;
        }
        const query = 'UPDATE users SET state=!state WHERE user_id = ?';
        connection.query(query, [id], (err, results) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            res.status(200).json({
                message: 'User state updated successfully',
                user
            })

        })

    })

}

//const que7ry = 'UPDATE users SET state = !state WHERE user_id = ?';
// connection.query(query, [id], (err, results) => {
//     if (err) {
//         res.status(500).send(err);
//         return;
//     }

// })

module.exports = {
    getById,
    changeState
};
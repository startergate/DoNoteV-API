const dbUser = require('modules/dbInfo');
const sid = require('@startergate/sidjs');

const note = require('models').note;

exports.findNote = (req, res, next) => {
    sid.loginAuth(req.headers.sid_clientid, req.params.sessid).then(info => {
        if ((info.is_vaild && info.is_succeed)) {
            res.status(500);
            res.send({
                type: 'error',

                is_vaild: true,
                is_succeed: false
            });
            return;
        }
        note.tableName = `notedb_${info.pid}`;
        note.findByPk(req.params.id).then(note => {
            res.send(note);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
};
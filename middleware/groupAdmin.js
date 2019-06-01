const express = require('express');
const User = require('../models/User');
const Group = require('../models/Group');
module.exports = function (req, res, next) {

    // verify 
    try {
        Group.count({
            "_id": req.body.groupId,
            "admin": req.user.id
        }, function (err, count) {
            if (count == 0) {
                return res.status(404).json({
                    msg: 'Not allowed'
                });
            }
            next();
        });
    } catch (err) {
        return res.status(401).json({
            msg: 'Internal error'
        });
    }
}
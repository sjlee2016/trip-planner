const fs = require("fs");
const restify = require("restify");
const uuidv4 = require("uuid/v4");
const Storage = require("@google-cloud/storage");
const CLOUD_BUCKET = "trip-planner-img";
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile'); 
const User = require('../../models/User'); 
const googleCloudConfig = require('../../config/googlecloud'); 

const { check, validationResult } = require('express-validator/check');
const storage = Storage({
  projectId: googleCloudConfig.get('projectId'), 
  keyFilename: '/path/to/file/downloaded/in/step/3'
})
const bucket = storage.bucket(CLOUD_BUCKET);

router.post("/profile-picture", (req, res) => {
  const {file} = req.files;
  const gcsname = uuidv4() + file.name;
  const files = bucket.file(gcsname);

  fs.createReadStream(file.path)
    .pipe(files.createWriteStream({
      metadata: {
        contentType: file.type
      }
    }))
    .on("error", (err) => {
      restify.InternalServerError(err);
    })
    .on('finish', () => {
      res.json({
        success: true,
        fileUrl: `https://storage.googleapis.com/${CLOUD_BUCKET}/${gcsname}`
      })
    });
});


module.exports = router; 
const express = require('express')
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { save_face, get_faces,update_face_name,delete_face } = require("../db")

// Add face
router.post('/save_face', async (req, res, next) => {
    let p ={
        id: uuidv4(),
        name: req.body.name,
        encoded_face: req.body.encoded_face,
        date: new Date(),
        image: req.body.image
    }
    await save_face(p)
    return res.status(200).send({ success: "add successfully" });

});


// get All Posts
router.get('/getFaces', async (req, res, next) => {
    let results = await get_faces()
    let rows = results.recordset.map(el=>{
        el.encoded_face = JSON.parse(el.encoded_face)
        return el
    })
    return res.status(200).send(rows);

});


router.post('/update_face_name', async (req, res, next) => {
    let p ={
        id: req.body.id,
        name: req.body.name,
    }
    await update_face_name(p)
    return res.status(200).send({ success: "update successfully" });

});

router.post('/delete_face', async (req, res, next) => {
    let p ={
        id: req.body.id,
    }
    await delete_face(p)
    return res.status(200).send({ success: "delete successfully" });

});




module.exports = router
var express = require('express');
var router = express.Router();

const Picture = require("../models/Picture");

const multer = require("multer")

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('archivo');
});

const upload = multer({ dest: './public/images/' });

router
.post('/upload', upload.single('photo'), (req, res)=>{
  console.log(req.file);
  const pic = new Picture({
    name: req.body.name,
    path: `/images/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save((err) => {
    if(err) console.log(err);
      res.redirect('/');
  });
});

router.get("/images", (req,res)=>{
  Picture.find()
  .then(docs=>{
  res.render("list_pictures", {pictures:docs});    
  })
  .catch(err=>{
    res.send(err);
  });
});

module.exports = router;

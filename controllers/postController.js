const cloudinary = require('../middlewares/cloudinary')
const Post = require('../models/Post')

exports.createPost = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)

        const post = await Post.create({
            title: req.body.title,
            image: result.secure_url,
            cloudinaryId: result.public_id,
            user: req.user.id,
            userName: req.user.userName
        })
        await post.save()
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
}
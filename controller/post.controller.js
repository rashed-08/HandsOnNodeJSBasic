// imports
const Post = require('../model/post');

exports.getPosts = (req, res) => {
    // res.send('Hello World from routers!');
    const posts = Post.find().select('_id title body')
        .then(posts => {
            res.json({
                posts
            })
        })
        .catch(err => console.log(err))
}

exports.createPost = (req, res) => {
    const post = new Post(req.body);
    post.save()
        .then(result => {
            res.status(200).json({
                post: result
            });
        });
}

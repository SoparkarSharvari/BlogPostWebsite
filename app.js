const express = require("express")
const cors = require("cors")
const app = express()

const { collection, collection2 ,collection3 } = require('./mongo');

const mongoose = require("mongoose");
require("./mongo")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
 
});

const upload = multer({ storage: storage });

app.get("/",cors(),(req,res)=>{

})

app.post("/",async(req,res)=>{
    const{username,password}=req.body
    try{
        const check=await collection.findOne({username:username})
        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }
    }
    catch(e){
        res.json("fail")
    }
})

app.post("/signup",async(req,res)=>{
    const{username,password}=req.body
    const data={
        username:username,
        password:password
    }
    try{
        const check=await collection.findOne({username:username})
        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }
    }
    catch(e){
        res.json("fail")
    }
})

app.post('/create', upload.single("image"), async (req, res) => {
      try {
      console.log(req.body);
      const imageName = req.file.filename;
      const {username,title, tagline, discription, genre } = req.body;
      const data1 = {
        username: username,
        title: title,
        tagline: tagline,
        discription: discription,
        genre: genre,
        image: imageName
      }
      const check = await collection2.findOne({ title: title })
      if (!check) {
        console.log(data1);
        await collection2.insertMany([data1])
        res.status(201).json({ message: 'Blog post created successfully' });
        
      } else {
        res.send("exist")
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error 0000' });
    }
  })

  app.get('/allposts', async (req, res) => {
    
    try {
      console.log('allpost api')
      const posts = await collection2.find({});
      res.send({status:"ok",data:posts})
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  app.get('/Motivational%20Blog', async (req, res) => {
    try {
      const posts = await collection2.find({ genre :'Motivational Blog'});
      res.send({status:"ok",data:posts})
      // res.json({ data: posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

  app.get('/Food%20Blog', async (req, res) => {
    try {
      const posts = await collection2.find({ genre :'Food Blog'});
      res.send({status:"ok",data:posts})
      // res.json({ data: posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/Tech%20Blog', async (req, res) => {
    try {
      const posts = await collection2.find({ genre :'Tech Blog'});
      res.send({status:"ok",data:posts})
      // res.json({ data: posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

  app.get('/Books%20Blog', async (req, res) => {
    try {
      const posts = await collection2.find({ genre :'Book Blog'});
      res.send({status:"ok",data:posts})
      // res.json({ data: posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/Fashion%20Blog', async (req, res) => {
    try {
      const posts = await collection2.find({ genre :'Fashion Blog'});
      res.send({status:"ok",data:posts})
      // res.json({ data: posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/Games%20Blog', async (req, res) => {
    try {
      const posts = await collection2.find({ genre :'Gaming Blog'});
      res.send({status:"ok",data:posts})
      // res.json({ data: posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/Other', async (req, res) => {
    try {
      const posts = await collection2.find({ genre :'Other'});
      res.send({status:"ok",data:posts})
      // res.json({ data: posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/Movie%20Blog', async (req, res) => {
    try {
      const posts = await collection2.find({ genre :'Movie Blog'});
      res.send({status:"ok",data:posts})
      // res.json({ data: posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

   app.get('/DetailedView/:id',async(req,res)=>{
    try {
      const posts = await collection2.findById(req.params.id);
      res.send({status:"ok",data:posts})
      // res.json({ data: posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

app.listen(8000,()=>{
    console.log("port connected");
})
//////////////////////////////////////////////////////////////

app.post("/upload-image", upload.single("image"), async (req, res) => {
  console.log(req.body);
  const imageName = req.file.filename;

  try {
    await collection2.create({ image: imageName });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-image", async (req, res) => {
  try {
    collection2.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
});
app.get("/get-image/:username", async (req, res) => {
  try {
    const data = await collection.findOne({ username: req.params.username });
    if (data && data.avatar) {
      // Send only the image property
      res.send({ status: "ok", image: data.avatar });
    } else {
      res.status(404).json({ status: "not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});



app.put("/update/:id",upload.single("image"), async (req, res) => {
  console.log(req.body);
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imageName = req.file.filename;
  const {username,title, tagline, discription, genre } = req.body;
      const data1 = {
        username: username,
        title: title,
        tagline: tagline,
        discription: discription,
        genre: genre,
        image: imageName
      }
  try {
    console.log('Updating post with ID:', req.params.id);
    console.log('Request body:', data1);
  
    const updatedPost = await collection2.findByIdAndUpdate(req.params.id, { $set: data1 });

    console.log('Updated post:', updatedPost);
    return res.status(200).json({ msg: "Post updated successfully" });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put("/updateProfile/:username",upload.single("image"), async (req, res) => {
  console.log(req.body);
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imageName = req.file.filename;
  const {username } = req.body;
      const data1 = {
        username: username,
        image: imageName
      }
  try {
    console.log('Updating post with ID:', req.params.username);
    console.log('Request body:', data1);
  
  
    const updatedPost = await collection.findOneAndUpdate(
      { username: username },
      { $set: { image: imageName } },
      { new: true }
    );

    console.log('Updated profile:', updatedPost);
    return res.status(200).json({ msg: "Profile updated successfully" });
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/delete/:id", async (request, response) => {
  try {
    const postId = request.params.id;
    const post = await collection2.findByIdAndDelete(postId);
    
    if (!post) {
      // If the post with the given ID is not found, return a 404 status
      response.status(404).json({ error: 'Post not found' });
    } else {
      // If the post is successfully deleted, return a success message
      response.status(200).json({ message: 'Post deleted successfully' });
    }
  } catch (error) {
    // If an error occurs during the deletion process, return a 500 status
    response.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/postsBy/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const posts = await collection2.find({username:username});
    res.send({status:"ok",data:posts})
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/totalBlogs/:username',async(req,res)=>{
  const { username } = req.params;
  try {
    const posts = await collection2.countDocuments({username:username})
    res.send({status:"ok",data:posts})
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})
app.get('/inspiration',async(req,res)=>{
})

app.post('/addcomment',async (req, res) => {
  try {
    debugger
    console.log(req.body);
    
      await collection3.insertMany(req.body)
      res.status(201).json({ message: 'comment posted successfully' });
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error 0000' });
  }
})

app.get('/getComments/:id',async (request, response) => {
  debugger
    try {
      console.log('this is get api ',request.params.id)
        const comments = await collection3.find({ postId: request.params.id });
        response.send({status:"ok",data:comments})
        
    } catch (error) {
        response.status(500).json(error)
    }
})

app.post('/like/:id/:username', async (req, res) => {
  try {
    const postId = req.params.id;
    const username = req.params.username;
    console.log('this is liked post api ',postId,username);
    // Assuming that collection2 is your MongoDB model for blog posts
    const post = await collection2.findById(postId);

    // Check if the user has already liked the post
    const alreadyLikedIndex = post.likes.indexOf(username);

    if (alreadyLikedIndex === -1) {
      // If not already liked, add the username to the likes array
      post.likes.push(username);
      await post.save();
      res.status(200).json({status:"ok",data:post});
    } else {
      // If already liked, remove the username from the likes array
      post.likes.splice(alreadyLikedIndex, 1);
      await post.save();
      res.status(200).json({status:"ok",data:post});
    }
  } catch (error) {
    console.error('Error liking/unliking post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/save/:id/:username', async (req, res) => {
  try {
    const postId = req.params.id;
    const username = req.params.username;
    console.log('this is saved post api ',postId,username);
    // Assuming that collection2 is your MongoDB model for blog posts
    const post = await collection2.findById(postId);

    // Check if the user has already liked the post
    const alreadySavedIndex = post.saved.indexOf(username);

    if (alreadySavedIndex === -1) {
      // If not already liked, add the username to the likes array
      post.saved.push(username);
      await post.save();
      res.status(200).json({status:"ok",data:post});
    } else {
      // If already liked, remove the username from the likes array
      post.saved.splice(alreadySavedIndex, 1);
      await post.save();
      res.status(200).json({status:"ok",data:post});
    }
  } catch (error) {
    console.error('Error liking/unliking post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/LikedpostsBy/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await collection2.findOne({ username });
    console.log(username)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const likedPosts = await collection2.find({ likes: username });
    console.log(likedPosts)
    res.json({ status: 'ok', data: likedPosts });
  } catch (error) {
    console.error('Error fetching liked posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/SavedpostsBy/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await collection2.findOne({ username });
    console.log(username)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const SavedPosts = await collection2.find({ saved: username });
    console.log(SavedPosts)
    res.json({ status: 'ok', data: SavedPosts });
  } catch (error) {
    console.error('Error fetching liked posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/deletecomment/:commentId', async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await collection3.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

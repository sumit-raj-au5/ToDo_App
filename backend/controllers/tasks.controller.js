const { default: mongoose } = require('mongoose');
const userModel = require('../models/user.model');
require('dotenv').config();
const DEBUG = +process.env.DEBUG;

const taskServices={

    //function to add a new task
    async addTask(req,res,next){
        
        const {tasks, user} = req.body;
        console.log(tasks);
        console.log(user);
        //checking if valid user is making request to create a new blog
        let exhistingUser;
        try{
            exhistingUser = await userModel.findOne({email:user});
        } 
        catch(err){
            if(DEBUG){
                console.log(`Error finding user when creating a new blog ${err}`);
            }
        }

        if(!exhistingUser){
         res.status(301).send({status:"permission denied", data:"User doesn't exist"});
        }
        else{
        console.log(`user found ${exhistingUser}`)
        try{
            const task = await userModel.findOneAndUpdate({email:user},{tasks:tasks},{new:true});
            if(DEBUG){
                console.log(`Task updated ${task}`);
            }
            res.status(200).send({status:"success", data:task});
        }
        catch(err){
            if(DEBUG){
                console.log(`Error in adding new task ${err.message}`);
            }
            res.status(501).send({status:"error", error:err.message});
        }
    }
    },

    //function to update a task
    // async updateTask(req, res, next){
    //       const blogId = req.params.id;
    //       const {title, description} = req.body;
    //       try{
    //         const blog = await blogModel.findByIdAndUpdate(blogId,{
    //             title,
    //             description
    //         },
    //         {new:true});
    //         if(DEBUG){
    //             console.log(`Blog updated ${blog}`);
    //         }
    //         res.status(200).send({status:"success", data:blog});
    //       }
    //       catch(err){
    //         if(DEBUG){
    //             console.log(`Error in updating blog ${err.message}`);
    //         }
    //         res.status(501).send({status:"error", error:err.message});
    //       }
    // },

    //function to get a task by ID
    // async getById(req,res,next){
    //     const blogId = req.params.id;
    //     try{
    //         const blog = await blogModel.findById(blogId);
    //         if(DEBUG){
    //             console.log(`Blog fetched by id ${blog}`);
    //         }
    //         res.status(200).send({status:"success", data:blog});
    //     }
    //     catch(err){
    //         if(DEBUG){
    //             console.log(`Error in fetching a blog ${err.message}`);
    //         }
    //         res.status(501).send({status:"error", error:err.message});
    //     }
    // },

    //function to delete a task by ID
    // async deletedById(req,res,next){
    //     const blogId = req.params.id;
    //     try{
    //         //populate will give detail of referenced collection
    //         const blog = await blogModel.findByIdAndDelete(blogId).populate("user");
    //         //deleting blog from user array
    //         const deletedBlogFromUserID = await blog.user.blogs.pull(blog);
    //         //need to save after pulling
    //         await blog.user.save();

    //         if(DEBUG){
    //             console.log(`Blog deleted`);
    //             console.log(`Blog ID deleted from user ${deletedBlogFromUserID}`);
    //         }
    //         res.status(200).send({status:"success", data:blog});
    //     }
    //     catch(err){
    //         if(DEBUG){
    //             console.log(`Error in deleting a blog ${err.message}`);
    //         }
    //         res.status(501).send({status:"error", error:err.message});
    //     }
    // },

    //function to fetch all blogs for one user
    async getTaskByUser (req,res,next){
        const email = req.params.email;
        let userTasks;
        try{
            userTasks = await userModel.findOne({email});
            if(!userTasks){
                res.status(404).send({status:error, data:"no blogs found"});
            }
            if(DEBUG)
            console.log(`User Tasks fetched ${userTasks.tasks}`)
            res.status(200).send({status:"success", data:userTasks.tasks});
        }
        catch(err){
            if(DEBUG)console.log(`Error fetching task of a user ${err.message}`);
            res.status(500).send({status:"error", error:err.message});
        }
    }
}

module.exports = taskServices;
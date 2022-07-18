const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            unique:true
        },
        desc:{
            type:String,
            required:true
        },
        photo:{
            type:String,
            required:false,
        },
        username:{
         type:String,
         required:true,   
        },
        categories:{
            type:Array,
            required:false
        },
        rates:[
            {
                username:{
                    type:String,
                    unique:true
                },
                rate:{
                    type:Number,
                    unique: true,
                    default:0
                }
            }
        ]
    },
    {timestamps:true}
);

module.exports = mongoose.model("Post", PostSchema);
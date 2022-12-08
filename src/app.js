const mongoose = require("mongoose");
const validator = require("validator");
// creating connection
mongoose.connect("mongodb://localhost:27017/ttchannel")
.then( () => console.log("Connection successfull"))
.catch( (err) => console.log(err));

const playlistSchema = new mongoose.Schema({
    name : {
        type:String,
        required : true,
        // unique : true,
        lowercase : true,
        minLength : [2,"Minimum 2 letters required"]
    },
    email :  {
        type:String,
        required : true,
        minLength : [3,"Minimum 3 letters required"],
        validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Email is invalid");
                }
            }
    },
    type :  {
        type:String,
        required : true,
        // lowercase : true,
        minLength : [2,"Minimum 2 letters required"],
        enum : ["Front End","Back End","database"]
    },
    videos : {
        type:String,
        validate(value){
            if(value <= 0){
                throw new Error("Value must be greater than zero");

            }
        }
        // validate:{
        //     validator: function(value){
        //         return value <= 0
        //     },
        //     message: "Value must be greater than zero"
        // }
    },
    active : Boolean,
    date : {
        type:Date,
        default: Date.now()
    }
})
// create collection
const Playlist = new mongoose.model("Playlist", playlistSchema);

// create a document
const createDocument = async () => {
    try{
        const jsPlaylist = new Playlist({
            name : "php",
            email : "a@ss.co",
            type : "Back End",
            videos : 40,
            active : true
        });
        // const mongoPlaylist = new Playlist({
        //     name : "mongoDb",
        //     type : "database",
        //     videos : 6,
        //     active : true
        // });
        // const mongoosePlaylist = new Playlist({
        //     name : "mongoose",
        //     type : "database",
        //     videos : 7,
        //     active : true
        // });
        // const expressPlaylist = new Playlist({
        //     name : "ExpressJs",
        //     type : "Back End",
        //     videos : 8,
        //     active : true
        // });
        const result = await Playlist.insertMany([jsPlaylist]);
        console.log(result);
    } catch(err){
        console.log(err);
    }

}
createDocument();

// to update document
const updateDocument = async (_id) =>{
    try{
        // const result = await Playlist.updateOne({type:"Front End"}, {$set:{name:"React Js"}});
        const result = await Playlist.findByIdAndUpdate({_id}, {$set:{
            name:"Node Js",
            videos: 30,
        }},{new: true});
        console.log(result);
    }catch(err){
        console.log(err);
    }
}
// updateDocument("61b70c907c1fe45350060f35");

// to get document 
const getDocument = async () =>{
    try{
        const result = await Playlist
        // .find({$or : [{type:"Back End"}, {name:"ReactJs"}]})
        // .find({$and : [{type:"Back End"}, {name:"Node Js"}]})
        // .find({type:{$ne:"Back End"}})
        // .find({$nor: [{name: "ReactJs"}, {name: "ExpressJs"}]})
        .find();
        // .sort({name: -1})
        // .select({name:1})
        // .countDocuments()
        // .limit(1);
        console.log(result);
    }catch(err){
        console.log(err);

    }

}
// getDocument();

// to delete document
const deleteDocument = async () =>{
    try{
        const result = await Playlist.deleteMany({type:"database"});
        console.log(result);
    }catch(err){
        console.log(err);

    }

}
// deleteDocument();

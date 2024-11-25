const mongoose=require('mongoose')

const authSchema= mongoose.Schema( {
name:{
    type: String ,
    required : true
},
email: {type:String,required:true,unique:true},
password:{type:String,required:true},
role : {
    type:String,
    default:"user"
},
userName:{type:String},
phone:{type:String},
adresse:{type:String}

})

module.exports = mongoose.model('authSchema',authSchema)
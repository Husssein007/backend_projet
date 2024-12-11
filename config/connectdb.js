const mongoose=require('mongoose')

const connectdb=async()=>{
    
    try{
       await mongoose.connect('mongodb+srv://husseinlimem8:0ngM69ZwADdxhr9Y@cluster0.q7gmaoz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('you are connected to your db')

    }
    catch(err){
        console.log(err )
    }

}
module.exports=connectdb
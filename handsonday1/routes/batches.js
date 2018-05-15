const dbb=require('../makedatabase').Batch
const route=require('express').Router()

    route.route("/").get((req,res)=>{
        
        dbb.findAll({}).then(result=>res.json(result))
   .catch(errror=>{
res.status(412).json({msg:error.message});
        });
    })
    .post((req,res)=>{
 dbb.create(req.body).then(result=>res.json(result))
.catch(error=>{
    res.status(412).json({msg:error.message});
})
    });
   
route.route("/:id").get((req,res)=>{

    dbb.findOne({where:{ batchid :req.params.id}}).
    then(result=>{
        if(result){
            res.json(result);
        }
        else{
            res.sendStatus(404);
        }
        }
    )
    .catch(error=>{
        res.status(412).json({msg:error.message})
    })
})
.put((req,res)=>{

    dbb.update(req.body,{where :{batchid: req.params.id}})
    .then(result=>{dbb.findOne({where:{batchid:req.params.id}}).then(ress=>{res.send(ress);console.log(ress)})})
    .catch(error=>res.sendStatus(412).json({msg:error.message}));

})
.delete((req,res)=>{
dbb
.destroy({where:{batchid:req.params.id}})
.then(result => res.sendStatus(204))
.catch(error =>{
    res.status(412).json({msg:error.message});
});
});
module.exports=route;
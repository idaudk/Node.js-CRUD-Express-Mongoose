var Userdb = require('../model/model');

//create and save new user
exports.create = (req, res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({
            message: 'content cant be empty!'
        });
        return;
    }

    //new user
    var user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    //saving in mongo
    user.save(user)
    .then(data=>{
        
        res.redirect('/add-user')
    })
    .catch(err=> {
        res.status(500).send({
            message: err.message || 'something went wrong'
        })
        console.log(err)})
}

//retrive and return all user data /or single user data
exports.find = (req, res)=>{

    if(req.query.id){
        console.log('ID found')
        const id = req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    message: 'user not found '+id
                })
            }else {
                res.send(data)
            }
           
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || 'server error'
            })
        })

    }else {
            Userdb.find()
            .then(user=>{
                res.send(user);
            })
            .catch(err=>{
                res.status(500).send({
                    message: err.message || 'something went wrong'
                })
            })

    }
    
}

//update a identified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res.status(400).send({
            message: "data to update cannot be empty!"
        })
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data=>{
        if(!data){
            res.status(404).send({
                message: 'no user found'
            }) 
        }else {
            res.send(data);
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || 'error in saving user data'
        })
    })
}

//delete a user
exports.delete = (req, res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({
                message: 'cannot delete user'
            });
        }
        else{
            res.send({
                message: 'User deleted sucessfully!'
            });
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: err.message || 'server error'
        });
    });
}
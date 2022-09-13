const axios = require('axios');
const { response } = require('express');



exports.homeRoute = (req, res)=>{
    //make request for user data /api/users
    axios.get('http://localhost:3000/api/users')
    .then(function(data){
        // console.log(data);
        res.render('index.ejs', {title: 'Dashboard', users: data.data});    
    })
    .catch(err=>{
        res.send(err);
    })

}

exports.add_user = (req, res)=>{
    res.render('add_user.ejs', {title: 'Add User'});
}

exports.update_user = (req, res)=>{
    axios.get('http://localhost:3000/api/users', {params: {id: req.query.id}})
    .then(function(userdata){
        res.render('update_user.ejs', {title: 'Update User', user: userdata.data});
    })
    .catch(err=>{
        res.send(err);
    })

}
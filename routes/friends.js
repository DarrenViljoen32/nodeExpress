import express from "express";
import {getFriends, getFriend, addFriend, updateFriend, deleteFriend} from '../database.js'
const router = express.Router()

//advance routing example
router
    .route('/')
        .get(async (req,res)=>{
            res.send(await getFriends())
            })
        .post(async (req,res)=>{
            const {name,age} = req.body
            // const name = req.body.name
            // const age = req.body.age 
            const post = await addFriend(name,age)
            res.send(await getFriends())
            })

//normal routing example
router.get('/:id', async (req,res)=>{
    res.send(await getFriend(+req.params.id))
})
router.delete('/:id', async (req,res)=>{
    // const {name,age} = req.body
    // const del = await deleteFriend(name,age)
    await deleteFriend(+req.params.id)
    res.json(await getFriends())
})
router.patch('/:id', async (req,res)=>{
    const [friend] = await getFriend(+req.params.id)
    let {name,age} = req.body
    name ? name = name: {name} = friend
    age ? age = age: {age} = friend
    console.log(friend);
    await updateFriend(name,age,+req.params.id) 
    res.json(await getFriends())
})

export default router 
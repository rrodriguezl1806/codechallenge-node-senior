const User = require('../models/user')

async function getUsers(req, res) {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send({ messageError: 'Error' })
        return res.status(200).send( {users: users})
    })

    // try {
    //     const users = await promise.get('/users')
    //     return res.status(200).json(users.data);
    // } catch (error) {
    //     return res.status(500).json({message: error});
    // }
}

async function getUserById(req, res) {
    const userId = req.params.userId

    if (isNaN(userId)) return res.status(400).json({error: "Invalid user id"})

    User.findById(userId, (res, user) => {
        if (err) return res.status(500).send({ messageError: 'Error' })
        if (!user) return res.status(401).send({ messageError: 'The user does not exist' })

        return res.status(200).send( {user: user})
    })

    // try {
    //     const response = await userById(res, userId);
    //     if (response.data.length === 0) return res.status(404).json('User not found')
    //
    //     res.status(200).json(response.data)
    // } catch (error) {
    //     res.status(500).json({messageError: error});
    // }
}

async function createUser(req, res) {

    let user = new User()
    user.name = req.body.name
    user.email = req.body.email
    user.birthDate = req.body.birthDate
    user.address = req.body.address

    user.save((err, userSaved) => {
        if (err) return res.status(500).send({ messageError: 'Error to saved' })
        return res.status(200).send(userSaved)
    })

    // try {
    //     //Check if exist
    //     if (user.id != null) {
    //         const response = await userById(res, user.id);
    //         if (response.data.length > 0) return res.status(400).json('The Id already exist.')
    //     }
    //     // Create user
    //     const newUser = await promise.post('/users', user)
    //     res.status(200).json(newUser.data)
    //
    // } catch (error) {
    //     res.status(500).json({messageError: error});
    // }
}

async function updateUser(req, res) {
    const userId = req.params.userId
    const dataUpdate = req.body

    if (isNaN(userId)) return res.status(400).json({error: "User id is not a number"})

    User.findByIdAndUpdate(userId, dataUpdate, (err, userUpdated) => {
        if (err) return res.status(500).send({ messageError: 'Error' })
        if (!userUpdated) return res.status(401).send({ messageError: 'The user does not exist' })

        return res.status(200).send({user: userUpdated})
    })

    // try {
    //     const response = await userById(res, userId);
    //     if (response.data.length === 0) return res.status(404).json('User not found')
    //
    //     // Update
    //     const userUpdated = await promise.put(`/users/${userId}`, req.body)
    //     res.status(200).json(userUpdated.data)
    // } catch (error) {
    //     res.status(500).json({messageError: error});
    // }
}

async function deleteUser(req, res) {
    const userId  = req.params.userId

    if (isNaN(userId)) return res.status(400).json({error: "User id is not a number"})

    User.findByIdAndDelete(userId, (err, userDeleted) => {
        if (err) return res.status(500).send({ messageError: 'Error' })
        if (!userDeleted) return res.status(401).send({ messageError: 'The user does not exist' })

        return res.status(200).send({message: 'User deleted'})
    })

    // try {
    //     const response = await userById(res, userId);
    //     if (response.data.length === 0) return res.status(404).json('User not found')
    //
    //     // Delete
    //     await promise.delete(`/users/${userId}`)
    //     res.status(200).json({message: 'User deleted'})
    // } catch (error) {
    //     res.status(500).json({messageError: error});
    // }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
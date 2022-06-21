const promise = require("../utils/promise");


async function userById(res, userId) {
    return await promise.get(`/users?id=${userId}`)
}

async function getUsers(req, res) {
    try {
        const users = await promise.get('/users')
        return res.status(200).json(users.data);
    } catch (error) {
        return res.status(500).json({message: error});
    }
}

async function getUserById(req, res) {
    const {userId} = req.params

    if (isNaN(userId)) return res.status(400).json({error: "Invalid user id"})

    try {
        const response = await userById(res, userId);
        if (response.data.length === 0) return res.status(404).json('User not found')

        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({messageError: error});
    }
}

async function createUser(req, res) {
    const user = req.body
    try {
        //Check if exist
        if (user.id != null) {
            const response = await userById(res, user.id);
            if (response.data.length > 0) return res.status(400).json('The Id already exist.')
        }
        // Create user
        const newUser = await promise.post('/users', user)
        res.status(200).json(newUser.data)

    } catch (error) {
        res.status(500).json({messageError: error});
    }
}

async function updateUser(req, res) {
    const {userId} = req.params

    if (isNaN(userId)) return res.status(400).json({error: "User id is not a number"})

    try {
        const response = await userById(res, userId);
        if (response.data.length === 0) return res.status(404).json('User not found')

        // Update
        const userUpdated = await promise.put(`/users/${userId}`, req.body)
        res.status(200).json(userUpdated.data)
    } catch (error) {
        res.status(500).json({messageError: error});
    }
}

async function deleteUser(req, res) {
    const {userId} = req.params

    if (isNaN(userId)) return res.status(400).json({error: "User id is not a number"})

    try {
        const response = await userById(res, userId);
        if (response.data.length === 0) return res.status(404).json('User not found')

        // Delete
        await promise.delete(`/users/${userId}`)
        res.status(200).json({message: 'User deleted'})
    } catch (error) {
        res.status(500).json({messageError: error});
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
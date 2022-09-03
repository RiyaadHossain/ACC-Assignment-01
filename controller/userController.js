const fs = require('fs');
let data = fs.readFileSync("data.json")
let parsedData = JSON.parse(data)

// 1. Get Random User________________________
module.exports.randomUser = (req, res) => {

    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    if (data) {
        const randomNum = random(1, parsedData.length)
        const randomUser = parsedData.find(user => user.Id == Number(randomNum))
        res.status(200).json({ data: randomUser })
    } else {
        res.status(500).json({ error: "Internal Server Error!" })

    }

}

// 2. Get All Users________________________
module.exports.allUser = (req, res) => {

    const { limit } = req.query

    if (parsedData) {
        const selectedData = parsedData.slice(0, limit ? limit : Infinity)
        console.log(selectedData);
        res.status(200).json({ data: selectedData })
    } else {
        res.status(500).json({ error: "Internal Server Error" })
    }

}

// 3. Save a User________________________
module.exports.saveUser = (req, res) => {

    const { Id, gender, name, contact, address, photoUrl } = req.body
    if (Id && gender && name && contact && address && photoUrl) {

        const idExist = parsedData.find(user => user.Id == Number(Id))
        if (idExist) {
            res.status(403).json({ error: "Id is already Exist" })
        } else if (typeof Number(Id) == "number" && Number(Id) > 0) {
            parsedData.push({ Id, gender, name, contact, address, photoUrl })
            fs.writeFileSync("data.json", JSON.stringify(parsedData))
            res.status(201).json({ message: "Your data has been saved successfully." })
        } else {
            res.status(403).json({ error: "The Id you privided isn't correct!" })
        }

    } else {
        res.status(403).json({ error: "You must provide Id, gender, name, contact, address, photoUrl properties" })
    }

}

// 4. Update a User________________________
module.exports.updateUser = (req, res) => {

    const { Id, gender, name, contact, address, photoUrl } = req.body
    if (!Id || !gender || !name || !contact || !address || !photoUrl) {
        return res.status(403).json({ error: "Please provide Id, gender, name, contact, address, photoUrl property." })
    }

    const updatedUser = { Id, gender, name, contact, address, photoUrl }
    const userExist = parsedData.find(user => user.Id == Number(Id))
    if (!userExist) {
        console.log(userExist)
        res.status(403).json({ error: "User data not found" })
    } else if (updatedUser) {
        parsedData = parsedData.map(user => user.Id != Number(Id) ? user : updatedUser)
        fs.writeFileSync("data.json", JSON.stringify(parsedData))
        res.status(201).json({ message: "User data updated successfully" })
    } else {
        res.status(500).json({ error: "Internal Server Error" })
    }

}

// 5. Update Random Users________________________
module.exports.updateRandomUsers = (req, res) => {

    const { Id, gender, name, contact, address, photoUrl } = req.body
    const updatedUser = { Id, gender, name, contact, address, photoUrl }

    if (!Id || !gender || !name || !contact || !address || !photoUrl) {
        return res.status(403).json({ error: "Please provide Id, gender, name, contact, address, photoUrl property." })
    }

    Id.forEach(id => {
        if (isNaN(id) || !id) {
            return res.status(403).json({ error: "Please provide valid data" })
        }
    })

    parsedData.forEach(user => {
        Id.filter(id => user.Id == id ? updateUser(user) : null)
    });

    function updateUser(user) {
        parsedData = parsedData.map(data => data.Id == user.Id ? { ...updatedUser, Id: user.Id } : data)
    }

    fs.writeFileSync("data.json", JSON.stringify(parsedData))
    res.status(201).json({ message: "Users data updated successfully" })

}

// 6. Delete a User________________________
module.exports.deleteUser = (req, res) => {
    const { Id } = req.body
    const selectedUser = parsedData.filter(user => user.Id !== Number(Id))

    if (isNaN(Number(Id)) || !Id) {
        res.status(403).json({ error: "Please provide the correct Id" })
    }
    else if (parsedData.length == selectedUser.length) {
        res.status(403).json({ error: "User not found! Please type the correct Id." })
    }
    else if (selectedUser) {
        fs.writeFileSync("data.json", JSON.stringify(selectedUser))
        res.status(201).send({ message: "User deleted successfully." })
    } else {
        res.status(403).json({ error: "User not found! Please type the correct Id." })
    }
}

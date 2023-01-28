import jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"

export const createJWT = (user) => {
    const token = jwt.sign({ id: user.id, username: user.username}, process.env.JWT_SECRET)
    return token
}

export const authorize = (req, res, next) => {
    const bearer = req.headers.authorization;

    if(!bearer) {
        console.log("Invalid headers")
        res.status(401)
        res.send("Unauthorized.")
        return;
    }

    const [, token] = bearer.split(" ")

    if(!token) {
        console.log("Invalid Token")
        res.status(401)
        res.send("Unauthorized")
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        console.log(payload)
        next()
        return;
    } catch (e) {
        console.error(e)
        res.status(401)
        res.send("Unauthorized")
        return;
    }
}

export const checkPass = (password, hash) => {
    return bcrypt.compare(password, hash)
}

export const hashPass = (password) => {
    return bcrypt.hash(password, 5)
}
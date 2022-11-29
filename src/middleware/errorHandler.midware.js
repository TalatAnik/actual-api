const express = require("express")


const sendError = (req,res, next) => {
    res.status(404)
    res.json({message:"bad endpoint"})
    next()
}

module.exports = sendError
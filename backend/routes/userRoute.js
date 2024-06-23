const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const router = express.Router();    

// Create user
router.post("/", async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const userAdded = await User.create({ name, email, age });
        res.status(201).json(userAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

// Get all users
router.get("/", async (req, res) => {
    try {
        const showall = await User.find();
        res.status(200).json(showall);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Get single user by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findById(id);
        if (!singleUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(singleUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findByIdAndDelete(id);
        if (!singleUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(singleUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Update user by ID
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true, // Ensure validation runs on update
        });
        if (!updateUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
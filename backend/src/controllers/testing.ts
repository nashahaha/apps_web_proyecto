import express from "express";
import User from "../models/users.js";
import Recipe from "../models/recipe.js";

const router = express.Router();

router.post("/reset", async (_req, res) => {
    await User.deleteMany({});
    await Recipe.deleteMany({});
    res.status(204).end();
});

export default router;

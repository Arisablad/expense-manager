import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("Hello World!");
  res.send("Hello World!");
});

export default router;

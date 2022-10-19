const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");

router.get("/readall", controller.getAll);
router.post("/create", controller.createUser);
router.put("/update/:id", controller.updateUserById);
router.delete("/delete/:id", controller.deleteUserById);

module.exports = router;

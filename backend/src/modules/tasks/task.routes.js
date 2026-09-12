const express = require("express");

const {
    create,
    getAll,
    getOne,
    update,
    remove,
} = require("./task.controller");

const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
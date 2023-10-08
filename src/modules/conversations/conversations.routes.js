const { Router } = require("express");
const {
  createConversation,
  createGroupConversation,
  getAllConversations,
} = require("./conversations.controllers");
const authenticate = require("../../middlewares/auth.middleware");

const router = Router();

router.post("/", authenticate, createConversation);
router.post("/group", authenticate, createGroupConversation);

router.get("/:id", authenticate, getAllConversations);

module.exports = router;

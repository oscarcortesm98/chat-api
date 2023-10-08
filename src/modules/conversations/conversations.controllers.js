const { Conversation, User, Participant } = require("../../models");

const createConversation = async (req, res, next) => {
  try {
    const { userId, participantId } = req.body;

    const conversation = await Conversation.create({ createdBy: userId });

    const user = await User.findByPk(userId);
    const participant = await User.findByPk(participantId);

    await conversation.addUser(user);
    await conversation.addUser(participant);

    res.status(201).end();

  } catch (error) {
    next(error);
  }
};

const createGroupConversation = async (req, res, next) => {
  
  try {
    const { userId, participantsIds, title } = req.body;
    const conversation = await Conversation.create({
      createdBy: userId,
      title,
      type: "group",
    });

    const createParticipants = [...participantsIds, userId].map(
      (participant) => ({
        ConversationId: conversation.id,
        UserId: participant,
      })
    );

    await Participant.bulkCreate(createParticipants);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const getAllConversations = async (req, res, next) => {
  try {
    const { id } = req.params;

    const conversations = await Participant.findAll({
      where: { UserId: id },
      include: {
        model: Conversation,
        include: {
          model: Participant,
          attributes: ["UserId"],
          include: {
            model: User,
            attributes: ["firstname", "lastname", "avatar"],
          },
        },
      },
    });
    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConversation,
  createGroupConversation,
  getAllConversations,
};

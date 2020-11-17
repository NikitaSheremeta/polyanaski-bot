const Users = require('../models/users');

const { logger } = require('../util/logger');

module.exports.addNewUser = async (userID, ctx) => {
  const userData = {
    _id: userID,
    created: new Date().getTime(),
    username: ctx.from.username,
    name: `${ctx.from.first_name} ${ctx.from.last_name}`,
    language: ctx.i18n.languageCode
  };

  const newUser = new Users(userData);

  try {
    await newUser.save();
  } catch (error) {
    logger.debug(ctx, 'New user has NOT been added');
    logger.debug(ctx, error);
  }
};

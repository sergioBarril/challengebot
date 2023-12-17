const { Events } = require("discord.js");

const logger = require("../config/logger");

/**
 * Ready event
 * @type {import("../interfaces/event").Event}
 */
const onReady = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    const { user } = client;
    if (user) logger.info(`Ready! Logged in as ${user.tag}`);
    else logger.info("Ready! Logged in as a userless client");
  },
};

module.exports = onReady;

const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

/**
 * Ping command
 *
 * @param {import("discord.js").CommandInteraction} interaction
 */
async function execute(interaction) {
  await interaction.reply("Pong!");
}

/**
 * Ping command
 *
 * @type {import("../../interfaces/command").Command}
 */
const ping = {
  data,
  execute,
};

module.exports = ping;

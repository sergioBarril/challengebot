const { Events } = require("discord.js");
const ApiError = require("../errors/api-error.error");
const logger = require("../config/logger");

/**
 * Error handler
 *
 * @param {import("discord.js").Interaction} interaction
 * @param {Error} error
 */
async function errorHandler(interaction, error) {
  if (!interaction.isChatInputCommand() && !interaction.isButton()) return;

  let content = "There was an error while executing this command!";
  if (error instanceof ApiError && error.statusCode < 500) {
    logger.warn(error, error.message);
    content = error.message;
  } else logger.error(error);

  const response = { content, ephemeral: true };
  if (interaction.replied || interaction.deferred) {
    await interaction.followUp(response);
  } else {
    await interaction.reply(response);
  }
}

/**
 * Command handler
 *
 * @param { import("discord.js").ChatInputCommandInteraction } interaction
 */
async function commandHandler(interaction) {
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command)
    throw new Error(
      `No command matching ${interaction.commandName} was found.`,
    );

  await command.execute(interaction);
}

/**
 * Button handler
 *
 * @param {import("discord.js").ButtonInteraction} interaction
 */
async function buttonHandler(interaction) {
  const button = interaction.client.buttons.get(interaction.customId);

  if (!button) {
    throw new Error(`No button matching ${interaction.customId} was found.`);
  }

  await button.execute(interaction);
}

/**
 * Execute the interaction
 *
 * @param {Interaction} interaction
 */
async function execute(interaction) {
  try {
    if (interaction.isButton()) await buttonHandler(interaction);
    else if (interaction.isChatInputCommand())
      await commandHandler(interaction);
  } catch (error) {
    await errorHandler(interaction, error);
  }
}

/**
 * InteractionCreate event
 * @type {import("../interfaces/event").Event}
 */
const onInteractionCreate = {
  name: Events.InteractionCreate,
  once: false,
  execute,
};

module.exports = onInteractionCreate;

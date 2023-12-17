const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("button")
  .setDescription("Create a button with the given custom id")
  .addStringOption((option) =>
    option
      .setName("custom-id")
      .setDescription("Custom-id for the button")
      .setRequired(true),
  );

/**
 * Create Button command
 *
 * @param {import("discord.js").CommandInteraction} interaction
 */
async function execute(interaction) {
  if (!interaction.isChatInputCommand()) throw new Error("Not a command");
  const customId = interaction.options.getString("custom-id", true);
  const button = new ButtonBuilder()
    .setCustomId(customId)
    .setLabel("Click me!")
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder().addComponents(button);

  await interaction.reply({
    content: `Button with custom-id: ${customId}`,
    components: [row],
  });
}

/**
 * @type {import("../../interfaces/command").Command}
 */
const newButtonCommand = {
  data,
  execute,
};

module.exports = newButtonCommand;

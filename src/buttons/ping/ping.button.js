module.exports = {
  data: { name: "ping" },
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  async execute(interaction) {
    await interaction.reply("Pong button!");
  },
};

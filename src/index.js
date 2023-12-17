const { Client, Collection, GatewayIntentBits } = require("discord.js");
const logger = require("./config/logger");
const { loadButtons, loadCommands, loadEvents } = require("./config/startup");

// Get ENV variables
const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.commands = new Collection();

// Register commands
const commands = loadCommands();
commands.forEach((command) => {
  if (!command.data || !command.execute) return;
  logger.info(`Registering command ${command.data.name}`);
  client.commands.set(command.data.name, command);
});

// Register buttons
client.buttons = new Collection();

const buttons = loadButtons();
buttons.forEach((button) => {
  if (!button.data || !button.execute) return;
  logger.info(`Registering button ${button.data.name}`);
  client.buttons.set(button.data.name, button);
});

// Event handling
const events = loadEvents();
events.forEach((event) => {
  if (!event.name || !event.execute) return;
  if (event.once)
    client.once(event.name, (...args) => event.execute(...args, client));
  else client.on(event.name, (...args) => event.execute(...args, client));
});

// Log in to Discord with your client's token
client.login(token);

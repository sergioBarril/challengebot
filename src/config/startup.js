/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const { readdirSync } = require("fs");
const path = require("path");

/**
 * Get all the commands in the commands folder
 *
 * @returns {import("../interfaces/command").Command[]} An array of commands
 */
function loadCommands() {
  const commandsPath = path.join(__dirname, "..", "commands");
  const commandFolders = readdirSync(commandsPath);

  /** @type {string[]} */
  const commandUrls = [];

  for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);

    const commandFiles = readdirSync(folderPath).filter((file) =>
      file.endsWith(".command.js"),
    );

    for (const file of commandFiles) {
      const filePath = path.join(folderPath, file);
      commandUrls.push(filePath);
    }
  }

  const commands = commandUrls
    .map((commandPath) => require(commandPath))
    .flat();

  return commands;
}

/**
 * Get all the buttons in the buttons folder
 *
 * @returns {import("../interfaces/button").Button[]} An array of buttons
 */
function loadButtons() {
  const buttonsPath = path.join(__dirname, "..", "buttons");
  const buttonsFolders = readdirSync(buttonsPath);

  const buttonUrls = [];

  for (const folder of buttonsFolders) {
    const folderPath = path.join(buttonsPath, folder);

    const buttonFiles = readdirSync(folderPath).filter((file) =>
      file.endsWith(".button.js"),
    );

    for (const file of buttonFiles) {
      const filePath = path.join(folderPath, file);
      buttonUrls.push(filePath);
    }
  }

  const buttons = buttonUrls.map((buttonPath) => require(buttonPath)).flat();

  return buttons;
}

/**
 * Get all the events in the events folder
 *
 * @returns {import("../interfaces/event").Event[]} An array of Events
 */
function loadEvents() {
  const eventsFolder = path.join(__dirname, "..", "events");
  const eventFiles = readdirSync(eventsFolder);

  return eventFiles.map((file) => {
    const filePath = path.join(eventsFolder, file);
    return require(filePath);
  });
}

module.exports = {
  loadCommands,
  loadButtons,
  loadEvents,
};

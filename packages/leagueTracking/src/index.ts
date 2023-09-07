import {Client, Collection, GatewayIntentBits} from "discord.js";
import * as path from "path";
import * as fs from "fs";

require('dotenv').config();

// Create a new client instance. Guild is a discord server
const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection();

const foldersPath = path.join(__dirname, './../commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // set new item in the collection
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] THe command at ${filePath} is missing a required
        "data"or "execute" property.`);
        }
    }
}

const eventsPath = path.join(__dirname, './../events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}


// when client is ready, run this
// c is for event parameter, not to confuse with client
client.login(process.env.BOT_TOKEN);

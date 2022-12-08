
require('dotenv').config({ path: '.env.local' });
require('dotenv').config();
const path = require('path');
const loggerModule = require(path.join(__dirname, "./logger.js"))
const logger = new loggerModule.Logger()

const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
    ]
});
client.on('ready', () => {
    logger.log(`Logged in as ${client.user.tag}!`);
});


/**
 * Must stay at the bottom of the script
 */
if (!!process.env.DISCORD_TOKEN) client.login(process.env.DISCORD_TOKEN);
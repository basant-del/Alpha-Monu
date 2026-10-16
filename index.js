import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from "discord.js";


const PREFIX = '?';

// Create a new client instance
const client = new Client({
    intents:
        [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,  // Required to receive guild messages
            GatewayIntentBits.MessageContent
        ]
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


client.on(Events.MessageCreate, async message => {
    // Ignore messages from bots or messages that don't start with the prefix
    // if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    // Parse the command name and arguments
    const content = message.content
    const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();

    // Handle commands
    if (commandName === 'ping') {
        await message.reply('Pong!');
    }
    
    if (commandName === 'say') {
        const textToSay = args.join(' ');
        if (!textToSay) return message.reply('Please provide text to say!');
        await message.channel.send(textToSay);
    }

    if (content === 'hi'){
        await message.reply(`Hello, ${message.author.displayName}!`)
    }
});

client.login(process.env.TOKEN);
import * as dotenv from 'dotenv'
dotenv.config()
import Discord from 'discord.js'

const client = new Discord.Client({ intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages
  ]})

const fetchMessages = async (channelId) => {
    const channel = await client.channels.fetch(channelId);
    if (!channel) {
        throw new Error('Channel not found.');
    }

    const messages = await channel.messages.fetch({ limit: 3 });
    messages.forEach((message) => {
        console.log(` - ${message.content}`);
    });
};

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    
    const channelId = process.env.CHANNEL_ID;
    fetchMessages(channelId).catch((error) => {
        console.error(error.message);
    });
});

client.login(process.env.BOT_TOKEN);

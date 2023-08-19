import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import Discord from 'discord.js'
import {promises as fs} from 'fs';
dotenv.config()

async function save_json(data,rel_path){
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filepath = join(__dirname,rel_path)
    await fs.writeFile(filepath,JSON.stringify(data,undefined, 2))
    console.log(` saved json file ${filepath}`)
}


const client = new Discord.Client({ intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages
  ]})

const fetchMessages = async (channelId) => {
    const channel = await client.channels.fetch(channelId);
    if (!channel) {
        throw new Error('Channel not found.');
    }

    const raw_messages = await channel.messages.fetch();
    const messages = raw_messages.map(message=> message.cleanContent)
    await save_json(messages,`messages/${channel.name}-${channelId}.json`)
};

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    
    const channelId = process.env.CHANNEL_ID;
    fetchMessages(channelId).catch((error) => {
        console.error(error.message);
    });
    client.destroy()
});

client.login(process.env.BOT_TOKEN);

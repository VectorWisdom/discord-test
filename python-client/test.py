import os
from dotenv import load_dotenv
import discord

load_dotenv()

intents = discord.Intents.default()
intents.message_content = True
client = discord.Client(intents=intents)

async def fetch_messages(channel_id):
    print(f"fetching messages from {channel_id}")
    channel = client.get_channel(channel_id)
    if(channel is None):
        raise ValueError("Channel is None")
    messages = await channel.history(limit=3).flatten()
    for message in messages:
        print(message.content)
    return

@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')
    await fetch_messages(os.getenv('CHANNEL_ID'))

client.run(os.getenv('BOT_TOKEN'))


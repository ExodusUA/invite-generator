const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildInvites,
    ],
});

client.once(Events.ClientReady, (client: typeof Client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});

async function createServerInvite() {
    const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID);
    const channel = guild.channels.cache.get(process.env.DISCORD_CHANNEL_ID);

    const maxAgeUpperBound = 2592009;
    const maxAgeLowerBound = maxAgeUpperBound - 10000;

    let RandomAge = Math.floor(Math.random() * (maxAgeUpperBound - maxAgeLowerBound + 1)) + maxAgeLowerBound;
    const invite = await channel.createInvite({ maxAge: RandomAge, maxUses: 1 });
    console.log(`Created invite: ${invite.url}`);
    return invite.url;
}

async function checkInviteValidity(invite: string) {
    try {
        const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID);
        const inviteData = await guild.invites.fetch(invite);
        if (inviteData.uses === 0) return 'valid'

    } catch (error) {
        return 'used';
    }
}

client.login(process.env.DISCORD_BOT_TOKEN);

export { createServerInvite, checkInviteValidity };

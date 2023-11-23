import userController from "../Controllers/userController";
import apiController from "../Controllers/apiController";
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

async function checkAllInvites() {
    const UserController = new userController();
    const APIController = new apiController();
    const invites = await UserController.getUnusedInvites();
    console.log(invites)
    for (const invite of invites) {
        const linkStatus: any = await checkInviteValidity(invite.discordLink.replace('https://discord.gg/', ''));

        if (linkStatus === 'used') {
            console.log(`Invite ${invite.discordLink} is used, uid: ${invite.inviteID}`)
            APIController.treatCoinCallback(invite.inviteID, invite.requestID);
            UserController.makeInviteUsed(invite.inviteID);
        }
    }

}

client.on('guildMemberAdd', async (member: any) => {
   setTimeout(async () => {
    checkAllInvites();
   }, 1000);
});

client.login(process.env.DISCORD_BOT_TOKEN);

export { createServerInvite, checkInviteValidity };

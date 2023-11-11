import axios from 'axios';
import User, { IUser } from '../db/models/user';
import { createServerInvite, checkInviteValidity } from '../discord/discord';

class userController {

    async addInviteID(inviteID: string) {

        const userData = await this.checkInviteID({ inviteID: inviteID });

        if (userData !== false) return userData

        const inviteLink = await createServerInvite();

        const user: IUser = new User({
            inviteID: inviteID,
            discordLink: inviteLink,
            isDiscordUsed: false
        });

        await user.save();
        return inviteLink;
    }

    async checkInviteID({ inviteID }: { inviteID: string }) {

        const data = await User.findOne({ inviteID: inviteID });
        if (data?.discordLink !== null && data?.isDiscordUsed === true) return process.env.DISCORD_REGULAR_CHANNEL; //якщо юзер уже використав інвайт
        if (data?.discordLink !== null && data?.isDiscordUsed === false) { //якщо юзер створений, але інвайт ще не використав
            const linkStatus = await checkInviteValidity(data?.discordLink.replace('https://discord.gg/', ''));

            console.log('invite status:', linkStatus);

            if (linkStatus === 'valid') return data?.discordLink; //якщо інвайт ще дійсний повертаємо посилання
            else {
                await User.findOneAndUpdate({ inviteID: inviteID }, { isDiscordUsed: true }); //якщо інвайт уже не працюючий оновлюємо запис у БД
                return process.env.DISCORD_REGULAR_CHANNEL; //повертаємо Regular посилання
            }
        };
        return false; //якщо юзер ще не створений
    }

    async addInviteLink(id: string, link: string) {
        await User.findOneAndUpdate({ inviteID: id }, { discordLink: link });
    }

}

export default userController;
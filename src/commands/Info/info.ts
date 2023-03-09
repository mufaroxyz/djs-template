import { EmbedBuilder } from "discord.js"
import { Command } from "../../extensions/Command"
import typescript from "typescript";
import Discord from "discord.js"
import TSConfig from "../../../tsconfig.json"
import { FormatUtils } from "../../utils/formatUtils";
import os from "os";

export default new Command({
    name: "info",
    description: "Show's the bot's info",
    run: async ({ interaction }) => {
        const embed = new EmbedBuilder()
            .setTitle("Info");

        const serverCount = interaction.client.guilds.cache.size;
        let memory = process.memoryUsage();

        embed.setDescription(`
            **Versions**
            **Node.js**: ${process.version}
            **TypeScript**: v${typescript.version}
            **ECMAScript**: ${TSConfig.compilerOptions.target}
            **discord.js**: v${Discord.version}

            **Stats**
            **Servers**: ${serverCount}

            **Memory**
            **RSS**: ${FormatUtils.fileSize(memory.rss)} (${FormatUtils.fileSize(memory.rss / serverCount)}/Server)
            **Heap**: ${FormatUtils.fileSize(memory.heapTotal)} (${FormatUtils.fileSize(memory.heapTotal / serverCount)}/Server)
            **Heap Used**: ${FormatUtils.fileSize(memory.heapUsed)} (${FormatUtils.fileSize(memory.heapUsed / serverCount)}/Server)

            **IDs**
            **Hostname**: ${os.hostname()}
            **PID**: ${process.pid}
            **Server ID**: ${interaction.guildId}
            **Bot ID**: ${interaction.client.user.id}
            **User ID**: ${interaction.user.id}
        `)

        await interaction.reply({ embeds: [embed] });
        
    }
})
Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"default",{enumerable:true,get:()=>pingCommand});const _discordJs=require("discord.js");const _ms=_interopRequireDefault(require("ms"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}class pingCommand{async run({interaction,client}){const embed=new _discordJs.EmbedBuilder().setAuthor({name:interaction.user.tag,iconURL:interaction.user.displayAvatarURL()}).addFields({name:"Bot Information",value:`・ Client: ${client.ws.ping}ms
 ・ API: ${Date.now()-interaction.createdTimestamp}ms
 ・ Uptime: ${(0,_ms.default)(Math.floor(client.uptime||0/1e3))}
・ Platform: ${process.platform}
 ・ Arch: ${process.arch}
 ・ Node: ${process.version}
 ・ Discord.js: ${require("discord.js").version}`}).setColor(`#af42d7`);interaction.reply({embeds:[embed]})}}
//# sourceMappingURL=ping.js.map
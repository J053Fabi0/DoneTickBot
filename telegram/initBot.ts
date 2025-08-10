import { Bot } from "grammy/mod.ts";
import { BOT_TOKEN, USERS_ID } from "../env.ts";

const bot = new Bot(BOT_TOKEN);

export default bot;

bot.on("message", (ctx, next) => {
  if (USERS_ID.includes(ctx.from.id.toString())) next();
});

bot.catch(({ ctx, error }) => {
  console.error(`Error while handling update ${ctx.update.update_id}:`, error);
  ctx.reply("There was an error.");
});

bot.start({ onStart: () => console.log("Bot started") });

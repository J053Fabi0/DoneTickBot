import { USERS_ID } from "../env.ts";
import bot from "../telegram/initBot.ts";
import { Router } from "@oak/oak/router";
import { fmt, b, u } from "@grammyjs/parse-mode";
import StringWithSuggestions from "../types/stringWithSuggestions.type.ts";

interface RequestBody {
  type: StringWithSuggestions<"task.completed">;
  /** `"2025-08-10T14:42:58.288877461Z"` */
  timestamp: string;
  data: {
    chore: {
      id: number;
      name: "string";
    };
    username: string;
    display_name: string;
    /** Empty string if not any note */
    note: string;
  };
}

const router = new Router();

router.post("/", async (ctx) => {
  const body: RequestBody = await ctx.request.body.json();
  ctx.response.status = 200;

  if (body.type !== "task.completed") return;

  const taskName = body.data.chore.name.trim();

  const message = fmt`${u}${b}${taskName}${b}${u} - ${b}${body.data.display_name}${b}`;
  const footer = fmt`#user_${body.data.username} #task_${body.data.chore.id}`;
  const fullMessage = fmt`${message}\n${footer}`;

  for (const userId of USERS_ID)
    await bot.api.sendMessage(userId, fullMessage.caption, { entities: fullMessage.entities });
});

export default router;

import "@std/dotenv/load";
export const BOT_TOKEN = Deno.env.get("BOT_TOKEN")!;
export const USERS_ID = Deno.env.get("USERS_ID")!.split(",");

if (Deno.env.get("PORT") === undefined) throw new Error("PORT is required");
export const PORT = +Deno.env.get("PORT")!;

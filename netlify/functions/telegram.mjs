export default async (request) => {
  if (request.method !== "POST") {
    return new Response("ZHISHU STORE Bot is running");
  }

  const token = Netlify.env.get("TELEGRAM_BOT_TOKEN");

  if (!token) {
    return new Response("Bot token not configured", { status: 500 });
  }

  const update = await request.json();
  const chatId = update.message?.chat?.id;
  const message = update.message?.text;

  if (!chatId || !message) {
    return new Response("OK");
  }

  if (message === "/start") {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "Selamat datang di ZHISHU STORE Assistant!"
      })
    });
  }

  return new Response("OK");
};

const port = 4173;

Bun.serve({
  port,
  fetch() {
    return new Response(Bun.file(new URL("./prototype.html", import.meta.url)), {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
});

console.log(`Dev Card prototypes  http://127.0.0.1:${port}/?variant=A`);

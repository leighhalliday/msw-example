import { convert } from "./currency";
import { server, rest } from "./../testServer";

it("converts correctly", async () => {
  const rates = await convert("USD", "CAD");
  expect(rates).toEqual(1.42);
});

it("catches errors and returns null", async () => {
  server.use(
    rest.get("https://api.exchangeratesapi.io/latest", (_req, res, ctx) => {
      return res(ctx.status(404));
    })
  );
  await expect(convert("FAIL", "CAD")).rejects.toThrow("404");
});

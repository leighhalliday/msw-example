import { convert } from "./currency";
import { server, rest } from "../testServer";

it("converts correctly", async () => {
  const rate = await convert("USD", "CAD");
  expect(rate).toEqual(1.42);
});

it("handles failure", async () => {
  server.use(
    rest.get("https://api.exchangeratesapi.io/latest", (_req, res, ctx) => {
      return res(ctx.status(404));
    })
  );

  await expect(convert("FAIL", "CAD")).rejects.toThrow("404");
});

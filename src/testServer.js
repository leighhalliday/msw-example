import "whatwg-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("https://api.exchangeratesapi.io/latest", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ rates: { CAD: 1.42 } }));
  }),
  rest.get("*", (req, res, ctx) => {
    console.error(`Unhandled request made to ${req.url.toString()}`);
    return res(ctx.status(500), ctx.json({ error: "Response not handled" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export { server, rest };

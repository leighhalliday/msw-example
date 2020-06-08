import React from "react";
import { render } from "@testing-library/react";
import { SWRConfig } from "swr";
import App from "./App";
import { server, rest } from "./testServer";

test("renders learn react link", async () => {
  const { findByText } = render(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <App />
    </SWRConfig>
  );
  const element = await findByText(/USD to CAD = 1.42/i);
  expect(element).toBeInTheDocument();
});

test("renders error when request fails", async () => {
  server.use(
    rest.get("https://api.exchangeratesapi.io/latest", (_req, res, ctx) => {
      return res(ctx.status(404));
    })
  );
  const { findByText } = render(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <App />
    </SWRConfig>
  );
  const element = await findByText(/Error/i);
  expect(element).toBeInTheDocument();
});

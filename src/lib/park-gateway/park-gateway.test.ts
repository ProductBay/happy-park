import assert from "node:assert/strict";
import test from "node:test";

import { getParkDestination, parkDestinations } from "./destinations.ts";
import { shouldOpenParkGateway } from "./session.ts";

test("gateway destinations have unique IDs and canonical local hrefs", () => {
  assert.equal(new Set(parkDestinations.map((item) => item.id)).size, parkDestinations.length);
  assert.equal(parkDestinations.every((item) => item.href.startsWith("/")), true);
  for (const href of ["/", "/food", "/parties", "/schools", "/her", "/visit"]) assert.ok(parkDestinations.some((item) => item.href === href));
});

test("destination lookup returns the configured destination", () => {
  assert.equal(getParkDestination("food")?.secondary?.href, "/food#pizza-studio");
  assert.equal(getParkDestination("her")?.href, "/her");
});

test("only an unvisited root entry opens automatically", () => {
  assert.equal(shouldOpenParkGateway("/", false), true);
  assert.equal(shouldOpenParkGateway("/", true), false);
  for (const deepLink of ["/food", "/schools", "/her", "/parties", "/food#pizza-studio"]) assert.equal(shouldOpenParkGateway(deepLink, false), false);
});

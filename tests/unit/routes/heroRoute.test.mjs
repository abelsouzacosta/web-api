import test from "node:test";
import assert from "node:assert";
import { routes } from "../../../src/routes/heroRoute.mjs";
import { Headers } from "../../../src/util/util.mjs";
const callTracker = new assert.CallTracker();

process.on('exit', () => callTracker.verify());

test("Hero routes - endpoints test suite", async (t) => {
  await t.test("it should call GET /heroes", async () => {
    const databaseMock = [
      {
        id: "daf9c622-eef2-482a-8f38-b4ca7eca6fcc",
        name: "Batman",
        age: 50,
        power: "rich",
      },
    ];

    const heroServiceStub = {
      find: async () => databaseMock
    };

    const endpoints = routes({
      heroService: heroServiceStub
    });

    const endpoint = 'heroes:get';

    const request = {}
    const response = {
      write: callTracker.calls(item => {
        const expected = JSON.stringify({
          results: databaseMock
        })

        assert.strictEqual(
          item,
          expected,
          'wrte should be called with the correct payload'
        )
      }),
      end: callTracker.calls(item => {
        assert.strictEqual(
          item,
          undefined,
          'end should be called without any parameters'
        )
      })
    }

    await endpoints[endpoint](request, response)
  });
});

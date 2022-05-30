import test from 'node:test';
import assert from 'node:assert';
import { promisify } from 'node:util';
import { HttpStatus } from '../../src/util/util.mjs';

test('Hero Integration test suite', async (t) => {
  const TEST_PORT = 3000;

  process.env.PORT = TEST_PORT;

  const { server } = await import('../../src/index.mjs');

  const testServerAddress = `http://localhost:${TEST_PORT}/heroes`;

  await t.test('it should create a hero instance', async (t) => {
    const data = {
      name: "Batman",
      age: 50,
      power: "rich"
    }

    const request = await fetch(testServerAddress, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    assert.deepStrictEqual(request.headers.get('content-type'), 'application/json')/
    assert.strictEqual(request.status, HttpStatus.CREATED);

    const result = await request.json();

    assert.deepStrictEqual(
      result.success,
      'User created with success',
      'it should return a valid text message'
    );

    assert.ok(
      result.id.length >= 30,
      'id should be a valid uuid'
    );

  });

  await promisify(server.close.bind(server))();
})
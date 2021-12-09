import Root from "../src/controllers/root";

const controller = new Root()

describe('controllers/root', () => {
    it('should return hello world', () => {
        assert.deepStrictEqual(controller.hello(), {Hello: 'World'})
    })
})
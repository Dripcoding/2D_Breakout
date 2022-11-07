import Mode from "../public/js/modules/mode";
import { GAME_MODES, modes } from "../public/js/constants";

describe("mode", () => {
  const mode = new Mode(modes[GAME_MODES.EASY]);

  test("mode should have the right properties", () => {
    expect(mode).toHaveProperty("dx");
    expect(mode).toHaveProperty("dy");
    expect(mode).toHaveProperty("lives");
    expect(mode).toHaveProperty("name");
    expect(mode).toHaveProperty("getModeParam");
    expect(mode).toHaveProperty("setModeParam");
    expect(mode).toHaveProperty("maxDx");
    expect(mode).toHaveProperty("maxDy");
  });

  test("getters and setter", () => {
    expect(mode.getModeParam()).toEqual({
      dx: 2,
      dy: 2,
      lives: 5,
      maxDx: 3,
      maxDy: 3,
      name: "easy"
    });

    const newMode = {
      dx: 5,
      dy: 5,
      lives: 5,
      name: "someMode",
      maxDx: 9,
      maxDy: -9
    };
    mode.setModeParam(newMode);
    expect(mode.getModeParam()).toEqual(newMode);
  });
});

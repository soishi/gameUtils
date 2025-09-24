/**
 * ゾーン判定ユーティリティのテスト
 */

import { getTapZone, isValidPoint } from "../zone";

describe("zone utilities", () => {
  describe("getTapZone", () => {
    const screenHeight = 1000;

    test("上部20%の領域では decrement を返す", () => {
      // 上端
      expect(getTapZone({ x: 100, y: 0 }, screenHeight)).toBe("decrement");

      // 20%境界線付近（上部側）
      expect(getTapZone({ x: 100, y: 199 }, screenHeight)).toBe("decrement");

      // 20%境界線ちょうど
      expect(getTapZone({ x: 100, y: 200 }, screenHeight)).toBe("decrement");
    });

    test("下部80%の領域では increment を返す", () => {
      // 20%境界線を超えた位置
      expect(getTapZone({ x: 100, y: 201 }, screenHeight)).toBe("increment");

      // 下部中央
      expect(getTapZone({ x: 100, y: 600 }, screenHeight)).toBe("increment");

      // 下端
      expect(getTapZone({ x: 100, y: 999 }, screenHeight)).toBe("increment");
    });

    test("異なる画面高さでも正しく2:8の比率で判定する", () => {
      const smallScreen = 500;
      const largeScreen = 2000;

      // 小さな画面での20%境界
      expect(getTapZone({ x: 100, y: 100 }, smallScreen)).toBe("decrement");
      expect(getTapZone({ x: 100, y: 101 }, smallScreen)).toBe("increment");

      // 大きな画面での20%境界
      expect(getTapZone({ x: 100, y: 400 }, largeScreen)).toBe("decrement");
      expect(getTapZone({ x: 100, y: 401 }, largeScreen)).toBe("increment");
    });
  });

  describe("isValidPoint", () => {
    const screenWidth = 800;
    const screenHeight = 600;

    test("画面内の座標では true を返す", () => {
      expect(isValidPoint({ x: 0, y: 0 }, screenWidth, screenHeight)).toBe(
        true,
      );
      expect(isValidPoint({ x: 400, y: 300 }, screenWidth, screenHeight)).toBe(
        true,
      );
      expect(isValidPoint({ x: 800, y: 600 }, screenWidth, screenHeight)).toBe(
        true,
      );
    });

    test("画面外の座標では false を返す", () => {
      // x座標が範囲外
      expect(isValidPoint({ x: -1, y: 300 }, screenWidth, screenHeight)).toBe(
        false,
      );
      expect(isValidPoint({ x: 801, y: 300 }, screenWidth, screenHeight)).toBe(
        false,
      );

      // y座標が範囲外
      expect(isValidPoint({ x: 400, y: -1 }, screenWidth, screenHeight)).toBe(
        false,
      );
      expect(isValidPoint({ x: 400, y: 601 }, screenWidth, screenHeight)).toBe(
        false,
      );

      // 両方とも範囲外
      expect(isValidPoint({ x: -10, y: -10 }, screenWidth, screenHeight)).toBe(
        false,
      );
      expect(isValidPoint({ x: 900, y: 700 }, screenWidth, screenHeight)).toBe(
        false,
      );
    });
  });
});

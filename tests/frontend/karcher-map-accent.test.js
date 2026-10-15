// The map overlay (selected rooms, zone box, handles, label rings) paints the
// fixed Kärcher yellow by default. With the HA style it follows the theme's
// --rgb-primary-color, which the card resolves and passes to the pure renderer
// as vs.accentRgb.

import { describe, it, expect } from "vitest";
import { drawMap, computeDrawKey } from "../../custom_components/karcher_home_robots/www/card/map-draw.js";

describe("map accent", () => {
  function recordingCtx() {
    const styles = [];
    const ctx = new Proxy({}, {
      get: (t, k) => (k in t ? t[k] : () => ({ width: 10 })),
      set: (t, k, v) => {
        if (k === "fillStyle" || k === "strokeStyle") styles.push(String(v));
        t[k] = v;
        return true;
      },
    });
    return { ctx, styles };
  }

  function vs(extra) {
    return {
      attr: {
        map_image_size: { width: 100, height: 100, cell_size: 1 },
        room_map: { 1: { name: "Hall", color_id: 1, cells: [[0, 0, 5]] } },
      },
      dpr: 1, mapImg: {}, robotIcon: null, cardMode: "standard", detailRoomId: null,
      selectedRooms: new Set(["1"]), customiseSelected: new Set(), mapToken: "t",
      canvasWidth: 100, canvasHeight: 100, zoneRect: { x0: 10, y0: 10, x1: 60, y1: 60 },
      zoneEditable: true, zoom: 1, pan: { x: 0, y: 0 },
      ...extra,
    };
  }

  it("paints selection and zone in the theme colour with the HA style, never the yellow", () => {
    const { ctx, styles } = recordingCtx();
    drawMap(ctx, { width: 100, height: 100 }, vs({ haStyle: true, accentRgb: "76, 175, 80" }));
    const painted = styles.join(" ");
    expect(painted).toContain("76, 175, 80");
    expect(painted).not.toMatch(/255,\s*212,\s*0|#E8BE00/i);
  });

  it("paints the Kärcher yellow by default, even if a theme colour is passed", () => {
    const { ctx, styles } = recordingCtx();
    drawMap(ctx, { width: 100, height: 100 }, vs({ accentRgb: "76, 175, 80" }));
    const painted = styles.join(" ");
    expect(painted).toMatch(/255,\s*212,\s*0/);
    expect(painted).toContain("#E8BE00");
  });

  it("does not reuse a cached draw across a style change", () => {
    const attr = vs({}).attr;
    expect(computeDrawKey(attr, vs({}))).not.toBe(computeDrawKey(attr, vs({ haStyle: true })));
  });
});

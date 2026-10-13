// Companion entity resolution, map/robot-icon reload after re-attach, and the
// theme-driven map accent.
//
// 1. The vacuum entity is named, so on current installs its id ends in
//    "_vacuum" (vacuum.<device>_vacuum) while every companion is
//    <domain>.<device>_<suffix>. The card derived companions from the vacuum's
//    stem, so with a bare `vacuum_entity` config it looked for
//    image.<device>_vacuum_map, sensor.<device>_vacuum_battery, ... — none of
//    which exist — and showed "Entity not found" instead of the map.
// 2. HA detaches and re-attaches cards routinely. disconnectedCallback dropped
//    an in-flight map/robot-icon load but left the flags that record it, so the
//    re-attached card never fetched again: map stuck on "loading", no robot.
// 3. The map overlay used a hard-coded Kärcher yellow; it now follows the
//    theme's --rgb-primary-color.
//
// Entity ids below are literal on purpose: they are the oracle (what HA
// actually registers), independent of the card's derivation code.

import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import { drawMap } from "../../custom_components/karcher_home_robots/www/card/map-draw.js";

beforeAll(async () => {
  await import("../../custom_components/karcher_home_robots/www/karcher-vacuum-card.js");
});

const VAC = "vacuum.lab_robot_vacuum";

function registryHass({ battery = "55", map = true } = {}) {
  const states = {
    [VAC]: { state: "docked", attributes: { friendly_name: "Lab Robot", room_map: {}, room_preferences: {} } },
    "sensor.lab_robot_battery": { state: battery, attributes: {} },
  };
  const entities = {
    [VAC]: { entity_id: VAC, device_id: "dev1", translation_key: "vacuum" },
    "sensor.lab_robot_battery": { entity_id: "sensor.lab_robot_battery", device_id: "dev1", translation_key: "battery" },
    // Same translation_key on another device must never be picked.
    "sensor.other_robot_battery": { entity_id: "sensor.other_robot_battery", device_id: "dev2", translation_key: "battery" },
  };
  if (map) {
    states["image.lab_robot_map"] = {
      state: "2026-10-13T19:00:00+00:00",
      attributes: { entity_picture: "/api/image_proxy/image.lab_robot_map?token=t" },
    };
    entities["image.lab_robot_map"] = { entity_id: "image.lab_robot_map", device_id: "dev1", translation_key: "map" };
  }
  return { states, entities, callService() {} };
}

async function mount(hass, config = { vacuum_entity: VAC }) {
  const el = document.createElement("karcher-vacuum-card");
  el.setConfig(config);
  el.hass = hass;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe("companion entities resolve through the registry", () => {
  it("shows the battery of the vacuum's own device from a bare vacuum_entity", async () => {
    const el = await mount(registryHass({ battery: "55" }));
    expect(el.renderRoot.querySelector(".battery-pct").textContent.trim()).toBe("55%");
    el.remove();
  });

  it("finds the map instead of reporting the derived id as missing", async () => {
    const el = await mount(registryHass());
    const text = el.renderRoot.querySelector(".map-placeholder").textContent;
    expect(text).not.toContain("Entity not found");
    expect(text).not.toContain("lab_robot_vacuum_map");
    el.remove();
  });

  it("an explicitly configured companion still wins over the registry", async () => {
    const hass = registryHass({ battery: "55" });
    hass.states["sensor.my_override"] = { state: "12", attributes: {} };
    const el = await mount(hass, { vacuum_entity: VAC, battery_entity: "sensor.my_override" });
    expect(el.renderRoot.querySelector(".battery-pct").textContent.trim()).toBe("12%");
    el.remove();
  });
});

describe("re-attaching the card resumes an abandoned map load", () => {
  let created;
  let OriginalImage;

  beforeEach(() => {
    created = [];
    OriginalImage = globalThis.Image;
    globalThis.Image = class {
      constructor() { this.onload = null; this.onerror = null; this.src = ""; created.push(this); }
    };
  });
  afterEach(() => { globalThis.Image = OriginalImage; });

  const mapRequests = () => created.filter((img) => img.src.includes("image.lab_robot_map"));

  it("fetches the map again after a detach interrupted the first load", async () => {
    const el = await mount(registryHass());
    expect(mapRequests()).toHaveLength(1); // first load started, never completes

    el.remove();                    // HA detaches the card mid-load
    document.body.appendChild(el);  // ...and re-attaches it
    el.hass = { ...el.hass };       // next hass update
    await el.updateComplete;

    expect(mapRequests()).toHaveLength(2);
    el.remove();
  });
});

describe("map accent follows the theme colour", () => {
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

  it("paints selection and zone in the theme colour, never the old yellow", () => {
    const { ctx, styles } = recordingCtx();
    drawMap(ctx, { width: 100, height: 100 }, vs({ accentRgb: "76, 175, 80" }));
    const painted = styles.join(" ");
    expect(painted).toContain("76, 175, 80");
    expect(painted).not.toMatch(/255,\s*212,\s*0|#E8BE00/i);
  });
});

export const CSS_B = `

  /* ── Standard / Customise mode row (segmented pill + helper text) ── */
  .tab-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
  }
  .tab-helper {
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-normal, 400);
    color: var(--secondary-text-color);
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* ── Standard settings — mode, suction, water ── */
  .standard-settings {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* ── Area mode note ── */
  .area-note {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 12px;
    margin-top: 10px;
    border-radius: var(--rcv-radius);
    font-size: var(--ha-font-size-s, 12px);
    color: var(--secondary-text-color);
    background: var(--rcv-accent-soft);
  }
  .area-note ha-icon {
    --mdc-icon-size: 16px;
    color: var(--rcv-accent);
    flex-shrink: 0;
  }

  /* ── field rows for standard panel ── */
  .field-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 0;
    border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.08));
  }
  .field-row:last-child { border-bottom: none; }
  .field-row-label {
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-normal, 400);
    color: var(--secondary-text-color);
    white-space: nowrap;
    flex-shrink: 0;
    min-width: 4.5em;
  }
  .field-row-control { flex: 1; }

  /* ── segmented control ── */
  /* Mirrors HA's ha-control-select: neutral control track, the selected option
     filled with the theme colour. */
  .segmented {
    display: flex;
    gap: 4px;
    background: var(--rcv-control);
    border-radius: var(--rcv-radius);
    padding: 4px;
    width: 100%;
    box-sizing: border-box;
  }
  .seg-btn {
    flex: 1;
    height: 34px;
    padding: 0 8px;
    border: none;
    border-radius: 9px;
    cursor: pointer;
    background: transparent;
    color: var(--primary-text-color);
    font-weight: var(--ha-font-weight-medium, 500);
    font-size: var(--ha-font-size-s, 12px);
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s;
    white-space: nowrap;
  }
  .seg-btn.active {
    background: var(--rcv-tonal);
    color: var(--rcv-tonal-text);
  }
  .seg-btn ha-icon { --mdc-icon-size: 18px; }
  .seg-btn:disabled {
    opacity: 0.35;
    pointer-events: none;
    cursor: default;
  }
  .segmented.seg-disabled {
    opacity: 0.4;
    pointer-events: none;
  }
  /* Compact strip (Suction · Water): inactive segments collapse to icon-only
     (the active one keeps its label) so the options fit the narrow card. */
  .segmented.seg-compact .seg-btn { min-width: 0; overflow: hidden; }
  .segmented.seg-compact .seg-btn:not(.active) .seg-label { display: none; }

  /* ── Customise: room list ── */
  .room-list {
    display: flex;
    flex-direction: column;
  }
  /* While an area is selected, room selection is disabled (mutually exclusive). */
  .room-list.zone-locked { opacity: 0.55; pointer-events: none; }
  .room-row {
    background: var(--rcv-control);
    border: 1px solid transparent;
    border-radius: var(--rcv-radius);
    margin-bottom: 8px;
    transition: opacity 0.12s, border-color 0.15s;
  }
  .room-row:last-child { margin-bottom: 0; }
  .room-row.expanded { border-color: var(--divider-color, rgba(0,0,0,0.08)); }
  .room-row.dragging { opacity: 0.4; }
  .room-row.disabled-room { opacity: 0.55; }
  .room-row-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 12px;
  }
  .drop-indicator {
    height: 2px;
    background: var(--rcv-accent-deep);
    margin: 0 4px;
    border-radius: 1px;
    pointer-events: none;
  }
  .room-drag-handle {
    cursor: grab;
    color: var(--disabled-text-color, rgba(0,0,0,0.35));
    font-size: 1.1em;
    padding: 0 2px;
    flex-shrink: 0;
    user-select: none;
  }
  .room-drag-handle:active { cursor: grabbing; }
  .room-color-dot {
    width: 12px;
    height: 12px;
    border-radius: 4px;
    flex-shrink: 0;
  }
  .room-row-select { cursor: pointer; }
  .room-text {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .room-text-inner { flex: 1; min-width: 0; }
  .room-name {
    font-weight: var(--ha-font-weight-medium, 500);
    font-size: var(--ha-font-size-m, 14px);
    color: var(--primary-text-color);
  }
  .room-summary {
    font-size: var(--ha-font-size-s, 12px);
    color: var(--secondary-text-color);
    font-weight: var(--ha-font-weight-normal, 400);
    margin-top: 2px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    line-height: 1;
  }
  .room-summary-icon { --mdc-icon-size: 14px; display: block; }
  .room-summary-sep { opacity: 0.5; }
  .room-chevron {
    color: var(--disabled-text-color, rgba(0,0,0,0.35));
    font-size: 1.2em;
    flex-shrink: 0;
    transition: transform 0.2s;
  }
  .room-chevron.open { transform: rotate(90deg); }
  /* Styled like HA's ha-switch (track + thumb in the switch colours). */
  .room-toggle {
    width: 36px;
    height: 14px;
    border-radius: 7px;
    border: none;
    cursor: pointer;
    padding: 0;
    overflow: visible;
    display: flex;
    align-items: center;
    background: var(--switch-unchecked-track-color, var(--disabled-color, #bdbdbd));
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .room-toggle.on {
    background: var(--switch-checked-track-color, rgba(var(--rgb-primary-color, 3, 169, 244), 0.5));
  }
  .room-toggle-knob {
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--switch-unchecked-button-color, #fafafa);
    transform: translateX(-2px);
    transition: transform 0.2s, background 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.35);
  }
  .room-toggle.on .room-toggle-knob {
    transform: translateX(18px);
    background: var(--switch-checked-button-color, var(--primary-color));
  }
  .room-inline-detail {
    padding: 2px 14px 12px;
    border-top: 1px solid var(--divider-color, rgba(0,0,0,0.08));
  }
  .room-list-footer {
    font-size: var(--ha-font-size-s, 12px);
    color: var(--secondary-text-color);
    text-align: center;
    margin-top: 4px;
  }

  /* ── target strip: tappable row that opens the sheet ── */
  .target-strip {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 50px;
    padding: 0 16px;
    border: none;
    border-top: 1px solid var(--rcv-divider);
    background: var(--rcv-card);
    cursor: pointer;
    font-family: inherit;
    text-align: left;
    width: 100%;
    box-sizing: border-box;
  }
  .target-strip:disabled { opacity: 0.5; cursor: default; }
  .target-strip > ha-icon { --mdc-icon-size: 20px; color: var(--secondary-text-color); flex-shrink: 0; }
  .target-strip-label {
    flex: 1;
    min-width: 0;
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--rcv-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .target-strip-edit {
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--rcv-accent);
  }
  .target-strip-chevron { --mdc-icon-size: 16px; color: var(--rcv-text3); flex-shrink: 0; }

  /* ── action bar region (wraps the button row) ── */
  .action-bar {
    background: var(--rcv-card);
    border-top: 1px solid var(--rcv-divider);
    padding: 10px 16px 14px;
    padding-bottom: calc(14px + env(safe-area-inset-bottom));
  }

  /* ── bottom sheet (card-relative: anchored to the shell, not the viewport) ── */
  .sheet-scrim {
    position: absolute;
    inset: 0;
    z-index: 40;
    background: rgba(0,0,0,0.5);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s;
  }
  .sheet-scrim.open { opacity: 1; pointer-events: auto; }
  .sheet {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    /* Content height, capped: a short panel no longer leaves a block of empty
       sheet below it; a long one (Customise room list) scrolls inside. */
    height: auto;
    max-height: 85%;
    border-radius: var(--rcv-radius-sheet) var(--rcv-radius-sheet) 0 0;
    background: var(--rcv-card);
    box-shadow: 0 -4px 16px rgba(0,0,0,0.25);
    transform: translateY(110%);
    transition: transform 0.32s cubic-bezier(0.32,0.72,0,1);
    display: flex;
    flex-direction: column;
  }
  .sheet.open { transform: translateY(0); }
  @media (prefers-reduced-motion: reduce) {
    .sheet, .sheet-scrim { transition: none; }
  }
  .sheet-handle {
    display: flex;
    justify-content: center;
    padding: 14px 0 6px;
    flex-shrink: 0;
  }
  .sheet-handle span {
    width: 32px;
    height: 4px;
    border-radius: 2px;
    background: var(--disabled-color, var(--rcv-divider));
  }
  /* Material tabs (as HA's ha-tab-group): text tabs with an underline on the
     active one, over a hairline divider. */
  .sheet-tabs {
    display: flex;
    padding: 0 16px;
    margin-bottom: 14px;
    border-bottom: 1px solid var(--rcv-divider);
    flex-shrink: 0;
  }
  .sheet-tab {
    flex: 1;
    height: 44px;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    cursor: pointer;
    font-family: inherit;
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    background: transparent;
    color: var(--secondary-text-color);
    transition: color 0.13s, border-color 0.13s;
  }
  .sheet-tab.active {
    color: var(--rcv-accent);
    border-bottom-color: var(--rcv-accent);
  }
  .sheet-body {
    flex: 1;
    overflow-y: auto;
    padding: 0 16px 24px;
  }
  .sheet-panel { display: none; }
  .sheet-panel.active { display: block; }

  /* ── "What gets cleaned": whole-home banner + room chips / zone summary ── */
  .whole-home-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: var(--rcv-radius);
    margin-bottom: 12px;
    background: var(--rcv-accent-soft);
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--rcv-text);
  }
  .whole-home-banner ha-icon { --mdc-icon-size: 20px; color: var(--rcv-accent); }
  /* Material filter chips: outlined when off, tonal fill + check when on. */
  .room-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .room-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 32px;
    padding: 0 12px 0 8px;
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    background: transparent;
    border: 1px solid var(--outline-color, var(--divider-color));
    color: var(--primary-text-color);
    transition: background 0.13s, border-color 0.13s;
  }
  .room-chip.on {
    background: var(--rcv-accent-soft);
    border-color: transparent;
  }
  .room-chip:disabled { opacity: 0.55; cursor: default; }
  .room-chip-check {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border-radius: 4px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--secondary-text-color);
    --mdc-icon-size: 14px;
  }
  .room-chip.on .room-chip-check {
    background: var(--rcv-accent);
    border-color: var(--rcv-accent);
    color: var(--rcv-accent-text);
  }
  .room-chip-area { font-size: var(--ha-font-size-s, 12px); color: var(--secondary-text-color); }
  .zone-summary {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: var(--rcv-radius);
    background: var(--rcv-accent-soft);
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--rcv-text);
  }
  .zone-summary ha-icon { --mdc-icon-size: 20px; color: var(--rcv-accent); }

  /* ── busy lock banner (sheet settings panel) ── */
  .busy-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 12px;
    margin-bottom: 12px;
    border-radius: var(--rcv-radius);
    background: var(--rcv-accent-soft);
    font-size: var(--ha-font-size-s, 12px);
    color: var(--secondary-text-color);
  }
  .busy-banner ha-icon { --mdc-icon-size: 16px; color: var(--rcv-accent); flex-shrink: 0; }
  .settings-lockable.busy { opacity: 0.5; pointer-events: none; }

  /* ── opt-in debug footer (show_debug) ── */
  .rcv-debug {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 12px;
    padding: 6px 12px;
    border-top: 1px solid var(--rcv-divider);
    background: var(--rcv-inset);
    color: var(--rcv-text3);
    font-size: 11px;
    font-variant-numeric: tabular-nums;
  }
  .rcv-debug-item b { color: var(--rcv-text2); font-weight: 600; }

 `;

// Opt-in "Home Assistant" look (card_style: ha). Appended after the classic CSS
// and scoped under .style-ha on ha-card, so the classic look stays the default.
// Rules here only restate what differs; each override must out-rank its base rule.
export const CSS_HA = `
  .style-ha {
    --rcv-accent: var(--primary-color, #03a9f4);
    --rcv-accent-deep: var(--dark-primary-color, var(--primary-color, #0288d1));
    --rcv-accent-text: var(--text-primary-color, #fff);
    --rcv-control: color-mix(in srgb, var(--disabled-color, #bdbdbd) 20%, transparent);
    --rcv-accent-soft: rgba(var(--rgb-primary-color, 3, 169, 244), 0.15);
    --rcv-tonal: rgba(var(--rgb-primary-color, 3, 169, 244), 0.2);
    --rcv-tonal-text: var(--primary-color, #03a9f4);
    --rcv-radius: var(--ha-border-radius-lg, 12px);
    --rcv-radius-sheet: var(--ha-border-radius-2xl, 24px);
    --rcv-shadow: var(--ha-box-shadow-m, 0 2px 6px rgba(0,0,0,0.2));
    font-family: var(--ha-font-family-body, Roboto, Noto, sans-serif);
    -webkit-font-smoothing: var(--ha-font-smoothing, antialiased);
  }

  /* ── header ── */
  .style-ha .robot-name {
    font-weight: var(--ha-font-weight-medium, 500);
    font-size: var(--ha-font-size-l, 16px);
    letter-spacing: normal;
    line-height: 1.4;
  }
  .style-ha .status-label {
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-normal, 400);
  }
  .style-ha .status-label.label-cleaning,
  .style-ha .status-label.label-paused,
  .style-ha .status-label.label-returning,
  .style-ha .status-label.label-locating,
  .style-ha .status-label.label-emptying,
  .style-ha .status-label.label-docked,
  .style-ha .status-label.label-idle,
  .style-ha .status-label.label-offline { color: var(--secondary-text-color); }
  .style-ha .battery-icon { color: var(--secondary-text-color); transform: none; }
  .style-ha .battery-icon.icon-low { color: var(--error-color, #f44336); }
  .style-ha .battery-pct {
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
  }

  /* ── stats ── */
  .style-ha .stat-block {
    border-radius: var(--rcv-radius);
    background: var(--rcv-control);
  }
  .style-ha .stat-label-header {
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-normal, 400);
    letter-spacing: normal;
    text-transform: none;
    color: var(--secondary-text-color);
  }
  .style-ha .stat-value {
    font-size: var(--ha-font-size-l, 16px);
    font-weight: var(--ha-font-weight-medium, 500);
  }

  /* ── Rooms|Zone control: its own row above the map ── */
  .style-ha .map-mode {
    display: block;
    position: relative;
    top: auto;
    left: auto;
    padding: 12px 16px 8px;
    background: var(--rcv-card);
  }
  .style-ha .map-mode-inner,
  .style-ha .map-reset {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    border: none;
  }
  .style-ha .map-reset {
    background: var(--rcv-card);
    box-shadow: var(--rcv-shadow);
    height: 38px;
    padding: 0 12px;
    border-radius: var(--rcv-radius);
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--primary-text-color);
  }
  .style-ha .map-mode-inner {
    gap: 4px;
    border-radius: var(--rcv-radius);
    background: var(--rcv-control);
    box-shadow: none;
  }
  .style-ha .map-mode-btn {
    flex: 1;
    justify-content: center;
    height: 34px;
    padding: 0 12px;
    border-radius: 9px;
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--primary-text-color);
    --mdc-icon-size: 18px;
  }
  .style-ha .map-mode-btn.active {
    background: var(--rcv-tonal);
    color: var(--rcv-tonal-text);
    font-weight: var(--ha-font-weight-medium, 500);
  }
  .style-ha .map-hint {
    gap: 8px;
    padding: 8px 16px 0;
    margin: 0;
    border-radius: 0;
    background: none;
  }
  .style-ha .map-hint ha-icon { --mdc-icon-size: 16px; color: var(--secondary-text-color); }
  .style-ha .map-hint span {
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-normal, 400);
    color: var(--secondary-text-color);
    line-height: 1.4;
  }

  /* ── buttons ── */
  .style-ha .btn-wrap {
    height: 48px;
    border-radius: var(--rcv-radius);
    border: none;
    background: var(--rcv-control);
    color: var(--primary-text-color);
    transition: background 0.15s, filter 0.15s;
  }
  .style-ha .btn-wrap:not(.disabled):not(:disabled):hover { filter: brightness(1.08); }
  .style-ha .btn-wrap:not(.disabled):not(:disabled):active { transform: none; }
  .style-ha .btn-wrap.primary {
    background: var(--rcv-tonal);
    color: var(--rcv-tonal-text);
    border: none;
    box-shadow: none;
  }
  .style-ha .btn-wrap.danger,
  .style-ha .btn-wrap.secondary {
    flex: 0 0 48px;
    width: 48px;
  }
  .style-ha .btn-wrap.danger { color: var(--rcv-danger); }
  .style-ha .btn-wrap.disabled,
  .style-ha .btn-wrap:disabled {
    background: var(--rcv-control);
    border: none;
    color: var(--disabled-text-color, var(--rcv-text3));
    opacity: 0.6;
  }
  .style-ha .btn-wrap .btn-label {
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
  }

  /* ── target strip, banners ── */
  .style-ha .tab-helper {
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-normal, 400);
  }
  .style-ha .area-note {
    border-radius: var(--rcv-radius);
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-normal, 400);
    background: var(--rcv-accent-soft);
    border: none;
  }
  .style-ha .area-note ha-icon { --mdc-icon-size: 16px; color: var(--rcv-accent); }
  .style-ha .target-strip > ha-icon { --mdc-icon-size: 20px; color: var(--secondary-text-color); }
  .style-ha .target-strip-label {
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
  }
  .style-ha .target-strip-edit {
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--rcv-accent);
  }
  .style-ha .whole-home-banner {
    padding: 10px 14px;
    border-radius: var(--rcv-radius);
    margin-bottom: 12px;
    background: var(--rcv-accent-soft);
    border: none;
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
  }
  .style-ha .whole-home-banner ha-icon { --mdc-icon-size: 20px; color: var(--rcv-accent); }
  .style-ha .zone-summary {
    padding: 10px 14px;
    border-radius: var(--rcv-radius);
    background: var(--rcv-accent-soft);
    border: none;
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--rcv-text);
  }
  .style-ha .zone-summary ha-icon { --mdc-icon-size: 20px; color: var(--rcv-accent); }
  .style-ha .busy-banner {
    border-radius: var(--rcv-radius);
    background: var(--rcv-accent-soft);
    border: none;
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-normal, 400);
    color: var(--secondary-text-color);
  }
  .style-ha .busy-banner ha-icon { --mdc-icon-size: 16px; color: var(--rcv-accent); }

  /* ── segmented control, fields ── */
  .style-ha .field-row-label {
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-normal, 400);
  }
  .style-ha .segmented {
    background: var(--rcv-control);
    border-radius: var(--rcv-radius);
  }
  .style-ha .seg-btn {
    height: 34px;
    border-radius: 9px;
    color: var(--primary-text-color);
    font-weight: var(--ha-font-weight-medium, 500);
    font-size: var(--ha-font-size-s, 12px);
    letter-spacing: normal;
  }
  .style-ha .seg-btn.active {
    background: var(--rcv-tonal);
    color: var(--rcv-tonal-text);
    font-weight: var(--ha-font-weight-medium, 500);
    box-shadow: none;
  }
  .style-ha .seg-btn ha-icon { --mdc-icon-size: 18px; }
  .style-ha .seg-btn.active ha-icon { color: inherit; }

  /* ── room list ── */
  .style-ha .room-row {
    background: var(--rcv-control);
    border-radius: var(--rcv-radius);
  }
  .style-ha .room-name {
    font-weight: var(--ha-font-weight-medium, 500);
    font-size: var(--ha-font-size-m, 14px);
  }
  .style-ha .room-summary {
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-normal, 400);
  }
  .style-ha .room-toggle {
    width: 36px;
    height: 14px;
    border-radius: 7px;
    padding: 0;
    overflow: visible;
    display: flex;
    align-items: center;
    background: var(--switch-unchecked-track-color, var(--disabled-color, #bdbdbd));
  }
  .style-ha .room-toggle.on {
    background: var(--switch-checked-track-color, rgba(var(--rgb-primary-color, 3, 169, 244), 0.5));
  }
  .style-ha .room-toggle-knob {
    width: 20px;
    height: 20px;
    background: var(--switch-unchecked-button-color, #fafafa);
    transform: translateX(-2px);
    transition: transform 0.2s, background 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.35);
  }
  .style-ha .room-toggle.on .room-toggle-knob {
    transform: translateX(18px);
    background: var(--switch-checked-button-color, var(--primary-color));
  }
  .style-ha .room-list-footer {
    font-size: var(--ha-font-size-s, 12px);
    color: var(--secondary-text-color);
    font-weight: var(--ha-font-weight-normal, 400);
  }

  /* ── bottom sheet ── */
  .style-ha .sheet {
    height: auto;
    max-height: 85%;
    border-radius: var(--rcv-radius-sheet) var(--rcv-radius-sheet) 0 0;
    border-top: none;
    box-shadow: 0 -4px 16px rgba(0,0,0,0.25);
  }
  .style-ha .sheet-handle span {
    width: 32px;
    height: 4px;
    border-radius: 2px;
    background: var(--disabled-color, var(--rcv-divider));
  }
  .style-ha .sheet-tabs {
    gap: 0;
    padding: 0 16px;
    margin-bottom: 14px;
    border-bottom: 1px solid var(--rcv-divider);
  }
  .style-ha .sheet-tab {
    height: 44px;
    border-radius: 0;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    background: transparent;
    color: var(--secondary-text-color);
    transition: color 0.13s, border-color 0.13s;
  }
  .style-ha .sheet-tab.active {
    background: transparent;
    color: var(--rcv-accent);
    font-weight: var(--ha-font-weight-medium, 500);
    border-bottom-color: var(--rcv-accent);
  }

  /* ── room chips ── */
  .style-ha .room-chips { gap: 8px; }
  .style-ha .room-chip {
    gap: 6px;
    height: 32px;
    padding: 0 12px 0 8px;
    border-radius: 8px;
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    background: transparent;
    border: 1px solid var(--outline-color, var(--divider-color));
    color: var(--primary-text-color);
    transition: background 0.13s, border-color 0.13s;
  }
  .style-ha .room-chip.on {
    background: var(--rcv-accent-soft);
    border-color: transparent;
    color: var(--primary-text-color);
  }
  .style-ha .room-chip-check {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 2px solid var(--secondary-text-color);
    --mdc-icon-size: 14px;
  }
  .style-ha .room-chip.on .room-chip-check {
    background: var(--rcv-accent);
    border: 2px solid var(--rcv-accent);
    color: var(--rcv-accent-text);
  }
  .style-ha .room-chip-area {
    font-size: var(--ha-font-size-s, 12px);
    font-weight: var(--ha-font-weight-normal, 400);
    opacity: 1;
    color: var(--secondary-text-color);
  }
`;

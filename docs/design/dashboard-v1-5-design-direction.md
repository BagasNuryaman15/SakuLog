# SakuLog V1.5 Dashboard Design Direction

## Core Concept

SakuLog V1.5 uses the Dashboard Diet concept: the Dashboard must stay focused, compact, and current. It should show the user's financial condition now, not replace the Reports experience.

- Dashboard = current condition / Now
- Reports = analysis / Why

The Dashboard must not take over every Reports function. It should help users understand what is happening today, what needs attention, and what recently changed.

## Active Dashboard Layout

Use this layout direction for the V1.5 Dashboard:

1. Topbar
2. Money Status
3. Payment Leak
4. Compact KPI row
5. Recent Transactions
6. Today / Week Snapshot

## Dashboard Non-Goals

The Dashboard should not focus on:

- large cashflow trend
- full category breakdown
- multiple money signals
- deep analytical charts

Avoid overfilling the Dashboard. If a section needs explanation, comparison, filtering, or deeper charting, it belongs in Reports.

## Reports Ownership

Reports will handle:

- cashflow trend
- category breakdown
- payment method breakdown
- income source breakdown
- period comparison

This separation keeps the Dashboard usable as a command center and keeps analysis inside Reports.

## Visual Style

The active visual direction is:

- Premium Black
- Cyber Violet
- tiny Cyan accents
- controlled glow
- glass/depth
- command center feel
- elegant, not gaming/neon

Use glow and contrast with restraint. The interface should feel premium and sharp, not loud or overloaded.

## Implementation Warning

- Do not blindly copy old Layer 1/2/3A docs.
- Do not overfill Dashboard.
- Keep code simple/readable when implementing later.
- The concept image is a direction reference, not a production asset.

The V1.5 Dashboard source of truth is this document together with `docs/product/PRD_V1_5.md`. When available, the concept image at `docs/product/references/sakulog-dashboard-v1-5-concept.png` is only a direction reference.

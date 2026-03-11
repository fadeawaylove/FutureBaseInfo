# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file static HTML website that serves as a manual for Chinese futures varieties (中国期货品种手册). The site provides comprehensive information about various Chinese futures contracts, their specifications, market characteristics, and supply chain structures.

## Deployment

The site is automatically deployed to GitHub Pages on push to the `master` branch via `.github/workflows/pages.yaml`. No manual deployment commands needed.

## Architecture

**Single-file HTML structure:** The entire application is contained in `index.html` with:
- Embedded CSS in `<style>` section (lines 7-382)
- Main content structure with sidebar navigation and content sections
- Embedded JavaScript in `<script>` section (lines 1462-1476)

**Navigation Pattern:**
- Left sidebar (`.sidebar`) contains navigation items for each futures product
- Each nav item has `onclick="showProduct('id')"` calling a function to switch content sections
- Right content area (`.content`) contains multiple `<section>` elements, one per product
- Product IDs used in the code: `sp`, `rb`, `sa`, `fg`, `hc`, `v`, `si`, `ss`

**Content Section Structure (per product):**
```html
<section id="productId" class="content-section">
    <div class="header">...</div>  <!-- Product title, code, exchange info -->
    <div class="stat-grid">...</div>  <!-- Key stats: unit, tick, limit -->
    <div class="info-grid">...</div>  <!-- Cards: specs, market, demand, factors -->
    <div class="highlight-box">...</div>  <!-- Optional seasonal/key insights -->
    <div class="chain-section">...</div>  <!-- Industrial chain flow -->
    <div class="global-section">...</div>  <!-- External market correlations -->
</section>
```

**Adding a New Futures Product:**
1. Add nav item in sidebar (around line 392-442) with appropriate icon class
2. Add new `<section>` in main content (before closing `</main>`)
3. Update CSS icon classes (`.nav) if adding new color scheme
4. Follow existing section structure for consistency

**CSS Icon Classes:** Currently defined: `.sp`, `.rb`, `.sa`, `.fg`, `.hc`, `.v`, `.si`, `.ss`

## Supported Products

| Code | Name | Exchange | Category |
|------|------|----------|----------|
| SP | 纸浆 (Pulp) | 上期所 | 造纸原料 |
| RB | 螺纹钢 (Rebar) | 上期所 | 建筑钢材 |
| SA | 纯碱 (Soda Ash) | 郑商所 | 化工原料 |
| FG | 玻璃 (Glass) | 郑商所 | 建材 |
| HC | 热卷 (Hot Coil) | 上期所 | 钢材 |
| V | PVC | 大商所 | 化工 |
| SI | 工业硅 (Industrial Silicon) | 广期所 | 新能源金属 |
| SS | 不锈钢 (Stainless Steel) | 上期所 | 特种钢材 |

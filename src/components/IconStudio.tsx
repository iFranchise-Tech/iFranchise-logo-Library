"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { iconCatalog } from "@/icons/catalog";
import { fontAwesomeCatalog } from "@/icons/fontAwesome";
import { Icon as BaseIcon } from "@/icons/Icon";
import type { IconDefinition, IconCategory, IconStyle } from "@/icons/types";

const categories: IconCategory[] = ["Navigation", "Actions", "HRMS", "CRM", "Business", "Communication", "Documents", "Finance", "Analytics", "System", "Status", "Media", "Animated"];
const colors = ["#1d3659", "#2675c8", "#36a47b", "#e35e56", "#8b63d9", "#e1a323"];
const allIcons = [...fontAwesomeCatalog, ...iconCatalog];
const pageSize = 168;
type LibraryFilter = "all" | "ifranchise" | "free" | "solid" | "regular" | "brands";
type CodeTab = "HTML" | "WA" | "SVG" | "REACT" | "VUE" | "AI";
const codeTabs: CodeTab[] = ["HTML", "WA", "SVG", "REACT", "VUE", "AI"];
type PreviewAnimation = "none" | "beat" | "bounce" | "fade" | "flip" | "shake" | "spin";
type PreviewCanvas = "auto" | "square" | "roomy";
function slugify(name: string) { return name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(); }
function svgText(icon: IconDefinition, size = 24, color = "currentColor") {
  const filled = icon.filled ?? false;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox ?? "0 0 24 24"}" width="${size}" height="${size}" fill="${filled ? color : "none"}" stroke="${filled ? "none" : color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icon.paths.map(d => `<path d="${d}"${filled ? ` fill="${color}"` : ""}/>`).join("")}</svg>`;
}
function htmlSnippet(icon: IconDefinition) {
  if (icon.source === "fontawesome") return `<i class="fa-${icon.fontAwesomeStyle === "brands" ? "brands" : icon.fontAwesomeStyle === "regular" ? "regular" : "solid"} fa-${icon.name}"></i>`;
  return svgText(icon);
}
function reactSnippet(icon: IconDefinition) {
  if (icon.source === "fontawesome") {
    const pack = icon.fontAwesomeStyle === "brands" ? "free-brands-svg-icons" : icon.fontAwesomeStyle === "regular" ? "free-regular-svg-icons" : "free-solid-svg-icons";
    return `import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";\nimport { ${icon.fontAwesomeExport} } from "@fortawesome/${pack}";\n\n<FontAwesomeIcon icon={${icon.fontAwesomeExport}} />`;
  }
  return `import { ${icon.componentName} } from "@ifranchise/icons";\n\n<${icon.componentName} />`;
}
function codeText(icon: IconDefinition, tab: CodeTab) {
  if (tab === "SVG") return svgText(icon);
  if (tab === "REACT") return reactSnippet(icon);
  if (tab === "VUE") return icon.source === "fontawesome"
    ? `<script setup>\nimport { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";\nimport { ${icon.fontAwesomeExport} } from "@fortawesome/${icon.fontAwesomeStyle === "brands" ? "free-brands-svg-icons" : icon.fontAwesomeStyle === "regular" ? "free-regular-svg-icons" : "free-solid-svg-icons"}";\n</script>\n\n<template><FontAwesomeIcon :icon="${icon.fontAwesomeExport}" /></template>`
    : `<template>\n  ${svgText(icon)}\n</template>`;
  if (tab === "AI") return `Use the ${icon.name} icon${icon.source === "fontawesome" ? ` from Font Awesome Free ${icon.fontAwesomeStyle}` : " from the iFranchise icon library"}. Keep the original silhouette and use it as a ${icon.category.toLowerCase()} symbol.`;
  if (tab === "WA") return icon.source === "fontawesome" ? `<i class="fa-${icon.fontAwesomeStyle === "brands" ? "brands" : icon.fontAwesomeStyle === "regular" ? "regular" : "solid"} fa-${icon.name}"></i>` : htmlSnippet(icon);
  return htmlSnippet(icon);
}
function CardActionGlyph({ kind }: { kind: "copy" | "download" }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {kind === "copy" ? <><path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 4l-4 16"/></> : <><path d="M12 3v12m-6-6 6 6 6-6M5 21h14"/></>}
  </svg>;
}
function PreviewToolGlyph({ kind }: { kind: "style" | "animate" }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {kind === "style" ? <><path d="M12 3a9 9 0 1 0 0 18h1.1a2 2 0 0 0 1.6-3.2 1.8 1.8 0 0 1 1.4-2.9H18a5 5 0 0 0 0-10h-6Z"/><circle cx="7.5" cy="11" r=".8"/><circle cx="10" cy="7.5" r=".8"/><circle cx="15" cy="7.5" r=".8"/></> : <><path d="m12 3 1.6 6.4L20 11l-6.4 1.6L12 19l-1.6-6.4L4 11l6.4-1.6L12 3Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></>}
  </svg>;
}

export function IconStudio({ initialSlug }: { initialSlug?: string }) {
  const [activeCategory, setActiveCategory] = useState("All Icons");
  const [sourceFilter, setSourceFilter] = useState<LibraryFilter>("all");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(initialSlug || "");
  const [size, setSize] = useState(120);
  const [color, setColor] = useState(colors[0]);
  const [previewBg, setPreviewBg] = useState<"light" | "dark">("light");
  const [showStylingTools, setShowStylingTools] = useState(false);
  const [showAnimationOptions, setShowAnimationOptions] = useState(false);
  const [animation, setAnimation] = useState<PreviewAnimation>("none");
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [canvas, setCanvas] = useState<PreviewCanvas>("auto");
  const [dark, setDark] = useState(false);
  const [codeTab, setCodeTab] = useState<CodeTab>("HTML");
  const [toast, setToast] = useState("");
  const reduceMotion = useReducedMotion();
  const current = allIcons.find(icon => icon.slug === selected);
  const previewModified = size !== 120 || color !== colors[0] || previewBg !== "light" || animation !== "none" || rotation !== 0 || flipX || flipY || canvas !== "auto";
  const resetPreview = () => { setSize(120); setColor(colors[0]); setPreviewBg("light"); setAnimation("none"); setRotation(0); setFlipX(false); setFlipY(false); setCanvas("auto"); setShowStylingTools(false); setShowAnimationOptions(false); };
  const relatedIcons = useMemo(() => {
    if (!current) return [];
    const family = current.name.split("-")[0];
    const related = allIcons.filter(icon => icon.name === family || icon.name.startsWith(`${family}-`));
    return related.length ? related : [current];
  }, [current]);
  const visibleIcons = useMemo(() => allIcons.filter(icon => {
    const sourceMatch = sourceFilter === "all" || (sourceFilter === "ifranchise" ? (icon.source ?? "ifranchise") === "ifranchise" : sourceFilter === "free" ? icon.source === "fontawesome" : icon.fontAwesomeStyle === sourceFilter);
    const categoryMatch = activeCategory === "All Icons" || (activeCategory === "Animated" ? Boolean(icon.animated) : icon.category === activeCategory && (icon.source ?? "ifranchise") === "ifranchise");
    const termMatch = !search || `${icon.name} ${icon.category} ${icon.description} ${icon.tags.join(" ")} ${icon.fontAwesomeStyle ?? ""}`.toLowerCase().includes(search.toLowerCase());
    return sourceMatch && categoryMatch && termMatch;
  }), [activeCategory, search, sourceFilter]);
  const pageCount = Math.max(1, Math.ceil(visibleIcons.length / pageSize));
  const pageIcons = visibleIcons.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(""), 2200); return () => window.clearTimeout(timer); }, [toast]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); document.querySelector<HTMLInputElement>(".searchbox input")?.focus(); }
      if (event.key === "Escape" && selected) closeIcon();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);
  useEffect(() => { setPage(1); }, [activeCategory, search, sourceFilter]);
  function showIcon(slug: string) { setSelected(slug); setCodeTab("HTML"); window.history.pushState({}, "", `/icons/${slug}`); }
  function closeIcon() { setSelected(""); window.history.pushState({}, "", "/"); }
  async function copy(text: string, message: string) { try { await navigator.clipboard.writeText(text); setToast(message); } catch { setToast("Clipboard access unavailable"); } }
  function download(name: string, body: string, ext: string, mime: string) { const url = URL.createObjectURL(new Blob([body], { type: mime })); const link = document.createElement("a"); link.href = url; link.download = `${slugify(name)}.${ext}`; link.click(); URL.revokeObjectURL(url); setToast(`${name}.${ext} downloaded`); }
  async function share(icon: IconDefinition) {
    const url = `${window.location.origin}/icons/${icon.slug}`;
    try { await navigator.clipboard.writeText(url); setToast("Share link copied"); }
    catch { if (navigator.share) { try { await navigator.share({ title: `${icon.name} icon`, url }); } catch { /* Share sheet dismissed. */ } } else setToast("Clipboard access unavailable"); }
  }
  function downloadPng(icon: IconDefinition) {
    const svgUrl = URL.createObjectURL(new Blob([svgText(icon, 256, color)], { type: "image/svg+xml" }));
    const image = new Image();
    image.onload = () => { const canvas = document.createElement("canvas"); canvas.width = canvas.height = 256; const context = canvas.getContext("2d"); context?.drawImage(image, 0, 0); URL.revokeObjectURL(svgUrl); canvas.toBlob(blob => { if (!blob) return; const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `${slugify(icon.name)}.png`; link.click(); setToast(`${icon.name}.png downloaded`); }, "image/png"); };
    image.onerror = () => { URL.revokeObjectURL(svgUrl); setToast("PNG export failed"); };
    image.src = svgUrl;
  }
  function switchStyle(style: "solid" | "regular" | "brands") {
    if (!current) return;
    const sibling = fontAwesomeCatalog.find(icon => icon.name === current.name && icon.fontAwesomeStyle === style);
    if (sibling) showIcon(sibling.slug); else setToast(`No ${style} version of ${current.name}`);
  }

  return <main className={dark ? "studio studio-gallery dark" : "studio studio-gallery"}>
    <header className="topbar"><a className="studio-brand" href="/" aria-label="iFranchise Icon Studio home"><span className="brand-mark"><i/><i/><i/><i/></span><span><b>iFranchise</b><small>ICON STUDIO</small></span></a><label className="searchbox global-search"><BaseIcon name="Search" size={18}/><input aria-label="Search icons" placeholder="Search by name, category, or keyword..." value={search} onChange={event => setSearch(event.target.value)}/><kbd>⌘ K</kbd></label><div className="top-actions"><span className="result-count">{visibleIcons.length.toLocaleString()} icons</span><button className="theme-button" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? "☼" : "◐"}</button></div></header>
    <aside className="library-sidebar" aria-label="Icon library filters">
      <nav className="source-nav" aria-label="Icon collections">
        <button className={sourceFilter === "all" ? "active" : ""} onClick={() => { setSourceFilter("all"); setActiveCategory("All Icons"); }}>All Icons <b>{allIcons.length.toLocaleString()}</b></button>
        <button className={sourceFilter === "free" ? "active" : ""} onClick={() => { setSourceFilter("free"); setActiveCategory("All Icons"); }}>Free Icons <b>{fontAwesomeCatalog.length.toLocaleString()}</b></button>
        <button className="locked pro" title="Font Awesome Pro icon packs require a licensed Pro kit" aria-disabled="true">Pro Icons <span>LOCKED</span></button>
        <button className="locked proplus" title="Font Awesome Pro+ icon packs require a licensed Pro+ kit" aria-disabled="true">Pro+ Icons <span>LOCKED</span></button>
      </nav>
      <section className="sidebar-section"><h2>FREE STYLES</h2>
        <button className={sourceFilter === "solid" ? "selected" : ""} onClick={() => { setSourceFilter("solid"); setActiveCategory("All Icons"); }}>Solid <b>{fontAwesomeCatalog.filter(icon => icon.fontAwesomeStyle === "solid").length.toLocaleString()}</b></button>
        <button className={sourceFilter === "regular" ? "selected" : ""} onClick={() => { setSourceFilter("regular"); setActiveCategory("All Icons"); }}>Regular <b>{fontAwesomeCatalog.filter(icon => icon.fontAwesomeStyle === "regular").length.toLocaleString()}</b></button>
        <button className={sourceFilter === "brands" ? "selected" : ""} onClick={() => { setSourceFilter("brands"); setActiveCategory("All Icons"); }}>Brands <b>{fontAwesomeCatalog.filter(icon => icon.fontAwesomeStyle === "brands").length.toLocaleString()}</b></button>
      </section>
      <section className="sidebar-section category-links"><h2>iFRANCHISE ICONS</h2>
        <button className={sourceFilter === "ifranchise" && activeCategory === "All Icons" ? "selected" : ""} onClick={() => { setSourceFilter("ifranchise"); setActiveCategory("All Icons"); }}>Originals <b>{iconCatalog.length}</b></button>
        {categories.map(category => <button key={category} className={sourceFilter === "ifranchise" && activeCategory === category ? "selected" : ""} onClick={() => { setSourceFilter("ifranchise"); setActiveCategory(category); }}>{category}</button>)}
      </section>
      <a className="sidebar-playground" href="/playground">Icon Playground <span>↗</span></a>
    </aside>
    <section className="main-column"><div className="content"><div className="gallery-heading"><div><span className="eyebrow">ICON LIBRARY</span><h1>{activeCategory === "All Icons" ? (sourceFilter === "all" ? "All Icons" : sourceFilter === "free" ? "Free Icons" : sourceFilter === "ifranchise" ? "iFranchise Originals" : `${sourceFilter[0].toUpperCase()}${sourceFilter.slice(1)} Icons`) : activeCategory}</h1><p>Browse, preview, and copy every icon in the library.</p></div><div className="gallery-count"><b>{visibleIcons.length.toLocaleString()} icons</b><span>Page {page} of {pageCount}</span></div></div>
      <div className="collection-header"><h2>{activeCategory === "All Icons" ? "All icons" : activeCategory} <span>{visibleIcons.length.toLocaleString()}</span></h2><label className="category-select"><span>Category</span><select value={activeCategory} onChange={event => { setActiveCategory(event.target.value); if (event.target.value !== "All Icons") setSourceFilter("ifranchise"); }}><option>All Icons</option>{categories.map(category => <option key={category}>{category}</option>)}</select></label></div>
      {pageIcons.length ? <div className="icon-grid">{pageIcons.map((icon, index) => <motion.div key={icon.slug} role="button" tabIndex={0} aria-label={`Open ${icon.name} icon`} className="icon-card" onClick={() => showIcon(icon.slug)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); showIcon(icon.slug); } }} initial={reduceMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .14, delay: Math.min(index * .002, .12) }}><span className="card-preview"><BaseIcon name={icon.name} slug={icon.slug} size={42}/><span className="card-hover"><button type="button" title="Copy HTML" aria-label={`Copy HTML for ${icon.name}`} onClick={event => { event.stopPropagation(); void copy(htmlSnippet(icon), "HTML copied"); }}><CardActionGlyph kind="copy"/></button><button type="button" title="Download SVG" aria-label={`Download SVG for ${icon.name}`} onClick={event => { event.stopPropagation(); download(icon.name, svgText(icon), "svg", "image/svg+xml"); }}><CardActionGlyph kind="download"/></button></span></span><span className="card-meta"><b>{icon.name}</b></span></motion.div>)}</div> : <div className="empty-state"><span>⌕</span><b>No icons found</b><p>Try another search term or category.</p></div>}
      <div className="pagination"><button disabled={page <= 1} onClick={() => setPage(Math.max(1, page - 1))}>← Previous</button><span>Page <b>{page}</b> of {pageCount}</span><button disabled={page >= pageCount} onClick={() => setPage(Math.min(pageCount, page + 1))}>Next →</button></div><footer className="page-footer"><span>iFranchise Icon Studio</span><span>Thoughtfully made for every product ✳</span><span>Font Awesome Free · 7.3</span></footer>
    </div></section>
    <AnimatePresence>{current && <motion.div className="icon-modal-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={event => { if (event.target === event.currentTarget) closeIcon(); }}><motion.section className="icon-modal" role="dialog" aria-modal="true" aria-label={`${current.name} icon`} initial={{ opacity: 0, y: 18, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .985 }} transition={{ duration: .18 }}>
      <header className="icon-modal-head"><div className="modal-title"><h2>{current.name}</h2><button className="modal-copy-name" title="Copy icon name" onClick={() => void copy(current.name, "Icon name copied")}>⧉</button></div><div className="modal-quick-actions"><code>{current.source === "fontawesome" ? current.fontAwesomeExport?.replace(/^fa/, "") : current.componentName}</code><button title="Copy glyph" aria-label="Copy glyph" onClick={() => void copy(current.source === "fontawesome" && current.unicode ? `&#x${current.unicode};` : htmlSnippet(current), "Glyph copied")}>◈</button><button title="Download PNG" aria-label="Download PNG" onClick={() => downloadPng(current)}>▧</button><button title="Download SVG" aria-label="Download SVG" onClick={() => download(current.name, svgText(current), "svg", "image/svg+xml")}>↓</button><button className="modal-close" title="Close" aria-label="Close icon details" onClick={closeIcon}>×</button></div></header>
      <div className="icon-modal-body"><div className="modal-left"><div className={`modal-preview ${previewBg}`}><div className={`preview-canvas ${canvas}`}><div className={`modal-icon-motion ${animation}`} style={{transform:`rotate(${rotation}deg) scale(${flipX ? -1 : 1},${flipY ? -1 : 1})`}}><BaseIcon name={current.name} slug={current.slug} size={size} color={color}/></div></div><div className="preview-tools"><button className={showStylingTools ? "active" : ""} title="Show styling tools" aria-label="Show styling tools" aria-expanded={showStylingTools} onClick={() => { const opening = !showStylingTools; setShowStylingTools(opening); if (opening) setShowAnimationOptions(false); }}><PreviewToolGlyph kind="style"/></button><button className={showAnimationOptions ? "active" : ""} title="Show animation options" aria-label="Show animation options" aria-expanded={showAnimationOptions} onClick={() => { const opening = !showAnimationOptions; setShowAnimationOptions(opening); if (opening) setShowStylingTools(false); }}><PreviewToolGlyph kind="animate"/></button>{previewModified && <button className="reset-preview" title="Reset all preview changes" onClick={resetPreview}>Reset</button>}<button className="preview-moon" title="Toggle preview background" aria-label="Toggle preview background" onClick={() => setPreviewBg(previewBg === "light" ? "dark" : "light")}>{previewBg === "light" ? "◐" : "☼"}</button></div></div>
          {showStylingTools && <section className="preview-options styling-options" aria-label="Styling tools"><div className="preview-option-row"><b>COLOR</b><div className="preview-swatches">{colors.map(swatch => <button key={swatch} title={`Set color ${swatch}`} aria-label={`Set icon color ${swatch}`} className={color === swatch ? "on" : ""} style={{background:swatch}} onClick={() => setColor(swatch)}/>)}</div></div><div className="preview-option-row size-option"><b>SIZE</b><div className="preview-size-presets">{[[48,"2xs"],[64,"xs"],[80,"sm"],[120,"md"],[160,"lg"],[200,"xl"],[240,"2xl"]].map(([pixels,label]) => <button key={label} className={size === pixels ? "on" : ""} onClick={() => setSize(Number(pixels))}>{label}</button>)}</div><input aria-label="Custom icon size" type="range" min="48" max="240" step="8" value={size} onChange={event => setSize(Number(event.target.value))}/><span>{size}px</span></div><div className="preview-option-row"><b>ROTATE</b><div className="preview-control-buttons">{[0,90,180,270].map(degrees => <button key={degrees} className={rotation === degrees ? "on" : ""} onClick={() => setRotation(degrees)}>{degrees ? `${degrees}°` : "None"}</button>)}</div><label className="custom-rotation"><span>Custom</span><input aria-label="Custom rotation degrees" type="number" value={rotation} onChange={event => setRotation(Number(event.target.value) || 0)}/>°</label></div><div className="preview-option-row"><b>FLIP</b><div className="preview-control-buttons"><button className={flipX ? "on" : ""} aria-pressed={flipX} onClick={() => setFlipX(!flipX)}>↔ Horizontal</button><button className={flipY ? "on" : ""} aria-pressed={flipY} onClick={() => setFlipY(!flipY)}>↕ Vertical</button></div></div><div className="preview-option-row"><b>CANVAS</b><div className="preview-control-buttons">{(["auto","square","roomy"] as PreviewCanvas[]).map(option => <button key={option} className={canvas === option ? "on" : ""} onClick={() => setCanvas(option)}>{option[0].toUpperCase()+option.slice(1)}</button>)}</div></div></section>}
          {showAnimationOptions && <section className="preview-options animation-options" aria-label="Animation options"><b>ANIMATE</b><div>{(["none","beat","bounce","fade","flip","shake","spin"] as PreviewAnimation[]).map(option => <button key={option} className={animation === option ? "on" : ""} onClick={() => setAnimation(option)}>{option === "none" ? "No animation" : option[0].toUpperCase()+option.slice(1)}</button>)}</div></section>}
          <div className="modal-style-chips"><span className="category-chip">{current.source === "fontawesome" ? current.fontAwesomeStyle : current.category}</span>{current.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div></div>
        <div className="modal-right"><div className="modal-selectors"><div className="variant-select related-select"><label><span>Related icons</span><select aria-label="Choose a related icon" value={current.slug} onChange={event => showIcon(event.target.value)}>{relatedIcons.map(icon => <option key={icon.slug} value={icon.slug}>{icon.name} · {icon.source === "fontawesome" ? icon.fontAwesomeStyle : "iFranchise"}</option>)}</select></label>{current.source === "fontawesome" && <div className="variant-buttons">{(["solid", "regular", "brands"] as const).map(style => { const match = fontAwesomeCatalog.find(icon => icon.name === current.name && icon.fontAwesomeStyle === style); return match ? <button key={style} className={match.slug === current.slug ? "on" : ""} aria-label={`${style} variant`} title={`${style[0].toUpperCase()}${style.slice(1)} variant`} onClick={() => showIcon(match.slug)}><BaseIcon name={match.name} slug={match.slug} size={23}/></button> : null; })}</div>}</div>{current.source === "fontawesome" && <label><span>Style</span><select aria-label="Choose icon style" value={current.fontAwesomeStyle} onChange={event => switchStyle(event.target.value as "solid" | "regular" | "brands")}><option value="solid">Classic · Solid</option><option value="regular">Classic · Regular</option><option value="brands">Brands</option></select></label>}</div>
          <div className="modal-code"><div className="code-tabs" role="tablist" aria-label="Code format">{codeTabs.map(tab => <button key={tab} role="tab" aria-selected={codeTab === tab} className={codeTab === tab ? "on" : ""} onClick={() => setCodeTab(tab)}>{tab}</button>)}</div><pre><code>{codeText(current, codeTab)}</code></pre><div className="code-footer"><span>ⓘ {current.description}</span><button aria-label={`Copy ${codeTab} code`} onClick={() => void copy(codeText(current, codeTab), `${codeTab} code copied`)}><span aria-hidden="true">⧉</span> Copy</button></div></div>
          <div className="modal-cta-row"><button className="modal-primary" onClick={() => void copy(codeText(current, codeTab), `${codeTab} code copied`)}><span aria-hidden="true">↗</span> Start Using This Icon</button><button className="modal-secondary" title="Share icon" aria-label="Share icon" onClick={() => void share(current)}>↗</button></div>
        </div></div>
      </motion.section></motion.div>}</AnimatePresence>
    <AnimatePresence>{toast && <motion.div className="toast" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 8, opacity: 0 }}><span>✓</span>{toast}</motion.div>}</AnimatePresence>
  </main>;
}

(() => {
  "use strict";

  const languages = [
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "tr", label: "Türkçe", flag: "🇹🇷" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "uk", label: "Українська", flag: "🇺🇦" },
  ];
  const languageNames = {
    de: { trigger: "Sprache ändern", menu: "Verfügbare Sprachen" },
    en: { trigger: "Change language", menu: "Available languages" },
    tr: { trigger: "Dili değiştir", menu: "Kullanılabilir diller" },
    ar: { trigger: "تغيير اللغة", menu: "اللغات المتاحة" },
    ru: { trigger: "Сменить язык", menu: "Доступные языки" },
    uk: { trigger: "Змінити мову", menu: "Доступні мови" },
  };
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const supported = new Set(languages.map(({ code }) => code));
  const current = supported.has(pathParts[0]) ? pathParts[0] : "de";
  const section = current === "de" ? pathParts : pathParts.slice(1);
  const page = section.length ? section.join("/") : "index.html";
  const widget = document.createElement("div");
  widget.className = "language-switcher";

  const trigger = document.createElement("button");
  trigger.className = "language-switcher__trigger";
  trigger.type = "button";
  trigger.id = "language-switcher-trigger";
  trigger.setAttribute("aria-haspopup", "menu");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", "language-switcher-menu");
  trigger.setAttribute("aria-label", languageNames[current].trigger);
  trigger.innerHTML = `<span class="language-switcher__flag" aria-hidden="true">${languages.find((item) => item.code === current).flag}</span><span class="language-switcher__code">${current.toUpperCase()}</span><span class="language-switcher__chevron" aria-hidden="true"></span>`;

  const menu = document.createElement("div");
  menu.className = "language-switcher__menu";
  menu.id = "language-switcher-menu";
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", languageNames[current].menu);
  menu.hidden = true;

  languages.forEach(({ code, label, flag }) => {
    const target = page === "index.html" ? (code === "de" ? "/" : `/${code}/`) : (code === "de" ? `/${page}` : `/${code}/${page}`);
    const link = document.createElement("a");
    link.className = "language-switcher__option";
    link.href = target + window.location.search + window.location.hash;
    link.setAttribute("role", "menuitemradio");
    link.setAttribute("aria-checked", String(code === current));
    link.dataset.language = code;
    if (code === current) {
      link.classList.add("is-current");
      link.setAttribute("aria-current", "true");
    }
    link.innerHTML = `<span class="language-switcher__option-flag" aria-hidden="true">${flag}</span><span>${label}</span>`;
    menu.append(link);
  });

  widget.append(trigger, menu);
  const nav = document.querySelector("header .nav");
  if (nav) {
    nav.classList.add("has-language-switcher");
    nav.append(widget);
  } else {
    document.body.classList.add("has-floating-language-switcher");
    document.body.append(widget);
  }

  const style = document.createElement("style");
  style.textContent = `
    .language-switcher { position: relative; z-index: 30; flex: 0 0 auto; direction: ltr; font-family: inherit; }
    .language-switcher__trigger { box-sizing: border-box; display: inline-flex; min-width: 78px; min-height: 46px; align-items: center; justify-content: center; gap: 7px; padding: 7px 10px; color: #fff; background: rgba(20,22,19,.88); border: 1px solid #c9a95e; border-radius: 9px; box-shadow: 0 3px 14px rgba(0,0,0,.22); font-family: inherit; font-size: 14px; font-weight: 600; line-height: 1; cursor: pointer; -webkit-tap-highlight-color: transparent; transition: background-color .16s ease, border-color .16s ease, box-shadow .16s ease, transform .12s ease; }
    .language-switcher__trigger:hover, .language-switcher__trigger[aria-expanded="true"] { background: rgba(36,34,27,.97); border-color: #f0d58c; }
    .language-switcher__trigger:active { transform: translateY(1px); }
    .language-switcher__trigger:focus-visible, .language-switcher__option:focus-visible { outline: 3px solid #f3d783; outline-offset: 3px; }
    .language-switcher__flag, .language-switcher__option-flag { font-family: "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif; font-size: 18px; line-height: 1; }
    .language-switcher__code { letter-spacing: .04em; }
    .language-switcher__chevron { width: 7px; height: 7px; margin: -4px 1px 0 3px; border-right: 1.5px solid currentColor; border-bottom: 1.5px solid currentColor; transform: rotate(45deg); transition: transform .16s ease; }
    .language-switcher__trigger[aria-expanded="true"] .language-switcher__chevron { margin-top: 4px; transform: rotate(225deg); }
    .language-switcher__menu { position: absolute; top: calc(100% + 8px); inset-inline-end: 0; z-index: 50; box-sizing: border-box; width: max-content; min-width: 190px; max-width: min(260px, calc(100vw - 24px - env(safe-area-inset-left) - env(safe-area-inset-right))); max-height: min(420px, calc(100dvh - 24px - env(safe-area-inset-top) - env(safe-area-inset-bottom))); overflow-y: auto; padding: 6px; color: #fff; background: rgba(21,23,20,.97); border: 1px solid rgba(213,179,107,.9); border-radius: 11px; box-shadow: 0 12px 30px rgba(0,0,0,.34); }
    .language-switcher__menu[hidden] { display: none; }
    .language-switcher__option { display: flex; min-height: 44px; box-sizing: border-box; align-items: center; gap: 11px; padding: 9px 12px; border-radius: 7px; color: #f7f4ed; text-decoration: none; font-family: inherit; font-size: 15px; font-weight: 500; line-height: 1.3; white-space: nowrap; }
    .language-switcher__option:hover, .language-switcher__option.is-current { color: #fff; background: rgba(201,169,94,.2); }
    .language-switcher__option.is-current::after { content: "✓"; margin-inline-start: auto; color: #e5c879; }
    .nav.has-language-switcher { gap: 18px; }
    .nav.has-language-switcher .nav-links { order: 1; flex: 0 1 auto; min-width: 0; margin-inline-start: auto; transform: none !important; }
    .nav.has-language-switcher > .language-switcher { order: 2; }
    .nav.has-language-switcher > .menu-toggle { order: 3; }
    body.has-floating-language-switcher > .language-switcher { position: fixed; inset-block-start: max(12px, env(safe-area-inset-top)); inset-inline-end: max(12px, env(safe-area-inset-right)); z-index: 1000; }
    body.has-floating-language-switcher > main { padding-block-start: max(72px, calc(16px + 46px + env(safe-area-inset-top))) !important; }
    html[dir="rtl"] .language-switcher { direction: ltr; }
    html[dir="rtl"] .language-switcher__menu { direction: rtl; text-align: right; }
    html[dir="rtl"] body.has-floating-language-switcher .language-switcher__menu { inset-inline-start: auto; inset-inline-end: auto; left: auto; right: 0; }
    html[dir="rtl"] .language-switcher__option { direction: rtl; }
    @media (max-width: 900px) {
      header { position: relative; z-index: 20; }
      .nav.has-language-switcher { box-sizing: border-box; width: 100%; min-height: 64px; display: flex; flex-direction: row; justify-content: space-between; gap: 12px; padding-inline: max(16px, env(safe-area-inset-left)) max(16px, env(safe-area-inset-right)); direction: ltr; }
      html[dir="rtl"] .nav.has-language-switcher { direction: ltr; justify-content: space-between; }
      .nav.has-language-switcher > .language-switcher { order: 1; margin-inline-end: auto; }
      .nav.has-language-switcher > .menu-toggle { order: 2; display: flex; flex: 0 0 44px; width: 44px; height: 44px; box-sizing: border-box; align-items: center; justify-content: center; padding: 9px; z-index: 13; }
      .nav.has-language-switcher > .nav-links { display: none; position: absolute; top: calc(100% + 4px); inset-inline: max(16px, env(safe-area-inset-left)) max(16px, env(safe-area-inset-right)); width: auto; max-width: none; box-sizing: border-box; max-height: calc(100dvh - 84px - env(safe-area-inset-top) - env(safe-area-inset-bottom)); overflow-y: auto; margin: 0; padding: 10px; flex-direction: column; align-items: stretch; gap: 0; background: rgba(25,25,23,.98); border: 1px solid rgba(255,255,255,.2); border-radius: 10px; transform: none !important; z-index: 12; }
      .nav.has-language-switcher > .nav-links.is-open { display: flex; }
      .nav.has-language-switcher > .nav-links a { min-height: 44px; box-sizing: border-box; display: flex; align-items: center; padding: 10px 8px; white-space: normal; }
      .nav.has-language-switcher .language-switcher__menu { inset-inline-start: auto; inset-inline-end: auto; left: 0; right: auto; }
      .nav.has-language-switcher .language-switcher__trigger { min-width: 82px; }
      html[dir="rtl"] .nav.has-language-switcher .nav-links { direction: rtl; text-align: right; }
    }
    @media (max-width: 360px) { .nav.has-language-switcher { gap: 8px; } }
    @media (prefers-reduced-motion: reduce) { .language-switcher__trigger, .language-switcher__chevron { transition: none; } }
  `;
  document.head.append(style);

  const closeMenu = ({ returnFocus = false } = {}) => {
    menu.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    if (returnFocus) trigger.focus();
  };
  const openMenu = () => {
    const mobileToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (mobileToggle && navLinks) {
      mobileToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("is-open");
    }
    menu.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    menu.querySelector(`[data-language="${current}"]`)?.focus();
  };
  trigger.addEventListener("click", () => menu.hidden ? openMenu() : closeMenu());
  document.addEventListener("pointerdown", (event) => {
    if (!widget.contains(event.target)) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (menu.hidden) return;
    const options = [...menu.querySelectorAll('[role="menuitemradio"]')];
    const index = options.indexOf(document.activeElement);
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu({ returnFocus: true });
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length;
      options[next].focus();
    } else if (event.key === "Tab" && !widget.contains(event.target)) closeMenu();
  });
  widget.addEventListener("focusout", (event) => {
    if (!widget.contains(event.relatedTarget)) closeMenu();
  });
  document.querySelector(".menu-toggle")?.addEventListener("click", () => closeMenu());
})();

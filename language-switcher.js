(() => {
  const languageOptions = [
    ["", "DE Deutsch"],
    ["en", "EN English"],
    ["tr", "TR Türkçe"],
    ["ar", "AR العربية"],
    ["ru", "RU Русский"],
    ["uk", "UK Українська"]
  ];
  const segments = window.location.pathname.split("/").filter(Boolean);
  const currentLanguage = languageOptions.some(([code]) => code && code === segments[0]) ? segments[0] : "";
  const currentPage = segments.length > 1 ? segments[1] : (segments.length === 1 && !currentLanguage ? segments[0] : "index.html");
  const wrapper = document.createElement("label");
  wrapper.className = "language-switcher";
  wrapper.htmlFor = "language-select";
  const languageLabels = {
    "": ["Sprache", "Sprache auswählen"],
    en: ["Language", "Choose language"],
    tr: ["Dil", "Dil seçin"],
    ar: ["اللغة", "اختر اللغة"],
    ru: ["Язык", "Выберите язык"],
    uk: ["Мова", "Виберіть мову"]
  };
  wrapper.textContent = `${languageLabels[currentLanguage][0]} `;
  wrapper.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  if (!document.querySelector(".hero")) {
    document.body.classList.add("has-floating-language-switcher");
  }

  const select = document.createElement("select");
  select.id = "language-select";
  select.setAttribute("aria-label", languageLabels[currentLanguage][1]);
  select.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  for (const [code, label] of languageOptions) {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = label;
    option.selected = code === currentLanguage;
    select.append(option);
  }
  select.addEventListener("change", () => {
    const target = select.value ? `/${select.value}/${currentPage}` : `/${currentPage}`;
    window.location.assign(`${target}${window.location.hash}`);
  });
  wrapper.append(select);
  document.body.append(wrapper);

  const style = document.createElement("style");
  style.textContent = `.language-switcher{position:fixed;inset-block-start:12px;inset-inline-end:16px;z-index:10000;display:flex;align-items:center;gap:6px;padding:7px 9px;border:1px solid #d5d9dc;border-radius:8px;background:#fff;color:#27333a;font:500 13px/1.2 Arial,sans-serif;box-shadow:0 2px 10px #0002}.language-switcher select{max-width:150px;border:0;background:transparent;color:inherit;font:inherit;cursor:pointer}.language-switcher:focus-within{outline:2px solid #9a7b4f;outline-offset:2px}@media(max-width:650px){.language-switcher{inset-block-start:8px;inset-inline-end:8px;font-size:12px}.language-switcher select{max-width:120px}body.has-floating-language-switcher main{padding-block-start:76px!important}}`;
  document.head.append(style);
})();

(function attachUiModule(global) {
  const HermesPerfAnalyzer = global.HermesPerfAnalyzer || (global.HermesPerfAnalyzer = {});

  function $(id) {
    return document.getElementById(id);
  }

  function iconMarkup(iconId, className = 'icon') {
    return `<svg class="${className}" aria-hidden="true"><use href="#icon-${iconId}"></use></svg>`;
  }

  function iconLabelMarkup(iconId, label) {
    return `<span class="label-with-icon">${iconMarkup(iconId, 'icon icon-group')}<span>${label}</span></span>`;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function metricReadingMarkup(text) {
    const separator = text.indexOf(' ');
    if (separator === -1) return `<strong>${escapeHtml(text)}</strong>`;
    return `<strong>${escapeHtml(text.slice(0, separator))}</strong><small>${escapeHtml(text.slice(separator + 1))}</small>`;
  }

  async function copyToClipboard(text, button, copiedLabel, defaultLabel) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const helper = document.createElement('textarea');
      helper.value = text;
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      document.execCommand('copy');
      helper.remove();
    }
    button.innerHTML = `${iconMarkup('check', 'icon icon-button')}<span>${copiedLabel}</span>`;
    button.setAttribute('aria-label', copiedLabel);
    window.setTimeout(() => {
      button.textContent = defaultLabel;
      button.removeAttribute('aria-label');
    }, 1600);
  }

  function downloadJsonFile(value, filename) {
    const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: 'application/json;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  function colorClass(value, max) {
    const ratio = max > 0 ? value / max : 0;
    if (ratio < 0.35) return 'good';
    if (ratio < 0.65) return 'medium';
    return 'bad';
  }

  function shouldAppendTrailingTrace(values, editedIndex) {
    return editedIndex === values.length - 1 && Boolean(values[editedIndex]?.trim());
  }

  const uiModule = {
    $,
    colorClass,
    copyToClipboard,
    downloadJsonFile,
    escapeHtml,
    iconLabelMarkup,
    iconMarkup,
    metricReadingMarkup,
    shouldAppendTrailingTrace,
  };

  Object.assign(HermesPerfAnalyzer, uiModule);

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = uiModule;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

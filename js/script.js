(function () {
  var menuButton = document.querySelector("[data-menu]");
  var menuPanel = document.getElementById("cardapio-panel");

  if (menuButton && menuPanel) {
    menuButton.addEventListener("click", function () {
      var open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", open ? "false" : "true");
      menuPanel.hidden = open;
      menuPanel.classList.toggle("is-open", !open);
    });
  }

  var button = document.querySelector("[data-share]");
  if (!button) return;

  var label = button.textContent;

  button.addEventListener("click", function () {
    var url = window.location.href;
    var title = document.title;

    if (navigator.share) {
      navigator.share({ title: title, text: title, url: url }).catch(function (error) {
        if (error && error.name === "AbortError") return;
        copyLink(url);
      });
      return;
    }

    copyLink(url);
  });

  function copyLink(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(showCopied).catch(function () {
        copyWithSelection(url);
      });
      return;
    }

    copyWithSelection(url);
  }

  function copyWithSelection(url) {
    var field = document.createElement("textarea");
    field.value = url;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.top = "0";
    field.style.left = "-9999px";
    document.body.appendChild(field);
    field.select();

    try {
      document.execCommand("copy");
      showCopied();
    } catch (error) {
      button.textContent = label;
    }

    field.remove();
  }

  function showCopied() {
    button.textContent = "Link copiado!";
    window.setTimeout(function () {
      button.textContent = label;
    }, 2000);
  }
})();

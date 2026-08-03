/**
 * Lucas Lus Audio — Form handlers
 * Opens WhatsApp or email with a pre-filled message.
 */

(function () {
  const WHATSAPP_NUMBER = "5514991287495";
  const EMAIL_TO = "studio@lucaslusaudio.com";

  function getCheckedValue(form, name) {
    const el = form.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : "";
  }

  function getLabelForValue(form, name, value) {
    const input = form.querySelector(
      'input[name="' + name + '"][value="' + value + '"]'
    );
    if (!input) return value;
    const card = input.closest("label");
    if (!card) return value;
    const span = card.querySelector("span:first-of-type");
    return span ? span.textContent.trim() : value;
  }

  function buildOrcamentoMessage(form, lang) {
    const servico = getCheckedValue(form, "servico") || getCheckedValue(form, "service");
    const servicoLabel = getLabelForValue(
      form,
      form.querySelector('[name="servico"]') ? "servico" : "service",
      servico
    );
    const sobre =
      (form.querySelector('[name="sobre"]') || form.querySelector(".quote-textarea"))
        ?.value?.trim() || "";
    const referencia =
      (form.querySelector('[name="referencia"]') ||
        form.querySelectorAll(".quote-input")[0])?.value?.trim() || "";
    const prazo =
      getCheckedValue(form, "prazo") || getCheckedValue(form, "deadline");
    const prazoName = form.querySelector('[name="prazo"]') ? "prazo" : "deadline";
    const prazoLabel = getLabelForValue(form, prazoName, prazo);
    const prazoExtra =
      form.querySelector(".quote-input-conditional")?.value?.trim() || "";
    const contato =
      getCheckedValue(form, "contato") || getCheckedValue(form, "contact");
    const clienteWhatsapp =
      form.querySelector(".quote-input-whatsapp")?.value?.trim() || "";
    const clienteEmail =
      form.querySelector(".quote-input-email")?.value?.trim() || "";

    if (lang === "en") {
      let msg = "New quote request — Lucas Lus Audio\n\n";
      msg += "Service: " + servicoLabel + "\n\n";
      msg += "About the track:\n" + (sobre || "—") + "\n\n";
      msg += "Reference: " + (referencia || "—") + "\n\n";
      msg += "Deadline: " + prazoLabel;
      if (prazoExtra) msg += " (" + prazoExtra + ")";
      msg += "\n\n";
      msg += "Preferred contact: " + (contato === "email" ? "Email" : "WhatsApp") + "\n";
      if (clienteWhatsapp) msg += "Client WhatsApp: " + clienteWhatsapp + "\n";
      if (clienteEmail) msg += "Client email: " + clienteEmail + "\n";
      return msg;
    }

    let msg = "Nova solicitação de orçamento — Lucas Lus Audio\n\n";
    msg += "Serviço: " + servicoLabel + "\n\n";
    msg += "Sobre a música:\n" + (sobre || "—") + "\n\n";
    msg += "Referência: " + (referencia || "—") + "\n\n";
    msg += "Prazo: " + prazoLabel;
    if (prazoExtra) msg += " (" + prazoExtra + ")";
    msg += "\n\n";
    msg += "Contato preferido: " + (contato === "email" ? "E-mail" : "WhatsApp") + "\n";
    if (clienteWhatsapp) msg += "WhatsApp do cliente: " + clienteWhatsapp + "\n";
    if (clienteEmail) msg += "E-mail do cliente: " + clienteEmail + "\n";
    return msg;
  }

  function buildMentoriaMessage(form, lang) {
    const necessidade =
      (form.querySelector('[name="necessidade"]') || form.querySelector(".quote-textarea"))
        ?.value?.trim() || "";
    const nivel =
      getCheckedValue(form, "nivel") || getCheckedValue(form, "level");
    const nivelName = form.querySelector('[name="nivel"]') ? "nivel" : "level";
    const nivelLabel = getLabelForValue(form, nivelName, nivel);
    const prazo =
      form.querySelector('[name="prazo_livre"]')?.value?.trim() ||
      form.querySelectorAll(".quote-input:not(.quote-input-whatsapp):not(.quote-input-email)")[0]
        ?.value?.trim() ||
      "";
    const contato =
      getCheckedValue(form, "contato") || getCheckedValue(form, "contact");
    const clienteWhatsapp =
      form.querySelector(".quote-input-whatsapp")?.value?.trim() || "";
    const clienteEmail =
      form.querySelector(".quote-input-email")?.value?.trim() || "";

    if (lang === "en") {
      let msg = "New mentoring request — Lucas Lus Audio\n\n";
      msg += "What I'm looking for:\n" + (necessidade || "—") + "\n\n";
      msg += "Current level: " + nivelLabel + "\n\n";
      msg += "Schedule / deadline: " + (prazo || "—") + "\n\n";
      msg += "Preferred contact: " + (contato === "email" ? "Email" : "WhatsApp") + "\n";
      if (clienteWhatsapp) msg += "Client WhatsApp: " + clienteWhatsapp + "\n";
      if (clienteEmail) msg += "Client email: " + clienteEmail + "\n";
      return msg;
    }

    let msg = "Nova solicitação de mentoria — Lucas Lus Audio\n\n";
    msg += "O que busco:\n" + (necessidade || "—") + "\n\n";
    msg += "Momento atual: " + nivelLabel + "\n\n";
    msg += "Prazo / horários: " + (prazo || "—") + "\n\n";
    msg += "Contato preferido: " + (contato === "email" ? "E-mail" : "WhatsApp") + "\n";
    if (clienteWhatsapp) msg += "WhatsApp do cliente: " + clienteWhatsapp + "\n";
    if (clienteEmail) msg += "E-mail do cliente: " + clienteEmail + "\n";
    return msg;
  }

  function validate(form, lang) {
    const contato =
      getCheckedValue(form, "contato") || getCheckedValue(form, "contact");
    const textarea = form.querySelector(".quote-textarea");
    const mainText = textarea ? textarea.value.trim() : "";

    if (!mainText) {
      alert(
        lang === "en"
          ? "Please describe what you need before sending."
          : "Por favor, descreva o que você precisa antes de enviar."
      );
      if (textarea) textarea.focus();
      return false;
    }

    if (contato === "whatsapp") {
      const wa = form.querySelector(".quote-input-whatsapp");
      if (!wa || !wa.value.trim()) {
        alert(
          lang === "en"
            ? "Please enter your WhatsApp number."
            : "Por favor, informe seu número de WhatsApp."
        );
        if (wa) wa.focus();
        return false;
      }
    }

    if (contato === "email") {
      const em = form.querySelector(".quote-input-email");
      if (!em || !em.value.trim()) {
        alert(
          lang === "en"
            ? "Please enter your email address."
            : "Por favor, informe seu e-mail."
        );
        if (em) em.focus();
        return false;
      }
    }

    return true;
  }

  function openWhatsApp(message) {
    const url =
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () {
        return fallbackCopy(text);
      });
    }
    return Promise.resolve(fallbackCopy(text));
  }

  function fallbackCopy(text) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch (e) {
      return false;
    }
  }

  function openEmail(subject, message, lang) {
    // Gmail web compose — more reliable on desktop than mailto:
    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1&to=" +
      encodeURIComponent(EMAIL_TO) +
      "&su=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(message);

    copyToClipboard(message).then(function () {
      window.open(gmailUrl, "_blank");

      const tip =
        lang === "en"
          ? "We opened Gmail with your message.\n\nIf you use another email provider, the message was copied — paste it into your email app and send to " +
            EMAIL_TO
          : "Abrimos o Gmail com a sua mensagem.\n\nSe você usa outro provedor (Outlook, etc.), a mensagem foi copiada — cole no seu e-mail e envie para " +
            EMAIL_TO;

      // Small delay so the new tab can open first
      setTimeout(function () {
        alert(tip);
      }, 400);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const lang = form.getAttribute("data-lang") || "pt";
    const type = form.getAttribute("data-form") || "orcamento";

    if (!validate(form, lang)) return;

    const contato =
      getCheckedValue(form, "contato") || getCheckedValue(form, "contact");

    let message;
    let subject;

    if (type === "mentoria") {
      message = buildMentoriaMessage(form, lang);
      subject =
        lang === "en"
          ? "Mentoring request — Lucas Lus Audio"
          : "Solicitação de mentoria — Lucas Lus Audio";
    } else {
      message = buildOrcamentoMessage(form, lang);
      subject =
        lang === "en"
          ? "Quote request — Lucas Lus Audio"
          : "Solicitação de orçamento — Lucas Lus Audio";
    }

    if (contato === "email") {
      openEmail(subject, message, lang);
    } else {
      openWhatsApp(message);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("form.quote-form").forEach(function (form) {
      form.addEventListener("submit", handleSubmit);
    });
  });
})();

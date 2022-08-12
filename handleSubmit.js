const form = document.getElementById("formURL");
const textValue = document.getElementById("url");

form.addEventListener("submit",async (e) => {
  e.preventDefault();
  const link = textValue.value;
  window.services.scrap(link)
});
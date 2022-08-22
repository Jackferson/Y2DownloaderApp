const form = document.getElementById("formURL");
const textValue = document.getElementById("url");
const container = document.getElementById("container");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const link = textValue.value;
  window.services.scrap(link);
  window.services.getData((_event, data) => {
    container.innerHTML = ``;
    for (const file of data) {
      container.innerHTML += `<div>
      ${file.name}</div>`;
    }
  });
});

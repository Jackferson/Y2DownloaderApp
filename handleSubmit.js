const box = document.getElementById("box");
const form = document.getElementById("formURL");
const textValue = document.getElementById("url");
const container = document.getElementById("container");

let files = "";

const selectFolder = () =>{
  window.services.folderSelector()
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const link = textValue.value;
  window.services.scrap(link);
  getData();
});

const getData = () => {
  window.services.getData((_event, data) => {
    files = data;
    check();
    printer()
  });
};

window.services.update((_event, message) => {
  const result = files.filter(file =>file.videoId != message.videoId);
  files = result;
  printer()
  check()
});

const printer = () => {
  container.innerHTML = ``;
  for (const file of files) {
    container.innerHTML += `<div class="songBox">
    ${file.name}</div>`;
  }
};

const check = () => {
  if (files.length < 1) {
    box.style.display = "flex";
  } else {
    box.style.display = "none";
  }
};

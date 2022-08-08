const btn = document.querySelector('button')

btn.addEventListener("click", changeColor("blue"));

const changeColor = () => {
  document.body.style.background = 'blue';
};

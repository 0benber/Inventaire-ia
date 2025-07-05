const form = document.querySelector('form');
const typeInput = document.querySelector('select');
const descInput = document.querySelector('textarea');
const fileInput = document.querySelector('input[type="file"]');
const list = document.createElement('div');
document.body.appendChild(list);

function loadInventory() {
  const data = localStorage.getItem('inventaire');
  return data ? JSON.parse(data) : [];
}

function saveInventory(inventory) {
  localStorage.setItem('inventaire', JSON.stringify(inventory));
}

function renderInventory(inventory) {
  list.innerHTML = '';
  inventory.forEach(({ type, desc, img }) => {
    const container = document.createElement('div');
    const title = document.createElement('h3');
    const text = document.createElement('p');
    const image = document.createElement('img');

    title.textContent = type;
    text.textContent = desc;
    image.src = img;
    image.style.width = '200px';

    container.appendChild(title);
    container.appendChild(text);
    container.appendChild(image);
    list.appendChild(container);
  });
}

let inventory = loadInventory();
renderInventory(inventory);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const type = typeInput.value;
  const desc = descInput.value;
  const file = fileInput.files[0];

  if (!file) return alert("Ajoutez une image !");

  const reader = new FileReader();
  reader.onload = () => {
    const newItem = {
      type,
      desc,
      img: reader.result
    };
    inventory.push(newItem);
    saveInventory(inventory);
    renderInventory(inventory);
    form.reset();
  };
  reader.readAsDataURL(file);
});

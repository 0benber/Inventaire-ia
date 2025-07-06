function loadInventory() {
  const data = localStorage.getItem('inventory');
  return data ? JSON.parse(data) : [];
}

function saveInventory(inventory) {
  localStorage.setItem('inventory', JSON.stringify(inventory));
}

function renderInventory(inventory) {
  const list = document.getElementById('inventory-list');
  list.innerHTML = '';

  inventory.forEach(item => {
    const container = document.createElement('div');
    const title = document.createElement('h3');
    const desc = document.createElement('p');
    const image = document.createElement('img');

    title.textContent = item.type;
    desc.textContent = item.description;
    image.src = item.image;
    image.alt = 'Image de l\'objet';
    image.style.width = '200px';
    image.style.display = 'block';
    image.style.marginTop = '10px';

    container.appendChild(title);
    container.appendChild(desc);
    container.appendChild(image);
    list.appendChild(container);
  });
}

let inventory = loadInventory();
renderInventory(inventory);

const form = document.querySelector('form');
const typeInput = document.getElementById('type');
const descInput = document.getElementById('description');
const fileInput = document.getElementById('file');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const type = typeInput.value.trim();
  const description = descInput.value.trim();
  const file = fileInput.files[0];

  if (!type || !description || !file) {
    alert("Remplis tous les champs et choisis une image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const newItem = {
      type,
      description,
      image: reader.result
    };
    inventory.push(newItem);
    saveInventory(inventory);
    renderInventory(inventory);

    // Réinitialisation du formulaire
    form.reset();
    fileInput.value = ''; // Important : reset manuel du champ image
  };

  reader.readAsDataURL(file);
});

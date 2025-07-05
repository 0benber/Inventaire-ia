let inventory = loadInventory();
renderInventory(inventory);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const type = typeInput.value;
  const description = descInput.value;
  const file = fileInput.files[0];

  if (!file) return alert("Ajoutez une image !");

  const reader = new FileReader();
  reader.onload = () => {
    const newItem = {
      type,
      description,
      img: reader.result
    };
    inventory.push(newItem);
    saveInventory(inventory);
    renderInventory(inventory);
    form.reset();
  };
  reader.readAsDataURL(file);
});

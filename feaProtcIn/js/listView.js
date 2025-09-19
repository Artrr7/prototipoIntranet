const form = document.getElementById('eventForm');
const input = document.getElementById('eventInput');
const date = document.getElementById('eventDate');
const list = document.getElementById('eventList');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (input.value.trim() === "") return;

  const li = document.createElement('li');
  li.textContent = `${date.value} - ${input.value}`;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = "Excluir";
  removeBtn.classList.add("remove");

  removeBtn.addEventListener('click', () => {
    li.remove();
  });

  li.appendChild(removeBtn);
  list.appendChild(li);

  input.value = "";
  date.value = "";
});

const lista = document.getElementById("lista");

function adicionar() {
  const inputTarefa = document.getElementById("prod");
  const tarefa = inputTarefa.value;

  if (tarefa.trim() === "") {
    alert("Digite um tarefa válido.");
    return;
  }

  const item = document.createElement("div");
  item.className = "lista-item";
  item.innerHTML = `
    <span>${tarefa}</span>
    <button onclick="toggleComprado(this)"><i class="fa fa-check" aria-hidden="true"></i></button>
    <button onclick="editarItem(this.parentElement)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
    <button onclick="deletarItem(this.parentElement)"><i class="fa fa-trash" aria-hidden="true"></i></button>
  `;

  lista.appendChild(item);
  inputTarefa.value = "";

  salvarItensNaLocalStorage();
}

function editarItem(item) {
  const novoNome = prompt("Digite o novo nome do tarefa:");
  if (novoNome !== null) {
    const textoElemento = item.querySelector("span");
    textoElemento.textContent = novoNome;

    salvarItensNaLocalStorage();
  }
}

function deletarItem(item) {
  if (confirm("Tem certeza de que deseja deletar este item?")) {
    lista.removeChild(item);

    salvarItensNaLocalStorage();
  }
}

function limparItens() {
  if (confirm("Tem certeza de que deseja limpar todos os itens?")) {
    while (lista.firstChild) {
      lista.removeChild(lista.firstChild);
    }

    salvarItensNaLocalStorage();
  }
}

function toggleComprado(button) {
    const item = button.parentElement;
    const span = item.querySelector("span");
  
    if (span.style.textDecoration === "line-through") {
      span.style.textDecoration = "none";
      item.style.backgroundColor = "transparent";
    } else {
      span.style.textDecoration = "line-through";
      item.style.backgroundColor = "#eaffea"; 
    }
}

function salvarItensNaLocalStorage() {
  const itens = [];
  const listaItens = lista.getElementsByClassName("lista-item");

  for (const item of listaItens) {
    const texto = item.querySelector("span").textContent;
    itens.push(texto);
  }

  localStorage.setItem("listaDeCompras", JSON.stringify(itens));
}

function carregarItensDaLocalStorage() {
  const itens = JSON.parse(localStorage.getItem("listaDeCompras")) || [];

  for (const item of itens) {
    const elementoItem = document.createElement("div");
    elementoItem.className = "lista-item";
    elementoItem.innerHTML = `
      <span>${item}</span>
      <button onclick="toggleComprado(this)"><i class="fa fa-check" aria-hidden="true"></i></button>
      <button onclick="editarItem(this.parentElement)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
      <button onclick="deletarItem(this.parentElement)"><i class="fa fa-trash" aria-hidden="true"></i></button>
    `;

    lista.appendChild(elementoItem);
  }
}

carregarItensDaLocalStorage();

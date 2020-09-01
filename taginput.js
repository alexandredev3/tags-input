let tags = [];
let tagContainer = document.querySelector(".tag-container");
let input = tagContainer.querySelector("input");

input.addEventListener("keyup", addTags);

function addTags(event) {
  // console.log(event.key == "Enter");
  // dentro do atributo event, temos uma key, essa Key retorna a tecla que estamos pressionando.
  const keyPressIsEnter = event.key == "Enter";

  if (keyPressIsEnter) {
    // console.log(input.value.split(","));
    // aqui estou falando para o split apenas separar onde tem uma vírgula.
    input.value.split(",").forEach((tag) => {
      if (tag) {
        tags.push(tag.trim());
        // eu só vou colocar a tag na array de tags, se essa tag tiver algum conteudo dentro.
      }
    });

    updateTags();
    input.value = "";
  }

  // console.log(input.value);
}

function updateTags() {
  clearTags();

  tags
    .slice()
    .reverse()
    .forEach((tag) => {
      tagContainer.prepend(createTag(tag));
      /*
      o prepend vai adicionar o conteudo antes do input.
      o append vai adicionar o conteudo depois do input.
      Se ficou com duvida, coloque o prepend e depois o append para ver a diferença.
    */
    });

  // O slice ele fatia uma Array.
  // depois de fazer o slice(fatiar) no Array ele vai reverter essa array.
}

function createTag(tag) {
  const div = document.createElement("div");
  div.classList.add("tag");

  const span = document.createElement("span");
  span.innerHTML = tag;
  div.append(span); // estou adicionando esse span dentro da div.

  const i = document.createElement("i");
  i.setAttribute("data-id", tag); // estou colocando um atributo no I, para saber qual item e para ser deletado.
  i.classList.add("close");
  i.onclick = removeTag;
  span.append(i);

  return div;
}

function removeTag(event) {
  const buttonX = event.currentTarget;
  // nesse caso o "currentTarget" e o "i". qual elemento está sendo passado o evento.

  const id = buttonX.dataset.id;
  // todo elemento que tem um atributo que começa com "data-...", podemos pegar ele atraves do "dataset".
  // tudo que vem depois do "-" do data podemos pegar como propriedade(dataset.id).

  const index = tags.indexOf(id);
  /* 
    O "indexOf" vai entrar la dentro do Array, e vai procurar um elemento 
    que tem o mesmo id que estamos procurando, se ele encontrar, ele vai retornar a 
    posição que aquele elemento está no Array, se ele não encontrar, vai retorna -1.
  */

  tags.splice(index, 1);

  updateTags();
  // depois que eu tirar essa tag, eu preciso atualizar a minha array de tags.
}

/*
  o "i.onclick" e uma maneira curta de fazer um "addEventListener".
  No addEventListener eu posso colocar quantos eventos eu quiser, 
  já na maneira curta de adicionar eventos, se colocar dois eventos ele 
  acaba substuindo o outro evento, e o primeiro evento não vai funcionar mais.
*/

function clearTags() {
  // aqui estou fazendo um limpeza no tagContainer.
  // automaticamente todas estão sendo criadas.

  tagContainer
    .querySelectorAll(".tag")
    .forEach((tagElement) => tagElement.remove());
}

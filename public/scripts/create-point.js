// fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(
//   function(res){
//     console.log(res.json());
//   }
// )

function populateUFs(){
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res => res.json() )
  .then( states => {
    // ufSelect.innerHTML = ufSelect.innerHTML + `<option value="1">Valor</option>`
   // or ufSelect.innerHTML +=  `<option value="1">Valor</option>`
   for (state of states){
     ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
   }

  })
}

populateUFs()

function getCities(event){
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");
  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
  citySelect.innerHTML = "<option value>Selecione a cidade</option>";
  citySelect.disabled = true;

  fetch(url)
  .then( res => res.json() )
  .then( cities => {

     for (city of cities){
       citySelect.innerHTML +=  `<option value="${city.nome}">${city.nome}</option>`
     }

     citySelect.disabled = false;
  })
}

// getCities é passada por referencia
document
    .querySelector("select[name=uf]")
    .addEventListener("change",getCities)

  // Itens de coleta

  const itemsToCollect = document.querySelectorAll(".items-grid li")

  for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
  }


  const collectedItems = document.querySelector("input[name=items]")
  let selectedItems = []

  function handleSelectedItem (event) {
    // para pegar os valores do atributo data
    // console.log(event.target.dataset.id);
    const itemLi = event.target;
    const itemId = itemLi.dataset.id;

    // adicionar ou remover classe com javascript
    itemLi.classList.toggle("selected");

    // logica para poder mandar os itens selecionados quando o formulario for enviado
    const alreadySelected = selectedItems.findIndex(item => item == itemId);
    // mesma function com outras sintaxes
    // const alreadySelected = selectedItems.findIndex(item => {
    //   const itemFound = item === itemId;
    //   return itemFound;
    // });
    //
    // const alreadySelected = selectedItems.findIndex(function(item){
    //   const itemFound = item === itemId;
    //   return itemFound;
    // });


     if (alreadySelected >= 0){ //significa que o elemento foi encontrado no array, senao seria -1
      const filteredItems = selectedItems.filter( item => {
        const itemIsDifferent = item != itemId
        return itemIsDifferent
      })

      selectedItems = filteredItems


    }else {
      // se nao estiver selecionado, entao adicionar
      selectedItems.push(itemId)
    }

    // atualizar o campo escondido
    collectedItems.value = selectedItems;
  }

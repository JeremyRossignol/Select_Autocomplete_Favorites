class SelectAutocompleteFavorite {

   idDiv;
   items;
   placeholder;
   classAutocomplete;
   classItems;
   classSelect;
   classStarButton;
   selectElement;
   inputField;
   selectItemsContainer;
   selectItems;


   constructor(options) {
      const {
         idDiv,
         items,
         placeholder = 'Select an item',
         onStarItem = (event) => { },
         classAutocomplete = 'saf-autocomplete-input',
         classItems = 'saf-select-items',
         classSelect = 'saf-custom-select',
         classStarButton = 'saf-star-button'
      } = options;

      this.idDiv = idDiv;
      this.items = items;
      this.placeholder = placeholder;
      this.classAutocomplete = classAutocomplete;
      this.classItems = classItems;
      this.classSelect = classSelect;
      this.classStarButton = classStarButton;
      this.onStarItem = onStarItem;

      this.init();
   }

   init() {
      this.selectElement = document.querySelector(this.idDiv);
      this.inputField = document.createElement('input');
      this.inputField.classList.add(this.classAutocomplete);
      this.inputField.placeholder = this.placeholder;
      this.selectItemsContainer = document.createElement('div');
      this.selectItemsContainer.classList.add(this.classItems);
      this.selectItems = this.items;

      this.setupSelect();
      this.renderItems();
      this.setupListeners();
   }

   setupSelect() {
      this.selectElement.classList.add(this.classSelect);
      this.selectElement.appendChild(this.inputField);
      this.selectElement.appendChild(this.selectItemsContainer);
      this.selectItemsContainer.style.width = this.inputField.clientWidth + 'px';
   }

   renderItems() {
      this.selectItemsContainer.innerHTML = '';
      this.selectItems.forEach(item => {
         const itemElement = document.createElement('div');
         itemElement.dataset.value = item.value;
         itemElement.textContent = item.text;

         const starButton = document.createElement('button');
         starButton.classList.add(this.classStarButton);
         starButton.innerHTML = item.favorite ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
         starButton.addEventListener('click', (event) => {
            this.toggleFavorite(item);
            event.stopPropagation();
         });
         starButton.addEventListener('mousedown', (event) => {
            event.preventDefault(); // prevent the autocomplete to loose focus
         });

         itemElement.appendChild(starButton);
         this.selectItemsContainer.appendChild(itemElement);

         itemElement.addEventListener('click', () => {
            this.inputField.value = item.text;
            this.inputField.dataset.value = item.value;
            this.hideDropdown();
         });
      });
   }

   setupListeners() {
      this.inputField.addEventListener('focus', () => this.showDropdown());
      this.inputField.addEventListener('input', () => this.filterItems(this.inputField.value));
      this.inputField.addEventListener('keyup', (event) => {
         if (event.keyCode === 13) {
            this.validateInput();
         }
      });
      this.inputField.addEventListener('blur', () => {
         setTimeout(() => this.validateInput(), 200);  // delay to allow click event on star button
      });
      /*document.addEventListener('click', (event) => {
         if (!event.target.closest(this.classSelect)) {
            this.hideDropdown();
         }
      });*/
   }

   toggleFavorite(item) {
      item.favorite = !item.favorite;
      this.updateFavorites();
   }

   updateFavorites() {
      this.selectItems.sort((a, b) => {
         return (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0);
      });
      this.renderItems();
      //this.showDropdown();  // Keep dropdown open after starring an item
   }

   filterItems(query) {
      const lowerCaseQuery = query.toLowerCase();
      this.selectItems.forEach(item => {
         const itemElement = this.selectItemsContainer.querySelector(`div[data-value="${item.value}"]`);
         if (item.text.toLowerCase().includes(lowerCaseQuery)) {
            itemElement.style.display = 'flex';
         } else {
            itemElement.style.display = 'none';
         }
      });
      this.showDropdown();
   }

   validateInput() {
      const matchingItems = this.selectItems.filter(item => {
         return item.text.toLowerCase().includes(this.inputField.value.toLowerCase());
      });

      if (matchingItems.length > 0 && this.inputField.value !== '') {
         this.inputField.value = matchingItems[0].text;
         this.inputField.dataset.value = matchingItems[0].value;
      } else {
         this.inputField.value = '';
         delete this.inputField.dataset.value;
      }
      this.hideDropdown();
   }

   showDropdown() {
      this.selectItemsContainer.style.display = 'block';
   }

   hideDropdown() {
      this.selectItemsContainer.style.display = 'none';
   }
}
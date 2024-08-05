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


   /**
    * Constructor function to initialize SelectAutocompleteFavorite.
    *
    * @param {object} options - Options object containing idDiv, items, placeholder, onStarItem, classAutocomplete, classItems, classSelect, classStarButton.
    * @return {void} 
    */
   constructor(options) {
      const {
         idDiv,
         items,
         placeholder = 'Select an item',
         onStarItem = (itemId, starred) => { },
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

   /**
    * Initializes the component by creating necessary DOM elements and setting up event listeners.
    *
    * @return {void}
    */
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
      this.setupInputListeners();
   }

   /**
    * Sets up the select element by adding the necessary classes, appending the input field and select items container,
    * and setting the width of the select items container to match the width of the input field.
    *
    * @return {void}
    */
   setupSelect() {
      this.selectElement.classList.add(this.classSelect);
      this.selectElement.appendChild(this.inputField);
      this.selectElement.appendChild(this.selectItemsContainer);
      this.selectItemsContainer.style.width = this.inputField.clientWidth + 'px';
   }

   /**
    * Renders the items in the select dropdown with star buttons, event listeners, and text content.
    *
    * @return {void} 
    */
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

   /**
    * Sets up event listeners for the input field to show and filter dropdown items, validate input on enter key,
    * and hide dropdown on blur event.
    *
    * @return {void}
    */
   setupInputListeners() {
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
   }

   /**
    * Toggles the favorite status of an item and updates the favorites list.
    *
    * @param {Object} item - The item to toggle the favorite status for.
    * @return {void}
    */
   toggleFavorite(item) {
      item.favorite = !item.favorite;
      this.updateFavorites();
      this.onStarItem(item.value, item.favorite);
   }

   /**
    * Sorts the selectItems array based on the 'favorite' property of each item,
    * and then renders the items with updated star button states.
    *
    * @return {void}
    */
   updateFavorites() {
      this.selectItems.sort((a, b) => {
         return (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0);
      });
      this.renderItems();
   }

   /**
    * Filters the selectItems array based on the given query and updates the display of each item element.
    *
    * @param {string} query - The query string to filter the selectItems array.
    * @return {void}
    */
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

   /**
    * Validates the input field value by filtering the selectItems array based on a case-insensitive match with the input value.
    * If a matching item is found and the input field value is not empty, updates the input field value and dataset value with the matching item's text and value.
    * If no matching item is found or the input field value is empty, clears the input field value and deletes the dataset value.
    *
    * @return {void}
    */
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

   /**
    * Shows the dropdown
    *
    * @return {void} 
    */
   showDropdown() {
      this.selectItemsContainer.style.display = 'block';
   }

   /**
    * Hide the dropdown
    *
    * @return {void} 
    */
   hideDropdown() {
      this.selectItemsContainer.style.display = 'none';
   }
}
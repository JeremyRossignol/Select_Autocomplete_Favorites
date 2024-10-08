document.addEventListener('DOMContentLoaded', () => {
   options = {
      idDiv: "#SAF",
      items: [
         { value: '1', text: 'Item 1', favorite: false },
         { value: '2', text: 'Item 2', favorite: false },
         { value: '3', text: 'Item 3', favorite: false },
         { value: '4', text: 'Item 4', favorite: false },
         { value: '5', text: 'Item 5', favorite: false }
      ],
      placeholder: 'Select an item',
      onStarItem: (itemId, starred) => {
         let log = "Item " + itemId;
         if (starred) {
            log += " starred.";
         } else {
            log += " unstarred.";
         }
         console.log(log);
      },
      propertiesAutocomplete: {},
      propertiesValueHiddenInput: {
         "required": true,
         'name': 'name',
      },
      classAutocomplete: 'saf-autocomplete-input',
      classItems: 'saf-select-items',
      classSelect: 'saf-custom-select',
      classStarButton: 'saf-star-button'
   };
   const selectAutocompleteFavorite = new SelectAutocompleteFavorite(options);
})
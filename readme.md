# Select Autocomplete Favorites

An autocomplete input, populated from a list.
It selects automatically the first matched item.
You can also add items to favorites, so they appear first and are autocompleted first.

## How to use
See the [/example] folder.

```js
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
      /*placeholder : 'Select an item',
      onStarItem : (event) => {},
      classAutocomplete : 'saf-autocomplete-input',
      classItems : 'saf-select-items',
      classSelect : 'saf-custom-select',
      classStarButton : 'saf-star-button'*/
   };
   const selectAutocompleteFavorite = new SelectAutocompleteFavorite(options);
})
```

## TODO

- customizable css
- comments
- documentation

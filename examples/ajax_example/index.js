document.addEventListener('DOMContentLoaded', () => {

   loadItems();

   function getXhrAjax() {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/ajax.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      return xhr
   }

   function loadItems() {
      let action = "getItems";
      let xhr = getXhrAjax();

      xhr.onload = function () {
         if (xhr.status >= 200 && xhr.status < 300) {
            initSelectAutocompleteFavorite(JSON.parse(xhr.responseText));
         } else {
            console.error('Request failed with status:', xhr.status);
         }
      };

      xhr.onerror = function () {
         console.error('Request failed');
      };

      let data = `action=${encodeURIComponent(action)}`;
      xhr.send(data);
   }

   function onStarItem(itemId, starred) {
      let action = "starItem";
      let xhr = getXhrAjax();

      xhr.onload = function () {
         if (xhr.status >= 200 && xhr.status < 300) {
            console.log("starred");
         } else {
            console.error('Request failed with status:', xhr.status);
         }
      };

      xhr.onerror = function () {
         console.error('Request failed');
      };

      let data = `action=${encodeURIComponent(action)}&itemId=${encodeURIComponent(itemId)}&starred=${encodeURIComponent(starred)}`;
      xhr.send(data);
   }

   function initSelectAutocompleteFavorite(items) {
      options = {
         idDiv: "#SAF",
         items: items,
         placeholder: 'Select an item',
         onStarItem: onStarItem,
         classAutocomplete: 'saf-autocomplete-input',
         classItems: 'saf-select-items',
         classSelect: 'saf-custom-select',
         classStarButton: 'saf-star-button'
      };
      const selectAutocompleteFavorite = new SelectAutocompleteFavorite(options);
   }

})
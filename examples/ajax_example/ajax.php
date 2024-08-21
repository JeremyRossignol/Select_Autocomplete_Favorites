<?php

require_once("ExampleTable.php");

if (isset($_POST["action"]) && !empty($_POST["action"])) {
   if ($_POST["action"] == "getItems") {
      $items = ExampleTable::loadAll();
      echo ExampleTable::itemsToJson($items);
   } else if ($_POST["action"] == "starItem") {
      $item = new OdpDestinataire($usr_reflex_act, $_POST["itemId"]);
      if ($_POST["starred"] == "true") {
         $item->get()->starItem(true)->save();
      } else {
         $item->get()->starItem(false)->save();
      }
   }
}
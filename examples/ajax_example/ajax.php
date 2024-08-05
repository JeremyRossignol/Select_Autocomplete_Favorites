<?php

require_once("ExampleTable.php");

if ($_POST["action"] == "getItems") {
   $items = ExampleTable::loadAll();
   echo ExampleTable::itemsToJson($items);
} else if ($_POST["action"] == "starItem") {
   $item = new ExampleTable($_POST["itemId"]);
   $item->get()->starItem($_POST["starred"])->save();
}

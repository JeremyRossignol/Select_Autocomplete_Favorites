<?php

class ExampleTable
{

   /*
   CREATE TABLE example_select (
    es_value varchar(255) NOT NULL,
    es_text varchar(1000) NOT NULL,
    es_favorite bool NOT NULL DEFAULT FALSE,
    PRIMARY KEY (es_value)
)
    */

   public $es_value;
   public $es_text;
   public $es_favorite;

   public function __construct($es_value, $es_text = null, $es_favorite = false)
   {
      $this->es_value = $es_value;
      $this->es_text = $es_text;
      $this->es_favorite = $es_favorite;
   }

   public function starItem($isStarred = null)
   {
      if ($isStarred === null) {
         $this->es_favorite = !$this->es_favorite;
      } else {
         $this->es_favorite = $isStarred;
      }

      return $this;
   }

   public function get()
   {
      $rq = "SELECT * FROM example_select WHERE es_value = '" . $this->es_value . "'";
      $res = DB::doQuery($rq);
      foreach ($res as $row) {
         $this->es_text = $row['es_text'];
         $this->es_favorite = $row['es_favorite'];
      }

      return $this;
   }

   public function save()
   {
      $rq = "INSERT INTO example_select (es_value, es_text, es_favorite) VALUES ('" . $this->es_value . "', '" . $this->es_text . "', " . $this->es_favorite . ")";
      DB::doQueryNR($rq);

      return $this;
   }

   public static function loadAll()
   {
      $rq = "SELECT * FROM example_select";
      $res = DB::doQuery($rq);

      $items = [];
      foreach ($res as $row) {
         $items[] = new ExampleTable($row['es_value'], $row['es_text'], $row['es_favorite']);
      }

      return $items;
   }

   public static function itemToJson($item)
   {
      return json_encode([
         'value' => $item->es_value,
         'text' => $item->es_text,
         'favorite' => $item->es_favorite
      ]);
   }

   public static function itemsToJson($items)
   {
      $jsonItems = [];
      foreach ($items as $item) {
         $jsonItems[] = self::itemToJson($item);
      }
      return json_encode($jsonItems);
   }
}

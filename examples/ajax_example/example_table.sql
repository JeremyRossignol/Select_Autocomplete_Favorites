CREATE TABLE example_select (
    es_value varchar(255) NOT NULL,
    es_text varchar(1000) NOT NULL,
    es_favorite bool NOT NULL DEFAULT FALSE,
    PRIMARY KEY (es_value)
)
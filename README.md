# Wappie

Stukje Node en Liquidsoap, om te zien of de boel nog wappert.

![Wappie](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2F4MzFyNW93anV3eGY5ZTI0eHU3aWZ1bThkMXB1eXk0c2phem12eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/goOlBzP82wZBuHdB1e/giphy.gif)

## Description

Meer wapperende metertjes = meer beter, uiteraard.<br>Daarom Wappie, waar je wat Icecast-streams tegenaan gooit en wapperende metertjes terug krijgt.

<br>

## Running in Docker
* Clone the repo
* Create your config.json
* `docker compose up`

<br>

## Running on host
### Dependencies

* Node.js >= 18
* Liquidsoap compiled with ocaml-ffmpeg binding package

### Installing and executing

* Clone the repo and run `npm i` to download all dependencies
* Add stations in your config.json
* `node app.js`

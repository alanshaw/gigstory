var Carousel = require("./carousel")

var carousel = new Carousel(document.querySelector("#carousel"))

require("./tickets.json").forEach(carousel.add.bind(carousel))

var debounce = require("debounce")

function Carousel (el, opts) {
  opts = opts || {}
  opts.debounceWait = opts.debounceWait === undefined ? 500 : opts.debounceWait
  
  this.el = el
  this.ticket = null
  this.tickets = []
  this.render = debounce(this.render, opts.debounceWait)
}

Carousel.prototype.add = function (data) {
  this.tickets.push(data)
  
  var img = new Image()
  
  img.onload = function () {
    data.img = img
    this.render()
  }.bind(this)
  
  img.src = data.imgSrc
}

Carousel.prototype.render = function () {
  // Get the tickets that have loaded
  var loadedTickets = this.tickets.filter(function (t) {return !!t.img})
  
  this.ticket = this.ticket || loadedTickets[0]
  
  loadedTickets.forEach(function (t) {
    if (!this.el.querySelector("img[src=" + t.img.src + "]")) {
      // TODO: Insert at correct position
      this.el.appendChild(t.img)
    }
  }, this)
}

module.exports = Carousel
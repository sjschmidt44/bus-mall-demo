var allProducts = [];
var productNames = ['boots', 'chair', 'scissors', 'water_can', 'wine_glass', 'bag', 'banana', 'cthulhu', 'dragon', 'pen', 'shark', 'sweep', 'unicorn', 'usb'];

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.tally = 0;
  this.views = 0;
  allProducts.push(this);
}

(function buildAlbum() {
  for (var i = 0; i < productNames.length; i++) {
    new Product(productNames[i], 'imgs/' + productNames[i] + '.jpg');
  }
})()

var productRank = {
  totalClicks: 0,
  leftObj: null,
  midObj: null,
  rightObj: null,

  leftEl: document.getElementById('img1'),
  midEl: document.getElementById('img2'),
  rightEl: document.getElementById('img3'),
  imageEls: document.getElementById('images'),
  resultsEl: document.getElementById('results'),
  resultsButton: document.getElementById('showResults'),
  resetButton: document.getElementById('reset'),

  getRandomIndex: function() {
    return Math.floor(Math.random() * productNames.length);
  },

  displayImages: function() {
    productRank.leftObj = allProducts[productRank.getRandomIndex()];
    productRank.midObj = allProducts[productRank.getRandomIndex()];
    productRank.rightObj = allProducts[productRank.getRandomIndex()];

    if (productRank.leftObj === productRank.midObj || productRank.leftObj === productRank.rightObj || productRank.midObj == productRank.rightObj) {
      productRank.displayImages();
    }

    productRank.leftObj.views += 1;
    productRank.midObj.views += 1;
    productRank.rightObj.views += 1;

    productRank.leftEl.src = productRank.leftObj.path;
    productRank.leftEl.id = productRank.leftObj.name;

    productRank.midEl.src = productRank.midObj.path;
    productRank.midEl.id = productRank.midObj.name;

    productRank.rightEl.src = productRank.rightObj.path;
    productRank.rightEl.id = productRank.rightObj.name;
  },

  tallyClicks: function(elId) {
    for (var i in allProducts) {
      if (allProducts[i].name === elId) {
        allProducts[i].tally += 1;
        this.totalClicks += 1;
        console.log(allProducts[i].name + ' has ' + allProducts[i].tally + ' votes');
      }
    }
  },

  displayResults: function() {
    var ulEl = document.createElement('ul');
    for (var i in allProducts) {
      var liElOne = document.createElement('li');
      var str = allProducts[i].name + ' has ' + allProducts[i].tally + ' votes.';
      str = str.charAt(0).toUpperCase() + str.slice(1);
      liElOne.textContent = (str);
      ulEl.appendChild(liElOne);
    }
    var liElTwo = document.createElement('li');
    liElTwo.textContent = 'Total User Clicks: ' + productRank.totalClicks;
    ulEl.appendChild(liElTwo);
    this.resultsEl.appendChild(ulEl);
  },

  showButton: function() {
    this.resultsButton.hidden = false;
    this.resultsButton.addEventListener('click', function() {
      productRank.resetButton.hidden = false;
      productRank.resultsButton.hidden = true;
      productRank.displayResults();

      productRank.resetButton.addEventListener('click', function() {
        productRank.resetButton.hidden = true;
        location.reload();
      })
    });
  },

  onClick: function() {
    if (event.target.id === productRank.leftObj.name || event.target.id === productRank.midObj.name || event.target.id === productRank.rightObj.name) {
      productRank.tallyClicks(event.target.id);
      productRank.totalClicks += 1;

      if (productRank.totalClicks % 15 === 0) {
        productRank.imageEls.removeEventListener('click', productRank.onClick);
        productRank.showButton();
      }
      productRank.displayImages();
    } else {
      alert('Click the image, Idiot!');
    }
  }
};

productRank.imageEls.addEventListener('click', productRank.onClick);
productRank.displayImages();

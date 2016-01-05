var data;
var allProducts = [];
var productNames = ['boots', 'chair', 'scissors', 'water_can', 'wine_glass'];

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.tally = 0;
  this.views = 0;
  data.labels.push(name);
  data.datasets[0].data.push(0);
  allProducts.push(this);
}

function buildAlbum() {
  for (var i = 0; i < productNames.length; i++) {
    new Product(productNames[i], 'imgs/' + productNames[i] + '.jpg');
  }
  localStorage.setItem('allProducts', JSON.stringify(allProducts));
}

(function checkLocal() {
  if (localStorage.chartData && localStorage.allProducts) {
    console.log('Exists');
    data = JSON.parse(localStorage.chartData);
    allProducts = JSON.parse(localStorage.getItem('allProducts'));
  } else {
    console.log('Doesnt exist');
    data = {
      labels: [],
      datasets: [
        {
          label: "Product Analysis Results",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: []
        }
      ]
    };
    buildAlbum();
  }
})();

var productRank = {
  totalClicks: 0,
  leftObj: null,
  midObj: null,
  rightObj: null,
  barChart: null,

  leftEl: document.getElementById('img1'),
  midEl: document.getElementById('img2'),
  rightEl: document.getElementById('img3'),
  imageEls: document.getElementById('images'),
  resultsButton: document.getElementById('showResults'),
  ctx: document.getElementById("canvas").getContext("2d"),

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
        data.datasets[0].data[i] = allProducts[i].tally;
        console.log(allProducts[i].name + ' has ' + allProducts[i].tally + ' votes');
      }
    }
    localStorage.setItem('chartData', JSON.stringify(data));
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
  },

  showButton: function() {
    this.resultsButton.hidden = false;
    this.resultsButton.addEventListener('click', function() {
      productRank.resultsButton.hidden = true;
      productRank.barChart = new Chart(productRank.ctx).Bar(data);
    });
  },

  onClick: function() {
    if (event.target.id === productRank.leftObj.name || event.target.id === productRank.midObj.name || event.target.id === productRank.rightObj.name) {
      productRank.tallyClicks(event.target.id);

      if (productRank.totalClicks % 15 === 0) {
        productRank.imageEls.removeEventListener('click', productRank.onClick);
        productRank.showButton();
      }
      productRank.displayImages();
    } else {
      console.log('Click the image, Idiot!');
    }
  }
};

productRank.imageEls.addEventListener('click', productRank.onClick);
productRank.displayImages();

(function() {
  let flower      = document.getElementById('flower');
  let flowerImage = document.createElement('img');
  let content     = document.createElement('div');

  flower.appendChild(flowerImage);
  flower.appendChild(content);

  let flowerImageChecked = false;

  flowerImage.style.width  = "128px";
  flowerImage.style.height = "128px";
  flowerImage.src          = "flower1.jpg";

  content.appendChild(document.createTextNode("Hello from flower.js"));

  flower.style.display             = "grid";
  flower.style.gridTemplateColumns = "200px auto 200px";
  flower.style.gridTemplateRows    = "auto";

  content.style.display = "none";

  function toggleFlower() {
    if (flowerImageChecked) {
      flowerImage.src    = "flower1.jpg"
      flowerImageChecked = false;
      content.style.display = "none";
    } else {
      flowerImage.src    = "flower2.jpg"
      flowerImageChecked = true;
      content.style.display = "block";
    }
  }
  flowerImage.addEventListener('click', toggleFlower);
})();


window.onload = function() {
  var canvas = document.querySelector('canvas.canvas');
  var glsl = new GlslCanvas(canvas);
  var url;

  var shaderData;
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = handleData;

  var links = document.querySelectorAll('ul.switcher a');
  for (var i = 0; i < links.length; i++) {
    links[i].onclick = switchUrl;
  }

  function handleData() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        shaderData = httpRequest.responseText;
        loadShader();
      }
    }
  }

  function switchUrl(e) {
    url = this.href;
    requestShaderLoad(url);
    e.preventDefault();
  }

  function requestShaderLoad(url) {
    httpRequest.open('GET', url);
    httpRequest.send();
  }

  console.error = function(msg) {
    var log = document.querySelector('pre.error');
    if (msg === '') {
      log.style.display = 'none';
    } else {
      log.style.display = 'block';
      log.innerText = msg;
    }
  }

  function loadShader() {
    console.error('');
    glsl.load(shaderData);
  }

  document.onkeydown = function(event) {
    if (event.keyCode === 82) {
      requestShaderLoad(url);
    }
  };
}

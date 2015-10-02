function insertTestStyles(doc) {
  var style = doc.createElement('style');

  style.textContent = `.videowall-seekbar {
    height: 60px;
  }

  .videowall-seekbar-runner {
    background-color: gray;
    height: 100%;
  }

  .videowall-seekbar-turtle {
    background-color: green;
    width: 44px;
    height: 100%;
  }
  `;
  doc.body.appendChild(style);
}

module.exports = insertTestStyles;

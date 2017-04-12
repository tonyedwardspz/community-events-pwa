'use strict';

let setMenuListeners = () => {
  app.menuCheckBox = document.getElementById('nav-trigger');

  // listen for a click on a checkbox item
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      closeMenu();
    });
  });

  // if menu main content is clicked
  document.getElementById('site-wrap').addEventListener('click', e => {
    closeMenu();
  });

  // if page is scrolling
  document.getElementById('site-wrap').onscroll = e => {
    closeMenu();
  };
};

let closeMenu = () => {
  if (app.menuCheckBox.checked){
    app.menuCheckBox.checked = false;
  }
};

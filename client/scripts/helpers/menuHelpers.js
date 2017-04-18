'use strict';

let setMenuListeners = () => {
  // listen for a click on a menu item
  let navitems = document.querySelectorAll('.nav-item');
  console.log(navitems);
  for (var item of navitems) {
    item.addEventListener('click', e => {
      closeMenu();
      positionMenu();
    });
  }

  // if menu main content is clicked
  app.wrap.addEventListener('click', e => {
    closeMenu();
    positionMenu();
  });

  // if page is scrolling
  app.wrap.onscroll = e => {
    debounce(closeMenu(), 200);
  };
};


/**
* Closes the menu by delelecting the checkbox
*/
let closeMenu = () => {
  if (app.menuCheckBox.checked){
    app.menuCheckBox.checked = false;
  }
};

/**
* Positions the menu if closed, leaves to default if open
*/
function positionMenu() {
  if (app.menuCheckBox.checked) {
    app.menu.removeAttribute('style');
  } else {
    let padding = window.getComputedStyle(app.header).getPropertyValue('padding-left').replace('px', '');
    app.menu.style.left = parseInt(padding) + parseInt(app.header.offsetLeft) + 'px';
  }
}

/**
* Sets up positioning or menu on load and resize.
*/
let menuStyleListener = () => {
  positionMenu();
  window.addEventListener('resize', debounce(() => {
    positionMenu();
  }, 16), false);
};

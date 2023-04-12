'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};  

btnsOpenModal.forEach( function (btn) {
  btn.addEventListener('click', openModal)
});


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


/*
// BUTTON SCROLLING
btnScrollTo.addEventListener('click', function(e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // console.log(e.target)
  console.log(e.target.getBoundingClientRect());

  console.log('current scroll (x/y)', window.pageXOffset, pageYOffset);

  console.log('height/width viewport', 
  document.documentElement.clientHeight,
  document.documentElement.clientWidth);

  
  // scrolling old schools 1
  // window.scrollTo(
  //   s1coords.left  + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // scrolling old school 2
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  

  // scrolling new way
  section1.scrollIntoView({behavior: 'smooth'})
});
*/


///////////////////////////////////////
// PAGE NAVIGATION
// document.querySelectorAll('.nav__link').forEach( function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//     // document.querySelector("#section--2").scrollIntoView({behavior: 'smooth'});
//   })
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links')
.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  // console.log(this);
  // console.log(this) is the same as console.log(e.target) in this format;

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    console.log('LINK');
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});

//////////////////
// TABBED COMPONENT


tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // // console.log(clicked);
  
  // Guard clause
  if (!clicked) return; 
  /*
   or if(clicked) { 
    put the Remove active classes in here 
    put the Activate tab here
    put the Activate content area here
  }
  */

  // Remove active classes
  tabs.forEach(function (t) {
    return t.classList.remove('operations__tab--active');
  });
  tabsContent.forEach(function (c) {
    return c.classList.remove('operations__content--active');
  });

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate  content area
  // // console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add(`operations__content--active`);
});

/////////////////////////////
// MENU  FADE ANIMATION
// Passing "argument" into Events handler
/*
// FADE ANIMATION 1 
const handleHover = function(e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    // console.log(link);
    // console.log(logo);
    // console.log(siblings);
    // console.log(link.closest('.nav'));

    siblings.forEach( function (el) {
      { if (el !== link) { el.style.opacity = opacity}};
      logo.style.opacity = opacity;
      return
      
    })
  };
};
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});
*/

// FADE ANIMATION 2
/*
nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach( function (el) {
      { if (el !== link) { el.style.opacity = 0.5}};
      logo.style.opacity = 0.5;
      return
      
    })
  };
});

nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach( function (el) {
      { if (el !== link) { el.style.opacity = 1}};
      logo.style.opacity = 1;
      return; 
    })
  };
});
*/

// NOTE: FADE ANIMATION 1 AND FADE ANIMATION 2 ARE THE SAME
// handleHover2 is the same as handleHover and fade animation 2

// FADE ANIMATION 3
const handleHover2 = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover2.bind(0.5));
nav.addEventListener('mouseout', handleHover2.bind(1));

////////////////////////
// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();

// console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// });

// Sticky navigation: Intesection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach( function (entry) {
//     console.log(entry)
//   })
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions)
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else { nav.classList.remove('sticky'); }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);

// Reaveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

/////////////////////////////
// Lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target)
  
  
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,  
  rootMargin: '200px',
});

imgTarget.forEach(function (img) {
  return imgObserver.observe(img);
});


/////////////////////
// slider
// to put everything inside t   a function
// const sliders = function() { };
// sliders();

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML('beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`
    )
  })
};
createDots();

const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach( function (dot) {
    return dot.classList.remove('dots__dot--active');
  });
  document.querySelector(`.dots__dot[data-slide="${slide}"]`)
  .classList.add('dots__dot--active');
}
activateDot(0);

// instead of using this below we call goToslide(0)i.e goToslide(o) is the same as slides.forEach below
// slides.forEach(function (s, i) {
//   return s.style.transform = `translateX(${100 * i}%)`
// });
// // 0%, 100%, 200%, 300%

const goToslide = function (slide) {
  slides.forEach(function (s, i) {
    return s.style.transform = `translateX(${100 * (i - slide)}%)`
  });  
};
goToslide(0);

// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToslide(curSlide);
  activateDot(curSlide);
}
btnRight.addEventListener('click', nextSlide);

/* // SAME AS ABOVE
btnRight.addEventListener('click', function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToslide(curSlide);
})
*/

// Previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1
  } else {
    curSlide--;
  }
  goToslide(curSlide);
  activateDot(curSlide);
}
btnLeft.addEventListener('click', prevSlide);

// SAME AS ABOVE
/*664465
btnLeft.addEventListener('click', function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToslide(curSlide);
});
*/

/* // DO NOT REMOVE THE COMMENT 
const init = function () {
  goToslide(0);
  createDots();
  activateDot(0);
}
*/

document.addEventListener('keydown', function(e) {
  console.log(e);
  if  (e.key === '4' || e.key === 'arrowLeft') {prevSlide()};
  if  (e.key === '6' || e.key === 'arrowRight') { nextSlide()};

  // same as above
  // e.key === '6' && nextSlide();
  // e.key === '4 && prevSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToslide(slide);
    activateDot(slide)
  }
})
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/*
///////////////////////////////////////
// Selecting, Creating, and Deleting Elements

// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = `We use cookied for improved functionality and analytics. `;
message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>';
header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });
 
// STYLES
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height, 100) + 40 + 'px';
console.log(message.style.height)

document.documentElement.style.setProperty('--color-primary', 'orangered');

const logo = document.documentElement.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

var x = document.getElementsByTagName("H1")[0];
x.setAttribute("class", "democlass"); 

// DATA attributes
console.log(logo.dataset.versionNumber);
*/

/*
/////////////////////////
////// EVENTS

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // console.log(e.target)
  console.log(e.target.getBoundingClientRect());

  console.log('current scroll (x/y)', window.pageXOffset, pageYOffset);

  console.log('height/width viewport', 
  document.documentElement.clientHeight,
  document.documentElement.clientWidth);

  // scrolling old schools 1
  // window.scrollTo(
  //   s1coords.left  + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // scrolling old school 2
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // scrolling new way
  section1.scrollIntoView({behavior: 'smooth'})
});

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: You are heading d heading');
  
}

h1.addEventListener('mouseenter', alertH1);
setTimeout( () => h1.removeEventListener('mouseenter', alertH1), 3000)
// h1.addEventListener('mouseenter', function(e) {
//   alert('addEventListener: You are heading d heading')
// });

h1.onmouseenter = function(e) {
  alert('onmouseenter: You are reading d heading');
};
*/

/*
/////////////////////////////
// EVENT PROPAGATION IN PRACTICE

// rgb(255, 255, 255)
const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// const randomInt2 = function (min, max) {
//   let test = Math.random();
//   console.log(test);
//   return Math.floor(test * (max - min + 1) + min);
// };
// console.log(randomInt2(0, 255));
// console.log(randomInt2(255, 0));
// console.log(randomInt(0, 255));
// console.log(randomInt(255, 0));

const randomColor = function () {
  return `rgb(${randomInt(0, 255)},
   ${randomInt(0, 255)},
   ${randomInt(0, 255)})`;
};
console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currrentTarget);
  console.log(e.currentTarget)
  console.log(e.currrentTarget === true)
});;

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currrentTarget);
  console.log(e.currentTarget)
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAv', e.target, e.currrentTarget);
  console.log(e.currentTarget)
  
});

// let test = document.querySelector('.nav');
// test.addEventListener('click', function (e) {
//   console.log('LINK')
//   test.style.backgroundColor = randomColor();
// });
*/

/*
///////////////////////////
/////////////
// DOM TRAVERSING 
const h1 = document.querySelector('h1');

// GOING DOWNWARD: CHILD
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// GOING upward: parent
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

// GOING sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1 ) el.style.transform = 'scale(0.5)';
})
*/
///////////////////////////////////////
// Lifecycle DOM Events
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  console.log('a')
  e.returnValue = '';
});
// DOM loaded eventListeners
document.addEventListener('DOMContentLoaded', NavBar, false); 
document.addEventListener('DOMContentLoaded', ActiveSection, false);
document.addEventListener('DOMContentLoaded', scroll, false);
document.addEventListener('DOMContentLoaded', menu, false); 
document.addEventListener('DOMContentLoaded', hideNav, false); 


// build the navigationBar
function NavBar (){
    //retrieve all section tag
    const sections = document.querySelectorAll('section'); 
    //create a fragment for performance
    const frag = document.createDocumentFragment(); 
    //loop through the section tag
   for (const sec of sections){
       // create a li element
       const listItem = document.createElement("li"); 
       const anchor = document.createElement("a"); 
       // add text to the anchor
       anchor.textContent = sec.dataset.nav; 
       // add a class to the anchor
       anchor.classList.add("menu__link"); 
       // add the anchor to the list element
       listItem.appendChild(anchor); 
       // add the list to the fragment
       frag.appendChild(listItem); 
   }
   const navBarList = document.getElementById("navbar__list"); 
   navBarList.appendChild(frag); // add the fragment to navbar__list in html
}


// Add class 'active' to section when near top of viewport
function ActiveSection (){
    // add event listener for scrolling
    window.addEventListener('scroll', () => { 
        const links = document.querySelectorAll("a.menu__link"); 
        const sections = document.querySelectorAll('section'); 
        //loop through sections
        sections.forEach(section =>{ 
            // get section details
            const sectionTitle = section.dataset.nav; 
            const sectionTop = section.getBoundingClientRect().top;
            // check if the section top is in the view
            if (sectionTop >= 0 && sectionTop <= 300 ){
                section.classList.add("your-active-class");
                // loop through all links
                links.forEach(link =>{
                    if (link.textContent === sectionTitle){
                        link.classList.add("your-active-class"); // add the class
                    }
                    else {
                        link.classList.remove("your-active-class"); // remove the class
                    }
                })
            }
            else{
                section.classList.remove("your-active-class");
            }
        })
    });
}


// Scroll to section on navBar click
function scroll(){
    const navBar = document.getElementById('navbar__list');
    // add event listener
    navBar.addEventListener('click', (eve) =>{ 
        // stop the default action
        eve.preventDefault(); 
        // retrieve the selected navBar item
        const selectedSection = document.querySelector(`[data-nav="${eve.target.textContent}"]`) 
        // const selectedSection = document.getElementById(eve.target.getAttribute("href").subString(1))
        selectedSection.scrollIntoView({
            behavior : "smooth",
            block : "center",
        })
    })   
    }


// Hamburger Menu
function menu (){
    const button = document.querySelector('.button');
    button.addEventListener('click', () => {
        const select = document.querySelectorAll('.menu__link');
        select.forEach(i =>{
            if (i.style.display === 'none'){
                i.style.display = 'block';
            } else {
                i.style.display = 'none';
            }
        })
})
}


// auto hide navBar when Scrolling
function hideNav(){
  // select page header to hide
  const  autoHide = document.querySelector('.page__header');
  const  navbar_height = document.querySelector('.page__header').offsetHeight;
    document.body.style.paddingTop = navbar_height + 'px';
    // if condition to check page scroll
    if(autoHide){
      let lastScrollTop ;
      window.addEventListener('scroll', () => {
            let scrollTop = window.scrollY;
            // if condition to add or remove style
           if(scrollTop < lastScrollTop) {
                autoHide.classList.remove('scrolled-down');
                autoHide.classList.add('scrolled-up');
            }
            else {
                autoHide.classList.remove('scrolled-up');
                autoHide.classList.add('scrolled-down');
            }
            lastScrollTop = scrollTop;
      }); 
    }
  }
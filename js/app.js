// DOM loaded eventListeners
document.addEventListener('DOMContentLoaded', NavBar, false); 
document.addEventListener('DOMContentLoaded', ActiveSection, false);
document.addEventListener('DOMContentLoaded', scroll, false);
//document.addEventListener('DOMContentLoaded', SmallMenu, false); 

/**
 * 
 * Begin Main Functions
 * 
*/

// build the navigationBar
function NavBar (){
    const sections = document.querySelectorAll('section'); //retrieve all section tag
    const frag = document.createDocumentFragment(); //create a fragment for performance
    //loop through the section tag
   for (const sec of sections){
       const listItem = document.createElement("li"); // create a li element
       const anchor = document.createElement("a"); // create an anchor element
       anchor.textContent = sec.dataset.nav; // add text to the anchor
       anchor.classList.add("menu__link"); // add a class to the anchor
       listItem.appendChild(anchor); // add the anchor to the list element
       frag.appendChild(listItem); // add the list to the fragment
   }
   const navBarList = document.getElementById("navbar__list"); 
   navBarList.appendChild(frag); // add the fragment to navbar__list in html
};

/////////////////////////

// Add class 'active' to section when near top of viewport
function ActiveSection (){
    // add event listener for scrolling
    window.addEventListener('scroll', function(){ 
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
};

////////////////////////////

// Scroll to section on navBar click
function scroll(){
    const navBar = document.getElementById('navbar__list');
    navBar.addEventListener('click', (eve) =>{
        eve.preventDefault();
        const selectedSection = document.querySelector(`[data-nav="${eve.target.textContent}"]`)
        // const selectedSection = document.getElementById(eve.target.getAttribute("href").subString(1))
        selectedSection.scrollIntoView({
            behavior : "smooth",
            block : "center",
        })
    })   
    }

///////////////////////////


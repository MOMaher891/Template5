//This is for change image on landing page
let landing = document.querySelector('.landing');

let images = ['Images/bg1.jpg', 'Images/bg2.jpg', 'Images/bg3.jpg', 'Images/bg4.jpg'];
landing.style.backgroundImage = `url('Images/bg3.jpg')`

let backgroundOption = true,
    backgroundInterval;
function randomizImgs() {
    if (backgroundOption) {

        backgroundInterval = setInterval(() => {
            let random = Math.floor(Math.random() * images.length);

            landing.style.backgroundImage = `url('${images[random]}')`
        }, 6000);
    } else {
        clearInterval(backgroundInterval)
    }
}
randomizImgs();



//This is for change image on landing page
let gear = document.querySelector('.fa-gear')
gear.addEventListener('click', () => {
    gear.classList.toggle('rotate');
    document.querySelector('.setting-box').classList.toggle('open');
});

//Local Store
const localStore = localStorage.getItem('options');
if (localStore !== null) {
    console.log(localStore);

    document.documentElement.style.setProperty('--main-color', localStore);
    document.querySelectorAll('color-list li').forEach(elem => {

        elem.classList.remove('Active');
        if (elem.dataset.color === localStore) {
            elem.classList.add('Active');
        }
    })
    // localStore.classList.add('active');
}

//Switch Colors
const colorLi = document.querySelectorAll('.color-list li');

colorLi.forEach(li => {
    li.addEventListener('click', (e) => {
        const root = e.target.dataset.color;
        //Set value of li on root
        document.documentElement.style.setProperty('--main-color', root);
        localStorage.setItem('options', root);

        //Remove active class
        e.target.parentElement.querySelectorAll('.color-list li').forEach(elem => {
            elem.classList.remove('Active');
        })
        e.target.classList.add('Active');
    })
})

//Switch Backgorund-image 
document.querySelectorAll('.randomBG button').forEach(elem => {
    elem.addEventListener('click', (e) => {
        e.target.parentElement.querySelectorAll('.active').forEach(element => {
            element.classList.remove('active');

        })
        elem.classList.add('active');
        if (e.target.dataset.background === "true") {
            backgroundOption = true;
            randomizImgs();
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
        }
    })
})

document.querySelectorAll('.bulletsOption button').forEach(elem => {
    elem.addEventListener('click', (e) => {
        e.target.parentElement.querySelectorAll('.active').forEach(elemnt => {
            elemnt.classList.remove('active');
        })
        elem.classList.add('active');

        if (e.target.dataset.bullet === 'false') {
            document.querySelector('.nav-bullet').style.display = 'none';
        } else {
            document.querySelector('.nav-bullet').style.display = 'block';

        }
    })
})
//Progress Animation

let ourSkills = document.querySelector('.skills');

window.onscroll = function () {
    //Skill offset top 
    let skillOfsetTop = ourSkills.offsetTop;
    //Skills outer Height
    let skillOuterHeight = ourSkills.offsetHeight;
    //Window height
    let windowHeight = this.innerHeight;
    //Window Scroll top
    let windowScrollTop = this.pageYOffset;

    //ده يعرفك انك وصلت للسكشن 
    if (windowScrollTop > skillOfsetTop + skillOuterHeight - windowHeight) {

        document.querySelectorAll('.skill-box .skill-progress span').forEach(span => {
            span.style.width = span.dataset.progress;
        })
    }
}


//Images 
let Gallery = document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', (e) => {
        //Create overlay 
        let overlay = document.createElement('div');
        overlay.classList.toggle('popup-overlay');
        //Append overlay div 
        document.body.appendChild(overlay);

        //Create popup box
        let popupBox = document.createElement('div');
        popupBox.className = 'popupBox';

        //Create Text from alt

        let heading = document.createElement('h3');
        heading.className = "heading-gallery";
        if (img.getAttribute('alt') !== null) {
            heading.append(document.createTextNode(img.getAttribute('alt')));
            popupBox.appendChild(heading);
        }

        //Create close button 
        let closeBtn = document.createElement('i');
        closeBtn.className = "fa-solid fa-xmark";
        closeBtn.addEventListener('click', () => {
            // overlay.style.display = 'none';
            // popupBox.style.display = 'none';
            overlay.remove();
            popupBox.remove();
        })
        popupBox.appendChild(closeBtn);
        //Create image in popup box
        let popupImg = document.createElement('img');
        popupImg.src = img.src;
        // console.log(img.src)
        // console.log(popupImg.src)

        //append image on popupbox
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);



    })
})



//Nav Bullets

const Bullets = document.querySelectorAll('.nav-bullet .bullets');
Bullets.forEach(bullet => {
    bullet.addEventListener('click', (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        })
    })
})

//Reset options 
document.querySelector('.reset').onclick = function () {
    localStorage.clear();
    window.location.reload();
    console.log("We")
}

document.querySelector('.refresh').addEventListener('click', () => {
    window.location.reload();
    console.log('we')
})
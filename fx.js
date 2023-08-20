const observer = new IntersectionObserver((elements) => {
    elements.forEach((element) => {
        if (element.isIntersecting){
            element.target.classList.add("show");
        } else {
            element.target.classList.remove("show");
        }
    });
},
{
    threshold: 0.5,
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((element) => observer.observe(element));
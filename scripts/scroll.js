window.addEventListener("scroll", function () {
    console.log("scrolling!");
    const header = document.getElementById("hero-header");
    const scrollY = window.scrollY;

    // Move header up slightly and fade it out
    header.style.opacity = 1 - scrollY / 300;
    header.style.transform = `translateY(-${scrollY * 0.3}px)`;
});

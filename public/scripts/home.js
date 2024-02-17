const tiles = document.getElementsByClassName('hub__article-tile');
[...tiles].forEach(t => {
    const box = t.getBoundingClientRect();
    t.style.opacity = box.top > 0 && box.bottom > window.innerHeight ? '0' : '1';
});

document.addEventListener('scroll', () => {
    [...tiles].forEach(t => {
        const box = t.getBoundingClientRect();
        t.style.opacity = box.top > 0 && box.bottom > window.innerHeight ? '0' : '1';
    });
})
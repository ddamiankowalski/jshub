const tiles = document.getElementsByClassName('hub__article-tile');

const fadeTiles = () => {
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
}

const setClickListeners = () => {
    [...tiles].forEach(tile => {
        tile.addEventListener('click', () => {
            let url = new URL(window.location.host + '/article');
            url.searchParams.append('id', tile.id);
            location.href = window.location.protocol + "//" + url.href;
        })
    })
}

setClickListeners();
fadeTiles();
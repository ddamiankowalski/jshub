const element = document.getElementsByClassName('hub__menu-list-item');

[...element].forEach(e => {
    console.log(e)
    e.addEventListener('click', () => console.log('clicked'))
})
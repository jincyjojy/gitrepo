const labels = document.querySelectorAll('.form-control label')
labels.forEach(label => {
    label.innerHTML = label.innerText
    .split('')
    .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
    .join('')
})
$('a.yourlink').click(function(e) {
    e.preventDefault();
    window.open('http://yoururl1.com');
    window.open('http://yoururl2.com');
});
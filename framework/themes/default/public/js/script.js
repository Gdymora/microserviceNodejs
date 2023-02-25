// Example JavaScript for the theme

console.log('My Theme is loaded.');

// Add event listener for navigation links
document.querySelectorAll('nav a').forEach(function(link) {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Clicked on navigation link:', link.href);
  });
});
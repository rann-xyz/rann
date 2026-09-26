// RANN Portfolio Script

// Scroll Progress
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
 const scrollTop = window.scrollY;
 const docHeight = document.body.scrollHeight - window.innerHeight;
 const scrolled = (scrollTop / docHeight) * 100;
 scrollProgress.style.width = Math.min(scrolled, 100) + '%';
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
 anchor.addEventListener('click', function(e) {
 e.preventDefault();
 const target = document.querySelector(this.getAttribute('href'));
 if(target) {
 target.scrollIntoView({ behavior: 'smooth' });
 }
 });
});

// Reduced Motion
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
 document.body.style.transition = 'none';
}

// Active Nav Link
function updateActiveNavLink() {
 const sections = document.querySelectorAll('section[id]');
 const navLinks = document.querySelectorAll('.nav-links a');
 
 let current = '';
 sections.forEach(section => {
 const rect = section.getBoundingClientRect();
 if(rect.top <= 120) {
 current = section.id;
 }
 });
 
 navLinks.forEach(link => {
 link.classList.remove('active');
 if(link.getAttribute('href').slice(1) === current) {
 link.classList.add('active');
 }
 });
}

window.addEventListener('scroll', updateActiveNavLink);
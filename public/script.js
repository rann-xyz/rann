// Portfolio Script
document.addEventListener('DOMContentLoaded', function() {
 // Scroll Progress
 const progress = document.getElementById('scroll-progress');
 window.addEventListener('scroll', function() {
 const scrollTop = window.scrollY;
 const docHeight = document.body.scrollHeight - window.innerHeight;
 const scrolled = (scrollTop / docHeight) * 100;
 progress.style.width = Math.min(scrolled, 100) + '%';
 });
 // Smooth Scroll
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
 anchor.addEventListener('click', function(e) {
 e.preventDefault();
 const target = document.querySelector(this.getAttribute('href'));
 if(target) {
 target.scrollIntoView({behavior:'smooth'});
 }
 });
 });
 // Reduced Motion
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
 document.body.style.transition = 'none';
 }
});
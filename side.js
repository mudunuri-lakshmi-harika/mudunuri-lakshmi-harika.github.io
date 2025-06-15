const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const hamburger = document.querySelector('.hamburger');
const sidebar = document.getElementById('sidebar');
const homeSection = document.getElementById('home');

// Initially sidebar hidden, home shown
sidebar.classList.add('hidden');
contentSections.forEach(section => section.classList.remove('active'));
if (homeSection) homeSection.classList.add('active');

// Toggle sidebar on hamburger click
hamburger.addEventListener('click', () => {
  if (sidebar.classList.contains('hidden')) {
    // Show sidebar
    sidebar.classList.remove('hidden');
    sidebar.classList.add('visible');

    // Hide all sections when sidebar opens (show no content by default)
    contentSections.forEach(section => section.classList.remove('active'));
  } else {
    // Hide sidebar
    sidebar.classList.remove('visible');
    sidebar.classList.add('hidden');

    // Show home section when sidebar closes
    contentSections.forEach(section => section.classList.remove('active'));
    if (homeSection) homeSection.classList.add('active');
  }
});

// Clicking nav link shows relevant content but keeps sidebar open
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const targetId = link.getAttribute('data-target');

    // Show selected section, hide others
    contentSections.forEach(section => section.classList.remove('active'));
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
    }
  });
});

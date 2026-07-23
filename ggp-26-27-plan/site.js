// Calendar tab switching
(function(){
  const tabs = document.querySelectorAll('.cal-tab');
  const panels = document.querySelectorAll('.cal-panel');

  function activate(calId){
    tabs.forEach(t => t.classList.toggle('active', t.dataset.cal === calId));
    panels.forEach(p => p.classList.toggle('active', p.dataset.cal === calId));
    // Update URL hash without scrolling
    if (history.replaceState) history.replaceState(null, '', '#cal-' + calId);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activate(tab.dataset.cal));
  });

  // Open from hash if present
  const m = location.hash.match(/^#cal-(\d)/);
  if (m && document.querySelector('.cal-tab[data-cal="' + m[1] + '"]')){
    activate(m[1]);
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const target = id ? document.getElementById(id) : null;
      if (target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
})();

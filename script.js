const items = [...document.querySelectorAll('.portfolio-item')];
const groups = [...document.querySelectorAll('.content-group')];

items.forEach((item) => {
  const button = item.querySelector(':scope > .portfolio-toggle');
  button?.addEventListener('click', () => {
    const willOpen = !item.classList.contains('is-open');
    item.classList.toggle('is-open', willOpen);
    button.setAttribute('aria-expanded', String(willOpen));
  });
});

groups.forEach((group) => {
  const button = group.querySelector(':scope > .group-toggle');
  const panel = group.querySelector(':scope > .group-panel');
  button?.addEventListener('click', () => {
    const willOpen = !panel.classList.contains('is-open');
    panel.classList.toggle('is-open', willOpen);
    group.classList.toggle('is-collapsed', !willOpen);
    button.setAttribute('aria-expanded', String(willOpen));
  });
});

document.querySelectorAll('.quick-nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', () => {
    const target = document.querySelector(anchor.getAttribute('href'));
    const panel = target?.querySelector(':scope > .group-panel');
    const button = target?.querySelector(':scope > .group-toggle');
    if (panel && button) {
      panel.classList.add('is-open');
      target.classList.remove('is-collapsed');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});


const allToggle = document.querySelector('.quick-nav-all');

function setAllExpanded(expanded) {
  groups.forEach((group) => {
    const button = group.querySelector(':scope > .group-toggle');
    const panel = group.querySelector(':scope > .group-panel');
    if (!button || !panel) return;
    panel.classList.toggle('is-open', expanded);
    group.classList.toggle('is-collapsed', !expanded);
    button.setAttribute('aria-expanded', String(expanded));
  });

  items.forEach((item) => {
    const button = item.querySelector(':scope > .portfolio-toggle');
    item.classList.toggle('is-open', expanded);
    button?.setAttribute('aria-expanded', String(expanded));
  });

  if (allToggle) {
    allToggle.textContent = expanded ? '전부 접기' : '전부 펼치기';
    allToggle.setAttribute('aria-pressed', String(expanded));
  }
}

allToggle?.addEventListener('click', () => {
  const shouldExpand = allToggle.getAttribute('aria-pressed') !== 'true';
  setAllExpanded(shouldExpand);
});

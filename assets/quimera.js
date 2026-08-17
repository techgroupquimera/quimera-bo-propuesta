/* Group Quimera · comportamiento compartido (sin dependencias, funciona desde file://) */

// la pill de navegación se opaca al hacer scroll
const navpill = document.querySelector('.navpill');
if (navpill) addEventListener('scroll', () => navpill.classList.toggle('stuck', scrollY > 30), {passive:true});

// reveals
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), {threshold:.1, rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// ── marquesina de marcas · 29 clientes ──
// Excluidos a propósito: 'meta' (puede leerse como "somos partner de Meta") y los logos propios.
//
// Cada entrada trae [slug, ancho, alto] de display. Declarar las dimensiones es
// necesario, no cosmético: sin ellas el layout se reacomoda a medida que cargan
// las imágenes, el ancho del track cambia en marcha y la animación (que se
// calcula sobre ese ancho) da saltos. Tampoco se usa loading="lazy": los logos
// fuera de vista no se cargaban hasta entrar al viewport, y al hacerlo estiraban
// el track en plena animación — era la causa de que el carrusel se cortara.
// El orden alterna logos anchos y compactos para que la tira se vea equilibrada.
const LOGOS = [
  ['laboliviana',340,31], ['monopol',128,64], ['xiaomi',238,44], ['la-ganga',86,64],
  ['placacenter',340,32], ['tecnotel',77,64], ['casacolor',232,45], ['re-kids',62,64],
  ['eglo',221,47], ['paradise',82,64], ['liulong',241,43], ['fisio-spa',56,64],
  ['natukira',164,64], ['gps-consulting',118,64], ['monopol-automotiva',204,51],
  ['diamondart',61,64], ['oscon',190,55], ['blue-jay',95,64], ['matri',177,59],
  ['sbt',63,64], ['ribepar',170,61], ['ghtractor',95,64], ['grupo-givera',150,64],
  ['bolfitness',84,64], ['shiba',147,64], ['tu-estilo',90,64],
  ['monopol-industrial',204,51], ['whl',120,64], ['gameworld',96,64],
];
const nice = s => s.replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase());
const logoImg = ([n,w,h], copia) =>
  `<img src="assets/marcas/${n}.webp" width="${w}" height="${h}" decoding="async" ` +
  (copia ? 'alt="" aria-hidden="true"' : `alt="${nice(n)}"`) + '>';
// El set va duplicado dentro del MISMO track: al desplazar -50% la segunda copia
// cae exactamente donde arrancó la primera, así que el ciclo no tiene junta.
document.querySelectorAll('.mq-t').forEach(el => {
  el.innerHTML = LOGOS.map(l => logoImg(l, false)).join('') +
                 LOGOS.map(l => logoImg(l, true)).join('');
});

// modal de video
const vm = document.getElementById('vm');
if (vm) {
  const vp = document.getElementById('vp');
  const open = () => { vm.classList.add('open'); vp.currentTime = 0; vp.play(); };
  const close = () => { vm.classList.remove('open'); vp.pause(); };
  document.querySelectorAll('[data-video]').forEach(b => b.onclick = e => { e.preventDefault(); open(); });
  document.getElementById('vc').onclick = close;
  vm.onclick = e => { if (e.target === vm) close(); };
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// visor 9:16 · abre un reel o un mockup a la altura de la pantalla, no a
// pantalla completa. Se construye el <video> al abrir y se destruye al cerrar:
// así no queda nada descargando ni sonando de fondo.
const lb = document.getElementById('lb');
if (lb) {
  const caja = document.getElementById('lb-in');
  const cerrar = () => { lb.classList.remove('open'); caja.innerHTML = ''; };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-lb]');
    if (!b) return;
    e.preventDefault();
    const src = b.dataset.src;
    caja.innerHTML = b.dataset.lb === 'video'
      ? `<video src="${src}" controls autoplay playsinline></video>`
      : `<img src="${src}" alt="${b.dataset.alt || ''}">`;
    lb.classList.add('open');
  });
  document.getElementById('lb-x').onclick = cerrar;
  lb.onclick = e => { if (e.target === lb) cerrar(); };
  addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('open')) cerrar(); });
}

// reels · click para reproducir CON sonido (el navegador bloquea el autoplay
// con audio, así que el play es siempre del usuario). Solo suena uno a la vez.
document.querySelectorAll('.reel').forEach(fig => {
  const v = fig.querySelector('video'), b = fig.querySelector('.reel-play');
  if (!v || !b) return;
  b.onclick = () => {
    document.querySelectorAll('.reel video').forEach(o => { if (o !== v) o.pause(); });
    v.play();
  };
  v.addEventListener('play',  () => fig.classList.add('playing'));
  v.addEventListener('pause', () => fig.classList.remove('playing'));
  v.addEventListener('ended', () => { fig.classList.remove('playing'); v.currentTime = 0; });
});

// panel de notas de revisión
const np = document.getElementById('np'), nb = document.getElementById('nb');
if (nb) nb.onclick = () => np.classList.toggle('open');
document.querySelectorAll('[data-pend]').forEach(a => a.onclick = e => { e.preventDefault(); if (np) np.classList.add('open'); });

// formulario (demo local: valida pero no envía)
const lf = document.getElementById('lf');
if (lf) lf.addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, m = document.getElementById('fm');
  if (!f.name.value.trim() || !f.email.value.trim() || !f.need.value.trim()) {
    m.style.color = '#ffb020';
    m.textContent = 'Completá nombre, email y el proceso que querés automatizar.';
    return;
  }
  m.style.color = '#81DE00';
  m.textContent = 'Demo local: todavía no envía. En producción va al endpoint /leads del backend, que ya existe y funciona — falta apuntarlo a un correo de la empresa.';
});

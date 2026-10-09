const menuButton = document.querySelector('.menu-button');
const heroPositions=['50% 46%','50% 65%','50% 70%','50% 58%','50% 66%','50% 55%','50% 50%'];
document.querySelectorAll('.hero-tile img').forEach((image,index)=>{image.style.objectPosition=heroPositions[index];});
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');mobileNav.hidden=true;}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));mobileNav.hidden=open;});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
const tabs=Array.from(document.querySelectorAll('[role=tab]'));
function activateTab(tab){tabs.forEach(item=>{const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!active;});}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>activateTab(tab));tab.addEventListener('keydown',event=>{let target;if(event.key==='ArrowRight')target=tabs[(index+1)%tabs.length];if(event.key==='ArrowLeft')target=tabs[(index-1+tabs.length)%tabs.length];if(event.key==='Home')target=tabs[0];if(event.key==='End')target=tabs[tabs.length-1];if(target){event.preventDefault();activateTab(target);target.focus();}});});
const dialog=document.querySelector('#photo-dialog');
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{const image=document.querySelector('#dialog-photo');image.src=button.dataset.photo;image.alt=button.querySelector('img').alt;document.querySelector('#dialog-caption').textContent=button.dataset.caption;dialog.showModal();document.body.style.overflow='hidden';}));
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.style.overflow='';});
const form=document.querySelector('#event-form');
const dateInput=form.elements.fecha;
const today=new Date();const localDate=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
dateInput.min=localDate;
form.addEventListener('submit',event=>{
 event.preventDefault();if(!form.reportValidity())return;
 const values=new FormData(form);const [year,month,day]=String(values.get('fecha')).split('-');
 const message=`¡Hola Drink & Dance! Soy ${String(values.get('nombre')).trim()}. Quiero consultar por una barra móvil para mi evento.\n\nEvento: ${values.get('tipo')}\nFecha: ${day}/${month}/${year}\nInvitados aproximados: ${values.get('invitados')}\nLugar: ${String(values.get('lugar')).trim()}`;
 const url=`https://wa.me/5491122507483?text=${encodeURIComponent(message)}`;
 window.open(url,'_blank','noopener,noreferrer');
 const status=document.querySelector('#form-status');status.hidden=false;status.replaceChildren(document.createTextNode('Tu consulta está preparada. '));const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Abrir WhatsApp';status.append(link);
});
document.querySelector('#year').textContent=String(new Date().getFullYear());
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('.section-heading,.service-layout>h2,.bars>h2,.story-content,.faq-layout>h2').forEach(element=>{element.classList.add('reveal');observer.observe(element);});}

document.addEventListener('DOMContentLoaded',()=>{
  const toggle=document.querySelector('.nav-toggle');
  const menu=document.querySelector('.nav-links');
  if(toggle&&menu)toggle.addEventListener('click',()=>{const open=menu.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));});
  const form=document.querySelector('#contact-form');
  if(form)form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form);
    const subject=encodeURIComponent(`HaKING web sitesi: ${data.get('subject')}`);
    const body=encodeURIComponent(`Ad: ${data.get('name')}\nE-posta: ${data.get('email')}\n\n${data.get('message')}`);
    document.querySelector('#form-status').textContent='E-posta uygulamanız açılıyor. Gönderimi kendi e-posta uygulamanızda tamamlayın.';
    window.location.href=`mailto:merhaba@haking.tr?subject=${subject}&body=${body}`;
  });
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
});

document.addEventListener('DOMContentLoaded', () => {
  const search = document.querySelector('#reading-search');
  const category = document.querySelector('#reading-category');
  if (!search || !category) return;
  const cards = [...document.querySelectorAll('[data-reading-card]')];
  const update = () => {
    const query = search.value.trim().toLocaleLowerCase('tr-TR');
    let visible = 0;
    for (const card of cards) {
      const matches = (!category.value || card.dataset.category === category.value)
        && card.textContent.toLocaleLowerCase('tr-TR').includes(query);
      card.hidden = !matches;
      if (matches) visible += 1;
    }
    document.querySelector('#reading-count').textContent = `${visible} yazı`;
    document.querySelector('#reading-empty').hidden = visible !== 0;
  };
  search.addEventListener('input', update);
  category.addEventListener('change', update);
  search.closest('form').addEventListener('submit', event => event.preventDefault());
});

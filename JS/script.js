const modal = document.getElementById('product-modal')
const closeBtn = document.querySelector('.closeBtn')


document.querySelectorAll('.product-card').forEach(card =>{
    card.addEventListener('click', (e)=>{
        if(e.target.classList.contains('add-to-cartBtn') || e.target.parentElement.classList.contains('add-to-cartBtn')){
            return;
        }
        modal.style.display ='flex';
    })
})

closeBtn.addEventListener('click', () =>{
    modal.style.display = 'none';
})

window.addEventListener('click', (e)=>{
    if(e.target === modal){
        modal.style.display = 'none';
    }
})
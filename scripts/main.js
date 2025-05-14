document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modItems = document.querySelectorAll('.mod-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            
            modItems.forEach(item => {
                if (filter === 'all' || item.dataset.categories.includes(filter)) {
                    item.classList.remove('hidden-mod');
                } else {
                    item.classList.add('hidden-mod');
                }
            });
        });
    });
});

function openModal(toolId) {
    document.getElementById(`${toolId}Modal`).style.display = 'flex';
}

function closeModal(toolId) {
    document.getElementById(`${toolId}Modal`).style.display = 'none';
}

window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});
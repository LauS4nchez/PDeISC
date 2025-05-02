document.addEventListener('DOMContentLoaded', () => {
    const hoverBtn = document.getElementById('hoverBtn');
    const tooltip = document.getElementById('tooltip');
    
    hoverBtn.addEventListener('mouseover', () => {
        tooltip.style.display = 'block';
    });
    
    hoverBtn.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });
});
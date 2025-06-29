document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('.nav-item[data-page], .file-item[data-page]');
    const pages = document.querySelectorAll('.page');

    function changePage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        navLinks.forEach(link => {
            if (link.dataset.page === pageId) {
                if(link.classList.contains('file-item')) {
                    link.classList.add('active');
                }
                if(link.classList.contains('nav-item')) {
                    link.classList.add('active-nav');
                }
            } else {
                link.classList.remove('active');
                link.classList.remove('active-nav');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const pageId = link.dataset.page;
            changePage(pageId);
        });
    });

    changePage('about');
});
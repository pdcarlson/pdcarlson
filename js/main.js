// wait for the entire html document to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // select all items that can be clicked to change pages
    const navLinks = document.querySelectorAll('.nav-item[data-page], .file-item[data-page]');

    // select all the content pages
    const pages = document.querySelectorAll('.page');

    // function to switch between pages
    function changePage(pageId) {
        // hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // show the target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // update the active state for all navigation links
        navLinks.forEach(link => {
            if (link.dataset.page === pageId) {
                // for sidebar files
                if(link.classList.contains('file-item')) {
                    link.classList.add('active');
                }
                // for activity bar icons
                if(link.classList.contains('nav-item')) {
                    link.classList.add('active-nav');
                }
            } else {
                // remove active classes from inactive links
                link.classList.remove('active');
                link.classList.remove('active-nav');
            }
        });
    }

    // add a click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const pageId = link.dataset.page;
            changePage(pageId);
        });
    });

    // initially, set the home page as active
    changePage('home');
});
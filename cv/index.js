// window.addEventListener('resize', () => {
//             if (screen.width > 550) {
// document.getElementById('input').checked = false;
//             }
const projects = [
    {
        projectName: "Project Management",
        projectLink: "https://project-management-app-group14.netlify.app/",
        projectImagelink: "cv/images/projectmanagement.jpeg"
    },
    {
        projectName: "Youtube Client",
        projectLink: "https://koraleaxandr.github.io/youtube-client",
        projectImagelink: "cv/images/youtubeclient.jpeg"
    },
    {
        projectName: "RS-Lang",
        projectLink: "https://ihar-dev.github.io/rslang/app/",
        projectImagelink: "cv/images/rslang.jpeg"
    },
    {
        projectName: "Christmas Tree",
        projectLink: "https://rolling-scopes-school.github.io/koraleaxandr-JSFE2021Q3/christmas-task/dist/",
        projectImagelink: "cv/images/christmastree.jpeg"
    },
    {
        projectName: "News Portal",
        projectLink: "https://rolling-scopes-school.github.io/koraleaxandr-JSFE2021Q3/migration-to-TypeScript/dist",
        projectImagelink: "cv/images/newsportal.jpeg"
    },
    {
        projectName: "Async Race",
        projectLink: "https://koraleaxandr.github.io/rsschool-cv/asyncrace/dist/",
        projectImagelink: "cv/images/asincrace.jpeg"
    },
    {
        projectName: "Art Quiz",
        projectLink: "https://rolling-scopes-school.github.io/koraleaxandr-JSFE2021Q3/artquiz/",
        projectImagelink: "cv/images/artquiz.jpeg"
    },
    {
        projectName: "Momentum",
        projectLink: "https://rolling-scopes-school.github.io/koraleaxandr-JSFE2021Q3/momentum/",
        projectImagelink: "cv/images/momentum1.jpeg"
    },
    {
        projectName: "CssMem Slider",
        projectLink: "https://koraleaxandr.github.io/cssMemSlider/cssMemSlider",
        projectImagelink: "cv/images/memslider.jpeg"
    },
];

const carousel = document.querySelector('.carousel');
const projectsNodes = carousel.childNodes;
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
const projectsPagination = document.querySelector('.projects-pagination');
const paginationButtons = projectsPagination.childNodes;
let currentProject = 0;

const renderProjectsPagination = () => {
    for (let i =0; i < projects.length; i++) {
        const button = document.createElement('a');
        button.setAttribute('style', `background-image:url(${projects[i].projectImagelink})`);
        button.setAttribute('title', `${projects[i].projectName}`);
        projectsPagination.appendChild(button);
        button.addEventListener('click' , ()=> {
            currentProject = i;
            getProjects();
            projectsNodes[0].classList.add('selected');
        })
    }
};
renderProjectsPagination();

const getProjects = () => {
    carousel.textContent= '';
    paginationButtons.forEach(element => {
        console.log(element);
        if (element.classList.contains('active')) {
        element.classList.remove('active');
        }
    });
    const carouselWidth = carousel.offsetWidth;
    const projectMinWidth = 150;
    const carouselItemsQuantity = Math.round(carouselWidth / projectMinWidth);
    for (let i = 0; i < carouselItemsQuantity; i++) {
        const project = document.createElement('div');
        const projectNum = (currentProject + i) <= projects.length - 1 ? currentProject + i: currentProject + i- projects.length ;
        project.classList.add('project');
        const projectlink = document.createElement('a');
        projectlink.setAttribute('style', `background-image:url(${projects[projectNum].projectImagelink})`);
        projectlink.setAttribute('href',`${projects[projectNum].projectLink}`);
        projectlink.setAttribute('title', `${projects[projectNum].projectName}`);
        projectlink.setAttribute('target', 'blank');
        projectlink.textContent = `${projects[projectNum].projectName}`;
        project.appendChild(projectlink);
        carousel.appendChild(project);
        paginationButtons[projectNum].classList.add('active');
    }
}

previous.addEventListener('click', ()=>{
    currentProject = currentProject > 0 ? currentProject - 1 : projects.length - 1;
    getProjects();
});
next.addEventListener('click', ()=>{
    currentProject = currentProject === projects.length - 1 ? 0 : currentProject + 1;
    getProjects();
})

visualViewport.addEventListener('resize', () => {
    getProjects();
  });

getProjects();
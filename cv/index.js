// window.addEventListener('resize', () => {
//             if (screen.width > 550) {
// document.getElementById('input').checked = false;
//             }
const projects = [{
        projectName: "Youtube Client",
        projectLink: "",
        projectImagelink: ""
    },
    {
        projectName: "RS-Lang",
        projectLink: "https://koraleaxandr.github.io/rsschool-cv/asyncrace/dist/",
        projectImagelink: "cv/images/rs-lang.jpeg"
    },
    {
        projectName: "Christmas Tree",
        projectLink: "",
        projectImagelink: ""
    },
    {
        projectName: "News Portal",
        projectLink: "",
        projectImagelink: ""
    },
    {
        projectName: "Async Race",
        projectLink: "https://koraleaxandr.github.io/rsschool-cv/asyncrace/dist/",
        projectImagelink: "cv/images/asincrace.jpeg"
    },
    {
        projectName: "ArtQuiz",
        projectLink: "",
        projectImagelink: ""
    },
    {
        projectName: "Momentum",
        projectLink: "",
        projectImagelink: ""
    },
    {
        projectName: "CssMemSlider",
        projectLink: "",
        projectImagelink: ""
    },
];

const carousel = document.querySelector('.carousel');
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
console.log(carousel);
let currentProject = 0;
const getProjects = () => {
    carousel.textContent= '';
    for (let i = 0; i < 3; i++) {
        const project = document.createElement('div');
        const projectNum = (currentProject + i) <= projects.length - 1 ? currentProject + i: currentProject + i- projects.length ;
        project.classList.add('project');
        project.setAttribute('style', `background-image:url(${projects[projectNum].projectImagelink})`);
        const projectlink = document.createElement('a');
        projectlink.setAttribute('href',`${projects[projectNum].projectLink}`);
        projectlink.setAttribute('title', `${projects[projectNum].projectName}`);
        projectlink.textContent = `${projects[projectNum].projectName}`;
        project.appendChild(projectlink);
        carousel.appendChild(project);
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

getProjects();
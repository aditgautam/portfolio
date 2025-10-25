import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

const projects = await fetchJSON('./lib/projects.json');
const latestProjects = projects.slice(0, 3);

const projectsContainer = document.querySelector('.projects');
renderProjects(latestProjects, projectsContainer, 'h2');

const github = await fetchGitHubData('aditgautam');

const profileStats = document.querySelector('#profile-stats');
if (profileStats && github) {
  profileStats.innerHTML = `
    <dl>
      <dt>Public Repos:</dt><dd>${github.public_repos}</dd>
      <dt>Public Gists:</dt><dd>${github.public_gists}</dd>
      <dt>Followers:</dt><dd>${github.followers}</dd>
      <dt>Following:</dt><dd>${github.following}</dd>
    </dl>
  `;
}

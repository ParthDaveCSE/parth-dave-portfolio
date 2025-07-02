import React, { useState, useEffect } from 'react';
// You might need a CSS file for this component specifically, e.g., ProjectsList.css
// For now, we'll put general styles in App.css for simplicity.

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch projects from your backend API
    // IMPORTANT: Use the correct backend API URL.
    // Your backend is running on port 5001, so use http://localhost:5001/api/projects
    const API_URL = 'https://parth-portfolio-api.onrender.com'; // <--- **ENSURE THIS IS 5001**

    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching projects:", error);
        setError(error);
        setLoading(false);
      });
  }, []); // The empty array means this effect runs once after the initial render

  if (loading) {
    return <div className="projects-container">Loading projects...</div>;
  }

  if (error) {
    return <div className="projects-container">Error: {error.message}. Could not load projects. Please ensure the backend server is running on port 5001.</div>;
  }

  if (projects.length === 0) {
    return <div className="projects-container">No projects found. Add some via your backend API!</div>;
  }

  return (
    <section className="projects-section">
      <h2 className="section-title">My Dynamic Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project._id} className="project-card">
            <h3>{project.title}</h3>
            {project.thumbnailUrl && (
              <img
                src={project.thumbnailUrl}
                alt={`Thumbnail for ${project.title}`}
                loading="lazy"
                decoding="async"
              />
            )}
            <p>{project.description}</p>
            <p><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
            <div className="project-links">
              {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>}
              {project.liveDemoLink && <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">Live Demo</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsList;
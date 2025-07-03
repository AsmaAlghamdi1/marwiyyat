import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/ProjectsSlider.css';

export const ProjectsSlider = () => {
  const settings = {
    centerMode: true,
    centerPadding: '0px',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };

  const projects = [
    { id: 1, title: 'مشروع ١' },
    { id: 2, title: 'مشروع ٢' },
    { id: 3, title: 'مشروع ٣' },
    { id: 4, title: 'مشروع ٤' },
  ];

  return (
    <div className="projects-section">
      <h2 className="projects-title">مشاريع المبادرة</h2>
      <Slider {...settings}>
        {projects.map((project) => (
          <div key={project.id}>
            <div className="project-card">
              <div className="card-content">{project.title}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProjectsSlider;

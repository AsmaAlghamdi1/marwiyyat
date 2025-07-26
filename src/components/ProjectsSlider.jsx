import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/ProjectsSlider.css';
import project1 from "../assets/project1.png";
import lahjatna from '../assets/lahjatna.jpg';
import project3 from '../assets/project1.png';
import project4 from '../assets/project1.png';
import { useNavigate } from 'react-router-dom';


export const ProjectsSlider = () => {
   const navigate = useNavigate();
  const settings = {
    centerMode: true,
    centerPadding: '0px',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
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
    { id: 1, image: project1, link:'/home' },
    { id: 2, image: lahjatna, link:'' },
    { id: 3, image: project3, link:'/home' },
    { id: 4, image: project4, link:'/home' },
  ];

  return (
    <div className="projects-section" id='ProjectsSliderURL'>
      <h2 className="projects-title">مشاريع المبادرة</h2>
      <Slider {...settings}>
        {projects.map((project) => (
          <div key={project.id}>
            <div className="project-card"
            onClick={() => navigate(project.link)}
            >
              <div className='project-image-wrapper'>
              <img src={project.image} alt={`Project ${project.id}`} className="project-image" />
              <div className='image-overlay'>
                <span className='view-details'> عرض المشروع</span>
              </div>
            </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProjectsSlider;

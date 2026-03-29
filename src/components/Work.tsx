import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "JanSehat",
    category: "Telemedicine Application",
    tools: "Based on the SIH 2025 problem statement",
    image: "/images/jansehat.jpg",
  },
  {
    title: "Veriomex",
    category: "Genomic Data Project",
    tools: "Secure processing and management of genomic data",
    image: "/images/veriomex.jpg",
  },
  {
    title: "Victus",
    category: "Distributed System",
    tools: "Training large datasets efficiently by sharing CPU resources",
    image: "/images/victus.jpg",
  },
  {
    title: "Uber Clone",
    category: "Ride-Booking Application",
    tools: "Full-featured ride-booking application",
    image: "/images/uber_clone.jpg",
  },
  {
    title: "School Website",
    category: "Educational Platform",
    tools: "A fully functional website developed for a friend's school",
    image: "/images/school.jpg",
  },
  {
    title: "E-Learning Platform",
    category: "EdTech Application",
    tools: "Built during the IIT Bhubaneswar Fest Hackathon",
    image: "/images/elearning.jpg",
  },
  {
    title: "Cement Booking Website",
    category: "Booking Platform",
    tools: "A platform for booking cement for a shop",
    image: "/images/cement.jpg",
  },
  {
    title: "TripSync",
    category: "Trip Planning Application",
    tools: "Real-time updates and deletion features for family and friends",
    image: "/images/tripsync.jpg",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;

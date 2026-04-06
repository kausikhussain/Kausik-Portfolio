import { useState, useCallback, useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "JanSehat",
    category: "Telemedicine Application",
    tools: "Based on the SIH 2025 problem statement",
    image: "/images/jansehat.jpg",
    github: "https://github.com/kausikhussain/Jansehat.git",
  },
  {
    title: "Veriomex",
    category: "Genomic Data Project",
    tools: "Secure processing and management of genomic data",
    image: "/images/veriomex.jpg",
    github: "https://github.com/kausikhussain/VeriomeX-UI.git",
  },
  {
    title: "Victus",
    category: "Distributed System",
    tools: "Training large datasets efficiently by sharing CPU resources",
    image: "/images/victus.jpg",
    github: "https://github.com/kausikhussain/Victus.git",
  },
  {
    title: "Uber Clone",
    category: "Ride-Booking Application",
    tools: "Full-featured ride-booking application",
    image: "/images/uber_clone.jpg",
    github: "https://github.com/kausikhussain/UberClone.git",
  },
  {
    title: "School Website",
    category: "Educational Platform",
    tools: "A fully functional website developed for a friend's school",
    image: "/images/school.jpg",
    github: "https://github.com/kausikhussain/School-Website.git",
    deploy: "https://school-website-theta-virid.vercel.app/",
  },
  {
    title: "E-Learning Platform",
    category: "EdTech Application",
    tools: "Built during the IIT Bhubaneswar Fest Hackathon",
    image: "/images/elearning.jpg",
    github: "https://github.com/kausikhussain/E-learning-platform.git",
  },
  {
    title: "Cement Booking Website",
    category: "Booking Platform",
    tools: "A platform for booking cement for a shop",
    image: "/images/cement.jpg",
    github: "https://github.com/kausikhussain/Zam-Zam-Booking-Site.git",
  },
  {
    title: "TripSync",
    category: "Trip Planning Application",
    tools: "Real-time updates and deletion features for family and friends",
    image: "/images/tripsync.jpg",
    github: "https://github.com/kausikhussain/TripSync.git",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);

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

  // Swipe handling
  const handlePointerDown = (e: React.PointerEvent) => {
    touchStartX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.clientX;
    const distance = touchStartX.current - touchEndX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext(); // Swipe left
    } else if (distance < -minSwipeDistance) {
      goToPrev(); // Swipe right
    }

    touchStartX.current = null;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Slides */}
          <div 
            className="carousel-track-container"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            style={{ touchAction: "pan-y", cursor: "grab" }}
            onPointerCancel={() => { touchStartX.current = null; }}
          >
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
                        <div className="carousel-links" style={{ display: "flex", gap: "20px", marginTop: "20px" }} data-cursor="disable">
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noreferrer" style={{ color: "var(--accentColor)", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", fontSize: "15px" }}>
                              <FaGithub size={20} /> <span>GitHub</span>
                            </a>
                          )}
                          {project.deploy && (
                            <a href={project.deploy} target="_blank" rel="noreferrer" style={{ color: "var(--accentColor)", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", fontSize: "15px" }}>
                              <FaExternalLinkAlt size={18} /> <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper" data-cursor="disable">
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

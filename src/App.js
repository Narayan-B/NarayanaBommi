import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithubSquare, FaDownload, FaWhatsapp, FaReact, FaCode, FaGraduationCap, FaCss3Alt, FaSchool, FaNodeJs, FaBookOpen, FaHtml5 } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import { SiGmail, SiRedux, SiExpress } from "react-icons/si";
import { MdMarkEmailUnread } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FiSend } from "react-icons/fi";
import { IoMdMail, IoMdCode } from "react-icons/io";
import { RiJavascriptFill } from "react-icons/ri";
import { BiLogoTypescript, BiLogoMongodb } from "react-icons/bi";

const TypeWriter = ({ texts, speed = 150 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const text = texts[phraseIndex];

    if (!isTyping) return;

    const typeText = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setPhraseIndex(prev => (prev + 1) % texts.length);
          setCurrentIndex(0);
          setDisplayText('');
          setIsTyping(true);
        }, 1000);
      }
    };

    const timeout = setTimeout(typeText, speed);
    return () => clearTimeout(timeout);
  }, [currentIndex, phraseIndex, texts, speed, isTyping]);

  return (
    <span className="border-r-2 border-blue-600 pr-1 animate-pulse">
      {displayText}
    </span>
  );
};

// Skill Bar Component
const SkillBar = ({ skill, percentage, icon, isVisible, delay = 0 }) => {
  const [width, setWidth] = useState(0);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setWidth(0);
      setDisplayPercentage(0);

      const timer = setTimeout(() => {
        setWidth(percentage);
        let currentPercentage = 0;
        const increment = percentage / (2000 / 50);

        const percentageTimer = setInterval(() => {
          currentPercentage += increment;
          if (currentPercentage >= percentage) {
            currentPercentage = percentage;
            clearInterval(percentageTimer);
          }
          setDisplayPercentage(Math.round(currentPercentage));
        }, 50);

        return () => clearInterval(percentageTimer);
      }, 300 + delay);

      return () => clearTimeout(timer);
    } else {
      setWidth(0);
      setDisplayPercentage(0);
    }
  }, [percentage, isVisible, delay]);

  return (
    <div className="mb-6 px-4 sm:px-6 lg:px-10 w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-3">
          <span className="text-gray-700 text-lg">{icon}</span>
          <span className="text-gray-700 font-medium text-sm sm:text-base">{skill}</span>
        </div>
        <span className="text-blue-600 font-medium text-sm sm:text-base font-mono">
          {displayPercentage}%
        </span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-full transition-all duration-[2000ms] ease-out shadow-sm"
          style={{
            width: `${width}%`,
            transform: 'translateZ(0)',
          }}
        />
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState({});
  const [showTyping, setShowTyping] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const smoothScrollTo = (targetPosition) => {
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    };
    const handleSmoothScroll = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const targetPosition = targetElement.offsetTop - (-35);
          smoothScrollTo(targetPosition, 1200); // Slower 1.2s duration
        }
      }
    };

    // Add event listeners to all anchor links
    document.addEventListener('click', handleSmoothScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section').forEach(
      section => observer.observe(section)
    );

    setTimeout(() => setShowTyping(true), 1500);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setErrors({ general: 'All fields are required' });
      return;
    }

    setErrors({});

    const phoneNumber = '+918639423365';
    const message = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');
    setFormData({ name: '', email: '', message: '' });
  };

  const projects = [
    {
      title: "Book My Doc",
      description: "A full-stack web application designed for booking doctor appointments online, featuring real-time availability updates, user profiles, and seamless appointment management. Built with a robust backend and intuitive frontend to ensure a smooth and efficient user experience.",
      technologies: ["React", "Node.js", "MongoDB", "Redux"],
      githubFrontend: "https://github.com/Narayan-B/Book-My-Doc-Frontend",
      githubBackend: 'https://github.com/Narayan-B/Book-My-Doc-Backend'
    },
    {
      title: "Blog App",
      description: "A full-stack blog application that provides users with the ability to create, edit, and delete blog posts. The app includes user authentication, allowing users to sign up, log in, and manage their profiles. It also supports commenting functionality, enabling users to engage with content and share their thoughts on individual posts.",
      technologies: ["React", "MongoDB", "Tailwind CSS"],
      githubFrontend: "https://github.com/Narayan-B/Blog-frontend",
      githubBackend: 'https://github.com/Narayan-B/Blog-backend'
    },
    {
      title: "Real-Time Stock & Crypto Price Tracker",
      description: "A real-time web application that allows users to track the latest stock and cryptocurrency prices from global markets. The app integrates with various financial APIs to display live price data, historical trends, and market charts. Built with a clean, user-friendly interface using React for the frontend and Node.js for backend API calls.",
      technologies: ["React", "OpenAI API", "MongoDB", "Node.js"],
      githubFrontend: "https://github.com/Narayan-B/FomoFactory-Real-Time-Stock-Crypto-Price-Data/tree/main/frontend",
      githubBackend: 'https://github.com/Narayan-B/FomoFactory-Real-Time-Stock-Crypto-Price-Data/tree/main/backend'
    },
    {
      title: "Job Portal",
      description: "A full-stack job portal enabling seamless employer-candidate connections. Features include smart job matching, real-time tracking, and interactive dashboards for both recruiters and applicants. Built with MERN stack, it streamlines the hiring process through automated skill matching and instant notifications.",
      technologies: ["React", "D3.js", "Node.js", "MySQL"],
      githubFrontend: "https://github.com/Narayan-B/jop-portal-frontend",
      githubBackend: 'https://github.com/Narayan-B/job-portal-backend'
    }
  ];

  const frontendSkills = [
    { name: "React", level: 90, icon: <FaReact size={20} color="#61DBFB" /> },
    { name: "JavaScript", level: 85, icon: <RiJavascriptFill size={20} color="#F7DF1E" /> },
    { name: "TypeScript", level: 80, icon: <BiLogoTypescript size={20} color="#3178C6" /> },
    { name: "HTML5", level: 95, icon: <FaHtml5 size={20} color="#E34F26" /> },
    { name: "CSS3", level: 85, icon: <FaCss3Alt size={20} color="#1572B6" /> },
    { name: "Redux", level: 80, icon: <SiRedux size={20} color="#764ABC" /> },
  ];

  const backendSkills = [
    { name: "Node.js", level: 75, icon: <FaNodeJs size={20} color="#68A063" /> },
    { name: "REST APIs", level: 80, icon: <IoMdCode size={20} color="#000000" /> },
    { name: "MongoDB", level: 70, icon: <BiLogoMongodb size={20} color="#47A248" /> },
    { name: "Express", level: 85, icon: <SiExpress size={20} color="#F1502F" /> },
  ];

  const workExperience = [
    {
      title: "Full Stack Developer",
      company: "TableSprint Technologies Private Limited, Bangalore",
      duration: "Present",
      date: "Feb 2025 - Present",
      details: "Building an AI Platform to develop scalable enterprise applications using modern web technologies.",
      icon: (
        <img
          src="/Tablesprint-Logo.png"
          alt="Tablesprint Logo"
          className="w-8 h-8 object-contain"
        />
      ),
    },
    {
      title: "Full Stack Developer",
      company: "Vilambi Technologies Private Limited, Hyderabad (Service-based)",
      duration: "1 year 6 months",
      date: "June 2023 - Jan 2025",
      details: "Worked on multiple client projects, delivering scalable web applications using modern technologies.",
      icon: (
        <img
          src="/Vilambi-Logo.png"
          alt="Vilambi Logo"
          className="w-8 h-8 object-contain rounded-full"
        />
      ),
    },
  ];


  const educationData = [
    {
      title: "MERN STACK COURSE",
      institution: "DCT Academy, Bangalore",
      duration: "6 Months",
      date: "Dec 2023 - July 2024",
      details: "Comprehensive full-stack development training",
      icon: <FaCode size={30} />,
    },
    {
      title: "Bachelor Of Technology",
      institution: "JNTU Anantapur",
      grade: "8.55 CGPA",
      date: "2019 - 2023",
      icon: <FaGraduationCap size={30} />,
    },
    {
      title: "Narayana Junior College - MPC",
      institution: "Andhra Pradesh - State Board",
      grade: "10 CGPA",
      date: "2017 - 2019",
      icon: <FaSchool size={30} />,
    },
    {
      title: "SSC",
      institution: "Andhra Pradesh - State Board",
      grade: "9.7 CGPA",
      date: "March 2017",
      icon: <FaBookOpen size={30} />,
    }
  ];

  const contactInfo = [
    {
      icon: <CiMobile3 className="w-6 h-6" />,
      title: "Call Me",
      content: "+91 8639423365",
    },
    {
      icon: <MdMarkEmailUnread className="w-6 h-6" />,
      title: "Email",
      content: "narayanabommi863@gmail.com",
    },
    {
      icon: <CiLocationOn className="w-6 h-6" />,
      title: "Location",
      content: "Bangalore - Karnataka",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Animated Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-50 shadow-lg border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Narayana B
            </h1>
            <div className="hidden md:flex space-x-6">
              <a href="#hero" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">About</a>
              <a href="#projects" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Projects</a>
              <a href="#skills" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Skills</a>
              <a href="#experience" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Experience</a>
              <a href="#education" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Education</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Animated Hero Section */}
      <section id="hero" className={`pt-32 pt-18 pb-10 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-flex items-center gap-4">
                Hi, I'm Bommi Narayana
              </span>
            </h1>
            <div className="text-lg sm:text-xl text-gray-700 mb-8 opacity-0 animate-[fadeIn_0.5s_ease-in_forwards_1s] h-8">
              {showTyping && (
                <TypeWriter
                  texts={["MERN Full Stack Developer", "Looking for opportunity"]}
                  speed={150}
                />
              )}
            </div>

            <div className="flex justify-center space-x-6 opacity-0 animate-[fadeIn_0.5s_ease-in_forwards_1.5s]">
              <a href="https://github.com/Narayan-B"
                className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-all duration-300">
                <FaGithubSquare size={28} />
              </a>
              <a href="https://www.linkedin.com/in/bommi-narayana-83857b213"
                className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-all duration-300">
                <FaLinkedin size={28} />
              </a>
              <a href="mailto:narayanabommi863@gmail.com"
                className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-all duration-300">
                <SiGmail size={28} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`md:md:pt-32 pt-6 pt-6 md:pb-10 pb-2 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Me</h2>
            <h5 className="text-gray-600">Introduction</h5>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 flex justify-center items-center">
              <div className="relative w-full max-w-[80%]">
                <video
                  src="/profilevideo.mp4"
                  alt="Profile Video"
                  className="rounded-lg w-full object-cover shadow-2xl"
                  autoPlay
                  loop
                  muted
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-gray-600 px-2 md:px-4 leading-relaxed text-sm sm:text-base">
                  As a dedicated MERN Stack Developer with a passion for crafting end-to-end web solutions, I leverage my expertise in MongoDB, Express.js, React.js, and Node.js to architect and deliver scalable applications that seamlessly integrate user experience with powerful backend functionality, while adhering to clean code principles and modern development practices, all while remaining committed to continuous learning and staying ahead of industry trends.
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => window.open('/Narayan-Resume.pdf', '_blank')}
                  className="inline-flex items-center gap-2 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <FaDownload />
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`md:pt-32 pt-6 py-12 transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <div key={index}
                className="bg-white border-gray-100 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  <a href={project.githubFrontend}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                    <FaGithubSquare size={20} className="mr-1" /> Frontend
                  </a>
                  <a href={project.githubBackend}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                    <FaGithubSquare size={20} className="mr-1" /> Backend
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`md:pt-32 pt-6 py-16 transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Technical Skills
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-white border-gray-100 rounded-xl p-6 shadow-lg border">
              <h3 className="text-2xl font-semibold mb-6 text-center text-blue-600">Frontend Skills</h3>
              {frontendSkills.map((skill, index) => (
                <SkillBar
                  key={index}
                  skill={skill.name}
                  percentage={skill.level}
                  icon={skill.icon}
                  isVisible={isVisible.skills}
                  delay={index * 100} // Staggered animation
                />
              ))}
            </div>

            <div className="bg-white border-gray-100 rounded-xl p-6 shadow-lg border">
              <h3 className="text-2xl font-semibold mb-6 text-center text-blue-600">Backend Skills</h3>
              {backendSkills.map((skill, index) => (
                <SkillBar
                  key={index}
                  skill={skill.name}
                  percentage={skill.level}
                  icon={skill.icon}
                  isVisible={isVisible.skills}
                  delay={(index + frontendSkills.length) * 100} // Continue staggering after frontend
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="md:pt-32 pt-6 py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Work Experience</h2>
            <p className="text-gray-600">My Professional Journey</p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

            <div className="space-y-12">
              {workExperience.map((item, index) => (
                <div key={index} className="flex items-center flex-row">
                  <div className="pl-12 md:w-1/2 w-full md:pr-12 md:text-right text-left">
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <h4 className="text-gray-600 font-medium mb-2 text-sm sm:text-base">{item.company}</h4>
                      <p className="text-blue-600 font-medium mb-1 text-sm sm:text-base">{item.duration}</p>
                      <p className="text-gray-600 mb-2 text-sm">{item.details}</p>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mt-2 md:justify-end justify-start">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512">
                          <path d="M480 128a64 64 0 00-64-64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00112 48v16H96a64 64 0 00-64 64v12a4 4 0 004 4h440a4 4 0 004-4zM32 416a64 64 0 0064 64h320a64 64 0 0064-64V179a3 3 0 00-3-3H35a3 3 0 00-3 3z" />
                        </svg>
                        {item.date}
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 absolute left-2 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                      {item.icon}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="md:pt-32 pt-6 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Education</h2>
            <p className="text-gray-600">My Educational Background</p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

            <div className="space-y-12">
              {educationData.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center 
                  ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                  flex-row`}
                >
                  <div
                    className={`pl-12 md:w-1/2 w-full
                    ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} 
                    text-left`}
                  >
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <h4 className="text-gray-600 font-medium mb-2 text-sm sm:text-base">{item.institution}</h4>
                      {item.grade && (
                        <p className="text-blue-600 font-medium mb-1 text-sm sm:text-base">{item.grade}</p>
                      )}
                      {item.duration && (
                        <p className="text-gray-500 mb-1 text-sm">{item.duration}</p>
                      )}
                      {item.details && (
                        <p className="text-gray-600 mb-2 text-sm">{item.details}</p>
                      )}
                      <div className={`flex items-center gap-2 text-gray-500 text-sm mt-2
                      ${index % 2 === 0 ? 'md:justify-end justify-start' : 'justify-start'}`}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512">
                          <path d="M480 128a64 64 0 00-64-64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00112 48v16H96a64 64 0 00-64 64v12a4 4 0 004 4h440a4 4 0 004-4zM32 416a64 64 0 0064 64h320a64 64 0 0064-64V179a3 3 0 00-3-3H35a3 3 0 00-3 3z" />
                        </svg>
                        {item.date}
                      </div>
                    </div>
                  </div>

                  <div className="w-12 h-12 absolute left-2 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                    <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg">
                      {item.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        id="contact"
        className={`md:pt-32 pt-6 py-16 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Me</h2>
            <p className="text-gray-600">Get in touch</p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 break-words">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-lg border">
              <div className="space-y-6">
                {errors.general && (
                  <p className="text-red-500 text-sm">{errors.general}</p>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="7"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  <span>Send Message</span>
                  <FiSend className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className={`py-16 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-gray-700 mb-8">
            I'm currently open for new opportunities. Feel free to reach out!
          </p>
          <a href="mailto:narayanabommi863@gmail.com"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700">
            <IoMdMail size={20} className="mr-2" />
            Contact Me
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white pt-8 pb-6 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">Narayana B</h1>
              <span className="text-gray-200">MERN Stack Developer</span>
            </div>

            <div className="text-center md:text-left">
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                {['Home', 'About', 'Projects', 'Skills', 'Experience', 'Education', 'Contact'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="block hover:text-gray-200 transition-colors duration-300">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="flex justify-center md:justify-end space-x-4">
                {[
                  { icon: FaGithubSquare, href: "https://github.com/Narayan-B" },
                  { icon: FaLinkedin, href: "https://www.linkedin.com/in/bommi-narayana-83857b213" },
                  { icon: FaWhatsapp, href: "https://wa.me/8639423365" },
                  { icon: SiGmail, href: "mailto:narayanabommi863@gmail.com" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-200 transition-colors duration-300 transform hover:scale-110"
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-blue-500">
            <p className="text-sm text-gray-200">
              © {new Date().getFullYear()} Narayana B. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  /* Smooth scrolling for all browsers */
  * {
    scroll-behavior: smooth !important;
  }
  
  /* Custom smooth scrolling with slower speed */
  @media (prefers-reduced-motion: no-preference) {
    html {
      scroll-padding-top: 5rem;
    }
    
    a[href^="#"] {
      scroll-behavior: smooth;
    }
  }
  
  /* Override default scroll behavior for slower scrolling */
  html, body {
    scroll-behavior: smooth !important;
  }
  
  /* Custom scrollbar for webkit browsers */
  ::-webkit-scrollbar {
    width: 4px !important;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #3b82f6, #6366f1);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #2563eb, #4f46e5);
  }
  
  /* Mobile menu styles */
  @media (max-width: 768px) {
    .mobile-menu {
      transition: all 0.3s ease-in-out;
    }
  }
  
  /* Custom CSS for even smoother scrolling */
  @supports (scroll-behavior: smooth) {
    html {
      scroll-behavior: smooth;
    }
  }
`;

if (!document.head.querySelector('style[data-portfolio="true"]')) {
  style.setAttribute('data-portfolio', 'true');
  document.head.appendChild(style);
}

export default Portfolio;

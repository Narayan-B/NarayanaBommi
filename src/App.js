import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithubSquare, FaDownload,FaWhatsapp, FaReact, FaCode, FaGraduationCap, FaCss3Alt, FaSchool, FaNodeJs, FaBookOpen, FaHtml5 } from "react-icons/fa";
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
    <span className="border-r-2 border-blue-600 pr-1">
      {displayText}
    </span>
  );
};

// const handleSubmit = (e) => {
//   e.preventDefault();
//   // Add your form submission logic here
// };


// Skill Bar Component
const SkillBar = ({ skill, percentage, icon }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(percentage); // Set the width dynamically based on percentage
    }, 100);
  }, [percentage]);

  return (
    <div className="mb-6 px-10 w-full">
      <div className="flex justify-between items-center mb-2">
        {/* Icon first then skill name */}
        <div className="flex items-center space-x-3">
          {/* Icon first */}
          <span className="text-gray-700 text-lg">{icon}</span>
          {/* Skill name */}
          <span className="text-gray-700 font-medium">{skill}</span>
        </div>

        {/* Percentage */}
        <span className="text-blue-600 font-medium">{percentage}%</span>
      </div>

      {/* Skill Bar Background */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        {/* Progress bar color */}
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }} // The width is dynamically updated
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

    // Start typing animation after a brief delay
    setTimeout(() => setShowTyping(true), 1500);

    return () => observer.disconnect();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if any field is empty
    if (!formData.name || !formData.email || !formData.message) {
      setErrors({ general: 'All fields are required' });  // Set a generic error message
      return;  // Prevent form submission if validation fails
    }

    // If validation passes, clear any existing errors
    setErrors({});

    // Prepare the WhatsApp message
    const phoneNumber = '+918639423365'; // Replace with your WhatsApp phone number (with country code)
    const message = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);

    // Generate the WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');

    // Reset the form
    setFormData({ name: '', email: '', message: '' });
  };


  const projects = [
    {
      title: "Book My Doc",
      description: "A full-stack web application designed for booking doctor appointments online, featuring real-time availability updates, user profiles, and seamless appointment management. Built with a robust backend and intuitive frontend to ensure a smooth and efficient user experience.",
      technologies: ["React", "Node.js", "MongoDB", "Redux"],
      githubFrontend: "https://github.com/Narayan-B/Book-My-Doc-Frontend",
      githubBackend: 'https://github.com/Narayan-B/Book-My-Doc-Backend'
      //live: "https://ecommerce-demo.com"
    },
    {
      title: "Blog App",
      description: "A full-stack blog application that provides users with the ability to create, edit, and delete blog posts. The app includes user authentication, allowing users to sign up, log in, and manage their profiles. It also supports commenting functionality, enabling users to engage with content and share their thoughts on individual posts. ",
      technologies: ["React", "MongoDB", "Tailwind CSS"],
      githubFrontend: "https://github.com/Narayan-B/Blog-frontend",
      githubBackend: 'https://github.com/Narayan-B/Blog-backend'
      //live: "https://task-manager-demo.com"
    },
    {
      title: "Real-Time Stock & Crypto Price Tracker",
      description: "A real-time web application that allows users to track the latest stock and cryptocurrency prices from global markets. The app integrates with various financial APIs to display live price data, historical trends, and market charts.Built with a clean, user-friendly interface using React for the frontend and Node.js for backend API calls.",
      technologies: ["React", "OpenAI API", "MongoDB", "Node.js"],
      githubFrontend: "https://github.com/Narayan-B/FomoFactory-Real-Time-Stock-Crypto-Price-Data/tree/main/frontend",
      githubBackend: 'https://github.com/Narayan-B/FomoFactory-Real-Time-Stock-Crypto-Price-Data/tree/main/backend'
      //live: "https://ai-content-demo.com"
    },
    {
      title: "Job Portal",
      description: "A full-stack job portal enabling seamless employer-candidate connections. Features include smart job matching, real-time tracking, and interactive dashboards for both recruiters and applicants. Built with MERN stack, it streamlines the hiring process through automated skill matching and instant notifications.",
      technologies: ["React", "D3.js", "Node.js", "MySQL"],
      githubFrontend: "https://github.com/Narayan-B/jop-portal-frontend",
      githubBackend: 'https://github.com/Narayan-B/job-portal-backend'
      //live: "https://social-dashboard-demo.com"
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

  const educationData = [
    {
      title: "MERN STACK COURSE",
      institution: "DCT Academy, Bangalore",
      duration: "6 Months",
      date: "Dec 2023 - July 2023",
      details: "",
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
      institution: "Andra Pradesh - State Board",
      grade: "10 CGPA",
      date: "2017 - 2019",
      icon: <FaSchool size={30} />,
    },
    {
      title: "SSC",
      institution: "Andra Pradesh - State Board",
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
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-50 shadow-lg hidden md:block">
  <div className="max-w-6xl mx-auto px-4 py-4">
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Narayana B
      </h1>
      <div className="flex space-x-6">
        <a href="#hero" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Home</a>
        <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">About</a>
        <a href="#projects" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Projects</a>
        <a href="#skills" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Skills</a>
        <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Contact</a>
      </div>
    </div>
  </div>
</nav>


      {/* Animated Hero Section */}
      <section id="hero" className={` pt-20 md:pt-32 pb-10 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r s h-16 from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-flex items-center gap-4">
                Hi, I'm Bommi Narayana
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 opacity-0 animate-[fadeIn_0.5s_ease-in_forwards_1s]">
              {showTyping && (
                <TypeWriter
                  texts={["MERN Full Stack Developer", "Looking for opportunity"]}
                  speed={150}
                />
              )}
            </p>


            <div className="flex justify-center space-x-6 opacity-0 animate-[fadeIn_0.5s_ease-in_forwards_1.5s]">
              <a href="https://github.com/Narayan-B"
                className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-all duration-300">
                <FaGithubSquare size={28} color='#211F1F' />
              </a>
              <a href="https://www.linkedin.com/in/bommi-narayana-83857b213"
                className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-all duration-300">
                <FaLinkedin size={28} color='#0077B5' />
              </a>
              <a href="mailto:narayanabommi863@gamil.com"
                className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-all duration-300">
                <SiGmail size={28} color='#0077B5' />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section
        id="about"
        className={`pt-32 pb-10 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Me</h2>
            <h5>Introduction</h5>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Video Column */}
            <div className="space-y-6 flex justify-center items-center">
              <div className="relative w-full max-w-[80%]">
                <video
                  src="/profilevideo.mp4"
                  alt="Profile Video"
                  className="rounded-lg w-full object-cover"
                  autoPlay
                  loop
                  muted
                  // Remove hover border or outline if it's being applied to the video
                  onMouseOver={(e) => e.currentTarget.style.outline = 'none'}
                  onFocus={(e) => e.currentTarget.style.outline = 'none'}
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-gray-600 px-2 md:px-4 leading-relaxed">
                  As a dedicated MERN Stack Developer with a passion for crafting end-to-end web solutions, I leverage my expertise in MongoDB, Express.js, React.js, and Node.js to architect and deliver scalable applications that seamlessly integrate user experience with powerful backend functionality, while adhering to clean code principles and modern development practices, all while remaining committed to continuous learning and staying ahead of industry trends.
                </p>
              </div>

              {/* Resume Download Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => window.open('/Narayan-Resume.pdf', '_blank')}
                  className="inline-flex items-center gap-2 text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                >
                  <FaDownload />
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Background Animation */}
        <div className="absolute right-0 bottom-0 -z-10">
          <svg
            width="404"
            height="404"
            fill="none"
            viewBox="0 0 404 404"
            className="opacity-20"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" className="text-blue-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
          </svg>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className={`pt-32 py-12 transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href={project.githubFrontend}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    <FaGithubSquare size={20} className="mr-1" /> Frontend
                  </a>
                  <a href={project.githubBackend}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    <FaGithubSquare size={20} className="mr-1" /> Backend
                  </a>
                  {/* <a href={project.live}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    <ExternalLink size={20} className="mr-1" /> Live Demo
                  </a> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`pt-32 py-16 transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Technical Skills
          </h2>

          {/* Grid layout for Backend (left) and Frontend (right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {/* Left Column: Backend Skills */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-center text-blue-600">Frontend Skills</h3>
              {frontendSkills.map((skill, index) => (
                <SkillBar
                  key={index}
                  skill={skill.name}
                  percentage={skill.level}
                  icon={skill.icon}
                />
              ))}
            </div>
            {/* Right Column: Frontend Skills */}

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-center text-blue-600">Backend</h3>
              {backendSkills.map((skill, index) => (
                <SkillBar
                  key={index}
                  skill={skill.name}
                  percentage={skill.level}
                  icon={skill.icon}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Qualification */}
      <section className=" pt-32 py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Qualification</h2>
            <p className="text-gray-600">My Education Journey</p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

            {/* Education items */}
            <div className="space-y-12">
              {educationData.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center 
                  ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                  flex-row`}
                >
                  {/* Content */}
                  <div
                    className={`pl-12 md:w-1/2 w-full
                    ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} 
                    text-left`}
                  >
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <h4 className="text-gray-600 font-medium mb-2">{item.institution}</h4>
                      {item.grade && (
                        <p className="text-blue-600 font-medium mb-1">{item.grade}</p>
                      )}
                      {item.duration && (
                        <p className="text-gray-500 mb-1">{item.duration}</p>
                      )}
                      <div className={`flex items-center gap-2 text-gray-500 text-sm mt-2
                      ${index % 2 === 0 ? 'md:justify-end justify-start' : 'justify-start'}`}>
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 512 512"
                        >
                          <path d="M480 128a64 64 0 00-64-64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 00112 48v16H96a64 64 0 00-64 64v12a4 4 0 004 4h440a4 4 0 004-4zM32 416a64 64 0 0064 64h320a64 64 0 0064-64V179a3 3 0 00-3-3H35a3 3 0 00-3 3z" />
                        </svg>
                        {item.date}
                      </div>
                    </div>
                  </div>

                  {/* Icon */}
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
      {/* contact form */}
      <section
        id="contact"
        className={`pt-32 py-16 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-6xl mx-auto px-20">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Me</h2>
            <p className="text-gray-600">Get in touch</p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 justify-center items-center gap-12">
            {/* Contact Information */}
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
                    <p className="text-gray-600">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Show general error message if any */}
                {errors.general && (
                  <p className="text-red-500 text-sm">{errors.general}</p>
                )}

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="7"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors duration-300"
                >
                  <span>Send Message</span>
                  <FiSend className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section className={`py-16 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-gray-700 mb-8">
            I'm currently open for new opportunities. Feel free to reach out!
          </p>
          <a href="mailto:narayanabommi863@gmail.com"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg
                        transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
            <IoMdMail size={20} className="mr-2" />
            Contact Me
          </a>
        </div>
      </section>

      {/* Footer */}
      {/* Footer Section */}
      <footer className="bg-blue-600 text-white pt-8 pb-6 md:hidden">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Logo and Title Section */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-bold">Narayana B</h1>
        <span className="text-gray-200">MERN Stack Developer</span>
      </div>

      {/* Links Section */}
      <div className="text-center">
        <ul className="space-y-2">
          <li>
            <a href="#hero" className="hover:text-gray-200 transition-colors duration-300">
              Home
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-gray-200 transition-colors duration-300">
              Projects
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-gray-200 transition-colors duration-300">
              About
            </a>
          </li>
          <li>
            <a href="#skills" className="hover:text-gray-200 transition-colors duration-300">
              Skills
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-200 transition-colors duration-300">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Social Links Section */}
      <div className="text-center md:text-right">
        <div className="flex justify-center md:justify-end space-x-4">
          <a 
            href="https://github.com/Narayan-B" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            <FaGithubSquare size={24} />
          </a>
          <a 
            href="https://www.linkedin.com/in/bommi-narayana-83857b213" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a 
            href="https://wa.me/8639423365" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            <FaWhatsapp size={24} />
          </a>
          <a 
            href="mailto:narayanabommi863@gmail.com"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            <SiGmail size={24} />
          </a>
        </div>
      </div>
    </div>

    {/* Copyright Section */}
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

// Add the wave and fadeIn animations to your global CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-15deg); }
    75% { transform: rotate(15deg); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);

export default Portfolio;
// Services.jsx
import React, { useEffect, useRef, useState } from 'react';
import './Services.css';
import { Brain, Code, Network, Database, Settings, ChevronRight, AppWindow, ArrowRight } from 'lucide-react';

const Services = () => {
    const servicesSectionRef = useRef(null);
    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.service-item');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('fade-in');
                            }, index * 150);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (servicesSectionRef.current) {
            observer.observe(servicesSectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const services = [
        {
            title: "AI & Machine Learning",
            icon: <Brain className="service-icon-svg" />,
            description: "Revolutionize your business with cutting-edge AI and ML solutions for intelligent automation and predictive analytics",
            positions: ["Machine Learning Engineer", "AI Developer"],
            gradient: "gradient-1",
            techStack: ["TensorFlow", "PyTorch", "Scikit-learn"]
        },
        {
            title: "DevOps Engineering",
            icon: <Settings className="service-icon-svg" />,
            description: "Streamline your development pipeline with continuous integration and automated deployment solutions",
            positions: ["DevOps Engineer", "Cloud Architect"],
            gradient: "gradient-2",
            techStack: ["Docker", "Kubernetes", "Jenkins"]
        },
        {
            title: "Software Development",
            icon: <Code className="service-icon-svg" />,
            description: "Build robust and scalable applications with modern frameworks and clean architecture",
            positions: ["Java Developer", ".NET Developer"],
            gradient: "gradient-3",
            techStack: ["React", "Spring Boot", ".NET Core"]
        },
        {
            title: "Network Solutions",
            icon: <Network className="service-icon-svg" />,
            description: "Secure and optimize your network infrastructure with advanced monitoring and security protocols",
            positions: ["Network Engineer", "Security Specialist"],
            gradient: "gradient-4",
            techStack: ["Cisco", "AWS", "Azure"]
        },
        {
            title: "Data Engineering",
            icon: <Database className="service-icon-svg" />,
            description: "Transform raw data into actionable insights with our comprehensive data engineering solutions",
            positions: ["Data Engineer", "Data Analyst"],
            gradient: "gradient-5",
            techStack: ["Hadoop", "Spark", "Snowflake"]
        },
        {
            title: "Quality Assurance",
            icon: <AppWindow className="service-icon-svg" />,
            description: "Ensure software excellence with comprehensive testing and validation methodologies",
            positions: ["QA Engineer", "Validation Engineer"],
            gradient: "gradient-6",
            techStack: ["Selenium", "JUnit", "TestNG"]
        }
    ];

    return (
        <div className="services-container">
            {/* Background Elements */}
            <div className="services-bg-pattern"></div>
            <div className="services-gradient-overlay"></div>

            <div className="services-header">
                <span className="sub-heading">Our Expertise</span>
                <h2>Transformative Solutions & Opportunities</h2>
                <p>Pioneering the future of technology with innovative solutions and exceptional talent</p>
            </div>

            <div className="services-grid" ref={servicesSectionRef}>
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`service-item ${service.gradient} ${activeCard === index ? 'active' : ''}`}
                        onMouseEnter={() => setActiveCard(index)}
                        onMouseLeave={() => setActiveCard(null)}
                    >
                        <div className="service-content">
                            <div className={`service-icon ${service.gradient}`}>
                                {service.icon}
                                <div className="icon-blur"></div>
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>

                            <div className="tech-stack">
                                {service.techStack.map((tech, i) => (
                                    <span key={i} className="tech-tag">{tech}</span>
                                ))}
                            </div>

                            <div className="positions-list">
                                {service.positions.map((position, posIndex) => (
                                    <div key={posIndex} className="position-item">
                                        <ChevronRight size={16} />
                                        <span>{position}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="learn-more">
                                <span>Learn More</span>
                                <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="card-background"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
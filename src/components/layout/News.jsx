// News.jsx
import React, { useEffect, useRef } from 'react';
import './News.css';
import { User, Plus } from 'lucide-react';
import News1 from '../../assets/images/News1.JPG';
import News2 from '../../assets/images/News2.JPG';
import News3 from '../../assets/images/News3.JPG';

const News = () => {
    const newsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.news-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('fade-in');
                            }, index * 200);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (newsRef.current) {
            observer.observe(newsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const newsItems = [
        {
            image: News1,
            date: 'Sep, 16, 2024',
            author: 'Admin',
            title: 'How Blockchain Technology Will Change IT Infrastructure',
            description: 'Discover how blockchain technology is revolutionizing IT infrastructure with secure data and payment solutions.'
        },
        {
            image: News2,
            date: 'Oct, 11, 2024',
            author: 'Admin',
            title: 'Supporting consultants with VensraIT Group LLC redeployment',
            description: 'Learn about our innovative cloud solutions and how they are helping consultants achieve better deployment outcomes.'
        },
        {
            image: News3,
            date: 'Oct, 11, 2024',
            author: 'Admin',
            title: 'How US staffing help to find good candidates for organizations',
            description: 'Explore our comprehensive staffing solutions designed to connect organizations with top-tier talent.'
        }
    ];

    return (
        <div className="news-container">
            <div className="news-header">
                <span className="news-subtitle">LATEST NEWS & ARTICLE</span>
                <h2>You Get Every Single Update</h2>
            </div>

            <div className="news-grid" ref={newsRef}>
                {newsItems.map((item, index) => (
                    <div className="news-card" key={index}>
                        <div className="news-image-container">
                            <img src={item.image} alt={item.title} />
                            <div className="date-badge">
                                {item.date}
                            </div>
                        </div>

                        <div className="news-content">
                            <div className="news-meta">
                                <div className="meta-item">
                                    <User size={16} />
                                    <span>{item.author}</span>
                                </div>
                            </div>

                            <h3>{item.title}</h3>
                            <p>{item.description}</p>

                            <div className="news-footer">
                                <button className="read-more">
                                    Read More
                                </button>
                                <button className="expand-btn">
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
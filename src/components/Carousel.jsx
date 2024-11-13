import { useState, useEffect } from 'react';
import { shortList, list, longList } from '../data';
import { FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const Carousel = () => {
  const [people, setPeople] = useState(list);
  const [currentItem, setCurrentItem] = useState(0);

  const prevSlide = () => {
    setCurrentItem((currentItem - 1 + people.length) % people.length);
  };
  const nextSlide = () => {
    setCurrentItem((currentItem + 1) % people.length);
  };

  useEffect(() => {
    let id = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => {
      clearInterval(id);
    };
  }, [currentItem]);

  return (
    <section className='slider-container'>
      {people.map((item, index) => {
        const { id, image, name, title, quote } = item;
        return (
          <article
            className='slide'
            style={{
              transform: `translateX(${100 * (index - currentItem)}%)`,
              opacity: index === currentItem ? '1' : '0',
              visibility: index === currentItem ? 'visible' : 'hidden',
            }}
            key={id}
          >
            <img src={image} alt={name} className='person-img' />
            <h5 className='name'>{name}</h5>
            <p className='title'>{title}</p>
            <p className='text'>{quote}</p>
            <FaQuoteRight className='icon' />
          </article>
        );
      })}
      <button className='prev' onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <button className='next' onClick={nextSlide}>
        <FaChevronRight />
      </button>
    </section>
  );
};

export default Carousel;

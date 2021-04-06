import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../config/api';

const TemplateView = () => {
  const id = parseInt(useParams().id);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Queries.
  const getContent = async () => {
    try {
      const res = await API.get(`/content/${id}`);
      setContent(res.data.data.content);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  const renderLinks = () =>
    content.links.map((link) => (
      <a key={link.id} href={link.link}>
        <div style={{ height: 100, width: 100 }}>
          {link.img && (
            <img
              src={link.img}
              alt={link.img}
              style={{ maxHeight: '100%', maxWidth: '100%' }}
            />
          )}
        </div>
        <div>{link.title}</div>
      </a>
    ));
  return (
    <>
      {!loading && (
        <>
          <div style={{ height: 100, width: 100 }}>
            {content.img && (
              <img
                src={content.img}
                alt={content.img}
                style={{ maxHeight: '100%', maxWidth: '100%' }}
              />
            )}
          </div>
          <div>{content.title}</div>
          <div>{content.description}</div>
          <div>{renderLinks()}</div>
        </>
      )}
    </>
  );
};

export default TemplateView;

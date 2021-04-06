import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';

// Configs.
import { API } from '../../../config/api';

// Components.
import TemplateA from './Views/TemplateA';

const View = () => {
  // Vars.
  const { link } = useParams();

  // States.
  const [content, setContent] = useState(null);

  // Queries.
  const getContent = async () => {
    try {
      const res = await API.get(`/content/view/${link}`);
      setContent(res.data.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <>
      <Container>
        {content ? (
          <TemplateA
            title={content.title}
            description={content.description}
            img={content.img}
            links={content.links}
          />
        ) : null}
      </Container>
    </>
  );
};

export default View;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Configs.
import { API } from '../../config/api';

// Styles.
import styles from '../../styles/Pages/TemplatePage.module.scss';

const TemplatePage = () => {
  // State.
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);

  // Queries.
  const getAllTemplates = async () => {
    try {
      const res = await API.get('/templates');
      setTemplates(res.data.data.templates);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTemplates();
  }, []);

  // Renders.
  const renderTemplates = () =>
    templates.map(({ id, img, name }) => (
      <Link
        className={styles.template}
        key={id}
        to={`/dashboard/template/create/${id}`}
      >
        <img src={img} alt={img} />
      </Link>
    ));
  return (
    <div className={styles.container}>
      <div className={styles.row}>{!loading && renderTemplates()}</div>
    </div>
  );
};

export default TemplatePage;

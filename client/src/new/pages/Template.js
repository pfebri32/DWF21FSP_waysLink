import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Components.
import DashboardHeader from '../components/Headers/DashboardHeader';

// Configs.
import { API } from '../../config/api';

// Styles.
import styles from '../styles/Pages/Template.module.scss';

const Template = () => {
  // States.
  const [templates, setTemplates] = useState([]);

  // Queries.
  const getTemplates = async () => {
    try {
      const res = await API.get('/templates');
      setTemplates(res.data.data.templates);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTemplates();
  }, []);

  // Render.
  const renderTemplates = () =>
    templates.map(({ id, img }) => (
      <Link className={styles.template} to={`/dashboard/template/create/${id}`}>
        <img src={img} alt={img} />
      </Link>
    ));
  return (
    <>
      <DashboardHeader title="Template" />
      <div className="dashboard-container">
        <div className={styles.container}>
          {renderTemplates()}
          {/* DEMO */}
        </div>
      </div>
    </>
  );
};

export default Template;

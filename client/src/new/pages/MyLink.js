import React, { useState, useEffect } from 'react';

// Components.
import DashboardHeader from './../components/Headers/DashboardHeader';
import SearchBar from '../components/Forms/SearchBar';
import LinkList from '../components/List/LinkList';

// Configs.
import { API } from '../../config/api';

// Styles.
import styles from '../styles/Pages/MyLink.module.scss';

const MyLink = () => {
  // States.
  const [form, setForm] = useState({
    search: '',
  });
  const [contents, setContents] = useState([]);
  const [selectiveContents, setSelectiveContents] = useState([]);

  // Queries.
  const getContents = async () => {
    try {
      const res = await API.get('/contents');
      setContents(res.data.data.contents);
      setSelectiveContents(res.data.data.contents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContents();
  }, []);

  // Handlers.
  const handleDeleteContent = async (id) => {
    try {
      await API.delete(`/content/${id}`);
      getContents();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    const result = contents.filter((content) =>
      content.title.toLowerCase().startsWith(form.search.toLowerCase())
    );
    setSelectiveContents(result);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Render.
  const renderLinks = () =>
    selectiveContents.map(({ title, views, uniqueLink, id, img }) => (
      <LinkList
        key={id}
        id={id}
        title={title}
        views={views}
        link={uniqueLink}
        className={styles.link}
        img={img}
        onDelete={() => handleDeleteContent(id)}
      />
    ));
  return (
    <>
      <DashboardHeader title="My Links" />
      <div className="dashboard-container">
        <div className={styles.container}>
          <div className={styles.head}>
            <div className={styles.title}>
              All links
              {contents.length > 0 && <span>{contents.length}</span>}
            </div>
            <SearchBar
              className={styles.search}
              placeholder="Find your link."
              name="search"
              value={form.search}
              onChange={handleChange}
              onSearch={handleSearch}
            />
          </div>
          <div>{renderLinks()}</div>
        </div>
      </div>
    </>
  );
};

export default MyLink;

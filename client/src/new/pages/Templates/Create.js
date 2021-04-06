import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

// Configs.
import { API } from '../../../config/api';

// Components.
import DashboardHeader from '../../components/Headers/DashboardHeader';
import SimpleButton from '../../components/Buttons/SimpleButton';
import InputTextA from '../../components/Inputs/InputTextA';
import LinkForm from '../../components/Forms/LinkForm';

// Styles.
import styles from '../../styles/Pages/Templates/Create.module.scss';

const Create = () => {
  // Vars.
  const { id } = useParams();
  const history = useHistory();
  const defaultImage = '/assets/img/default.jpg';

  // States.
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState();

  // Form states.
  const [form, setForm] = useState({
    title: '',
    description: '',
    img: null,
    links: [],
  });

  // Queries.
  const getTemplate = async () => {
    try {
      const res = await API.get(`/template/${id}`);
      setTemplate(res.data.data.template);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTemplate();
  }, []);

  // Handlers.
  const handleAddLink = () => {
    setForm({
      ...form,
      links: [
        ...form.links,
        {
          title: '',
          link: '',
          img: null,
        },
      ],
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type !== 'file' ? e.target.value : e.target.files[0],
    });
  };

  const handleLinkChange = (e) => {
    const index = parseInt(e.target.dataset.index);
    const length = form.links.length;
    setForm({
      ...form,
      links: [
        ...form.links.slice(0, index),
        {
          ...form.links[index],
          [e.target.name]:
            e.target.type !== 'file' ? e.target.value : e.target.files[0],
        },
        ...form.links.slice(index + 1, length),
      ],
    });
  };

  const handleSubmit = async () => {
    try {
      const body = new FormData();
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      const links = form.links.map(({ title, link }) => {
        return { title, link };
      });

      for (let i = 0; i < form.links.length; i++) {
        body.append('imgLinks', form.links[i].img);
        if (form.links[i].img) body.append('imgIndex', i);
      }

      body.append('title', form.title);
      body.append('description', form.description);
      body.append('img', form.img);
      body.append('templateId', id);
      body.append('links', JSON.stringify(links));

      await API.post('/content', body, config);
      history.push('/dashboard/my-link');
    } catch (error) {
      console.log(error);
    }
  };

  // Renders.
  const renderLinkForms = () =>
    form.links.map((link, i) => (
      <LinkForm
        key={i}
        className={styles.linkForm}
        title={link.title}
        link={link.link}
        index={i}
        img={link.img}
        local
        onChange={handleLinkChange}
      />
    ));
  return (
    <>
      <DashboardHeader title="Template" />
      <div className={`dashboard-container ${styles.dashboardContainer}`}>
        {!loading ? (
          <>
            <div className={styles.head}>
              <div className={styles.header}>Create Link</div>
              <SimpleButton
                title="Publish Link"
                className={`${styles.publish} primary-button-color`}
                onClick={handleSubmit}
              />
            </div>
            <div className={styles.container}>
              <div className={styles.left}>
                <form>
                  <div className={styles.mainForm}>
                    <div className={styles.head}>
                      <label className={styles.image}>
                        <img
                          src={
                            form.img
                              ? URL.createObjectURL(form.img)
                              : defaultImage
                          }
                        />
                        <input
                          name="img"
                          type="file"
                          onChange={handleChange}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                    <div>
                      <InputTextA
                        label="Title"
                        placeholder="ex. Your Title"
                        name="title"
                        value={form.title}
                        type="text"
                        onChange={handleChange}
                      />
                      <InputTextA
                        label="Description"
                        placeholder="ex. Your Description"
                        name="description"
                        value={form.description}
                        type="text"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={styles.subform}>
                    {renderLinkForms()}
                    <SimpleButton
                      title="Add New Link"
                      className="primary-button-color"
                      onClick={handleAddLink}
                    />
                  </div>
                </form>
              </div>
              <div className={styles.right}>
                <div className={styles.preview}>
                  <img src={template.img} alt={template.img} />
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Create;

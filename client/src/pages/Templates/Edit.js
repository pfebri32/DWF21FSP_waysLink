import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

// Configs.
import { API } from '../../config/api';

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
  const [template, setTemplate] = useState(null);

  // Form states.
  const [form, setForm] = useState({
    isChange: false,
    isImageChange: false,
    title: '',
    description: '',
    img: null,
    links: [],
  });

  // Queries.
  const getContentAndTemplate = async () => {
    try {
      const res = await API.get(`/content/${id}`);
      const { data } = res.data;

      const links = data.content.links.map(({ title, link, img, id }) => {
        return {
          isChange: false,
          isImageChange: false,
          isNew: false,
          title,
          link,
          img,
          id,
        };
      });

      const template = await API.get(`/template/${data.content.templateId}`);

      setForm({
        ...form,
        title: data.content.title,
        description: data.content.description,
        img: data.content.img,
        links: links,
      });
      setTemplate(template.data.data.template);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getContentAndTemplate();
  }, []);

  // Handlers.
  const handleAddLink = () => {
    setForm({
      ...form,
      links: [
        ...form.links,
        {
          isChange: false,
          isNew: true,
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
      isChange: true,
      isImageChange:
        form.isImageChange === false ? e.target.type === 'file' : true,
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
          isChange: true,
          isImageChange:
            form.links[index].isImageChange === false
              ? e.target.type === 'file'
              : true,
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

      const links = form.links.map(
        ({ title, link, isChange, isImageChange, id }) => {
          return { title, link, isChange, isImageChange, id };
        }
      );

      for (let i = 0; i < form.links.length; i++) {
        if (form.links[i].isImageChange) {
          body.append('imgLinks', form.links[i].img);
          if (form.links[i].img) body.append('imgIndex', i);
        }
      }

      body.append('isChange', form.isChange);
      body.append('isImageChange', form.isImageChange);
      body.append('title', form.title);
      body.append('description', form.description);
      body.append('img', form.img);
      body.append('links', JSON.stringify(links));

      await API.patch(`/content/${id}`, body, config);
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
        isChange={link.isImageChange}
        onChange={handleLinkChange}
      />
    ));
  return (
    <>
      <DashboardHeader title="Template" />
      <div className="dashboard-container">
        {!loading ? (
          <>
            <div className={styles.head}>
              <div className={styles.header}>Edit Link</div>
              <SimpleButton
                title="Update Link"
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
                            form.isImageChange
                              ? URL.createObjectURL(form.img)
                              : form.img
                          }
                          alt="file"
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
                    {/* <SimpleButton
                      title="Add New Link"
                      className="primary-button-color"
                      onClick={handleAddLink}
                    /> */}
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

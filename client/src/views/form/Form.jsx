import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Form.module.css";
import validate from "./validator";
import { createNewDog } from "../../redux/actions";

export default function Form() {
  const temperaments = useSelector((state) => state.allTemperaments);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life: "", 
    temperaments: [],
  });

  const [errors, setErrors] = useState({});
  const [formTouched, setFormTouched] = useState(false);

  useEffect(() => {
    if (formTouched) {
      setErrors(validate(formData));
    }
  }, [formData, formTouched]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const validationErrors = validate({ ...formData, [name]: value });
    setErrors(validationErrors);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setFormTouched(true);
  };

  const handleTemperamentChange = (event) => {
    const selectedId = event.target.value;
    if (!formData.temperaments.includes(selectedId)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        temperaments: [...prevFormData.temperaments, selectedId],
      }));
    }
  };

  const handleDropdownToggle = () => {
    const dropdown = document.getElementById("temperamentsDropdown");
  };

  const handleTemperamentRemove = (id) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      temperaments: prevFormData.temperaments.filter(
        (temperamentId) => temperamentId !== id
      ),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let aux = Object.keys(errors);
    if (aux.length === 0) {
      setFormData({
        image: "",
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life: "", 
        temperaments: [],
      });
      const validationErrors = validate(formData);
      setErrors(validationErrors);

      const payload = {
        image: formData.image,
        name: formData.name,
        height: `${formData.heightMin} - ${formData.heightMax}`,
        weight: `${formData.weightMin} - ${formData.weightMax}`,
        life: formData.life, // Aquí cambiamos a `life`
        temperaments: formData.temperaments,
      };
      dispatch(createNewDog(payload));
      setFormTouched(false);
    } else {
      return alert(errors);
    }
  };

  const isSubmitDisabled = Object.keys(errors).length > 0 || !formTouched;

  return (
    <div>
      <div className={styles.bar}>
        <h1 className={styles.title}>Create a new breed dog</h1>
        <Link to={`/home`}>
          <button className={styles.back}>✖</button>
        </Link>
      </div>
      <div className={styles.new}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Image (url):{" "}
            <input
              type="text"
              key="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              onBlur={handleChange}
            />{" "}
          </label>
          <span>{errors?.image && errors.image}</span>
          <br />
          <label>
            Name:{" "}
            <input
              type="text"
              key="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />{" "}
          </label>
          <span>{errors?.name && errors.name}</span>
          <br />
          <label>
            Minimun height (cm):{" "}
            <input
              type="number"
              key="heightMin"
              name="heightMin"
              onChange={handleChange}
              value={formData.heightMin}
            />{" "}
          </label>
          <span>{errors?.heightMin && errors.heightMin}</span>
          <br />
          <label>
            Maximun height (cm):{" "}
            <input
              type="number"
              key="heightMax"
              name="heightMax"
              onChange={handleChange}
              value={formData.heightMax}
            />{" "}
          </label>
          <span>{errors?.heightMax && errors.heightMax}</span>
          <br />
          <label>
            Mininum weight (kg):{" "}
            <input
              type="number"
              key="weightMin"
              name="weightMin"
              onChange={handleChange}
              value={formData.weightMin}
            />
          </label>
          <span>{errors?.weightMin && errors.weightMin}</span>
          <br />
          <label>
            Maximun weight (kg):{" "}
            <input
              type="number"
              key="weightMax"
              name="weightMax"
              onChange={handleChange}
              value={formData.weightMax}
            />
          </label>
          <span>{errors?.weightMax && errors.weightMax}</span>
          <br />
          <label>
            Life (years):{" "}
            <input
              type="text"
              key="life"
              name="life"
              onChange={handleChange}
              value={formData.life}
            />
          </label>
          <span>{errors?.life && errors.life}</span>
          <br />
          <label>
            Temperaments:
            <div onClick={handleDropdownToggle}>
              <select
                id="temperamentsDropdown"
                multiple
                value={formData.temperaments}
                onChange={handleTemperamentChange}
              >
                {temperaments.map((temperament) => (
                  <option key={temperament.id} value={temperament.id}>
                    {temperament.name}
                  </option>
                ))}
              </select>
              <div className={styles["selected-values"]}>
                {formData.temperaments.map((selectedId) => {
                  const selectedTemperament = temperaments.find(
                    (temperament) => temperament.id === selectedId
                  );
                  return (
                    <div
                      key={selectedId}
                      className={styles["selected-temperament"]}
                    >
                      {selectedTemperament.name}{" "}
                      <button
                        type="button"
                        onClick={() => handleTemperamentRemove(selectedId)}
                      >
                        ✖
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <span>{errors?.temperaments && errors.temperaments}</span>
          </label>
          <br />
          {!isSubmitDisabled ? (
            <button type="submit">Send</button>
          ) : (
            <span>Form is empty or contains errors</span>
          )}
        </form>
      </div>
    </div>
  );
}

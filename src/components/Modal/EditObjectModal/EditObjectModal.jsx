import React from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useStore } from "../../../store/store";
import axios from "../../../axios";

import styles from "./editObjectModal.module.scss";

const EditObjectModal = (props) => {
  const {
    handleClose,
    subObject,
    name: questionName,
    type: questionType,
  } = props;
  const { data: state, setFormState } = useStore();
  const [name, setName] = React.useState(questionName);
  const [type, setType] = React.useState(questionType);
  const [list, setList] = React.useState([questionType]);

  const getData = async () => {
    const res = await axios.get("interactive-object-types");
    const data = res.data;
    console.log("data= ", data);
    const types = data.map((item) => item.typeName);
    setList(types);
  };

  React.useEffect(() => {
    if (!subObject) {
      getData();
    }
  }, []);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("state= ", state);
    const selectedTypeObject = state?.types.find(
      (item) => item.typeName === type
    );
    console.log("selectedTypeObject= ", selectedTypeObject);
    setFormState({
      ...state,
      questionName: name,
      type,
      // types: selectedTypeObject,
      labels: selectedTypeObject?.labels,
    });
    console.log(state);
    handleClose();
  };

  return (
    <div className={styles["modal-content"]}>
      <div className={styles.header}>
        <p>Edit Object</p>
        <IconButton aria-label="close" onClick={handleClose}>
          <ClearIcon />
        </IconButton>
      </div>

      <form className={styles.actions} onSubmit={onSubmit}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={handleChangeName}
        />

        {!subObject && (
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={handleChange}
              >
                {list?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        <div className={styles.submit}>
          <Button variant="contained" type="submit">
            submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditObjectModal;

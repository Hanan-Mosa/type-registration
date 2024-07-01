import React from "react";
import Input from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useStore } from "../../store/store";
import { useLocation, useParams, useNavigate } from "react-router-dom";
const EditType = () => {

  const location = useLocation();
  const [values, setValues] = React.useState({
    typeName: "",
    questionOrExplanation: "",
    labels: "",
    templateName: "",
    templateId: "",
    htmlSeparator: "",
    repeatedString: "",
    repeated2: "",
    repeated3: "",
    abstractParameter: "",
    originedJson: "",
    modifiedJson: "",
    exampleId: "",
  });
  const [valid, setValid] = React.useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: async () => getData(),
  });
  const { setFormState } = useStore();
  const params = useParams();
  const { id } = params;
  const getData = async () => {
    const res = await axios.get(`/io-types/${id}`);
    console.log(res.data);
    return {
      typeName: res.data.typeName,
      description:res.data.description,
       icon:res.data.icon,
      category: res.data.category,
      labels:JSON.stringify(res.data.labels),
      abstractParameter: JSON.stringify(res.data.abstractParameter),
      repeatedString: res.data.repeatedString,
      repeated2: res.data.repeated2,
      repeated3: res.data.repeated3,
      htmlSeparator: res.data.htmlSeparator,
      templateName: res.data.templateName,
      templateId: res.data.templateId,
      originedJson: res.data.originalJson,
      modifiedJson: res.data.modifiedJson,
      exampleId: res.data.exampleId,
    };
  };
  React.useEffect(() => {
    getData();
  }, []);

 
  // const checkValidity = () => {
  //   if (Boolean(values.name)) {
  //     setValid(true);
  //   } else {
  //     setValid(false);
  //   }
  //   console.log("valid= ", valid);
  // };
  // const onChangeValues = (name, value) => {
  //   setValues((prevState) => ({ ...prevState, [name]: value }));
  //   console.log("hello");
  //   checkValidity();
  // };
  const onSubmit = async (values) => {
    console.log("values= ", values);
    setFormState(values);
    const { id } = params;
    console.log("onSubmit");
    try {
      const res = await axios.patch(`/io-types/${id}`, {
        ...values,
        //  abstractParameter: JSON.parse(values.abstractParameter),
      });
      const data = res.data;
      toast.success("Type updated successfully!");
      console.log("data= ", data);
      navigate("/types")

    } catch (error) {
      console.log(error);
      window.alert(error)
     
    }
  };
  const [file, setFile] = React.useState();
  function handleChange(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }
  console.log("watch= ", watch());
  return (
    <div className="container">
      <h1 className="text-center mb-4">Edit Type</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Input
          label="typeName"
          name="typeName"
          type="text"
          register={register}
          errors={errors}
        />
         <Input
         
         label="description"
         name="description"
         type="text"
         register={register}
         errors={errors}
       />
       <h2>Add Icon:</h2>
            <input type="file" onChange={handleChange} register={register} errors={errors} />
            <img src={file} />
        <Input
          label="questionOrExplanation"
          name="category"
          type="text"
          register={register}
          errors={errors}
        />
        <Input
          label="labels"
          name="labels"
          type="text"
          register={register}
          errors={errors}
        />
        
        <Input
          label="abstractParameter"
          name="abstractParameter"
          type="text"
          register={register}
          errors={errors}
        />
         <Input
          label="repeatedString"
          name="repeatedString"
          type="text"
          register={register}
          errors={errors}
        />
         <Input
          label="repeated2"
          name="repeated2"
          type="text"
          register={register}
          errors={errors}
        />
         <Input
          label="repeated3"
          name="repeated3"
          type="text"
          register={register}
          errors={errors}
        />
         <Input
        label="htmlSeparator"
        name="htmlSeparator"
        type="text"
        register={register}
        errors={errors}
      />
         <Input
          label="templateName"
          name="templateName"
          type="text"
          register={register}
          errors={errors}
        /> 
        <Input
          label="templateId"
          name="templateId"
          type="text"
          register={register}
          errors={errors}
        />
      
        <Input
        label="originedJson"
        name="originedJson"
        type="text"
        register={register}
        errors={errors}
      />
      <Input
        label="modifiedJson"
        name="modifiedJson"
        type="text"
        register={register}
        errors={errors}
      />
<Input
        label="exampleId"
        name="exampleId"
        type="text"
        register={register}
        errors={errors}
      />
        <div className="mb-4 text-center">
          <Button variant="contained" type="submit">
            submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditType;

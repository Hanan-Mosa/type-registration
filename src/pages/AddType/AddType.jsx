import React from "react";
import Input from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

const AddType = () => {
  const location = useLocation();
  const params = useParams();

  const fetchData = async () => {
    if (location.pathname === "/add-type") {
      return {
        typeName: "",
        questionOrExplanation: "",
        labels: "",
        templateName:"",
        templateId: "",
        htmlSeparator:"",
        repeatedString:"",
        repeated2:"",
        repeated3:"", 
        abstractParameter: "",
        originedJson:"",
        modifiedJson:"",
        exampleId:"",

      };
    } else {
      const { id } = params;
      const res = await axios.get(`/io-types/${id}`);
      console.log("res= ", res);
      return {
        typeName: "",
        description:"",
        icon:"",
        questionOrExplanation: "",
        labels: "",
        abstractParameter: "",
        repeatedString:"",
        repeated2:"",
        repeated3:"",
        htmlSeparator:"", 
        templateName:"",
        templateId: "",
        originalJson:"",
        modifiedJson:"",
        exampleId:"",
      };
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: async () => await fetchData(),
  });
  
  const onSubmit = async (values) => {
    console.log("onSubmit");
    try {
      const res = await axios.post(`/io-types`, {
        ...values,
         abstractParameter: JSON.parse(values.abstractParameter),
      });
      const data = res.data;
      toast.success("Type added successfully!");
      console.log("data= ", data);
    } catch (error) {
      console.log(error);
      toast.error( `${error}`);
    }
  };
  
  const [file, setFile] = React.useState();
  function handleChange(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div className="container">
      <h1 className="text-center mb-4">type registration</h1>
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
         name="descrption"
         type="text"
         register={register}
         errors={errors}
       />
       <h2>Add Icon:</h2>
            <input type="file" onChange={handleChange} />
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
        label="originalJson"
        name="originalJson"
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

export default AddType;

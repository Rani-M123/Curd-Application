import * as React from "react";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {  NewSTUDENTFORMELEMENTS } from "./helper";
import './form.scss';
import { useParams } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import DynamicFieldLoad from "../SharedComponents/DynamicFieldLoad";


const StudentForm = () => {

    interface IStudentForm {
        name?: string;
        dateofbirth: number;
        rollnumber: number;
        english: string;
        telugu: string;
        hindi: string;
        science: string;
        social: string;
    }

    // schema declaration validation
    const StudentSchema= yup.object().shape({
        name: yup.string().required().min(4).max(10),
        rollnumber: yup.number(),
        english: yup.number(),
        telugu: yup.number(),
        hindi: yup.number(),
        science: yup.number(),
        social: yup.number(),
        activities: yup.number(),
        toatalmarks: yup.number().max(100),

        
    });

    const StudentFormMethods = useForm<any>({
        mode: "all",
        resolver: async (data, context, options) => {
            return yupResolver(StudentSchema)(data, context, options);
        },
    });

    const id = useParams();

     const [submitData, setSubmitedData] = React.useState();

    const navigation = useNavigate();
    const StudentFormSubmit: SubmitHandler<any> = async (
        data: any,
    ) => {
        setSubmitedData(data); 
        console.log(id);
        
        if (id) {
            editForm(data);
        } else {
            createForm(data);
        }
        // createForm(data)
        StudentFormMethods.reset({});
        navigation('/view')
    };

    
    const getAdditionalProps = (item: any) => {
        item.control = StudentFormMethods.control;
        item.setValue =  StudentFormMethods.setValue;
        item.setValue =  StudentFormMethods.setValue;
        return item;
    };


    const [data, setData] = React.useState<any>();
    const getStudenData = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/data/${id.id}`);
            setData(result.data);
    
        } catch (error) {
            console.log(error)
        }
    }

    const editForm = async (updatedData: any) => {
        try {
            console.log(id);
            
            const result = await axios.put(`http://localhost:5000/data/${id.id}`, updatedData);
            setData(result.data);
        } catch (error) {
            console.log(error)
        }
    }

    const createForm = async (updatedData: any) => {
        const generateNumber: any = Math.random();
        const newData = { ...updatedData, 'id': generateNumber }
        try {
            const result = await axios.post(`http://localhost:5000/data`, newData);
            setData(result.data);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getStudenData();
    }, [id]);

    useEffect(() => {
        data &&
            Object.entries(data).forEach(([key, value]: any) => {
                StudentFormMethods.setValue(key, value, { shouldValidate: true });
            });
    }, [data]);

    console.log(StudentFormMethods.watch(), StudentFormMethods.formState.errors)

    return (
        <div className="form">
            <div className="form_header">
                <h1>Student Form</h1>
            </div>
            <FormProvider {...StudentFormMethods}>
                <form onSubmit={StudentFormMethods.handleSubmit(StudentFormSubmit)}>
                    <div className="form_container">

                        {NewSTUDENTFORMELEMENTS?.map((item: any) => {
                            const updatedItem = getAdditionalProps(item);
                            return DynamicFieldLoad(item.type, updatedItem);
                        })}

                    </div>
                    <div className="form_footer">
                        <button onClick={StudentFormMethods.handleSubmit(StudentFormSubmit)}

                        >Submit</button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default StudentForm;

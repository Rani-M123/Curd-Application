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
import { PrimaryButton } from "@fluentui/react";


const StudentForm = () => {

    interface StudenData {
        name?: string;
        rollnumber?: number;
        english?: number;
        telugu?: number;
        hindi?: number;
        science?: number;
        social?: number;
        activities?: number;
        totalmarks?: number; 
    }

    // schema declaration validation
    const StudentSchema: yup.SchemaOf<StudenData>= yup.object().shape(
        {
        name: yup.string().min(4).max(10),
        rollnumber: yup.number().max(100),
        english: yup.number().max(100),
        telugu: yup.number().max(100),
        hindi: yup.number().max(100),
        science: yup.number().max(100),
        social: yup.number().max(100),
        activities: yup.number().max(100),
        totalmarks: yup.number().max(100),

        
    });

    const StudentFormMethods = useForm<any>({
        mode: "all",
        resolver: async (data, context, options) => {
            return yupResolver(StudentSchema)(data, context, options);
        },
    });

    const [submitData, setSubmitedData] = React.useState();

    const navigation = useNavigate();
    
    const id = useParams();
const StudentFormSubmit: SubmitHandler<any> = async (
        data: any,
    ) => {
        setSubmitedData(data); 
        console.log(id);
        
        if (id.id) {
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

    const editForm = async (updatedData:any) => {
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
        console.log(newData);
        
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
        <>
        <div className="Header_one">
            <img src="https://zelarsoft.com/wp-content/uploads/2021/10/logo.png"/>
            </div>
        <div className="form">
            <div className="form_header">
        
                <h1>STUDENT FORM</h1>
            </div>
            <div>
                <hr/>
            </div>
            <FormProvider {...StudentFormMethods}>
                <form onSubmit={StudentFormMethods.handleSubmit(StudentFormSubmit)}>
                    <div className="form_container">

                        {NewSTUDENTFORMELEMENTS?.map((rows: any) => {

                             return (
                                <div className={`rowThree ${rows.className}`}>
                                    {rows.controls?.map((item: any) => {
                                        const updatedItem = getAdditionalProps(item);
                                        return DynamicFieldLoad(item.type, updatedItem);
                                    })}
                                </div>
                            );
                        })}

                    </div>
                    <div className="form_footer">
                        <PrimaryButton onClick={StudentFormMethods.handleSubmit(StudentFormSubmit)}>Submit</PrimaryButton>
                    </div>
                </form>
            </FormProvider> 
        </div>
        </>
    );
};

export default StudentForm;

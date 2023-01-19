import  React, {useEffect, useState} from 'react'
import axios from 'axios';
import { DetailsList, DetailsListLayoutMode, IColumn , PrimaryButton} from '@fluentui/react';
import { Link } from 'react-router-dom';
import {MdEdit} from 'react-icons/md'
import {MdVisibility} from 'react-icons/md'
import {MdDelete} from 'react-icons/md';
import './View.scss'
import { useNavigate } from 'react-router-dom';



const View = () => {

    const [data, setData] = useState<any>();
  const navigation = useNavigate()
    const getData = async () => {
        try {
            const url = 'http://localhost:5000/data'
            const result: any = await axios.get(url);
            setData(result.data)
        } catch (err) {
            console.log(err);
        }
    };
    const deleteRequest = async (id:any) => {
        try {
            const url = `http://localhost:5000/data/${id}`;
            const result: any = await axios.delete(url);
            console.log(result);
            getData();
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    const columns: IColumn[] = [
        {
            key: 'column1',
            name: 'Name',
            fieldName: 'Name',
            minWidth: 60,
            maxWidth: 90,
            isResizable: true
        },
        {
            key: 'column2',
            name: 'RollNumber',
            fieldName: 'RollNumber',
            minWidth: 60,
            maxWidth: 80,
            isResizable: true

        },
        {
            key: 'column3',
            name: 'English',
            fieldName: 'English',
            minWidth: 60,
            maxWidth: 80,
            isResizable: true

        },
        {
            key: 'column4',
            name: 'Telugu',
            fieldName: 'Telugu',
            minWidth: 60,
            maxWidth: 80,
            isResizable: true

        },
        {
            key: 'column5',
            name: 'Hindi',
            fieldName: 'Hindi',
            minWidth: 60,
            maxWidth: 80,
            isResizable: true

        },
        {
            key: 'column6',
            name: 'Science',
            fieldName: 'Science',
            minWidth: 60,
            maxWidth: 80,
            isResizable: true

        },
        {
            key: 'column7',
            name: 'Social',
            fieldName: 'Social',
            minWidth: 60,
            maxWidth: 80,
            isResizable: true

        },
        {
            key: 'column8',
            name: 'Activities',
            fieldName: 'Activites',
            minWidth: 60,
            maxWidth: 80,
            isResizable: true
        },
        {
            key: 'column9',
            name: 'TotalMarks',
            fieldName: 'TotalMarks',
            minWidth: 60,
            maxWidth: 80,
            isResizable: true,
        },
        {
            key: 'column10',
            name: ' ',
            fieldName: 'id',
            minWidth: 60,
            maxWidth: 80,
            isResizable: true,
            onRender: (item: any) => (
                item.id &&
                <>
    
                    <Link className='btn' to={`/view/${item.id}`}><MdVisibility size={20} color={"black"}/></Link>
                    <Link className='btn' to={`/update/${item.id}`}><MdEdit size={20} color={"black"}/></Link>
                    <Link className='btn' onClick={() => deleteRequest(item.id)} to=''><MdDelete size={20}color={"black"}/></Link>
                </>
            )
        },
    ];   

    return (
        <div className="Header">
            <div className="Header_one">
                <img src = "https://zelarsoft.com/wp-content/uploads/2021/10/logo.png" />
                    <div>      
                    <Link className='btn' to="view">View</Link>
                    <Link className='btn' to="create">Create</Link>
                    </div>
                </div>
         <div className="Header_add">
         <PrimaryButton type="submit" className='addbtn' onClick={()=>navigation('/create')} text='Add' />          
         </div>
         <div className="Header_table">
             
            {
            data &&
                <DetailsList
                    items={data}
                    columns={columns}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                />}
        </div>
        </div>
    )
}

export default View;

       
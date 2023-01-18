import  React, {useEffect, useState} from 'react'
import axios from 'axios';
import { DetailsList, DetailsListLayoutMode, IColumn } from '@fluentui/react';
import { Link } from 'react-router-dom';



const View = () => {

    const [data, setData] = useState<any>();

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
            fieldName: 'name',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true
        },
        {
            key: 'column2',
            name: 'Rollnumber',
            fieldName: 'rollnumber',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true

        },
        {
            key: 'column3',
            name: 'English',
            fieldName: 'english',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true

        },
        {
            key: 'column4',
            name: 'Telugu',
            fieldName: 'telugu',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true

        },
        {
            key: 'column5',
            name: 'Hindi',
            fieldName: 'hindi',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true

        },
        {
            key: 'column6',
            name: 'Science',
            fieldName: 'science',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true

        },
        {
            key: 'column7',
            name: 'Social',
            fieldName: 'social',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true

        },
        {
            key: 'column8',
            name: 'activities',
            fieldName: 'activies',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true
        },
        {
            key: 'column9',
            name: 'Toatalmarks',
            fieldName: 'totalmarks',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true,
            onRender: (item: any) => (
                item.id &&
                <>
    

        
           
            
                    <Link className='btn' to={`/view/${item.id}`}>View</Link>
                    <Link className='btn' to={`/update/${item.id}`}>Edit</Link>
                    <Link className='btn' onClick={() => deleteRequest(item.id)} to=''>Delete</Link>
                </>
            )
        },
    ];   

    return (
        <div>
             <h1>View </h1>
            {data &&
                <DetailsList
                    items={data}
                    columns={columns}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                />}
        </div>
    )
}

export default View

       
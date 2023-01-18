import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ViewIteam = () => {

    
const [data, setData] = useState<any>();

const id = useParams();
const getData = async (item: any) => {
try {
    const url = `http://localhost:5000/data/${item.id}`
    const result: any = await axios.get(url);
    debugger
    setData(result.data)
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
    getData(id);
  }, [id])


  return (
    <div className='maincount'>
        {data &&
        <>
        
    <div className='container'>

    <div className="field">
      <div className="title"><h1>Name</h1></div>
    
    <p>{data.name}</p>
    </div>
    <div className='field'>
      <div className="title"><h1>Roll Number</h1></div>
    
    <p>{data?.rollnumber}</p>
    </div>
    <div className='field'>
      <div className="title"><h1>DateofBirth</h1></div>
    
    <p>{data.dateofbirth}</p>
    </div>
    <div className="field">
      <div className="title"><h1>English</h1></div>
    
    <p>{data.english}</p>
    </div>
    <div className='field'>
      <div className="title"><h1>Hindi</h1></div>
    
    <p>{data.hindi}</p>
    </div>
    <div className='field'>
      <div className="title"><h1>Science</h1></div>
    
    <p>{data.science}</p>
    </div>
    <div className='field'>
      <div className="title"><h1>Social</h1></div>
    
    <p>{data.social}</p>
    </div>
    <div className='field'>
    <div className='title'><h1>activities</h1></div>

    <p>{data.activities}</p>
     </div>
     <div className='field'>
        <div className='title'><h1>Toatal Marks</h1></div>

        <p>{data.totalmarks}</p>
     </div>
     </div>
  </>
}
</div>
  )
}
export default ViewIteam;


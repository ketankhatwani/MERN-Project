import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Sidebar from '../components/Sidebar';


const Pendingcomp = () => {


    const [finalValue, setFinalValue] = useState([]);

    const updateStatus = (id) => {
        const newStatus = 'inprogress';
        Axios.put("/updatecompsts", {
            newStatus: newStatus,
            id: id
        }).then(() => {
            setFinalValue(finalValue.map((val) => {
                return val._id === id
                    ? { _id: id, comptype: val.comptype, resno: val.resno, eqtype: val.eqtype, abeq: val.abeq, status: newStatus }
                    : val;
            }));
        });
    };

    useEffect(() => {
        Axios.get("/readcomp", {
        }).then((response) => {
            setFinalValue(response.data)
        })
            .catch(() => {
                console.log("error");
            });
    }, []);





    return (
        <>
        <Sidebar />
        <div className='updateinfocontainer'>
            {finalValue.map((val) => {
                return (
                    <div className='mancomp'>
                        <div className='updateinfosubcontainer'>
                            <h3>{val.comptype}{"  "}</h3>
                            <h3>{val.resno}{"  "}</h3>
                            <h3>{val.eqtype}{"  "}</h3>
                            <h3>{val.abeq}{"  "}</h3>
                            <h3>{val.status}</h3>
                        </div>
                        
                        <div>
                            <button onClick={() => { updateStatus(val._id); }}>solve it</button>
                        </div>
                        
                    </div>
                );
            })}
        </div>
        </>
    );
};

export default Pendingcomp;


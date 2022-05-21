import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URI } from "../config/constants";
import NoImage from "../Assets/Image/no-image-icon.png";
require('./friendListStyle.css')

const DisplayPatients = (props) => {
    document.title = "Clinic - DisplayPatient"

    const [patient, setPatient] = useState([]);
    useEffect(() => {
        axios
            .get(`${BACKEND_URI}/patients`)
            .then((resp) => {
                const allData = resp.data.PatientsData;
                setPatient(allData);
            })
            .catch((err) => {
                console.log("~ err", err);
            });
    }, []);

    const patientDeleteHandler = (id) => {
        axios
            .delete(`${BACKEND_URI}/patient/${id}`)
            .then((resp) => {
                const filteredData = patient.filter((ele) => ele._id !== id);
                setPatient(filteredData);
            })
            .catch((err) => {
                console.log("~ err", err);
            });
    };

    return (
        <>
            <div className="mx-5 my-5" style={{ color: props.theme === "dark" ? "white" : "black" }}>
                <h2 className="mx-5 my-5">Your Friends</h2>
                <div className='m-5 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5'>
                    {patient.filter(ele => props.search ? (
                        ele.name?.toLowerCase()?.includes(props.search?.toLowerCase()) ||
                        ele.age?.toString()?.includes(props.search?.toLowerCase()) ||
                        ele.email?.toLowerCase()?.includes(props.search?.toLowerCase())
                    ) : true)
                        .map((ele, index) => {
                            return (
                                <div key={index} className='col mb-4'>
                                    <div className='card'>
                                        <img
                                            height='150'
                                            src="../Assets/Image/finderLogo.svg"
                                            onError={(e) => {
                                                e.target.src = NoImage
                                            }}
                                            className='content-img card-img-top'
                                            alt='content from Pixabay.'
                                        />
                                        <div className='card-body '>
                                            <h5 className='card-title text-truncate'>
                                                {ele.name}
                                            </h5>
                                            <p className='card-text'>by {ele.Email}</p>
                                            <div>
                                                <button class="w-100 btn btn-primary pull-right"> <i className="mx-3 fa-solid fa-user-plus"></i>Unfollow</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default DisplayPatients;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URI } from "../config/constants";
import NoImage from "../Assets/Image/no-image-icon.png";
require('./friendListStyle.css')

const AddPatient = (props) => {
    document.title = "Clinic - AddPatient"
    let { id } = useParams();
    const navigate = useNavigate();

    const [patient, setPatient] = useState([]);

    const onInputChange = async (e) => {
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };
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


    const getUserData = async (e) => {
        axios
            .get(`${BACKEND_URI}/patient/${id}`)
            .then((resp) => {
                const allData = resp.data.PatientData;
                setPatient(allData);
            })
            .catch((err) => {
                props.showAlert("unable to fetch data", "danger")
            });
    }
    useEffect(() => {
        if (id) {
            getUserData()
            // eslint-disable-next-line
        }
    }, [])

    const { name, age, email, password } = patient;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            // Update Patient
            axios
                .put(`${BACKEND_URI}/patient/${id}`, patient)
                .then(() => {
                    navigate("/displayPatients");
                    props.showAlert("Patient detail Updated", "success")
                })
                .catch((error) => {
                    props.showAlert("can not update Patient", "danger")
                });
        }
        // Add Patient
        axios
            .post(`${BACKEND_URI}/register`, patient)
            .then(() => {
                props.showAlert("Patient details Inserted", "success")
                navigate("/displayPatients");
            })
            .catch((error) => {
                props.showAlert("Patient is not registered", "danger")
            });
    };
    const handleReset = (e) => {
        setPatient([])
    }
    return (
        <div className="mx-5 my-5" style={{ color: props.theme === "dark" ? "white" : "black" }}>
            <h2 className="mx-5 my-5">People you may know</h2>
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
                                            <button class="w-100 btn btn-primary pull-right"> <i className="mx-3 fa-solid fa-user-plus"></i>Add Friend</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
export default AddPatient;

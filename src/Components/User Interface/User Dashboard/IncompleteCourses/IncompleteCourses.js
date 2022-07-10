import React from 'react';
import  {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import UserNavbar from '../User Navbar/UserNavbar';
import Courses from '../../../Common Interface/Courses/Courses';
import './IncompleteCourses.css';


function IncompleteCourses() {
    let data = [{courseid:"1", courselink:"/Adobe-Illustrator", imgpath: "./userDashboard-extras/bg1.jpg", coursetitle: "Adobe Illustrator", coursedesc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut."},
    {courseid:"2",courselink:"/C++", imgpath: "./userDashboard-extras/bg2.jpg", coursetitle: "Adobe Illustrator", coursedesc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut."}];

    const {state} = useLocation()
    console.log(state.userid)
    const userid = state.userid
    console.log("Incomplete Page Check User ID")
    console.log(userid)
    const [coursesArray, setCoursesArray] = useState([]);
    const [incompCoursesArray, setIncompCoursesArray] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
        };
        console.log(userid)

        fetch('http://localhost:3001/getEnrolledCoursesByLearnerId?id=' + userid, requestOptions)
            .then(response => response.text())
            .then(result => {
                const data = JSON.parse(result);
                setCoursesArray(data)
            })
            .catch(error => console.log('Error: ', error));

        console.log("courses array")
        console.log(coursesArray)
    }, []);

    useEffect(() => {
        let temparr = []
        coursesArray.forEach(function (arrayItem) {
            const requestOptions = {
                method: 'POST',
            };
            const course_id = arrayItem.course_id;

            fetch('http://localhost:3001/getCourseById?id=' + course_id, requestOptions)
                .then(response => response.text())
                .then(result => {
                    const data = JSON.parse(result);
                    let array = temparr
                    array.push(result)
                    temparr = array
                })
                .catch(error => console.log('Error: ', error));
        });

        setIncompCoursesArray(temparr)
    }, [coursesArray]);

    console.log(incompCoursesArray)
    if (incompCoursesArray.length > 0) {
        console.log("line 62")
        console.log(incompCoursesArray[0])
        console.log(incompCoursesArray.name)
    }

  return (
    <>
      <UserNavbar/>
        <div className='in-course-section'>
            <h1 className='in-course-heading'>Your Incomplete Courses</h1>
                <div className='in-course-wrapper'>
                    <div className='in-course-container'>
                        
                        {incompCoursesArray.map((data1, id)=> {
                            return <div key={id} className='in-course-container-card'>
                            <Courses className='course-container-card'
                            courseid = {data1._id}
                            courselink = '/CourseDesc'
                            img = {data1.imgpath}
                            coursetitle = {data1.name}
                            coursedesc = {data1.overview}
                            progress = {data1.progress}
                            status = "false"
                            />
                                <h1>{data1.name}</h1>
                            </div>
                        })}
                    </div>
                </div>
        </div>
    </>
  );
}

export default IncompleteCourses;

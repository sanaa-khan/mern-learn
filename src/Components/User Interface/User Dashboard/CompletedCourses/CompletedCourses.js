import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Courses from '../../../Common Interface/Courses/Courses';
import UserNavbar from '../User Navbar/UserNavbar';
import './CompletedCourses.css';


function CompletedCourses() {
    let data = [{courseid:"1", courselink:"/Adobe-Illustrator", imgpath: "./userDashboard-extras/bg1.jpg", coursetitle: "Adobe Illustrator", coursedesc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut."},
    {courseid:"2",courselink:"/C++", imgpath: "./userDashboard-extras/bg2.jpg", coursetitle: "Adobe Illustrator", coursedesc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut."}];

    const {state} = useLocation()
    console.log(state.userid)
    const userid = state.userid
    console.log("Incomplete Page Check")
    console.log(userid)

    const [coursesArray, setCoursesArray] = useState([]);
    const [compCoursesArray, setCompCoursesArray] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
        };
        console.log(userid)

        fetch('http://localhost:3001/getCompletedCoursesByLearnerId?id=' + userid, requestOptions)
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

        setCompCoursesArray(temparr)
    }, [coursesArray]);

  return (
    <>
      <UserNavbar/>
        <div className='c-course-section'>
            <h1 className='c-course-heading'>Your Completed Courses</h1>
                <div className='c-course-wrapper'>
                    <div className='c-course-container'>
                        
                        {data.map((data1, id)=> {
                            return <div key={id} className='c-course-container-card'>
                            <Courses 
                            courseid = {data1.courseid}
                            courselink = {data1.courselink}
                            img = {data1.imgpath}
                            coursetitle = {data1.coursetitle}
                            coursedesc = {data1.coursedesc}
                            status = "false"
                            />
                            </div>
                        })}
                    </div>
                </div>
        </div>
    </>
  );
}

export default CompletedCourses;

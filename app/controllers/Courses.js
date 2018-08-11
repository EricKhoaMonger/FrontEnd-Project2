import $ from 'jquery';
window.jQuery = $;
import {CourseList} from './../models/CourseList'
import {CourseService} from './../services/CourseService'
$(document).ready(function () {
    var courseService = new CourseService();
    var courseList = new CourseList();

    var ajaxAllCourses = courseService.AjaxAllCourses();
    ajaxAllCourses
        .done(res => {
            courseList.CourseArr = res;
            var content = '';
            for (const course of courseList.CourseArr) {
                content += `
                    <div class="col-md-4 mb-4 animated fadeInUp wow">
                        <div class="card">
                            <img src="${course.HinhAnh}" class="card-img-top" height="200px" width="100%"/>
                            <div class="card-body border-top">                            
                                <h4 class="card-title">${course.TenKhoaHoc}</h4>
                                <p class="card-text">Creator: ${course.NguoiTao}</p>
                                <p class="card-text">Views: ${course.LuotXem}</p>
                                <button class="btn btn-dark">See Course Detail</button>
                            </div>
                        </div>
                    </div>
                `;
            }
            $('.mainCourse-container').html(content)
        })
        .fail(err => console.log(err));
});
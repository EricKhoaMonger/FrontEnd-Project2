import $ from 'jquery';
window.jQuery = $;
import { CourseService } from "./../services/CourseService";

$(document).ready(function () {
    var courseService = new CourseService();
    var allCourses = [];
    var userCourses = [];
    var showingCourses = [];

    var localUser = JSON.parse(localStorage.getItem("CurrentUser"));

    function ShowUserCourses() {
        courseService.AjaxAllCourses()
            .done(res => { //get all courses
                var content = '';
                allCourses = res;

                courseService.AjaxUserCourses(localUser.TaiKhoan)
                    .done(res1 => { // get user courses
                        userCourses = res1;
                        for (let i = 0; i < allCourses.length; i++) {
                            for (let k = 0; k < userCourses.length; k++) {
                                if (userCourses[k].MaKhoaHoc === allCourses[i].MaKhoaHoc) {
                                    showingCourses.push(allCourses[i])
                                }
                            }

                        }
                        for (const showingCourse of showingCourses) {
                            content += `
                                <div class="col-md-3">
                                    <div class="card">
                                        <img src="${showingCourse.HinhAnh}" class="card-img-top" height="200px" width="100%">
                                        <div class="card-body border-top">                                
                                            <p class="card-text"><b>Course Name:</b> ${showingCourse.TenKhoaHoc}</p>
                                            <p class="card-text"><b>Course ID:</b> ${showingCourse.MaKhoaHoc}</p>
                                            <p class="card-text"><b>Creator:</b> ${showingCourse.NguoiTao}</p>
                                            <p class="card-text"><b>Views:</b> ${showingCourse.LuotXem}</p>
                                            <button class="btn btn-dark" id="showDetail" data-name="${showingCourse.TenKhoaHoc}" data-detail="${showingCourse.MoTa}">See Detail</button>                                            
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                        $('#userRegisteredCourses').html(content);
                    })
                    .fail(err => console.log(err));
            })
            .fail(err => console.log(err));
    }

    $('body').delegate('#showDetail','click',function () {
        var name = $(this).attr('data-name');
        var detail = $(this).attr('data-detail') !== "" ? $(this).attr('data-detail') : "This course has not updated any detail yet";

        $('.modalLauncher').trigger('click');

        var modalTitle = `
            <h4>${name}'s Detail </h4>
        `;
        $('.modal-title').html(modalTitle);
        var modalFooter = `
            <button class="btn btn-danger" id="btnCancel">Close</button>
        `;
        $('#logoutModal .modal-footer').html(modalFooter);
        var modalBody = `
            <div class="prgDetail">
                <p>${detail}</p>
            </div>
        `;
        $('#logoutModal .modal-body').html(modalBody);
        $('#logoutModal .modal-dialog').addClass('modal-lg');
    })

    $('body').delegate('#btnCancel','click',function() {
        $('#logoutModal .close').trigger('click');
    })

    ShowUserCourses();
});
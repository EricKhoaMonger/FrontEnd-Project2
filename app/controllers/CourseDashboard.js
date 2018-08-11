import $ from 'jquery';
window.jQuery = $;
import './../../assets/vendors/js/bootstrap.bundle.min.js'
import './../../assets/vendors/js/jquery.dataTables'
import './../../assets/vendors/js/dataTables.bootstrap4'
import './../../node_modules/datatables.net'

import {CourseService} from './../services/CourseService'
import {CourseList} from "./../models/CourseList";
import {Course} from './../models/Course'
import ClassicEditor from "./../services/CKEditorService";

import swal from 'sweetalert2'

$(document).ready(function () {
    var courseService = new CourseService();
    var courseList = new CourseList();
    var editor;
    var ajaxCourseList = courseService.AjaxAllCourses();
    ajaxCourseList
        .done(function (res2) { // get Course List
            courseList.CourseArr = res2;
            CreateCourseTable(courseList.CourseArr)
        })
        .fail(function (err2) {
            console.log(err2)
        })

    // Course Table
    function CreateCourseTable(list) {
        var content = '';

        for (var item of list) {
            content += `
                <tr class="courseRow ">
                    <td>${item.MaKhoaHoc}</td>
                    <td>${item.TenKhoaHoc}</td>
                    <td height="100px"><button class="btn btn-danger btn-see-more" data-detail='${item.MoTa}' data-img="${item.HinhAnh}" data-name="${item.TenKhoaHoc}" data-id="${item.MaKhoaHoc}">See Details</button></td>
                    <td class="text-center"><img src="${item.HinhAnh}" alt="" style="height:100px;width: 200px;"></td>
                    <td class="text-center">
                        <button class="btn btn-danger btn-course-remove" data-id="${item.MaKhoaHoc}"><i class="fa fa-times"></i></button>
                        <button 
                            data-id ="${item.MaKhoaHoc}"
                            data-name ="${item.TenKhoaHoc}"
                            data-view ="${item.LuotXem}"
                            data-img ="${item.HinhAnh}"
                            data-creator ="${item.NguoiTao}"
                            class="btn btn-info btn-course-update"
                            >
                                <i class="fa fa-pen"></i>
                        </button>
                    </td>
                </tr>
            `
        }
        $('#dataCourseTable tbody').html(content);
        $('#dataCourseTable').DataTable();
    }
    // Add Course function
    function AddCourse() {
        var id = $('#txtCourseId').val();
        var name = $('#txtCourseName').val();
        var des = editor.getData();
        var img = $('#txtImgUrl').val();
        var view = $('#numView').val();
        var creator = JSON.parse(localStorage.getItem('CurrentUser')).TaiKhoan;

        var newCourse = new Course(id, name, des, img, view, creator);
        var ajaxAddCourse = courseService.AjaxAddCourse(newCourse);
        ajaxAddCourse
            .done(res => {
                if (res) {
                    courseList.AddCourse(newCourse);
                    CreateCourseTable(courseList.CourseArr);
                    swal({
                        type: 'success',
                        title: 'Course Added!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        location.reload()
                    }, 2000);
                }
            })
            .fail(err => console.log(err));
    }
    // Update Course
    function UpdateCourse() {
        var id = $('#txtCourseId').val();
        var name = $('#txtCourseName').val();
        var des = editor.getData();
        var img = $('#txtImgUrl').val();
        var view = $('#numView').val();
        var creator = $('#txtCreator').val();

        var editedCourse = new Course(id, name, des, img, view, creator)

        var ajaxUpdateCourse = courseService.AjaxUpdateCourse(id, name, des, view, creator, img);
        ajaxUpdateCourse
            .done(function (res) {
                editedCourse = res;
                courseList.UpdateCourse(editedCourse);
                swal({
                    type: 'success',
                    title: 'Course Updated Successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                $('#logoutModal .close').trigger('click');
            })
            .fail(err => console.log(err));
    }

    // Add Course Event
    $('#addCourseBtn').bind('click', function () {
        var localAdmin = JSON.parse(localStorage.getItem('CurrentUser'));
        $('.modalLauncher').trigger('click');
        var modalTitle = `
            <h4>Add A Course</h4>
        `;
        $('.modal-title').html(modalTitle);
        var modalFooter = `
            <button class="btn btn-warning" id="addCourse">Confirm</button>
            <button class="btn btn-danger" id="btnCancel">Cancel</button>
        `;
        $('#logoutModal .modal-footer').html(modalFooter);
        var modalBody = `
            <div class="form-group>
                <label for="txtCourseId">Course ID</label>
                <input id="txtCourseId" type="text" class="form-control mb-3" />
            </div>
            <div class="form-group>
                <label for="txtCourseName">Course Name</label>
                <input id="txtCourseName" type="text" class="form-control mb-3" />
            </div>
            <div class="form-group>
                <label for="editor">Course Description</label>
                <textarea id="editor">
                    &lt;p&gt;Here goes the initial content of the editor.&lt;/p&gt;
                </textarea>
            </div>
            <div class="form-group>
                <label for="txtImgUrl">Course Image</label>
                <input id="txtImgUrl" type="text" class="form-control mb-3" />
            </div>
            <div class="form-group>
                <label for="numView">Course Views</label>
                <input id="numView" type="number" class="form-control mb-3" >
            </div>
            <div class="form-group>
                <label for="txtCreator">Creator</label>
                <input id="txtCreator" type="text" class="form-control mb-3" readonly="true" style="cursor:not-allowed;" value="${localAdmin.HoTen}">
            </div>  
        `;
        $('#logoutModal .modal-body').html(modalBody);
        $('#logoutModal .modal-dialog').addClass('modal-lg');

        ClassicEditor
            .create(document.querySelector('#editor'))
            .then(newEditor => {
                editor = newEditor;
            })
            .catch(error => {
                console.error(error);
            });
        $('#addCourse').bind('click', AddCourse)
    })

    // Update Course Event
    $('body').delegate('.btn-course-update', 'click', function () {
        $('.modalLauncher').trigger('click');
        var ajaxCourseDetail = courseService.AjaxCourseDetail($(this).attr('data-id'));
        ajaxCourseDetail
            .done(res => {
                var course = res;
                var modalTitle = `
                    <h4>Update Course</h4>
                `;
                $('.modal-title').html(modalTitle);
                var modalFooter = `
                    <button class="btn btn-warning" id="updateCourse">Confirm</button>
                    <button class="btn btn-danger" id="btnCancel">Cancel</button>
                `;
                $('#logoutModal .modal-footer').html(modalFooter);
                var modalBody = `
                    <div class="form-group>
                        <label for="txtCourseId">Course ID</label>
                        <input id="txtCourseId" type="text" readonly="true" style="cursor:not-allowed;" class="form-control mb-3" value="${course.MaKhoaHoc}"/>
                    </div>
                    <div class="form-group>
                        <label for="txtCourseName">Course Name</label>
                        <input id="txtCourseName" type="text" class="form-control mb-3" value="${course.TenKhoaHoc}"/>
                    </div>
                    <div class="form-group>
                        <label for="txtDes">Course Description</label>
                        <textarea name="txtEditor" id="editor">
                            
                        </textarea>
                    </div>
                    <div class="form-group>
                        <label for="txtImgUrl">Course Image</label>
                        <input id="txtImgUrl" type="text" class="form-control mb-3" value="${course.HinhAnh}"/>
                    </div>
                    <div class="form-group>
                        <label for="numView">Course Views</label>
                        <input id="numView" type="number" class="form-control mb-3" value="${course.LuotXem}">
                    </div>
                    <div class="form-group>
                        <label for="txtCreator">Creator</label>
                        <input id="txtCreator" type="text" class="form-control mb-3" readonly="true" style="cursor:not-allowed;" value="${course.NguoiTao}">
                    </div>  
                `;
                $('#logoutModal .modal-body').html(modalBody);
                $('#logoutModal .modal-dialog').addClass('modal-lg');

                ClassicEditor
                    .create(document.querySelector('#editor'))
                    .then(newEditor => {
                        editor = newEditor;
                        editor.setData(`${course.MoTa}`);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .fail(err => console.log(err));
    });
    $('body').delegate('#updateCourse', 'click', UpdateCourse)

    // Remove Course
    $('body').delegate('.btn-course-remove', 'click', function () {
        var id = $(this).attr('data-id');

        var ajaxRemoveCourse = courseService.AjaxRemoveCourse(id);
        ajaxRemoveCourse
            .done(res => {
                if (res.MaKhoaHoc == id) {
                    courseList.RemoveCourse(id);
                    swal({
                        type: 'success',
                        title: 'Course Removed Successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                }

            })
            .fail(err => console.log(err));
    });

    // See Course detail
    $('body').delegate('.btn-see-more', 'click', function () {
        var id = $(this).attr('data-id');
        var name = $(this).attr('data-name');
        var des = $(this).attr('data-detail');
        // 2 ways to get Course ID when moving to CourseDetail.html

        // 1st way
        // localStorage.setItem('CurrentCourseId',JSON.stringify(id))
        // window.location.assign('coursedetail.html');

        // 2nd way
        // window.location.assign(`CourseDetail.html?${id}`);

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
                <p>${des}</p>
            </div>
        `;
        $('#logoutModal .modal-body').html(modalBody);
        $('#logoutModal .modal-dialog').addClass('modal-lg');
    })

    $('body').delegate('#btnCancel', 'click', function () {
        $('#logoutModal .close').trigger('click');
    })
});
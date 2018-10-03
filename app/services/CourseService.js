import $ from 'jquery';
window.jQuery = $;
export function CourseService() {

}

CourseService.prototype.AjaxUserCourses = function (id) {
    return $.ajax({
        type: "GET",
        url: `http://sv.myclass.vn/api/QuanLyTrungTam/LayThongtinKhoaHoc?taikhoan=${id}`
    })
}

CourseService.prototype.AjaxAllCourses = function () {
    return $.ajax({
        type: "GET",
        url: "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc"
    })
}

CourseService.prototype.AjaxCourseDetail = function (id) {
    return $.ajax({
        type: "GET",
        url: `http://sv.myclass.vn/api/QuanLyTrungTam/ChiTietKhoaHoc/${id}`
    })
}

CourseService.prototype.AjaxAddCourse = function (khoahoc) {
    return $.ajax({
        type: 'POST',
        url: 'http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc',
        dataType: 'json',
        data: khoahoc
    });
}

CourseService.prototype.AjaxUpdateCourse = function (edittedcourse) {
    var obj = JSON.stringify(edittedcourse)
    var urlAPI = 'http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatKhoaHoc'
    return $.ajax({
        type: 'PUT',
        url: urlAPI,
        data: obj,
        contentType: 'application/json'
    })
}

CourseService.prototype.AjaxRemoveCourse = function (id) {
    return $.ajax({
        type: 'DELETE',
        url: `http://sv.myclass.vn/api/QuanLyTrungTam/XoaKhoaHoc/${id}`
    })
}
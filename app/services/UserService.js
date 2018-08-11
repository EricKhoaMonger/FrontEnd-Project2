function UserService() {

}

UserService.prototype.AjaxGetUserList = function () {
    return $.ajax({
        type: "GET",
        url: 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung',
        dataType: "json"
    })
}

UserService.prototype.AjaxAddUser = function (user) {
    return $.ajax({
        type: "POST",
        url: 'http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung',
        data: user,
        dataType: 'json'
    })
}

UserService.prototype.AjaxRemoveUser = function (id) {
    return $.ajax({
        type: "DELETE",
        url: `http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${id}`
    })
}

UserService.prototype.AjaxUpdateUser = function (user) {
    var obj = JSON.stringify(user)
    return $.ajax({
        type: "PUT",
        url: 'http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung',
        data: obj,
        contentType: 'application/json'
    })
}

UserService.prototype.AjaxLogIn = function (id, password) {
    return $.ajax({
        type: "GET",
        url: `http://sv.myclass.vn/api/QuanLyTrungTam/DangNhap?taikhoan=${id}&matkhau=${password}`
    })
}

UserService.prototype.AjaxSignUp = function (user) {
    return $.ajax({
        type: "POST",
        url: 'http://sv.myclass.vn/api/QuanLyTrungTam/DangKy',
        data: user,
        dataType: 'json'
    })
}

UserService.prototype.AjaxUserRegisteredCourse = function (id) {
    return $.ajax({
        type: 'GET',
        url: `http://sv.myclass.vn/api/QuanLyTrungTam/LayThongTinKhoaHoc?taikhoan=${id}`
    })
}

UserService.prototype.AjaxRegisterUserACourse = function (courseId, userId) {
    var model = JSON.stringify({MaKhoaHoc: courseId, TaiKhoan: userId});
    return $.ajax({
        type: 'POST',
        url: 'http://sv.myclass.vn/api/QuanLyTrungTam/GhiDanhKhoaHoc',
        data:model,
        contentType:'application/json',
        dataType:'json'
    })
}

UserService.prototype.AjaxUserProfile = function (id) {
    return $.ajax({
        type:'GET',
        url:`http://sv.myclass.vn/api/QuanLyTrungTam/ThongTinNguoiDung?taikhoan=${id}`
    })
}
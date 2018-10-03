import $ from 'jquery';
window.jQuery = $;
import {
    UserService
} from "./../services/UserService";
import {
    User
} from './../models/User'
import swal from 'sweetalert2'

$(document).ready(function () {
    var userService = new UserService();
    ShowUserProfile();

    function ShowUserProfile() {
        var localUser = JSON.parse(localStorage.getItem("CurrentUser"));
        if (localUser != null) {
            var ajaxUserDetail = userService.AjaxGetUserList();
            ajaxUserDetail
                .done(users => {
                    for (const user of users) {
                        if (localUser.TaiKhoan === user.TaiKhoan) {
                            $('#userId').val(user.TaiKhoan);
                            $('#userPass').val(user.MatKhau);
                            $('#userName').val(user.HoTen);
                            $('#userEmail').val(user.Email);
                            $('#userPhone').val(user.SoDT);
                        }
                    }
                })
                .fail(err => console.log(err));
        } else return

    }

    $('#editProfile').css('cursor', 'pointer');
    $('#editProfile').bind('click', function () {
        $('#wrapper .active').removeClass('active');
        $(this).addClass('active');
        var inputs = $('#content-wrapper input.form-control');
        $.each(inputs, function (key, val) {
            val.removeAttribute('readonly');
        });
        inputs[0].setAttribute('readonly', true)
        $('#editConfirm').removeClass('d-none');
        $('#editCancel').removeClass('d-none');
    });

    $('#editConfirm').bind('click', function () {
        var localUser = JSON.parse(localStorage.getItem("CurrentUser"));

        var id = $('#userId').val();
        var pass = $('#userPass').val();
        var name = $('#userName').val();
        var email = $('#userEmail').val();
        var phone = $('#userPhone').val();
        var type = localUser.MaLoaiNguoiDung;

        var editedUser = new User(id, pass, name, email, phone, type);

        var ajaxEditUser = userService.AjaxUpdateUser(editedUser);
        ajaxEditUser
            .done(res => {
                localUser = res;
                localStorage.setItem('CurrentUser', JSON.stringify(localUser));
                ShowUserProfile();
                $('#userProfile').trigger('click');
                $('#userProfile').addClass('active');
                $('#userDropdown').html(`Hello, ${localUser.HoTen}`);
                swal({
                    type: 'success',
                    title: `Edited Successfuly`,
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .fail(err => console.log(err));
    });

    $('#userProfile').bind('click', function () {
        $('#wrapper .active').removeClass('active');
        $(this).addClass('active');
        ShowUserProfile();
        $('#editConfirm').addClass('d-none');
        $('#editCancel').addClass('d-none');
        var inputs = $('#content-wrapper input.form-control');
        $.each(inputs, function (key, val) {
            val.setAttribute('readonly', true);
        })
    });

    $('#editCancel').bind('click', function () {
        $('#wrapper .active').removeClass('active');
        $('#userProfile').trigger('click');
        $('#userProfile').addClass('active');
        ShowUserProfile();
        $('#editConfirm').addClass('d-none');
        $('#editCancel').addClass('d-none');
        var inputs = $('#content-wrapper input.form-control');
        $.each(inputs, function (key, val) {
            val.setAttribute('readonly', true);
        })
    });
});
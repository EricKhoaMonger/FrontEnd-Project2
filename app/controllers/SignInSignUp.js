$(document).ready(function () {
    var userService = new UserService();
    // Check localStorage status
    function CurrentUserAvailability() {
        if (localStorage.getItem("CurrentUser") !== null) {
            return true;
        }
        return false;
    }

    function AfterSignedIn() {
        if (CurrentUserAvailability()) {
            var currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
            $('#btnSignInSignUp').hide();
            $('#userDropdown').show();
            $('#userDropdown').html(`Hello, ${currentUser.HoTen}`);
        }
    }

    AfterSignedIn();

    function SignIn() {
        var id = $('#txtId').val();
        var password = $('#txtPassword').val();

        var ajaxLogin = userService.AjaxLogIn(id, password);
        ajaxLogin
            .done(function (respond) {
                if (respond !== "failed to login" && respond[0].MaLoaiNguoiDung == "GV") {
                    localStorage.setItem('CurrentUser', JSON.stringify(respond[0]))
                    $("#btnClose").trigger('click');
                    window.location.assign('DashboardOverview.html')
                } else if (respond !== "failed to login" && respond[0].MaLoaiNguoiDung == "HV") {
                    localStorage.setItem('CurrentUser', JSON.stringify(respond[0]))
                    $("#btnClose").trigger('click');
                    location.reload();
                }
            })
            .fail(function (err) {
                console.log(err)
            });
    }

    function SignUp() {
        var id = $('#suId').val();
        var password = $('#suPassword').val();
        var name = $('#suName').val();
        var email = $('#suEmail').val();
        var phone = $('#suPhone').val();
        var typeId = "HV";

        var userSignedUp = new User(id, password, name, email, phone, typeId);

        var ajaxSignUp = userService.AjaxSignUp(userSignedUp);
        ajaxSignUp
            .done(function (res) {
                if (res == true) {
                    $('#linkSignIn').trigger('click');
                    swal({
                        type: 'success',
                        title: 'Sign Up Successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .fail(function (err) {
                console.log(err)
            })
    }

    function SignOut() {
        localStorage.removeItem('CurrentUser');
        $('#btnSignInSignUp').show();
        $('#userDropdown').hide();
        window.location.assign('HomePage.html');
    }

    $('#btnSignOut').bind('click', SignOut);
    $('#logoutModal .modal-footer .btn-primary').bind('click', SignOut);
    $('#logOutLink').bind('click', SignOut);
    $('body').delegate('#btnSignUp', 'click', SignUp);
    $('body').delegate('#btnSignIn', 'click', SignIn);
    $('#toMyAccountBtn').bind('click',function () {
        var localUser = JSON.parse(localStorage.getItem('CurrentUser'));
        if (localUser.MaLoaiNguoiDung === 'HV') {
            window.location.assign('UserPage.html');
        }
    })
})
$('#userDropdown').hide();
import $ from 'jquery';
window.jQuery = $;
import './../../assets/vendors/js/bootstrap.bundle.min.js'
import './../../assets/vendors/js/jquery.dataTables'
import './../../assets/vendors/js/dataTables.bootstrap4'
import './../../node_modules/datatables.net'

import {
  CourseService
} from './../services/CourseService'
import {
  UserService
} from './../services/UserService'
import {
  UserList
} from "./../models/UserList";
import {
  User
} from './../models/User'

import swal from 'sweetalert2'

$(document).ready(function () {
  var userList = new UserList();
  var userService = new UserService();
  var courseService = new CourseService();

  var ajaxUserList = userService.AjaxGetUserList();
  ajaxUserList
    .done(function (res1) {
      userList.UserArray = res1;
      CreateUserTable(userList.UserArray);
      $('#dataTable').DataTable();
    })
    .fail(function (err1) {
      console.log(err1)
    });

  // User Table
  function CreateUserTable(list) {
    var content = '';

    for (var item of list) {
      content += `
              <tr class="userRow">
                  <td>${item.TaiKhoan}</td>
                  <td>${item.MatKhau}</td>
                  <td>${item.HoTen}</td>
                  <td>${item.Email}</td>
                  <td>${item.SoDT}</td>
                  <td>${item.MaLoaiNguoiDung}</td>
                  <td class="text-center">
                      <button class="btn btn-danger btn-user-remove" data-id="${item.TaiKhoan}"><i class="fa fa-times"></i></button>
                      <button 
                          data-id ="${item.TaiKhoan}" 
                          data-name ="${item.HoTen}" 
                          data-password ="${item.MatKhau}"                         
                          data-email ="${item.Email}" 
                          data-phone ="${item.SoDT}" 
                          data-type ="${item.MaLoaiNguoiDung}" 
                          class="btn btn-warning btn-user-update"
                          >
                              <i class="fa fa-edit"></i>
                      </button>
                      <button 
                          data-id ="${item.TaiKhoan}" 
                          data-name ="${item.HoTen}"                            
                          class="btn btn-info btn-register-course"
                          >
                              <i class="fa fa-pen"></i>
                      </button>
                  </td>
              </tr>
          `
    }
    $('#dataTable tbody').html(content);
    // $('#dataTable').DataTable();
  }

  // add user
  function AddUser() {
    var id = $('#txtId').val();
    var pass = $('#txtPassword').val();
    var name = $('#txtName').val();
    var email = $('#txtEmail').val();
    var phone = $('#txtPhone').val();
    var type = $('#selectVal').val();
    var typeName = (type == 'HV') ? 'Học Viên' : 'Giáo Vụ';

    var newUser = new User(id, pass, name, email, phone, type, typeName);
    var ajaxAddUser = userService.AjaxAddUser(newUser);
    ajaxAddUser
      .done(res => {
        newUser = res;
        userList.AddUser(newUser);
        CreateUserTable(userList.UserArray);
        swal({
          type: 'success',
          title: 'User Added!',
          showConfirmButton: false,
          timer: 1500
        });
        $('#logoutModal .close').trigger('click');
        location.reload();
      })
      .fail(err => {
        console.log(err)
      });
  }

  // Get User Data when click User Update Btn
  function GetUserData() {
    $('.modalLauncher').trigger('click');
    var modalTitle = `
        <h4 class="modal-title" id="modalTitle">Update User</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    `;
    $('#logoutModal .modal-header').html(modalTitle);
    var modalFooter = `
        <button class="btn btn-warning" id="btnUpdate">Update</button>
        <button class="btn btn-danger" id="btnCancel">Cancel</button>
    `;
    $('#logoutModal .modal-footer').html(modalFooter);
    var id = $(this).attr('data-id');
    var pass = $(this).attr('data-password');
    var name = $(this).attr('data-name');
    var email = $(this).attr('data-email');
    var phone = $(this).attr('data-phone');
    var type = $(this).attr('data-type');

    var modalBody = `
        <input id="txtId" type="text" readonly="true" style="cursor:not-allowed;" class="form-control mb-3" value="${id}"/>
        <input id="txtPassword" type="text" class="form-control mb-3" value="${pass}"/>
        <input id="txtName" type="text" class="form-control mb-3" value="${name}"/>
        <input id="txtEmail" type="text" class="form-control mb-3" value="${email}"/>
        <select id="selectVal" class="form-control mb-3".>
            <option value="HV">Student</option>
            <option value="GV">Teacher</option>
        </select>
        <input id="txtPhone" type="number" class="form-control mb-3" value="${phone}"/>
    `;
    $('#logoutModal .modal-body').html(modalBody);
    var options = $('#selectVal').children('option');
    for (let option of options) {
      if (option.value === type) {
        $('#selectVal').val(type)
      }
    };
  }

  function RegisterCourse() {
    var courseId = $('#allCourses').children().filter(':selected').attr('data-id');
    var userId = $('#allCourses').children().filter(':selected').attr('data-user-id');


    var ajaxRegisterCourse = new userService.AjaxRegisterUserACourse(courseId, userId);
    ajaxRegisterCourse
      .done(res => {
        swal({
          type: 'success',
          title: `Register ${res}`,
          showConfirmButton: false,
          timer: 1500
        });
        $('#allCourses').children().filter(':selected')[0].remove();
        $('#logoutModal .close').trigger('click');
      })
      .fail(err => console.log(err));
  }

  // binding remove user btn
  $('body').delegate('.btn-user-remove', 'click', function () {
    var id = $(this).attr('data-id');
    var ajaxRemoveUser = userService.AjaxRemoveUser(id);
    ajaxRemoveUser
      .done(function (res) {
        swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            swal(
              'Deleted!',
              'User has been deleted.',
              'success'
            )
            id = res.TaiKhoan;
            userList.RemoveUser(id);
            CreateUserTable(userList.UserArray);
            location.reload();
          }
        })
      })
      .fail(function (err) {
        if (err.status == 500) {
          swal({
            type: 'error',
            title: 'This User Has Been Registered To A Course!',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(err)
        }
      });
  });

  // binding add user btn
  $('#addUserBtn').bind('click', function () {
    $('.modalLauncher').trigger('click');
    var modalTitle = `
        <h4 class="modal-title" id="modalTitle">Add User</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    `;
    $('#logoutModal .modal-header').html(modalTitle);
    var modalFooter = `
        <button class="btn btn-warning" id="btnAddUser">Add</button>
        <button class="btn btn-danger" id="btnCancel">Cancel</button>
    `;
    $('#logoutModal .modal-footer').html(modalFooter);

    var modalBody = `
        <input id="txtId" type="text" class="form-control mb-3" placeholder="Id"/>
        <input id="txtPassword" type="text" class="form-control mb-3" placeholder="Password"/>
        <input id="txtName" type="text" class="form-control mb-3" placeholder="Name"/>
        <input id="txtEmail" type="text" class="form-control mb-3" placeholder="Email"/>
        <select id="selectVal" class="form-control mb-3" >
            <option value="0">Choose User Type</option>
            <option value="HV">Student</option>
            <option value="GV">Teacher</option>
        </select>
        <input id="txtPhone" type="number" class="form-control mb-3" placeholder="Phone Number"/>
    `;
    $('#logoutModal .modal-body').html(modalBody);
    $('#btnAddUser').bind('click', AddUser)
  });

  // Binding Update User Btn
  $('body').delegate('.btn-user-update', 'click', GetUserData);
  $('body').delegate('#btnUpdate', 'click', function () {
    var id = $('#txtId').val();
    var pass = $('#txtPassword').val();
    var name = $('#txtName').val();
    var email = $('#txtEmail').val();
    var phone = $('#txtPhone').val();
    var type = $('#selectVal').val();

    var editedUser = new User(id, pass, name, email, phone, type);

    var ajaxUdateUser = userService.AjaxUpdateUser(editedUser);
    ajaxUdateUser
      .done(function (res) {
        editedUser = res;
        userList.UpdateUser(editedUser);
        CreateUserTable(userList.UserArray);
        swal({
          type: 'success',
          title: 'User Updated!',
          showConfirmButton: false,
          timer: 1500
        })
        $('#logoutModal .close').trigger('click');
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
      .fail(function (err) {
        console.log(err)
      });
  });

  // Register Course for User Event
  $('body').delegate('.btn-register-course', 'click', function () {
    var name = $(this).attr('data-name');
    var id = $(this).attr('data-id');

    $('.modalLauncher').trigger('click');

    var modalTitle = `
        <h4 class="modal-title" id="modalTitle">${name}'s Course List</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    `;
    $('#logoutModal .modal-header').html(modalTitle);
    var modalFooter = `
        <button class="btn btn-warning" id="btnRegisterCourse">Register</button>
        <button class="btn btn-danger" id="btnCancel">Cancel</button>
    `;
    $('#logoutModal .modal-footer').html(modalFooter);

    var modalBody = `  
        <div class="form-group">
          <label for="registeredCourses">Courses Registered</label>
          <select class="form-control" id="registeredCourses">
            
          </select>
        </div>
        <div class="form-group">
          <label for="allCourses">Courses Available</label>
          <select class="form-control" id="allCourses">
            
          </select>
        </div>
        
    `;
    $('#logoutModal .modal-body').html(modalBody);
    var userCouseList = courseService.AjaxUserCourses(id);
    userCouseList
      .done(res => {
        var userCourses = res;
        var selectUserCourses = '';
        if (userCourses === "Did not find the course") {
          selectUserCourses = `
              <option>Found no course</option>`;
        } else {
          for (const userCourse of userCourses) {
            selectUserCourses += `
              <option>
                ${userCourse.MaKhoaHoc} | ${userCourse.TenKhoaHoc}
              </option>`;
          }
        }
        $('#registeredCourses').html(selectUserCourses);
        var ajaxGetCourseList = courseService.AjaxAllCourses();
        ajaxGetCourseList
          .done(res2 => {
            var courses = res2;
            var selectAllCouses = '';
            for (let i = 0; i < courses.length; i++) { // Splice all the common courses from List of All Courses
              for (let j = 0; j < userCourses.length; j++) {
                if (userCourses[j].MaKhoaHoc == courses[i].MaKhoaHoc) {
                  courses.splice(i, 1)
                }
              }
              selectAllCouses += `
                    <option data-user-id ="${id}" data-id="${courses[i].MaKhoaHoc}">${courses[i].MaKhoaHoc} | ${courses[i].TenKhoaHoc}</option>
                  `;
            }
            $('#allCourses').html(selectAllCouses);
          })
          .fail(err => {
            console.log(err)
          });
      })
      .fail(err => {
        console.log(err)
      });
  });
  // Register Course Event
  $('body').delegate('#btnRegisterCourse', 'click', RegisterCourse)

  $('body').delegate('#btnCancel', 'click', function () {
    $('#logoutModal .close').trigger('click');
  })
});
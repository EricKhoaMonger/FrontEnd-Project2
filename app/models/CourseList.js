function CourseList() {
    this.CourseArr = [];
}

CourseList.prototype.AddCourse = function (course) {
    this.CourseArr.unshift(course);
}

CourseList.prototype.UpdateCourse = function (editedCourse) {
    for (let i = 0; i < this.CourseArr.length; i++) {
        const currentCourse = this.CourseArr[i];
        if (editedCourse.MaKhoaHoc === currentCourse.MaKhoaHoc && editedCourse.NguoiTao === currentCourse.NguoiTao) {
            currentCourse.TenKhoaHoc = editedCourse.TenKhoaHoc;
            currentCourse.MoTa = editedCourse.MoTa;
            currentCourse.LuotXem = editedCourse.LuotXem;
            currentCourse.HinhAnh = editedCourse.HinhAnh;
        }
    }
}

CourseList.prototype.RemoveCourse = function (id) {
    for (let i = 0; i < this.CourseArr.length; i++) {
        const currentCourse = this.CourseArr[i];
        if (id === currentCourse.MaKhoaHoc) {
            this.CourseArr.splice(i,1);
        }
    }
}
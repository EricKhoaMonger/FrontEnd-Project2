export function UserList() {
    this.UserArray = [];
}
UserList.prototype.AddUser = function (user) {
    this.UserArray.push(user);
}

UserList.prototype.FindUser = function (keyWord) {
    var targetUser = [];
    for (var i = 0; i < this.UserArray.length; i++) {
        if (this.UserArray[i].Name.toLowerCase().search(keyWord.toLowerCase().trim()) !== -1) {
            targetUser.push(this.UserArray[i]);
        }
    }
    return targetUser;
}

UserList.prototype.RemoveUser = function (id) {
    for (var k = 0; k < this.UserArray.length; k++) {
        if (this.UserArray[k].TaiKhoan === id) {
            this.UserArray.splice(k, 1);
        }
    }
}

UserList.prototype.FindUserIndex = function (id) {
    for (var i = 0; i < this.UserArray.length; i++) {
        if (this.UserArray[i].TaiKhoan === id) {
            return i;
        }
    }
    return -1;
}
UserList.prototype.UpdateUser = function (editedUser) {
    var index = this.FindUserIndex(editedUser.TaiKhoan);
    if (index !== -1) {
        var oldUser = this.UserArray[index];
        oldUser.TaiKhoan = editedUser.TaiKhoan;
        oldUser.MatKhau = editedUser.MatKhau;
        oldUser.HoTen = editedUser.HoTen;
        oldUser.Email = editedUser.Email;
        oldUser.SoDT = editedUser.SoDT;
        oldUser.MaLoaiNguoiDung = editedUser.MaLoaiNguoiDung;
    }
}
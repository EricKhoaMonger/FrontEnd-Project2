function User(id,pass,name,email,phone,usertypeid,usertype){
    this.TaiKhoan = id;    
    this.MatKhau = pass;   
    this.HoTen = name; 
    this.Email = email;
    this.SoDT = phone;
    this.MaLoaiNguoiDung = usertypeid;
    this.TenLoaiNguoiDung = usertype;
}
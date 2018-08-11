$(document).ready(function () {
    $('#btnSignInSignUp').bind('click', ShowSignInForm)
    $('body').delegate('#linkSignUp','click',ShowSignUpForm)
    $('body').delegate('#linkSignIn','click',ShowSignInForm)
    $('body').delegate('#btnClose','click',function() {
        $('#btn-close').trigger('click');
    })

    function ShowSignUpForm() {
        var titleContent = "Sign Up";
        $('#modelTitle').html(titleContent);
        var bodyContent = `
            <input id="suId" type="text" class="form-control mb-3" placeholder="Your ID"/>
            <input id="suPassword" type="password" class="form-control mb-3" placeholder="Your Password"/>
            <input id="suName" type="text" class="form-control mb-3" placeholder="Your Name"/>
            <input id="suEmail" type="text" class="form-control mb-3" placeholder="Your Email"/>
            <input id="suPhone" type="number" class="form-control mb-3" placeholder="Your Phone"/>
        `;
        $('#modalBody').html(bodyContent);var footerContent = ` 
            <span>Already Signed Up <a href="#" class="text-secondary" id="linkSignIn">Sign In Here</a></span>
            <button class="btn btn-dark" id="btnSignUp">Sign Up</button>
            <button class="btn btn-danger" id="btnClose">Close</button>
        `;
        $('#modalFooter').html(footerContent);
    }

    function ShowSignInForm() {
        var titleContent = "Sign In";
        $('#modelTitle').html(titleContent);        
        var bodyContent = `
            <input id="txtId" type="text" class="form-control mb-3" placeholder="Your ID"/>
            <input id="txtPassword" type="password" class="form-control" placeholder="Your Password"/>
        `;
        $('#modalBody').html(bodyContent);
        var footerContent = ` 
            <span>Not having an account yet? <a href="#" class="text-secondary" id="linkSignUp">Sign Up Here</a></span>
            <button class="btn btn-dark" id="btnSignIn">Sign in</button>
            <button class="btn btn-danger" id="btnClose">Close</button>
        `;
        $('#modalFooter').html(footerContent);
    }
})
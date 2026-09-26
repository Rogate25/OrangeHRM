class loginPage{
    masukHalaman(){
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    }

    masukUsername(username){
        cy.get("[name='username']").type(username)
    }

    masukPassword(password){
        cy.get("[name='password']").type(password)
    }

    klikTombolLogin(){
        cy.get("[type='submit']").click()
    }

    validasiHalamanDashboard(){
        cy.url().should("include","dashboard")
        cy.contains("Dashboard").should("be.visible")
    }

    validasiInvalidCredentials(){
        cy.contains("Invalid credentials").should("be.visible")
    }

    validasiRequired(){
        cy.contains("Required").should("be.visible")
    }

    klikTombolForgotPassword(){
        cy.contains("Forgot your password?").click()
    }

    validasiurlHalamanForgot(){
        cy.url().should("include","requestPasswordResetCode")
    }

    valisasiHalamanForgotPass(){
        cy.contains("Reset Password").should("be.visible")
    }
}

export default new loginPage()
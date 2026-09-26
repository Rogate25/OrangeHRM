import loginPage from "../../support/loginPage";
import loginData from "../../fixtures/loginData.json"

describe("Pengguna dapat login kedalam sistem",()=>{
    it("TC001 - Pengguna login menggunakan username dan password yang valid",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()
    })

    it("TC002 - Pengguna login menggunakan username tidak valid",()=>{
       cy.intercept('POST', '**/web/index.php/auth/validate', (req) => {
            expect(req.body).to.include('username=invalid')
        }).as('loginInvalidUsername')

       loginPage.masukHalaman()
       loginPage.masukUsername(loginData.usernameInvalid)
       loginPage.masukPassword(loginData.passwordValid)
       loginPage.klikTombolLogin()

       cy.wait('@loginInvalidUsername')

       loginPage.validasiInvalidCredentials()
    })

    it("TC003 - Pengguna login menggunakan password tidak valid",()=>{
       cy.intercept('POST', '**/web/index.php/auth/validate',(req) => {expect(req.body).to.include('password=invalid')}).as('loginInvalidPassword');

       loginPage.masukHalaman()
       loginPage.masukUsername(loginData.usernameValid)
       loginPage.masukPassword(loginData.passwordInvalid)
       loginPage.klikTombolLogin()

       cy.wait('@loginInvalidPassword');

       loginPage.validasiInvalidCredentials()
    })

    it("TC004 - Pengguna mencoba login dengan username dan password kosong",()=>{
       cy.intercept('POST', '**/web/index.php/auth/validate',(req) => {
            expect(req.body).to.include('username=')
            expect(req.body).to.include('password=')
        }).as('loginEmptyCred');

       loginPage.masukHalaman()
       loginPage.masukUsername(loginData.usernameKosong)
       loginPage.masukPassword(loginData.passwordKosong)
       loginPage.klikTombolLogin()

       loginPage.validasiRequired()
    })

    it("TC005 - Pengguna login menggunakan username valid dan password kosong",()=>{
       cy.intercept('POST', '**/web/index.php/auth/validate',(req) => {
            expect(req.body).to.include('username=Admin')
            expect(req.body).to.include('password=')
        }).as('loginEmptyPassword');

       loginPage.masukHalaman()
       loginPage.masukUsername(loginData.usernameValid)
       loginPage.masukPassword(loginData.passwordKosong)
       loginPage.klikTombolLogin()
       loginPage.validasiRequired()
    })

    it("TC006 - Pengguna login menggunakan username kosong dan password valid",()=>{
       cy.intercept('POST', '**/web/index.php/auth/validate',(req) => {
            expect(req.body).to.include('username=')
            expect(req.body).to.include('password=admin123')
        }).as('loginEmptyUsername');

       loginPage.masukHalaman()
       loginPage.masukUsername(loginData.usernameKosong)
       loginPage.masukPassword(loginData.passwordValid)
       loginPage.klikTombolLogin()
       loginPage.validasiRequired()
    })

    it("TC009 - Button login dapat di klik",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate',(req) => {
            expect(req.method).to.equal('POST')
            expect(req.url).to.include('/auth/validate')
        }).as('loginbutton');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()
        
        cy.wait('@loginbutton');

        loginPage.validasiHalamanDashboard()
    })

    it("TC010 - Pengguna dapat menggunakan forgot password",()=>{
        cy.intercept(
        "GET",
        "**/web/index.php/auth/requestPasswordResetCode"
         ).as("forgotPassword")

        loginPage.masukHalaman()
        loginPage.klikTombolForgotPassword()

        cy.wait("@forgotPassword")

        loginPage.validasiurlHalamanForgot()
        loginPage.valisasiHalamanForgotPass()
    })

})
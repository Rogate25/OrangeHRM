import loginPage from "../../support/loginPage";
import directoryPage from "../../support/directoryPage";
import loginData from "../../fixtures/loginData.json"
import directoryData from "../../fixtures/directoryData.json"

describe("Pengguna dapat menemukan data employee", ()=>{
    it("TC013 - Pengguna berhasil masuk ke halaman directory",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()

        cy.intercept("GET","**/api/v2/directory/employees*").as("directoryRequest")

        directoryPage.klikTombolDirectory()

        cy.wait("@directoryRequest") 

        directoryPage.validasiHalamanDirectory()

    })

    it("TC014 - Pengguna mencari employee menggunakan employee name valid",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()

        cy.intercept("GET","**/api/v2/directory/employees*").as("directoryRequest")

        directoryPage.klikTombolDirectory()

        cy.wait("@directoryRequest") 

        directoryPage.validasiHalamanDirectory()

        directoryPage.searchEmployee(directoryData.employeeName)  

        directoryPage.pilihEmployee(directoryData.employeeName)

        cy.intercept("GET","**/api/v2/directory/employees?nameOrId=" + directoryData.employeeName).as("directoryRequest")

        directoryPage.klikTombolSearch()

        cy.wait("@directoryRequest")
    })

    it("TC015 - Pengguna mencari employee menggunakan employee name invalid",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()

        cy.intercept("GET","**/api/v2/directory/employees*").as("directoryRequest")

        directoryPage.klikTombolDirectory()

        cy.wait("@directoryRequest") 

        directoryPage.validasiHalamanDirectory()

        directoryPage.searchEmployee(directoryData.employeeInvalidName)  

    })

    it("TC016 - Pengguna mencari employee menggunakan employee name valid dan filter location valid",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()

        cy.intercept("GET","**/api/v2/directory/employees*").as("directoryRequest")

        directoryPage.klikTombolDirectory()

        cy.wait("@directoryRequest") 

        directoryPage.validasiHalamanDirectory()

        directoryPage.searchEmployee(directoryData.employeeName)  

        directoryPage.pilihEmployee(directoryData.employeeName)

        cy.intercept("GET","**/api/v2/directory/employees?nameOrId=" + directoryData.employeeName).as("directoryRequest")

        directoryPage.pilihLocation(directoryData.jobLocation)

        directoryPage.klikTombolSearch()

        cy.wait("@directoryRequest")
    })

    it("TC017 - Pengguna mencari employee menggunakan employee name valid dan filter job title valid",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()

        cy.intercept("GET","**/api/v2/directory/employees*").as("directoryRequest")

        directoryPage.klikTombolDirectory()

        cy.wait("@directoryRequest") 

        directoryPage.validasiHalamanDirectory()

        directoryPage.searchEmployee(directoryData.employeeName)  

        directoryPage.pilihEmployee(directoryData.employeeName)

        cy.intercept("GET","**/api/v2/directory/employees?nameOrId=" + directoryData.employeeName).as("directoryRequest")

        directoryPage.pilihJob(directoryData.jobTitle)

        directoryPage.klikTombolSearch()

        cy.wait("@directoryRequest")
    })

    it("TC018 - Pengguna menggunakan tombol reset setelah pencarian",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()

        cy.intercept("GET","**/api/v2/directory/employees*").as("directoryRequest")

        directoryPage.klikTombolDirectory()

        cy.wait("@directoryRequest") 

        directoryPage.validasiHalamanDirectory()

        directoryPage.searchEmployee(directoryData.employeeName)  

        directoryPage.pilihEmployee(directoryData.employeeName)

        cy.intercept("GET","**/api/v2/directory/employees?nameOrId=" + directoryData.employeeName).as("directoryRequest")

        directoryPage.pilihJob(directoryData.jobTitle)

        directoryPage.klikTombolSearch()

        cy.intercept("GET","**/api/v2/directory/employees*").as("resetDirectoryRequest")

        directoryPage.klikTombolReset()

        cy.wait("@directoryRequest")
        cy.wait("@resetDirectoryRequest")
    })

    it("TC019 - Pengguna mencari employee menggunakan filter job title",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()

        cy.intercept("GET","**/api/v2/directory/employees*").as("directoryRequest")

        directoryPage.klikTombolDirectory()

        directoryPage.validasiHalamanDirectory()

        directoryPage.pilihJob(directoryData.jobTitle)

        cy.intercept("GET","**/api/v2/directory/employees*").as("searchJobRequest")

        directoryPage.klikTombolSearch()

        cy.wait("@searchJobRequest").its("request.url").should("include", "jobTitleId=")

        cy.wait("@directoryRequest") 
    })

    it("TC020 - Pengguna mencari employee menggunakan filter location",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()

        cy.intercept("GET","**/api/v2/directory/employees*").as("directoryRequest")

        directoryPage.klikTombolDirectory()

        cy.wait("@directoryRequest") 

        directoryPage.validasiHalamanDirectory()

        directoryPage.pilihLocation(directoryData.jobLocation)

        cy.intercept("GET","**/api/v2/directory/employees*").as("searchLocationRequest")

        directoryPage.klikTombolSearch()

        cy.wait("@searchLocationRequest").its("request.url").should("include", "locationId=")
    })


})
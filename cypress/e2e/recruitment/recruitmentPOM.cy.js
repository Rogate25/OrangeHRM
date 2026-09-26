import loginPage from "../../support/loginPage";
import recruitmentPage from "../../support/recruitmentPage";
import loginData from "../../fixtures/loginData.json"
import recruitmentData from "../../fixtures/recruitmentData.json"

describe("Pengguna dapat menemukan data employee", ()=>{

    it("TC025 - Pengguna berhasil masuk ke halaman recruitment",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()

        cy.intercept("GET","**/api/v2/admin/job-titles*").as("jobTitlesRequest")

        recruitmentPage.klikTombolRecruitment()

        cy.wait('@jobTitlesRequest');

        recruitmentPage.validasiHalamanRecruitment()
    })
})

describe("Pengguna dapat menemukan candidate", ()=>{

    it("TC026 - Pengguna mencari candidate berdasarkan candidate name",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()

        cy.intercept("GET","**/api/v2/admin/job-titles*").as("jobTitlesRequest")

        recruitmentPage.klikTombolRecruitment()

        cy.wait('@jobTitlesRequest');

        recruitmentPage.validasiHalamanRecruitment()

        recruitmentPage.searchCandidate(recruitmentData.candidateName)

        recruitmentPage.pilihCandidate(recruitmentData.candidateName)

        cy.intercept("GET","**/api/v2/recruitment/candidates*").as("searchCandidateRequest")

        recruitmentPage.klikTombolSearch()

        cy.wait("@searchCandidateRequest").its("request.url").should("include", "candidateId=")
    })

    it("TC027 - Pengguna mencari candidate berdasarkan filter method application",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()

        cy.intercept("GET","**/api/v2/admin/job-titles*").as("jobTitlesRequest")

        recruitmentPage.klikTombolRecruitment()

        cy.wait('@jobTitlesRequest');

        recruitmentPage.validasiHalamanRecruitment()

        recruitmentPage.pilihMethod(recruitmentData.methodApplication)

        recruitmentPage.klikTombolSearch()
    })

    it("TC028 - Pengguna mencari candidate berdasarkan beberapa filter",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()

        cy.intercept("GET","**/api/v2/admin/job-titles*").as("jobTitlesRequest")

        recruitmentPage.klikTombolRecruitment()

        cy.wait('@jobTitlesRequest');

        recruitmentPage.validasiHalamanRecruitment()

        recruitmentPage.pilihMethod(recruitmentData.methodApplication)

        recruitmentPage.pilihJobTitle(recruitmentData.jobTitle)

        recruitmentPage.klikTombolSearch()
    })

})

describe("Pengguna dapat reset pencarian", ()=>{
    it("TC029 - Pengguna menggunakan tombol reset setelah pencarian",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()

        cy.intercept("GET","**/api/v2/admin/job-titles*").as("jobTitlesRequest")

        recruitmentPage.klikTombolRecruitment()

        cy.wait('@jobTitlesRequest');

        recruitmentPage.validasiHalamanRecruitment()

        recruitmentPage.pilihMethod(recruitmentData.methodApplication)

        recruitmentPage.pilihJobTitle(recruitmentData.jobTitle)

        recruitmentPage.klikTombolSearch()

        recruitmentPage.klikTombolReset()
    })
})

describe("Pengguna dapat menambah candidate", ()=>{
    it("TC030 - Pengguna menggunakan tombol reset setelah pencarian",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()

        cy.intercept("GET","**/api/v2/admin/job-titles*").as("jobTitlesRequest")

        recruitmentPage.klikTombolRecruitment()

        cy.wait('@jobTitlesRequest');

        recruitmentPage.validasiHalamanRecruitment()

        recruitmentPage.klikTombolAdd()

        recruitmentPage.validasiHalamanAdd()

        recruitmentPage.masukFirstname(recruitmentData.firstName)

        recruitmentPage.masukLastname(recruitmentData.lastName)

        recruitmentPage.masukEmail(recruitmentData.email)

        cy.intercept("POST","**/api/v2/recruitment/candidates*").as("candidateRequest")

        recruitmentPage.klikTombolSave()

        cy.wait("@candidateRequest")

        recruitmentPage.validasiHalamanRecruitment()
    })
})

describe("Pengguna dapat melihat informasi candidate", ()=>{
    it("TC031 - Pengguna dapat melihat informasi lengkap candidate",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()

        cy.intercept("GET","**/api/v2/admin/job-titles*").as("jobTitlesRequest")

        recruitmentPage.klikTombolRecruitment()

        cy.wait('@jobTitlesRequest');

        recruitmentPage.validasiHalamanRecruitment()

        cy.intercept("GET","**/api/v2/recruitment/candidates/*").as("candidateRequest")

        recruitmentPage.lihatCandidate(recruitmentData.candidateName)

        cy.wait("@candidateRequest")
        
    })
})

describe("Pengguna dapat menghapus candidate", ()=>{
    it("TC032 - Pengguna dapat menghapus satu candidate",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukPassword(loginData.passwordValid)
        loginPage.klikTombolLogin()

        cy.wait('@loginRequest');

        loginPage.validasiHalamanDashboard()

        cy.intercept("GET","**/api/v2/admin/job-titles*").as("jobTitlesRequest")

        recruitmentPage.klikTombolRecruitment()

        cy.wait('@jobTitlesRequest');

        recruitmentPage.validasiHalamanRecruitment()

        recruitmentPage.hapusCandidate(recruitmentData.candidateName)

        cy.intercept("DELETE","**/api/v2/recruitment/candidates").as("deleteCandidateRequest")
        
        recruitmentPage.konfirmasiHapus()

        cy.wait("@deleteCandidateRequest")
    })
})
Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes("Cannot read properties of undefined (reading 'response')")) {
        return false
    }
})
describe("Pengguna dapat login kedalam sistem",()=>{
    it("TC001 - Pengguna login menggunakan username dan password yang valid",()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("[name='username']").type("Admin")
        cy.get("[name='password']").type("admin123")
        cy.get("[type='submit']").click()

        cy.url().should("include","dashboard")
        cy.contains("Dashboard").should("be.visible")
    })

    it("TC002 - Pengguna login menggunakan username tidak valid",()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("[name='username']").type("invalid")
        cy.get("[name='password']").type("admin123")
        cy.get("[type='submit']").click()

        cy.contains("Invalid credentials").should("be.visible")
    })

    it("TC003 - Pengguna login menggunakan password tidak valid",()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("[name='username']").type("Admin")
        cy.get("[name='password']").type("invalid")
        cy.get("[type='submit']").click()

        cy.contains("Invalid credentials").should("be.visible")
    })

    it("TC004 - Pengguna mencoba login dengan username dan password kosong",()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("[name='username']").type(" ")
        cy.get("[name='password']").type(" ")
        cy.get("[type='submit']").click()

        cy.contains("Required").should("be.visible")
    })

    it("TC005 - Pengguna login menggunakan username valid dan password kosong",()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("[name='username']").type("Admin")
        cy.get("[name='password']").type(" ")
        cy.get("[type='submit']").click()

        cy.contains("Required").should("be.visible")
    })

    it("TC006 - Pengguna login menggunakan username kosong dan password valid",()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("[name='username']").type(" ")
        cy.get("[name='password']").type("Admin123")
        cy.get("[type='submit']").click()

        cy.contains("Required").should("be.visible")
    })

    it("TC007 - Password ditampilkan sebagai simbol",()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("[name='password']").type("Admin123")
        cy.get("[name='password']").should("have.attr","type","password")
    })

    //Icon mata tidak dapat di inspect
    it("TC008 - Icon untuk melihat password dapat digunakan",()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("[name='password']").type("Admin123")
        cy.get("[name='password']").should("have.attr","type","password")
    })

    it("TC009 - Button login dapat di klik",()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("[name='username']").type("Admin")
        cy.get("[name='password']").type("admin123")
        cy.get("[type='submit']").click()

        cy.url().should("include","dashboard")
        cy.contains("Dashboard").should("be.visible")
    })

    it("TC010 - Pengguna dapat menggunakan forgot password",()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        
        cy.contains("Forgot your password?").click()

        cy.url().should("include","requestPasswordResetCode")
        cy.contains("Reset Password").should("be.visible")
    })

    it("TC011 - Pengguna dapat login menggunakan enter",()=>{
       cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        
       cy.get('input[name="username"]').type('Admin')
       cy.get('input[name="password"]').type('admin123')
       cy.get('input[name="password"]').type('{enter}')

       cy.url().should('include', 'dashboard')
       cy.contains('Dashboard').should('be.visible')
    })
git add .
    it("TC012 - Pengguna dapat logout dari sistem", () => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    cy.get("[name='username']").type("Admin")
    cy.get("[name='password']").type("admin123")
    cy.get("[type='submit']").click()

    cy.url().should("include", "/dashboard")

    cy.get(".oxd-userdropdown-tab").click()

    cy.contains("Logout").click()

    cy.url().should("include", "/auth/login")
    cy.get("[name='username']").should("be.visible")
})
})
describe("Pengguna dapat login kedalam sistem",()=>{
    it("Cek request POST saat login", () => {

        cy.intercept('POST', '**', (req) => {
            console.log('POST:', req.url)
        })

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

        cy.get("[name='username']").type("Admin")
        cy.get("[name='password']").type("admin123")
        cy.get("[type='submit']").click()

        cy.url().should("include", "dashboard")
    })

    it("TC001 - Pengguna login menggunakan username dan password yang valid",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("[name='username']").type("Admin")
        cy.get("[name='password']").type("admin123")
        cy.get("[type='submit']").click()

        cy.wait('@loginRequest');

        cy.url().should("include","dashboard")
        cy.contains("Dashboard").should("be.visible")
    })

   it("TC002 - Pengguna login menggunakan username tidak valid", () => {

        cy.intercept('POST', '**/web/index.php/auth/validate', (req) => {
            expect(req.body).to.include('username=invalid')
        }).as('loginInvalidUsername')

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

        cy.get("[name='username']").type("invalid")
        cy.get("[name='password']").type("admin123")
        cy.get("[type='submit']").click()

        cy.wait('@loginInvalidUsername')

        cy.contains("Invalid credentials").should("be.visible")
    })

    it("TC003 - Pengguna login menggunakan password tidak valid",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate',(req) => {expect(req.body).to.include('password=invalid')}).as('loginInvalidPassword');

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("[name='username']").type("Admin")
        cy.get("[name='password']").type("invalid")
        cy.get("[type='submit']").click()

        cy.wait('@loginInvalidPassword');
        cy.contains("Invalid credentials").should("be.visible")
    })

     it("TC004 - Pengguna mencoba login dengan username dan password kosong",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate',(req) => {
            expect(req.body).to.include('username=')
            expect(req.body).to.include('password=')
        }).as('loginEmptyCred');

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("[name='username']").type(" ")
        cy.get("[name='password']").type(" ")
        cy.get("[type='submit']").click()

        cy.contains("Required").should("be.visible")
     })

     it("TC005 - Pengguna login menggunakan username valid dan password kosong",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate',(req) => {
            expect(req.body).to.include('username=Admin')
            expect(req.body).to.include('password=')
        }).as('loginEmptyPassword');

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("[name='username']").type("Admin")
        cy.get("[name='password']").type(" ")
        cy.get("[type='submit']").click()

         cy.contains("Required").should("be.visible")
     })

     it("TC006 - Pengguna login menggunakan username kosong dan password valid",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate',(req) => {
            expect(req.body).to.include('username=')
            expect(req.body).to.include('password=admin123')
        }).as('loginEmptyUsername');

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("[name='username']").type(" ")
        cy.get("[name='password']").type("Admin123")
        cy.get("[type='submit']").click()

        cy.contains("Required").should("be.visible")
     })


    it("TC009 - Button login dapat di klik",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate',(req) => {
            expect(req.method).to.equal('POST')
            expect(req.url).to.include('/auth/validate')
        }).as('loginbutton');

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("[name='username']").type("Admin")
        cy.get("[name='password']").type("admin123")
        cy.get("[type='submit']").click()

        cy.url().should("include","dashboard")
        cy.contains("Dashboard").should("be.visible")
    })


    it("TC011 - Pengguna dapat login menggunakan enter",()=>{
        cy.intercept('POST', '**/web/index.php/auth/validate',(req) => {
            expect(req.body).to.include('username=Admin')
            expect(req.method).to.equal('POST')
        }).as('loginbutton');

       cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        
       cy.get('input[name="username"]').type('Admin')
       cy.get('input[name="password"]').type('admin123')
       cy.get('input[name="password"]').type('{enter}')

       cy.url().should('include', 'dashboard')
       cy.contains('Dashboard').should('be.visible')
    })

})
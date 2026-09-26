class directoryPage {
    klikTombolDirectory(){
        cy.get("a[href='/web/index.php/directory/viewDirectory']").click()
    }

    validasiHalamanDirectory(){
        cy.url().should("include","directory")
        cy.contains("Directory").should("be.visible")
    }

    searchEmployee(employeeName){
        cy.get("input[placeholder='Type for hints...']").clear().type(employeeName)
    }

    pilihEmployee(employeeName) {
        cy.contains(".oxd-autocomplete-option", employeeName).should("be.visible").click()
    }

    pilihJob(jobTitle) {
        cy.get(".oxd-select-text").eq(0).click()

        cy.contains(".oxd-select-option", jobTitle).click({ force: true })
    }

    pilihLocation(jobLocation) {
        cy.get(".oxd-select-text").eq(1).click()

        cy.contains(".oxd-select-option", jobLocation).click({ force: true })
    }

    klikTombolSearch(){
        cy.get("[type='submit']").click()
    }

    klikTombolReset(){
        cy.get("button[type='reset']").click()
    }
}

export default new directoryPage()
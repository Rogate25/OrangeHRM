class recruitmentPage {
    klikTombolRecruitment(){
        cy.get("a[href='/web/index.php/recruitment/viewRecruitmentModule']").click()
    }

    validasiHalamanRecruitment(){
        cy.url().should("include","recruitment")
        cy.contains("Recruitment").should("be.visible")
    }

    searchCandidate(candidateName){
        cy.get("input[placeholder='Type for hints...']").clear().type(candidateName)
    }

    pilihCandidate(candidateName) {
        cy.contains(".oxd-autocomplete-option", candidateName).should("be.visible").click()
    }

    klikTombolSearch(){
        cy.get("[type='submit']").click()
    }

    pilihMethod(methodApplication) {
        cy.get(".oxd-select-text").eq(4).click()

        cy.contains(".oxd-select-option", methodApplication).click({ force: true })
    }

    pilihJobTitle(jobTitle) {
        cy.get(".oxd-select-text").eq(0).click()

        cy.contains(".oxd-select-option", jobTitle).click({ force: true })
    }

    klikTombolReset(){
        cy.get("button[type='reset']").click()
    }

    klikTombolAdd(){
        cy.get("button[class='oxd-button oxd-button--medium oxd-button--secondary']").click()
    }

    validasiHalamanAdd(){
        cy.url().should("include","addCandidate")
        cy.contains("Add Candidate").should("be.visible")
    }

    masukFirstname(firstName){
        cy.get("input[placeholder='First Name']").type(firstName)
    }

    masukLastname(lastName){
        cy.get("input[placeholder='Last Name']").type(lastName)
    }

    masukEmail(email){
        cy.get("input[placeholder='Type here']").eq(0).type(email)
    }

    klikTombolSave(){
        cy.get("button[type='submit']").click()
    }

    validasiHalamanCancidate(){
        cy.url().should("include","addCandidate")
        cy.contains("Application Stage").should("be.visible")
    }

    lihatCandidate(candidateName) {
        cy.contains(".oxd-table-row", candidateName).find(".oxd-icon.bi-eye-fill").click()
    }

    hapusCandidate(candidateName) {
        cy.contains(".oxd-table-row", candidateName).find(".oxd-icon.bi-trash").click()
    }

    konfirmasiHapus() {
        cy.contains("button", "Yes, Delete").click()
    }
}
export default new recruitmentPage()
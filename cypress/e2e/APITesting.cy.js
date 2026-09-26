describe('API Testing',()=>{
    it('GET all categories',()=>{
        cy.request({
            method : 'GET',
            url : 'https://api.escuelajs.co/api/v1/categories'
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.length.greaterThan(0)
        })
    })

    it('GET a single category by ID',()=>{
        cy.request({
            method : 'GET',
            url : 'https://api.escuelajs.co/api/v1/categories/2'
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
        })
    })

    it('GET a single category by invalid ID',()=>{
        cy.request({
            method : 'GET',
            url : 'https://api.escuelajs.co/api/v1/categories/99',
            failOnStatusCode : false
        }).then((response)=>{
            expect(response.status).to.eq(400)
        })
    })

    it('GET a single category by slug',()=>{
        cy.request({
            method : 'GET',
            url : 'https://api.escuelajs.co/api/v1/categories/slug/computer-category',
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('slug')
        })
    })

    it('POST create a category',()=>{
        cy.request({
            method : 'POST',
            url : 'https://api.escuelajs.co/api/v1/categories/',
            body : {
                "name": "lipstick",
                "image": "https://placeimg.com/640/480/any"
            }
        }).then((response)=>{
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('id')
        })
    })

    it('POST create a category with invalid parameter',()=>{
        cy.request({
            method : 'POST',
            url : 'https://api.escuelajs.co/api/v1/categories/',
            body : {
                "image": "https://placeimg.com/640/480/any"
            },
            failOnStatusCode : false
        }).then((response)=>{
            expect(response.status).to.eq(500)
            expect(response.body).to.have.property('message')
        })
    })

    it('POST create a category with empty parameter',()=>{
        cy.request({
            method : 'POST',
            url : 'https://api.escuelajs.co/api/v1/categories/',
            body : {
                "name": "",
                "image": "https://placeimg.com/640/480/any"
            },
            failOnStatusCode : false
        }).then((response)=>{
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message')
        })
    })

    it('PUT update a category',()=>{
        cy.request({
            method : 'PUT',
            url : 'https://api.escuelajs.co/api/v1/categories/95',
            body : {
                "name": "New Category Name",
                "image": "https://placeimg.com/640/480/any"
            },
            failOnStatusCode : false
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name')
        })
    })

    it('PUT update a category with not existed ID',()=>{
        cy.request({
            method : 'PUT',
            url : 'https://api.escuelajs.co/api/v1/categories/999',
            body : {
                "name": "New Category Name",
                "image": "https://placeimg.com/640/480/any"
            },
            failOnStatusCode : false
        }).then((response)=>{
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message')
        })
    })

    it('DELETE a category',()=>{
        cy.request({
            method : 'DELETE',
            url : 'https://api.escuelajs.co/api/v1/categories/427'
        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
    })

    it('DELETE a category with invalid ID',()=>{
        cy.request({
            method : 'DELETE',
            url : 'https://api.escuelajs.co/api/v1/categories/999',
            failOnStatusCode : false
        }).then((response)=>{
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('message')
        })
    })

    it('GET all products by category',()=>{
        cy.request({
            method : 'GET',
            url : 'https://api.escuelajs.co/api/v1/categories/1/products'
        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
    })

    it('PATCH update partial category',()=>{
        cy.request({
            method : 'PATCH',
            url : 'https://api.escuelajs.co/api/v1/categories/37',
            body : {
                "name": "New Category Name",
            },
        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
    })



})
                
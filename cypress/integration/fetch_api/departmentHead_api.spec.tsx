describe('Testing Get API', function () {

    it('Hit an API End point and validate its response status code and body', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/api/departmentHead',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('message')
            console.log(response.body)
            expect(response.body).to.have.property('message', 'Permission denied')
        })
    })
})



describe('Shopping and cart checkout', () => {

    const testedCategory = /skincare/i;

    const artNrToDataId = {
        'BVLG003': 93,
        '427847': 65,
    }

    const productData = {
        93: {
            price: 220,
            artNr: 'BVLG003',
            name: 'Creme Precieuse Nuit 50ml'
        },
        65: {
            price: 89,
            artNr: '427847',
            name: 'Absolue Eye Precious Cells'
        }
    }

    const headerNames = ['model', 'name', 'unit price', 'quantity'];
    const headerToProductFieldMap = {
        'model': 'artNr',
        'name': 'name',
        'unit price': 'price'
    }

    beforeEach(() => {
        cy.visit('/');
    })

    it('SC01 - can put one item in the cart', () => {
        cy.contains('.nav-pills a', testedCategory).eq(0)
            .should('be.visible')
            .click();

        cy.get("[data-id=93]").filter(':visible').click();

        cy.get('.topcart .cart_total').filter(':visible').invoke('text').should('equal', '$220.00');
    });

    it('SC02 - can put multiple items in the cart', () => {
        cy.contains('.nav-pills a', testedCategory).eq(0)
            .should('be.visible')
            .click();

        let sum = 0;

        Object.keys(productData).forEach(productId => {
            cy.get(`[data-id=${productId}]`).filter(':visible').click();
            sum = sum + productData[productId].price;
        })

        cy.get('.topcart .cart_total').filter(':visible').invoke('text').should('equal', `$${sum.toFixed(2)}`);
    });

    it('SC03 - can navigate to cart checkout', () => {
        cy.contains('.nav-pills a', testedCategory).eq(0)
            .should('be.visible')
            .click();

        Object.keys(productData).forEach(productId => {
            cy.get(`[data-id=${productId}]`).filter(':visible').click();
        })

        cy.get('.topcart').click();

        cy.url().should('include', 'checkout/cart');
    });

    it('SC04 - shows selected items in cart', () => {
        cy.contains('.nav-pills a', testedCategory).eq(0)
            .should('be.visible')
            .click();

        Object.keys(productData).forEach(productId => {
            cy.get(`[data-id=${productId}]`).filter(':visible').click();
        })

        cy.get('.topcart').click();

        const headerMap = {};
        let modelNrIndex;

        cy.get('.product-list > table tbody tr th').then((headers) => {
            //First find the index of the columns we want to test
            headers.each((index, header) => {
                if(headerNames.includes(header.textContent.trim().toLowerCase())){
                    headerMap[index] = header.textContent.trim().toLowerCase();
                }
                if(header.textContent.trim().toLowerCase() === 'model'){
                    modelNrIndex = index;
                }
            })
        });

        cy.get('.product-list > table tbody tr').each((row, index) => {
            //the whole table is inside the tbody, so we skip the first row that is the header
            if(index === 0) return;

            const rowChildren = row.children();

            const productInRow = productData[artNrToDataId[rowChildren[modelNrIndex].textContent]];

            Object.keys(headerMap).forEach(headerIndex => {
                if(headerMap[headerIndex] === 'quantity'){
                    cy.wrap(rowChildren[headerIndex]).get(`#cart_quantity${artNrToDataId[productInRow.artNr]}`).invoke('val').should('equal', '1');
                } else if(headerMap[headerIndex] === 'unit price'){
                    expect(rowChildren[headerIndex].textContent.trim()).equals(
                        `$${productInRow[headerToProductFieldMap[headerMap[headerIndex]]].toFixed(2)}`
                    );
                } else {
                    expect(rowChildren[headerIndex].textContent.trim()).equals(productInRow[headerToProductFieldMap[headerMap[headerIndex]]]);
                }

            });

        }).then(() => {
            const cartValue = Object.values(productData).map(pd => pd.price).reduce((a, b) => a + b);

            cy.get("#totals_table tbody tr").each((row) => {
                //no ids or anything helpful, we find the row with the sub-total and assume the next cell in the row is the actual value
                const rowChild = row.children('td');

                for(let i = 0; i < rowChild.length; i++){
                    if(rowChild[i].textContent.trim().toLowerCase() === 'sub-total:' && i + 1 < rowChild.length){
                        expect(rowChild[i + 1].textContent).equals(`$${cartValue.toFixed(2)}`);
                        break;
                    }
                }
            });
        });
    });

})

describe('template spec', () => {
  //2.
  it('order by name A-Z', () => {
    //order items by name A-Z
	cy.visit('https://automationteststore.com/index.php?rt=product/category&path=68_69');
	cy.get('#sort').select('pd.name-ASC');
	//get the first 3 item names
	//and store them as itemx
	cy.get('.prdocutname')
	  .eq(0).invoke('attr', 'title')
	  .as('item0');
	cy.get('.prdocutname')
	  .eq(1).invoke('attr', 'title')
	  .as('item1');
	cy.get('.prdocutname')
	  .eq(2).invoke('attr', 'title')
	  .as('item2');
	  
	cy.get('@item0').then( value0 => {
		cy.get('@item1').then( value1 => {
			cy.get('@item2').then( value2 => {
				//compare the strings
				//then evaluate the results
				let val_01 = value0.localeCompare(value1);
				let val_12 = value1.localeCompare(value2);
				cy.wrap(val_01).should('be.lt', 0);
				cy.wrap(val_12).should('be.lt', 0);
			});
		});
	});
  });
  //3.
  it('test cart', () => {
    const itemlist = 'https://automationteststore.com/index.php?rt=product/category&path=68_70';
	cy.visit(itemlist);
	cy.get('.pricetag > .productcart').eq(0).click();
	//put the item into the cart
	cy.get('.cart').click();
	
	cy.visit(itemlist);
	cy.get('.pricetag > .productcart').eq(1).click();
	//put the item into the cart
	cy.get('.cart').click();
	
	
	//now get the sum of the two items' prices
	cy.get('.product-list tr').eq(1).find('.align_right').eq(0).invoke('text').as('price0');
	cy.get('.product-list tr').eq(2).find('.align_right').eq(0).invoke('text').as('price1');
	//and the total price
	cy.get('#totals_table tr').eq(0).find('td').eq(1).invoke('text').as('priceSubTotal');

	//now calculate the sum of the two prices
	//if it matches with the sum on the website
	let price0Converted = -1;
	let price1Converted = -1;
	let priceSubTotalConverted = -1;
	cy.get('@price0').then((price0) => {
		cy.get('@price1').then((price1) => {
			cy.get('@priceSubTotal').then((priceTotal) => {
				price0Converted = parseInt(String(price1).replace('.00','').replace('$',''));
				price1Converted = parseInt(String(price0).replace('.00','').replace('$',''));
				priceSubTotalConverted = parseInt(String(priceTotal).replace('.00','').replace('$',''));
				cy.wrap(priceSubTotalConverted).should('be.eq', price0Converted + price1Converted);
			});
		});
	});	
  });
  //4.
  it('count the number of categories', () => {
    cy.visit('https://automationteststore.com/');
	let length = -1;
	let numberOfCategories = 7;
	cy.get('.subnav > ul')
	  .find('li > div.subcategories')
      .then(($value) => {
          length = $value.length;
		  cy.wrap(length).should('be.eq', numberOfCategories);
      });
  });
  //5.
  it('check the registration', () => {
    cy.visit('https://automationteststore.com/index.php?rt=account/create');
	cy.get('#maincontainer .btn-orange').click();
	//I left the rest of the error messages on purpose
	//in case the numbers change later
	cy.get('fieldset > div.form-group.has-error').eq(0).should('contain.text', 'First Name must be between');
	cy.get('fieldset > div.form-group.has-error').eq(1).should('contain.text', 'Last Name must be between');
	cy.get('fieldset > div.form-group.has-error').eq(2).should('contain.text', 'Email Address does not appear to be valid!');
	cy.get('fieldset > div.form-group.has-error').eq(3).should('contain.text', 'Address 1 must be between');
	cy.get('fieldset > div.form-group.has-error').eq(4).should('contain.text', 'City must be between');
  });
  //6.
  it('buy items as guest', () => {
    cy.visit('https://automationteststore.com/')
  });
})
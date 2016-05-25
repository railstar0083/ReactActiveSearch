//Requires
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

//Filter inputs
var FilterBoxes = React.createClass({
	
	handleSearchChange: function() {
		var textInput = document.getElementsByName("textSearch")[0].value;
		//alert(textInput);
		this.props.changeSearch(textInput);
	},
  
	render: function() {
		return(
			<div>
				<p>
					Search:
					{' '}
					<input type="text" 
						   ref="textSearch"
						   name="textSearch"
						   className="searchInput"
						   onChange={this.handleSearchChange}
					/>
				</p>
			</div>
		);
	}
});	 

//Individual data rows
var SchoolBlock = React.createClass({
	render: function() {
		var name = this.props.school.name;
		var address = this.props.school.address;
		var schoolType = this.props.school.type;
		var city = this.props.school.city;
		var zip = this.props.school.zipcode;
		var phone = this.props.school.phone;
		
		return(
			
				<tr className="schoolListRow animated fadeIn">
					<td>{name}<br/>{schoolType}<br/>{phone}<br/><br/></td>
					<td>{address}<br/>{city}, AZ {zip}</td>
				</tr>
			
		);
	}
});	  
	  
//The container for the reward blocks	  
var DisplayTable = React.createClass({
	render: function() {
		var rows = [];
		var textFilter = this.props.textSearch;
		textFilter = textFilter.toLowerCase();
		//alert(stocked);
		//alert(radioFilter);
		this.props.schools.forEach(function(school) {
			var parseString = school.name + " " + school.type + " " + school.address + " " + school.city + " " + school.zipcode + " " + school.phone;
			var schoolName = school.name;
			schoolName = schoolName.toLowerCase();
			parseString = parseString.toLowerCase();
			if (textFilter != '' && textFilter.length >= 3) {
				if (parseString.indexOf(textFilter) > -1){
					rows.push(<SchoolBlock school={school} key={school.name} />)
				}else{
					return;
				}
			}
			//rows.push(<SchoolBlock school={school} key={school.name} />)
		}.bind(this));
		return(
			<div>
				
				
					<table className="schoolList">
						<tbody>
							{rows}
						</tbody>
					</table>
				
				
			</div>
		);
	}
});
	  
//The App	  
var FilterableSchoolList = React.createClass({
	
	getInitialState: function() {
		return {
			//inStockOnly: false,
			radioSelected: 'none',
			textSearch: ''
		};
	},
	
	handleTextInput: function(textSearch) {
		//alert("handled Text again");
		this.setState({
		  textSearch: textSearch
		});
	},
	
	handleRadioInput: function(radioSelected) {
		//alert("handled Radio again");
		this.setState({
		  radioSelected: radioSelected
		});
	},
	
	render: function() {
		return(
			<div>
			<div className="appFilters">
				<FilterBoxes
				 changeRadio={this.handleRadioInput}
				 changeSearch={this.handleTextInput}
				 radioSelected={this.state.radioSelected}
				 textSearch={this.state.textSearch}
				/>
			</div>
			<div className="appContent">
				<DisplayTable 
			    schools={this.props.schools}
				radioSelected={this.state.radioSelected}
				textSearch={this.state.textSearch}
				/>
			</div>
			</div>
		);
	}
});

var SCHOOLS = [
	{name: 'Acacia Elementary', type: 'Elementary', phone: '(602) 896-5000', address: '3021 W Evans Dr', city: 'Phoenix', zipcode: '85053'},
	{name: 'Alhambra College Preparatory', type: 'High School', phone: '(602) 246-0578', address: '3802 W Maryland Ave', city: 'Phoenix', zipcode: '85019'},
	{name: 'Andalucia Middle', type: 'Middle School', phone: '(623) 848-8646', address: '4730 W Campbell', city: 'Phoenix', zipcode: '85031'},
	{name: 'Arroyo Elementary', type: 'Elementary', phone: '(602) 896-5100', address: '4535 W Cholla', city: 'Glendale', zipcode: '85304'},
	{name: 'Barry Goldwater High', type: 'High School', phone: '(623) 445-3000', address: '2820 W Rose Garden Ln', city: 'Phoenix', zipcode: '85027'},
	{name: 'Brimhall Junior High', type: 'Middle School', phone: '(480) 472-2600', address: '4949 E Southern Ave', city: 'Mesa', zipcode: '85206'},
	{name: 'Buckeye Primary School', type: 'Elementary', phone: '(623) 386-4487', address: '210 S 6th St', city: 'Buckeye', zipcode: '85326'},
	{name: 'Child Development Center', type: 'Pre School', phone: '(623) 876-7567', address: '11425 N Dysart Rd', city: 'El Mirage', zipcode: '85335'},
	{name: 'Cochise Elementary', type: 'Elementary', phone: '(480) 484-1100', address: '9451 N 84th St', city: 'Scottsdale', zipcode: '85258'},
	{name: 'Crossroads', type: 'High School', phone: '(480) 308-7330', address: '855 W 8th Ave', city: 'Mesa', zipcode: '85210'},
	{name: 'Durango Transitional Learning Center', type: 'Middle School', phone: '(602) 506-4264', address: '3131 W Durango', city: 'Phoenix', zipcode: '85009'},
	{name: 'Dysart Early Childhood Education Center', type: 'Pre School', phone: '(623) 876-7350', address: '17999 W Surprise Farms Loop South', city: 'Surprise', zipcode: '85388'},
	{name: 'Edison Elementary', type: 'Elementary', phone: '(480) 472-5300', address: '545 N Horne', city: 'Mesa', zipcode: '85203'},
	{name: 'Fountain Hills High', type: 'High School', phone: '(480) 664-5500', address: '16100 E Palisades Blvd', city: 'Fountain Hills', zipcode: '85268'},
	{name: 'Gateway Pointe Elementary', type: 'Elementary', phone: '(480) 279-7700', address: '2069 S Delatorre Dr', city: 'Gilbert', zipcode: '85295'},
	{name: 'Glendale High', type: 'High School', phone: '(623) 435-6200', address: '4801 W Maryland Ave', city: 'Glendale', zipcode: '85301'},
	{name: 'Holdeman Elementary', type: 'Elementary', phone: '(480) 966-9934', address: '1326 W 18th St', city: 'Tempe', zipcode: '85281'},
	{name: 'Ingleside Middle', type: 'Middle School', phone: '(480) 484-4900', address: '5402 E Osborn Rd', city: 'Phoenix', zipcode: '85018'},
	{name: 'Jack Barnes Elementary', type: 'Elementary', phone: '(480) 987-7400', address: '20750 S 214th St', city: 'Queen Creek', zipcode: '85142'},
	{name: 'Kiser Elementary', type: 'Elementary', phone: '(928) 683-2588', address: '38739 W I-8', city: 'Gila Bend', zipcode: '85337'},
	{name: 'Kyrene Altadena Middle', type: 'Middle School', phone: '(480) 783-1300', address: '14620 S Desert Foothills Pkwy', city: 'Phoenix', zipcode: '85048'},
	{name: 'Marcos de Niza High', type: 'High School', phone: '(480) 838-3200', address: '6000 S Lakeshore Dr', city: 'Tempe', zipcode: '85283'},
	{name: 'North Canyon High', type: 'High School', phone: '(602) 449-5000', address: '1700 E Union Hills Dr', city: 'Phoenix', zipcode: '85024'},
	{name: 'Palm Valley Elementary', type: 'Elementary', phone: '(623) 535-6400', address: '2801 N 135th Ave', city: 'Goodyear', zipcode: '85395'},
	{name: 'Queen Creek Middle', type: 'Middle School', phone: '(480) 987-5940', address: '20435 S Old Ellsworth Rd', city: 'Queen Creek', zipcode: '85142'},
	{name: 'Quentin Elementary', type: 'Elementary', phone: '(623) 478-6000', address: '11050 W Whyman Ave', city: 'Avondale', zipcode: '85323'},
	{name: 'Shadow Mountain High', type: 'High School', phone: '(602) 449-3000', address: '2902 E Shea Blvd', city: 'Phoenix', zipcode: '85028'},
	{name: 'Sonoran Trails Middle', type: 'Middle School', phone: '(480) 272-8600', address: '5555 E Pinnacle Vista Dr', city: 'Cave Creek', zipcode: '85331'},
	{name: 'Trailside Point Elementary', type: 'Elementary', phone: '(602) 605-8540', address: '7275 W Vineyard Rd', city: 'Laveen', zipcode: '85339'},
	{name: 'Wilson Head Start', type: 'Pre School', phone: '(602) 231-0373', address: '430 N 30 St', city: 'Phoenix', zipcode: '85008'}
]

ReactDOM.render(
  <FilterableSchoolList schools={SCHOOLS} />,
  document.getElementById('container')
);
Create table if not exists cloth(
	id INT AUTO_INCREMENT,
	name varchar(100) not null,
	short_description varchar(1000),
	long_description text(65535),
	brand varchar(100) not null,
	category varchar(100) not null,			
	Primary KEY(id)
);	

Create table if not exists images(
		url varchar(100),
		id int,
		FOREIGN KEY(id) REFERENCES cloth(id)
		);






insert into images (id,url) values (4,'4_1.jpg');
insert into images (id,url) values (5,'5_1.jpg');


/**insert into cloth (name,short_description,long_description,brand,category) values (
										   "Tuxedo",
										   "A tux is a fancy black suit that you might wear, along with a bow tie, to your senior prom or your wedding",
										   "Image result for tuxedo description This type of jacket traditionally has four buttons and fastens with either the bottom row (known as 4-on-1 style)or 										    		both rows (4-on-2) depending on the cut. The most traditional model of tuxedo jacket: black and 
											single-breasted with one closing button, peaked lapels with silk facings, and no rear vents.",	 
										   "Black Lapel",
										   "Suit"
										  );					**/
										  
		
		

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

Create table if not exists user_details(
		username varchar(100),
		first_name varchar(100),
		last_name varchar(100),
		pincode int,
		city varchar(100),
		street varchar(100),
		phone varchar(100),
		profile_image varchar(100),
		FOREIGN KEY(username) REFERENCES user(username)
);

Create table if not exists stock(
		cloth_id int,
		Size varchar(10),
		Quantity int,
		price int,
		FOREIGN KEY(cloth_id) REFERENCES cloth(id)
);

Create table if not exists cart(
		cloth_id int,
		username varchar(100),
		quantity int,
		size varchar(10),
		FOREIGN KEY(username) REFERENCES user(username),
		FOREIGN KEY(cloth_id) REFERENCES cloth(id)
);




Create table if not exists seller_cloth(
	cloth_id INT AUTO_INCREMENT,
	name varchar(100) not null,
	short_description varchar(1000),
	long_description text(65535),
	brand varchar(100) not null,
	category varchar(100) not null,			
	Primary KEY(cloth_id)
);


Create table if not exists seller_cloth_images(
		url varchar(100),
		cloth_id int,
		FOREIGN KEY(cloth_id) REFERENCES seller_cloth(cloth_id)
);

Create table if not exists marketplace(
	cloth_id INT,
	name varchar(100) not null,
	short_description varchar(1000),
	long_description text(65535),
	brand varchar(100) not null,
	category varchar(100) not null,
	request_id int,			
	Primary KEY(cloth_id)
);

Create table if not exists requests(
		request_id int AUTO_INCREMENT,
		cloth_id int,
		seller varchar(100),
		size varchar(10),
		quantity int,
		price int,
		request_status tinyint(1),
		request_result tinyint(1),
		Primary KEY(request_id),
		FOREIGN KEY(cloth_id) REFERENCES seller_cloth(cloth_id),
		FOREIGN KEY(seller) REFERENCES user(username)
);

Create table if not exists marketplace(
	cloth_id INT,
	name varchar(100) not null,
	short_description varchar(1000),
	long_description text(65535),
	brand varchar(100) not null,
	category varchar(100) not null,
	request_id int,			
	Primary KEY(cloth_id),
	FOREIGN KEY(request_id) REFERENCES requests(request_id)
);
									  
		
		



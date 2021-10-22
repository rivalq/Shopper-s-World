Create table if not exists ratings(
	username varchar(100),
	cloth_id int,
	rating float,
	PRIMARY KEY(username,cloth_id),
	FOREIGN KEY(username) REFERENCES user(username),
	FOREIGN KEY(cloth_id) REFERENCES marketplace(cloth_id)
);

Create table if not exists wishlist(
	username varchar(100),
	cloth_id int,
	PRIMARY KEY(username,cloth_id),
	FOREIGN KEY(username) REFERENCES user(username),
	FOREIGN KEY(cloth_id) REFERENCES marketplace(cloth_id)
);
Create table if not exists cloth_ratings(
	cloth_id int,
	rating float,
	PRIMARY KEY(cloth_id),
	FOREIGN KEY(cloth_id) REFERENCES marketplace(cloth_id)
);
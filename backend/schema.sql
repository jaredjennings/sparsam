create table envelope (
	id integer primary key,
	name text
);

create table transaction (
	id integer primary key,
	eid integer,
	description text,
	special text,
	amount_in_cents integer
);

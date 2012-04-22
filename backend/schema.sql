create table envelope (
	id integer primary key,
	name text,
	limit_cents integer
);

create table txn (
	id integer primary key,
	eid integer,
	description text,
	special text,
	cents integer
);

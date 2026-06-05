CREATE TABLE `book_template` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`userId` text NOT NULL,
	`name` text NOT NULL UNIQUE,
	`width` integer NOT NULL,
	`height` integer NOT NULL,
	CONSTRAINT `book_template_userId_name_unique` UNIQUE(`userId`,`name`),
	CONSTRAINT `book_template_userId_width_height_unique` UNIQUE(`userId`,`width`,`height`)
);

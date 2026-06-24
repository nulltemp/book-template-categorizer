CREATE TABLE `author` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`country` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `book` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`title` text NOT NULL,
	`publisherId` integer NOT NULL,
	`printingYear` integer NOT NULL,
	`size` text NOT NULL,
	`pageCount` integer NOT NULL,
	`bindingForm` text NOT NULL,
	`url` text NOT NULL,
	CONSTRAINT `fk_book_publisherId_publisher_id_fk` FOREIGN KEY (`publisherId`) REFERENCES `publisher`(`id`)
);
--> statement-breakpoint
CREATE TABLE `book_author` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`bookId` integer NOT NULL,
	`authorId` integer NOT NULL,
	`type` text NOT NULL,
	CONSTRAINT `fk_book_author_bookId_book_id_fk` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`),
	CONSTRAINT `fk_book_author_authorId_author_id_fk` FOREIGN KEY (`authorId`) REFERENCES `author`(`id`),
	CONSTRAINT `book_author_bookId_authorId_unique` UNIQUE(`bookId`,`authorId`)
);
--> statement-breakpoint
CREATE TABLE `publisher` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`country` text NOT NULL
);

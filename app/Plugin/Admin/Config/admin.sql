
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(40) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `first_name` VARCHAR(40) DEFAULT NULL,
  `middle_name` VARCHAR(40) DEFAULT NULL,
  `last_name` VARCHAR(40) DEFAULT NULL,
  `group_id` INT(4) DEFAULT '4',
  `is_active` TINYINT(1) DEFAULT '1',
  `created_date` DATETIME DEFAULT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO `users` (
	`id`, 
	`username`, 
	`password`, 
	`email`, 
	`first_name`, 
	`middle_name`, 
	`last_name`, 
	`group_id`, 
	`is_active`, 
	`created_date`, 
	`timestamp`) 
	VALUES (
	'1',
	'admin',
	'21232f297a57a5a743894a0e4a801fc3',
	'admin@admin.com',
	'Admin', '', '',
	'1',
	'1',
	NULL,
	'2015-05-06 12:12:12'
);

CREATE TABLE IF NOT EXISTS `groups` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `created` DATETIME DEFAULT NULL,
  `modified` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `groups` (`id`, `name`, `created`, `modified`) VALUES
  ('1', 'administrators', '2012-07-05 17:16:24', '2012-07-05 17:16:24'),
  ('2', 'managers', '2012-07-05 17:16:34', '2012-07-05 17:16:34'),
  ('3', 'users', '2012-07-05 17:16:45', '2012-07-05 17:16:45');
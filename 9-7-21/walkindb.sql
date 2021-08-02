-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `created_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` TIMESTAMP NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`walk_in`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`walk_in` (
  `walk_in_id` INT NOT NULL AUTO_INCREMENT,
  `title` NVARCHAR(200) NOT NULL,
  `startdate` DATE NULL,
  `enddate` DATE NULL,
  `created_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` TIMESTAMP NULL,
  `things_to_remember` LONGTEXT NULL,
  `GUID` NVARCHAR(45) NOT NULL,
  PRIMARY KEY (`walk_in_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`location` (
  `location_id` INT NOT NULL AUTO_INCREMENT,
  `address_line_1` VARCHAR(100) NULL,
  `address_line_2` VARCHAR(100) NULL,
  `pincode` INT NULL,
  `city` VARCHAR(20) NULL,
  `phone_number` BIGINT(10) NULL,
  `walk_in_id` INT NOT NULL,
  PRIMARY KEY (`location_id`),
  INDEX `fk_location_walk_in1_idx` (`walk_in_id` ASC) VISIBLE,
  CONSTRAINT `fk_location_walk_in1`
    FOREIGN KEY (`walk_in_id`)
    REFERENCES `mydb`.`walk_in` (`walk_in_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`job_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`job_role` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NULL,
  `description` LONGTEXT NULL,
  `requirements` LONGTEXT NULL,
  `compensation` FLOAT NULL,
  `created_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` TIMESTAMP NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`jobs_in_walkin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`jobs_in_walkin` (
  `jobs_in_walkin_id` INT NOT NULL AUTO_INCREMENT,
  `role_id` INT NOT NULL,
  `walk_in_id` INT NOT NULL,
  INDEX `fk_job_role_has_walk_in_walk_in1_idx` (`walk_in_id` ASC) VISIBLE,
  INDEX `fk_job_role_has_walk_in_job_role1_idx` (`role_id` ASC) VISIBLE,
  PRIMARY KEY (`jobs_in_walkin_id`),
  CONSTRAINT `fk_job_role_has_walk_in_job_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `mydb`.`job_role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_job_role_has_walk_in_walk_in1`
    FOREIGN KEY (`walk_in_id`)
    REFERENCES `mydb`.`walk_in` (`walk_in_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`slot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`slot` (
  `slot_id` INT NOT NULL AUTO_INCREMENT,
  `starttime` TIME NOT NULL,
  `endtime` TIME NOT NULL,
  PRIMARY KEY (`slot_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`walkin_slot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`walkin_slot` (
  `walkin_slot_id` INT NOT NULL AUTO_INCREMENT,
  `walkin_id` INT NOT NULL,
  `slot_id` INT NOT NULL,
  `date` DATE NULL,
  `total` INT NULL,
  `created_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` TIMESTAMP NULL,
  INDEX `fk_walk_in_has_walkin_slot_walkin_slot1_idx` (`slot_id` ASC) VISIBLE,
  INDEX `fk_walk_in_has_walkin_slot_walk_in1_idx` (`walkin_id` ASC) VISIBLE,
  PRIMARY KEY (`walkin_slot_id`),
  CONSTRAINT `fk_walk_in_has_walkin_slot_walk_in1`
    FOREIGN KEY (`walkin_id`)
    REFERENCES `mydb`.`walk_in` (`walk_in_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_walk_in_has_walkin_slot_walkin_slot1`
    FOREIGN KEY (`slot_id`)
    REFERENCES `mydb`.`slot` (`slot_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`instruction_type_enum`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`instruction_type_enum` (
  `instruction_type_enum_id` INT NOT NULL AUTO_INCREMENT,
  `instruction_text` VARCHAR(45) NOT NULL,
  `instruction_description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`instruction_type_enum_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`round`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`round` (
  `round_id` INT NOT NULL AUTO_INCREMENT,
  `round_detail` LONGTEXT NOT NULL,
  PRIMARY KEY (`round_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`walk_in_instruction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`walk_in_instruction` (
  `walk_in_instruction_id` INT NOT NULL AUTO_INCREMENT,
  `walk_in_id` INT NOT NULL,
  `instruction_type_enum_id` INT NOT NULL,
  `instruction` LONGTEXT NOT NULL,
  `round_id` INT NULL,
  INDEX `fk_walk_in_has_instruction_walk_in1_idx` (`walk_in_id` ASC) VISIBLE,
  PRIMARY KEY (`walk_in_instruction_id`),
  INDEX `fk_walk_in_instruction_instruction_type_enum1_idx` (`instruction_type_enum_id` ASC) VISIBLE,
  INDEX `fk_walk_in_instruction_round1_idx` (`round_id` ASC) VISIBLE,
  CONSTRAINT `fk_walk_in_has_instruction_walk_in1`
    FOREIGN KEY (`walk_in_id`)
    REFERENCES `mydb`.`walk_in` (`walk_in_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_walk_in_instruction_instruction_type_enum1`
    FOREIGN KEY (`instruction_type_enum_id`)
    REFERENCES `mydb`.`instruction_type_enum` (`instruction_type_enum_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_walk_in_instruction_round1`
    FOREIGN KEY (`round_id`)
    REFERENCES `mydb`.`round` (`round_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`walkin_registeration`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`walkin_registeration` (
  `walkin_registeration_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `walk_in_id` INT NOT NULL,
  `resume_link` VARCHAR(200) NULL,
  `walkin_slot_id` INT NOT NULL,
  INDEX `fk_user_has_walk_in_walk_in1_idx` (`walk_in_id` ASC) VISIBLE,
  INDEX `fk_user_has_walk_in_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_walkin_registeration_walkin_slot1_idx` (`walkin_slot_id` ASC) VISIBLE,
  PRIMARY KEY (`walkin_registeration_id`),
  CONSTRAINT `fk_user_has_walk_in_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_walk_in_walk_in1`
    FOREIGN KEY (`walk_in_id`)
    REFERENCES `mydb`.`walk_in` (`walk_in_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_walkin_registeration_walkin_slot1`
    FOREIGN KEY (`walkin_slot_id`)
    REFERENCES `mydb`.`walkin_slot` (`walkin_slot_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user_prefrence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user_prefrence` (
  `user_prefrence_id` INT NOT NULL AUTO_INCREMENT,
  `jobs_in_walkin_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `walk_in_id` INT NOT NULL,
  `walkin_registeration_id` INT NOT NULL,
  INDEX `fk_jobs_in_walkin_has_walkin_registeration_jobs_in_walkin1_idx` (`jobs_in_walkin_id` ASC) VISIBLE,
  PRIMARY KEY (`user_prefrence_id`),
  INDEX `fk_user_prefrence_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_user_prefrence_walk_in1_idx` (`walk_in_id` ASC) VISIBLE,
  INDEX `fk_user_prefrence_walkin_registeration1_idx` (`walkin_registeration_id` ASC) VISIBLE,
  CONSTRAINT `fk_jobs_in_walkin_has_walkin_registeration_jobs_in_walkin1`
    FOREIGN KEY (`jobs_in_walkin_id`)
    REFERENCES `mydb`.`jobs_in_walkin` (`jobs_in_walkin_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_prefrence_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_prefrence_walk_in1`
    FOREIGN KEY (`walk_in_id`)
    REFERENCES `mydb`.`walk_in` (`walk_in_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_prefrence_walkin_registeration1`
    FOREIGN KEY (`walkin_registeration_id`)
    REFERENCES `mydb`.`walkin_registeration` (`walkin_registeration_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`internship`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`internship` (
  `internship_id` INT NOT NULL AUTO_INCREMENT,
  `degree` VARCHAR(45) NULL,
  PRIMARY KEY (`internship_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user_hallticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user_hallticket` (
  `user_hallticket_id` INT NOT NULL,
  `generated_time` TIMESTAMP NULL,
  PRIMARY KEY (`user_hallticket_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`walk_in_has_internship`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`walk_in_has_internship` (
  `walk_in_id` INT NOT NULL,
  `internship_id` INT NOT NULL,
  PRIMARY KEY (`walk_in_id`, `internship_id`),
  INDEX `fk_walk_in_has_internship_internship1_idx` (`internship_id` ASC) VISIBLE,
  INDEX `fk_walk_in_has_internship_walk_in1_idx` (`walk_in_id` ASC) VISIBLE,
  CONSTRAINT `fk_walk_in_has_internship_walk_in1`
    FOREIGN KEY (`walk_in_id`)
    REFERENCES `mydb`.`walk_in` (`walk_in_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_walk_in_has_internship_internship1`
    FOREIGN KEY (`internship_id`)
    REFERENCES `mydb`.`internship` (`internship_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema qUser
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema qUser
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `qUser` ;
USE `qUser` ;

-- -----------------------------------------------------
-- Table `qUser`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qUser`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `phonenumber` VARCHAR(20) NOT NULL,
  `resumelink` VARCHAR(200) NOT NULL,
  `portfoliolink` VARCHAR(200) NULL,
  `referral` VARCHAR(50) NOT NULL,
  `jobupdates` TINYINT NULL DEFAULT 0,
  `profilepic` VARCHAR(200) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qUser`.`Education`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qUser`.`Education` (
  `education_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `passingyear` VARCHAR(45) NOT NULL,
  `aggpercentage` INT NOT NULL,
  `degree` VARCHAR(100) NOT NULL,
  `stream` VARCHAR(45) NOT NULL,
  `college` VARCHAR(100) NOT NULL,
  `collegelocation` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`education_id`),
  INDEX `fk_Education_user2_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_Education_user2`
    FOREIGN KEY (`user_id`)
    REFERENCES `qUser`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qUser`.`experienced`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qUser`.`experienced` (
  `experienced_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `yearsofexperience` INT NOT NULL,
  `currentctc` INT NOT NULL,
  `expectedctc` INT NOT NULL,
  `noticeperiodend` DATE NOT NULL,
  `noticeperiodduration` INT NULL,
  `prevapplicationrole` VARCHAR(45) NULL,
  `otherextech` VARCHAR(100) NULL,
  `otherfamtech` VARCHAR(100) NULL,
  PRIMARY KEY (`experienced_id`),
  INDEX `fk_experienced_user2_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_experienced_user2`
    FOREIGN KEY (`user_id`)
    REFERENCES `qUser`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qUser`.`techstack`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qUser`.`techstack` (
  `tech_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`tech_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qUser`.`experiencetechprefrence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qUser`.`experiencetechprefrence` (
  `exprefrence_id` INT NOT NULL AUTO_INCREMENT,
  `experienced_id` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `isfamiliar` TINYINT NULL DEFAULT 0,
  `isexperienced` TINYINT NULL DEFAULT 0,
  `tech_id` INT NOT NULL,
  PRIMARY KEY (`exprefrence_id`),
  INDEX `fk_experiencejobprefrence_experienced2_idx` (`experienced_id` ASC) VISIBLE,
  INDEX `fk_experiencetechprefrence_techstack1_idx` (`tech_id` ASC) VISIBLE,
  CONSTRAINT `fk_experiencejobprefrence_experienced2`
    FOREIGN KEY (`experienced_id`)
    REFERENCES `qUser`.`experienced` (`experienced_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_experiencetechprefrence_techstack1`
    FOREIGN KEY (`tech_id`)
    REFERENCES `qUser`.`techstack` (`tech_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qUser`.`fresher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qUser`.`fresher` (
  `fresher_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `prevapplicationrole` VARCHAR(45) NULL,
  `otherfreshertech` VARCHAR(100) NULL,
  PRIMARY KEY (`fresher_id`),
  INDEX `fk_fresher_user2_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_fresher_user2`
    FOREIGN KEY (`user_id`)
    REFERENCES `qUser`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qUser`.`freshertechprefrence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qUser`.`freshertechprefrence` (
  `prefrence_id` INT NOT NULL AUTO_INCREMENT,
  `fresher_id` INT NOT NULL,
  `tech_id` INT NOT NULL,
  PRIMARY KEY (`prefrence_id`),
  INDEX `fk_fresherjobprefrence_fresher2_idx` (`fresher_id` ASC) VISIBLE,
  INDEX `fk_freshertechprefrence_techstack1_idx` (`tech_id` ASC) VISIBLE,
  CONSTRAINT `fk_fresherjobprefrence_fresher2`
    FOREIGN KEY (`fresher_id`)
    REFERENCES `qUser`.`fresher` (`fresher_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_freshertechprefrence_techstack1`
    FOREIGN KEY (`tech_id`)
    REFERENCES `qUser`.`techstack` (`tech_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qUser`.`jobrole`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qUser`.`jobrole` (
  `jobrole_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`jobrole_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qUser`.`user_preferences`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qUser`.`user_preferences` (
  `preference_id` INT NOT NULL AUTO_INCREMENT,
  `jobrole_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  INDEX `fk_jobrole_has_user_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_jobrole_has_user_jobrole1_idx` (`jobrole_id` ASC) VISIBLE,
  PRIMARY KEY (`preference_id`),
  CONSTRAINT `fk_jobrole_has_user_jobrole1`
    FOREIGN KEY (`jobrole_id`)
    REFERENCES `qUser`.`jobrole` (`jobrole_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_jobrole_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `qUser`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
